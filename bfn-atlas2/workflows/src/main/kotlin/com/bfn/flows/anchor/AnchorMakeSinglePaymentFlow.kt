package com.bfn.flows.anchor

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.contracts.SupplierPaymentContract
import com.bfn.contractstates.states.AnchorState
import com.bfn.contractstates.states.SupplierPaymentState
import com.bfn.flows.services.InvoiceOfferFinderService
import com.bfn.flows.services.PaymentFinderService
import com.bfn.flows.services.ProfileFinderService
import com.bfn.flows.todaysDate
import net.corda.core.flows.*
import net.corda.core.identity.Party
import net.corda.core.node.services.Vault
import net.corda.core.node.services.vault.PageSpecification
import net.corda.core.node.services.vault.QueryCriteria
import net.corda.core.transactions.TransactionBuilder
import org.slf4j.LoggerFactory
import java.security.PublicKey


@InitiatingFlow
@StartableByRPC
class AnchorMakeSinglePaymentFlow(private val invoiceId: String, val delayMinutesUntilNextPaymentFlow: Long) : FlowLogic<SupplierPaymentState>() {

    @Suspendable
    override fun call(): SupplierPaymentState {
        Companion.logger.info("$pp AnchorMakePaymentFlow started ... $pp")
        val existingAnchor = serviceHub.vaultService.queryBy(AnchorState::class.java).states.singleOrNull()
                ?: throw IllegalArgumentException("Anchor does not exist")

        val service = serviceHub.cordaService(InvoiceOfferFinderService::class.java)
        val acceptedOffer = service.findAnchorOffer(invoiceId) ?: throw IllegalArgumentException("Accepted offer not found")
        if (!acceptedOffer.state.data.accepted) {
            throw IllegalArgumentException("Offer not accepted by Supplier")
        }
        //todo - fix this query - find a way!!
        val payments = serviceHub.cordaService(PaymentFinderService::class.java).getAllPaymentStateAndRefs()

        payments.forEach() {
            if (it.state.data.acceptedOffer.invoiceId.toString() == invoiceId) {
                throw IllegalArgumentException("Payment already exists for this invoice: $invoiceId")
            }
        }
        val anchorParty = existingAnchor.state.data.account.host
        val command = SupplierPaymentContract.Pay()
        val txBuilder = TransactionBuilder(serviceHub.networkMapCache.notaryIdentities.first())
        val supplierParty = acceptedOffer.state.data.supplier.host
        val customerParty = acceptedOffer.state.data.customer.host

        val supplierProfile = serviceHub.cordaService(ProfileFinderService::class.java)
                .findSupplierProfile(acceptedOffer.state.data.supplier.identifier.id.toString())
                ?: throw java.lang.IllegalArgumentException("Supplier profile not found")

        val payment = SupplierPaymentState(
                acceptedOffer = acceptedOffer.state.data,
                supplierProfile = supplierProfile.state.data,
                date = todaysDate(), paid = false,
                delayMinutesUntilNextPaymentFlow = delayMinutesUntilNextPaymentFlow

        )
        //todo - make EFT payment to supplier ... OR do this externally; kicked off in api?
        val keys: MutableList<PublicKey> = mutableListOf()
        val map: MutableMap<String, Party> = mutableMapOf()
        map[anchorParty.toString()] = anchorParty
        map[supplierParty.toString()] = supplierParty
        map[customerParty.toString()] = customerParty
        map.values.toList().forEach() {
            keys.add(it.owningKey)
        }

        txBuilder.addCommand(command, keys)
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
            logger.info("$pp Transaction finalized with Supplier/customer on ${sessions.size} remote nodes")
        } else {
            subFlow(FinalityFlow(tx, listOf()))
            logger.info("$pp Transaction finalized with Supplier/customer on same node")
        }
        logger.info("$pp Payment state created OK $pp")
        return payment
    }


    private val pp = "\uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95";

    companion object {
        private val logger = LoggerFactory.getLogger(AnchorMakeSinglePaymentFlow::class.java)
    }

}
