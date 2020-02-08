package com.bfn.flows.anchor

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.contracts.SupplierPaymentContract
import com.bfn.contractstates.states.AnchorState
import com.bfn.contractstates.states.SupplierPaymentState
import com.bfn.flows.regulator.ReportToRegulatorFlow
import com.bfn.flows.services.InvoiceOfferFinderService
import com.bfn.flows.services.ProfileFinderService
import com.bfn.flows.todaysDate
import net.corda.core.flows.*
import net.corda.core.identity.Party
import net.corda.core.node.services.Vault
import net.corda.core.node.services.vault.PageSpecification
import net.corda.core.node.services.vault.QueryCriteria
import net.corda.core.transactions.SignedTransaction
import net.corda.core.transactions.TransactionBuilder
import org.slf4j.LoggerFactory
import java.security.PublicKey


@InitiatingFlow
@StartableByRPC
class AnchorMakeMultiplePaymentsFlow() : FlowLogic<List<SupplierPaymentState>>() {

    @Suspendable
    override fun call(): List<SupplierPaymentState> {
        Companion.logger.info("$pp AnchorMakeMultiplePaymentsFlow started ... $pp")

        val existingAnchor = serviceHub.vaultService.queryBy(AnchorState::class.java).states.singleOrNull()
                ?: throw IllegalArgumentException("Anchor does not exist")
        val service = serviceHub.cordaService(InvoiceOfferFinderService::class.java)
        val acceptedOffers = service.getAnchorOffersAccepted()
        val paymentList: MutableList<SupplierPaymentState> = mutableListOf()
        if (acceptedOffers.isEmpty()) {
            return paymentList
        }
        //todo - fix this query - find a way!!
        val payments = serviceHub.vaultService.queryBy(
                criteria = QueryCriteria.VaultQueryCriteria(Vault.StateStatus.ALL),
                contractStateType = SupplierPaymentState::class.java,
                paging = PageSpecification(1,6000)
        ).states
        val keys: MutableList<PublicKey> = mutableListOf()
        val map: MutableMap<String, Party> = mutableMapOf()

        acceptedOffers.forEach() {
            map[it.state.data.investor.name] = it.state.data.investor.host
            map[it.state.data.supplier.name] = it.state.data.supplier.host
            map[it.state.data.customer.name] = it.state.data.customer.host

        }
        payments.forEach() { payRef ->
            payRef.state.data.acceptedOffer
            acceptedOffers.forEach() {
                if (it.state.data.invoiceId.toString() == payRef.state.data.acceptedOffer.invoiceId.toString()) {
                    throw IllegalArgumentException("Payment already exists for this invoice: ${it.state.data.invoiceId}")
                }
            }
        }
        map.values.forEach() {
            keys.add(it.owningKey)
        }
        if (keys.isEmpty()) {
            throw IllegalArgumentException("No Public keys found here, Boss!")
        }
        val anchorParty = existingAnchor.state.data.account.host
        val command = SupplierPaymentContract.Pay()
        val txBuilder = TransactionBuilder(serviceHub.networkMapCache.notaryIdentities.first())


        acceptedOffers.forEach() {
            val supplierProfile = serviceHub.cordaService(ProfileFinderService::class.java)
                    .findSupplierProfile(it.state.data.supplier.identifier.id.toString())
            if (supplierProfile != null) {
                val payment = SupplierPaymentState(
                        acceptedOffer = it.state.data,
                        supplierProfile = supplierProfile.state.data,
                        date = todaysDate(), paid = false
                )
                txBuilder.addInputState(it)
                txBuilder.addOutputState(payment)
                paymentList.add(payment)

            } else {
                logger.warn("Missing supplier profile - please CHECK!!")
            }
        }
        //todo - make EFT payments to suppliers ... OR do this externally; kicked off in api
        txBuilder.addCommand(command, keys)
        val tx = serviceHub.signInitialTransaction(txBuilder)
        val sessions: MutableList<FlowSession> = mutableListOf()
        map.values.forEach() {
            if (it.name.organisation != anchorParty.name.organisation) {
                val session = initiateFlow(it)
                sessions.add(session)
            }
        }

        if (sessions.isNotEmpty()) {
            val signedTransaction = subFlow(CollectSignaturesFlow(
                    partiallySignedTx = tx, sessionsToCollectFrom = sessions))
            subFlow(FinalityFlow(signedTransaction, sessions))
            reportToRegulator(signedTransaction)
            logger.info("$pp AnchorMakeMultiplePaymentsFlow: Transaction finalized with parties on ${sessions.size} multiple nodes")
        } else {
            val finalTx = subFlow(FinalityFlow(tx, listOf()))
            reportToRegulator(finalTx)
            logger.info("$pp AnchorMakeMultiplePaymentsFlow: Transaction finalized with parties on same node")
        }
        logger.info("$pp Payment list created OK: ${paymentList.size} payment states created $pp")

        return paymentList
    }
    @Suspendable
    @Throws(FlowException::class)
    private fun reportToRegulator(mSignedTransactionDone: SignedTransaction) {
       logger.info("\uD83D\uDCCC \uD83D\uDCCC \uD83D\uDCCC  Talking to the Regulator, for compliance, Senor! .............")
        try {
            subFlow(ReportToRegulatorFlow(mSignedTransactionDone))
           logger.info("\uD83D\uDCCC \uD83D\uDCCC \uD83D\uDCCC  DONE talking to the Regulator, Phew!")
        } catch (e: Exception) {
            logger.error(" \uD83D\uDC7F  \uD83D\uDC7F  \uD83D\uDC7F Regulator fell down.  \uD83D\uDC7F IGNORED  \uD83D\uDC7F ", e)
            throw FlowException("Regulator fell down!")
        }
    }

    private val pp = "\uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95";

    companion object {
        private val logger = LoggerFactory.getLogger(AnchorMakeMultiplePaymentsFlow::class.java)
    }

}
