package com.bfn.flows.anchor

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.contracts.SupplierPaymentContract
import com.bfn.contractstates.states.AnchorState
import com.bfn.contractstates.states.InvoiceOfferState
import com.bfn.contractstates.states.InvoiceState
import com.bfn.contractstates.states.SupplierPaymentState
import com.bfn.flows.services.ProfileFinderService
import com.bfn.flows.todaysDate
import com.r3.corda.lib.accounts.workflows.flows.RequestKeyForAccount
import net.corda.core.contracts.StateAndRef
import net.corda.core.flows.*
import net.corda.core.transactions.TransactionBuilder
import org.slf4j.LoggerFactory
import java.time.LocalDate
import java.time.ZoneId
import java.util.*


@InitiatingFlow
@StartableByRPC
class AnchorMakePaymentFlow(private val acceptedOffer: StateAndRef<InvoiceOfferState>) : FlowLogic<SupplierPaymentState>() {

    @Suspendable
    override fun call(): SupplierPaymentState {
        Companion.logger.info("$pp AnchorMakePaymentFlow started ... $pp")

        val existingAnchor = serviceHub.vaultService.queryBy(AnchorState::class.java).states.singleOrNull()
                ?: throw IllegalArgumentException("Anchor does not exist")
        val anchorParty = RequestKeyForAccount(existingAnchor.state.data.account).ourIdentity
        val command = SupplierPaymentContract.Pay()
        val txBuilder = TransactionBuilder(serviceHub.networkMapCache.notaryIdentities.first())
        val supplierParty = RequestKeyForAccount(acceptedOffer.state.data.supplier).ourIdentity
        val customerParty = RequestKeyForAccount(acceptedOffer.state.data.customer).ourIdentity
        val supplierProfile = serviceHub.cordaService(ProfileFinderService::class.java)
                .findSupplierProfile(acceptedOffer.state.data.supplier.identifier.id.toString())
                ?: throw java.lang.IllegalArgumentException("Supplier profile not found")

        val payment = SupplierPaymentState(
                acceptedOffer = acceptedOffer.state.data,
                supplierProfile = supplierProfile.state.data,
                date = todaysDate()

        )
        //todo - make EFT payment to supplier ... OR do this externally; kicked off in api?
        txBuilder.addCommand(command, anchorParty.owningKey, supplierParty.owningKey, customerParty.owningKey)
        txBuilder.addInputState(acceptedOffer)
        txBuilder.addOutputState(payment)

        val tx = serviceHub.signInitialTransaction(txBuilder)
        val sessions: MutableList<FlowSession> = mutableListOf()
        if (supplierParty.name.organisation != anchorParty.name.organisation) {
            val session = initiateFlow(supplierParty)
            sessions.add(session)
        }
        if (customerParty.name.organisation != anchorParty.name.organisation) {
            val session = initiateFlow(customerParty)
            sessions.add(session)
        }
        if (sessions.isNotEmpty()) {
            val signedTransaction = subFlow(CollectSignaturesFlow(
                    partiallySignedTx = tx, sessionsToCollectFrom = sessions))
            subFlow(FinalityFlow(signedTransaction, sessions))
            logger.info("\uD83D\uDC7D Transaction finalized with Supplier/customer on ${sessions.size} remote nodes")
        }
        logger.info("\uD83D\uDC7D \uD83D\uDE0E \uD83D\uDE0E Payment created OK")
        return payment
    }


    private val pp = "\uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95";

    companion object {
        private val logger = LoggerFactory.getLogger(AnchorMakePaymentFlow::class.java)
    }

}
