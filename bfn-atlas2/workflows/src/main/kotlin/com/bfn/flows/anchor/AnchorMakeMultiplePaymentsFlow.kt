package com.bfn.flows.anchor

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.contracts.SupplierPaymentContract
import com.bfn.contractstates.states.InvoiceOfferState
import com.bfn.contractstates.states.NetworkOperatorState
import com.bfn.contractstates.states.SupplierPaymentState
import com.bfn.flows.regulator.ReportToRegulatorFlow
import com.bfn.flows.services.InvoiceOfferFinderService
import com.bfn.flows.services.PaymentFinderService
import com.bfn.flows.services.ProfileFinderService
import com.bfn.flows.todaysDate
import net.corda.core.contracts.StateAndRef
import net.corda.core.flows.*
import net.corda.core.identity.Party
import net.corda.core.transactions.SignedTransaction
import net.corda.core.transactions.TransactionBuilder
import org.slf4j.LoggerFactory
import java.security.PublicKey

/**
 * The anchor investor finds all his accepted offers and creates payments for each
 * Returns a list of supplier payments created
 * All offers should be consumed in the transaction
 */
@InitiatingFlow
@StartableByRPC
@SchedulableFlow
class AnchorMakeMultiplePaymentsFlow(private val delayMinutesUntilNextPaymentFlow: Long) : FlowLogic<List<SupplierPaymentState>>() {

    @Suspendable
    override fun call(): List<SupplierPaymentState> {
        Companion.logger.info("$pp \uD83E\uDD50 AnchorMakeMultiplePaymentsFlow started ... \uD83E\uDD50 $pp")
        val existingAnchor = serviceHub.vaultService.queryBy( NetworkOperatorState::class.java).states.singleOrNull()
                ?: throw IllegalArgumentException("Anchor does not exist")

        val offerFinderService = serviceHub.cordaService(InvoiceOfferFinderService::class.java)
        val acceptedOffers = offerFinderService.getAnchorOffersAccepted()
        val paymentList: MutableList<SupplierPaymentState> = mutableListOf()
        if (acceptedOffers.isEmpty()) {
            logger.warn("⚠️ ⚠️ ⚠️  No accepted offers found for anchor")
            return paymentList
        }
        logger.warn("⚱️ ⚱️ ⚱️  ${acceptedOffers.size} accepted offers found for anchor")
        val keys: MutableList<PublicKey> = mutableListOf()
        val map: MutableMap<String, Party> = mutableMapOf()

        manageKeys(acceptedOffers, map, keys)
        val anchorParty = existingAnchor.state.data.account.host
        val txBuilder = TransactionBuilder(serviceHub.networkMapCache.notaryIdentities.first())

        val payments = serviceHub.cordaService(PaymentFinderService::class.java)
                .getAnchorPaymentStateAndRefs()
        acceptedOffers.forEach() { acceptedOffer ->
            val supplierProfile = serviceHub.cordaService(ProfileFinderService::class.java)
                    .findSupplierProfile(acceptedOffer.state.data.supplier.identifier.id.toString())
            if (supplierProfile != null) {
                //check that payment does not exist
                payments.forEach() {
                    if (it.state.data.acceptedOffer.invoiceId == acceptedOffer.state.data.invoiceId) {
                        logger.info("Houston, \uD83D\uDC7F\uD83D\uDC7F\uD83D\uDC7F\uD83D\uDC7F " +
                                "this is a major one. Dup payment not good. Over. Out.")
                        throw IllegalArgumentException("Payment already exists for this invoice")
                    }
                }
                val payment = SupplierPaymentState(
                        acceptedOffer = acceptedOffer.state.data,
                        supplierProfile = supplierProfile.state.data,
                        date = todaysDate(), paid = false,
                        delayMinutesUntilNextPaymentFlow = delayMinutesUntilNextPaymentFlow
                )
                //find ALL offers available for THIS invoice, accepted or not and consume the suckers
                val allOffers = offerFinderService.findOffersByInvoice(
                        acceptedOffer.state.data.invoiceId.toString())
                allOffers.forEach() {
                    txBuilder.addInputState(it)
                }
                txBuilder.addOutputState(payment)
                paymentList.add(payment)

            } else {
                logger.warn("Missing supplier profile - please CHECK!! \uD83D\uDC7F " +
                        "accountId: ${acceptedOffer.state.data.supplier.identifier.id}")
            }
        }

        //todo - make EFT payments to suppliers ... OR do this externally; kicked off in api
        logger.info("\uD83C\uDF4E payment transaction consuming \uD83C\uDF4E " +
                "${txBuilder.inputStates().size} offers, \uD83D\uDECE " +
                "output: ${txBuilder.outputStates()} payments created \uD83C\uDF4E")
        txBuilder.addCommand(SupplierPaymentContract.Pay(), keys)
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
    private fun manageKeys(acceptedOffers: List<StateAndRef<InvoiceOfferState>>, map: MutableMap<String, Party>, keys: MutableList<PublicKey>) {
        acceptedOffers.forEach() {
            map[it.state.data.investor.name] = it.state.data.investor.host
            map[it.state.data.supplier.name] = it.state.data.supplier.host
            map[it.state.data.customer.name] = it.state.data.customer.host

        }

        map.values.forEach() {
            keys.add(it.owningKey)
        }
        if (keys.isEmpty()) {
            throw IllegalArgumentException("No Public keys found here, Boss!")
        }
    }

    @Suspendable
    @Throws(FlowException::class)
    private fun reportToRegulator(mSignedTransactionDone: SignedTransaction) {
       logger.info("\uD83D\uDCCC \uD83D\uDCCC \uD83D\uDCCC  Talking to the Regulator, for AnchorMakeMultiplePaymentsFlow, Senor! .............")
        try {
            subFlow(ReportToRegulatorFlow(mSignedTransactionDone))
           logger.info("\uD83D\uDCCC \uD83D\uDCCC \uD83D\uDCCC  DONE talking to the Regulator for AnchorMakeMultiplePaymentsFlow, Phew!")
        } catch (e: Exception) {
            logger.error(" \uD83D\uDC7F  \uD83D\uDC7F  \uD83D\uDC7F Regulator fell down on AnchorMakeMultiplePaymentsFlow.  \uD83D\uDC7F IGNORED  \uD83D\uDC7F ", e)
            throw FlowException("Regulator fell down on AnchorMakeMultiplePaymentsFlow!")
        }
    }

    private val pp = "\uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95"

    companion object {
        private val logger = LoggerFactory.getLogger(AnchorMakeMultiplePaymentsFlow::class.java)
    }

}
