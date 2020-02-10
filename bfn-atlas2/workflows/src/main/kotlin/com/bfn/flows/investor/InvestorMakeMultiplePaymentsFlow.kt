package com.bfn.flows.investor

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.contracts.SupplierPaymentContract
import com.bfn.contractstates.states.SupplierPaymentState
import com.bfn.flows.regulator.ReportToRegulatorFlow
import com.bfn.flows.services.InvoiceOfferFinderService
import com.bfn.flows.services.ProfileFinderService
import com.bfn.flows.todaysDate
import com.r3.corda.lib.accounts.workflows.accountService
import net.corda.core.flows.*
import net.corda.core.identity.Party
import net.corda.core.transactions.SignedTransaction
import net.corda.core.transactions.TransactionBuilder
import org.slf4j.LoggerFactory
import java.security.PublicKey
import java.util.*

/**
 * A casual investor finds all her accepted offers and creates payments for each
 * Returns a list of supplier payments created
 * All offers should be consumed in the transaction
 */
@InitiatingFlow
@StartableByRPC
class InvestorMakeMultiplePaymentsFlow(private val investorId: String, val delayMinutesUntilNextPaymentFlow: Long) : FlowLogic<List<SupplierPaymentState>>() {

    @Suspendable
    override fun call(): List<SupplierPaymentState> {
        Companion.logger.info("$pp \uD83E\uDD50 InvestorMakeMultiplePaymentsFlow started ... \uD83E\uDD50 $pp")

        val service = serviceHub.cordaService(InvoiceOfferFinderService::class.java)
        val acceptedOffers = service.getInvestorOffersAccepted(investorId = investorId)
        val paymentList: MutableList<SupplierPaymentState> = mutableListOf()

        val account = accountService.accountInfo(UUID.fromString(investorId))
                ?: throw java.lang.IllegalArgumentException("Investor account not found")
        if (acceptedOffers.isEmpty()) {
            logger.info("\uD83D\uDC2C No accepted offers exist for \uD83D\uDD35 " +
                    "${account.state.data.name} \uD83D\uDD35 returning empty list")
            return paymentList
        } else {
            logger.info("\uD83D\uDC9A ${acceptedOffers.size} accepted offers found for \uD83D\uDD35 " +
                    "${account.state.data.name} \uD83D\uDD35 building payments ...")
        }

        val keys: MutableList<PublicKey> = mutableListOf()
        val map: MutableMap<String, Party> = mutableMapOf()

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

        val command = SupplierPaymentContract.Pay()
        val txBuilder = TransactionBuilder(serviceHub.networkMapCache.notaryIdentities.first())

        acceptedOffers.forEach() { acceptedOffer ->
            val supplierProfile = serviceHub.cordaService(ProfileFinderService::class.java)
                    .findSupplierProfile(acceptedOffer.state.data.supplier.identifier.id.toString())
            if (supplierProfile != null) {
                val payment = SupplierPaymentState(
                        acceptedOffer = acceptedOffer.state.data,
                        supplierProfile = supplierProfile.state.data,
                        date = todaysDate(), paid = false,
                        delayMinutesUntilNextPaymentFlow = delayMinutesUntilNextPaymentFlow
                )

                //find ALL offers available, accepted or not and consume the suckers
                val allOffers = service.findOffersByInvoice(acceptedOffer.state.data.invoiceId.toString())
                logger.warn("⚱️ ⚱️ ⚱️ ${allOffers.size} all offers found for invoice; to be consumed")
                allOffers.forEach() {
                    txBuilder.addInputState(it)
                }
                txBuilder.addOutputState(payment)
                paymentList.add(payment)

            } else {
                logger.warn("Missing supplier profile -  \uD83D\uDD10 \uD83D\uDD10 please CHECK!!")
                throw IllegalArgumentException("Supplier profile missing; payment cannot be created")
            }
        }
        //todo - make EFT payments to suppliers ... OR do this externally; kicked off in api
        logger.info("\uD83C\uDF4E payment transaction consuming \uD83C\uDF4E " +
                "${txBuilder.inputStates().size} offers \uD83C\uDF4E")
        txBuilder.addCommand(command, keys)
        val tx = serviceHub.signInitialTransaction(txBuilder)
        val sessions: MutableList<FlowSession> = mutableListOf()
        map.values.forEach() {
            if (it.toString() != account.state.data.host.toString()) {
                val session = initiateFlow(it)
                sessions.add(session)
            }
        }

        if (sessions.isNotEmpty()) {
            val signedTransaction = subFlow(CollectSignaturesFlow(
                    partiallySignedTx = tx, sessionsToCollectFrom = sessions))
            subFlow(FinalityFlow(signedTransaction, sessions))
            reportToRegulator(signedTransaction)
            logger.info("$pp InvestorMakeMultiplePaymentsFlow: Transaction finalized with parties on ${sessions.size} multiple nodes")
        } else {
            val finalTx = subFlow(FinalityFlow(tx, listOf()))
            reportToRegulator(finalTx)
            logger.info("$pp InvestorMakeMultiplePaymentsFlow: Transaction finalized with parties on same node")
        }
        logger.info("$pp Payment list created OK: ${paymentList.size} payment states created $pp")

        return paymentList
    }
    @Suspendable
    @Throws(FlowException::class)
    private fun reportToRegulator(mSignedTransactionDone: SignedTransaction) {
       logger.info("\uD83D\uDCCC \uD83D\uDCCC \uD83D\uDCCC  Talking to the Regulator, for InvestorMakeMultiplePaymentsFlow, Senor! .............")
        try {
            subFlow(ReportToRegulatorFlow(mSignedTransactionDone))
           logger.info("\uD83D\uDCCC \uD83D\uDCCC \uD83D\uDCCC  DONE talking to the Regulator for InvestorMakeMultiplePaymentsFlow, Phew!")
        } catch (e: Exception) {
            logger.error(" \uD83D\uDC7F  \uD83D\uDC7F  \uD83D\uDC7F Regulator fell down on InvestorMakeMultiplePaymentsFlow.  \uD83D\uDC7F IGNORED  \uD83D\uDC7F ", e)
            throw FlowException("Regulator fell down on InvestorMakeMultiplePaymentsFlow!")
        }
    }

    private val pp = "\uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95"

    companion object {
        private val logger = LoggerFactory.getLogger(InvestorMakeMultiplePaymentsFlow::class.java)
    }

}
