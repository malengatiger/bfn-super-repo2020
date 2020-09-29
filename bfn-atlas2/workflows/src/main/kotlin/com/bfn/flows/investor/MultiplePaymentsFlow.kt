package com.bfn.flows.investor

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.states.SupplierPaymentState
import com.bfn.flows.regulator.ReportToRegulatorFlow
import com.bfn.flows.services.InvoiceOfferFinderService
import com.r3.corda.lib.accounts.contracts.states.AccountInfo
import net.corda.core.flows.*
import net.corda.core.transactions.SignedTransaction
import org.slf4j.LoggerFactory

/**
 * The anchor investor finds all his accepted offers and creates payments for each
 * Returns a list of supplier payments created
 * All offers should be consumed in the transaction
 */
@InitiatingFlow
@StartableByRPC
@SchedulableFlow
class MultiplePaymentsFlow(
        private val investor: AccountInfo,
        private val stellarAnchorUrl: String,
        private val delayMinutesUntilNextPaymentFlow: Long) : FlowLogic<List<SupplierPaymentState>>() {

    @Suspendable
    override fun call(): List<SupplierPaymentState> {
        Companion.logger.info("$pp \uD83E\uDD50 MultiplePaymentsFlow started ... \uD83E\uDD50 $pp")

        val offerFinderService = serviceHub.cordaService(InvoiceOfferFinderService::class.java)
        val acceptedOffers = offerFinderService.getInvestorOffersAccepted(
                investorId = investor.identifier.id.toString())
        val paymentList: MutableList<SupplierPaymentState> = mutableListOf()
        if (acceptedOffers.isEmpty()) {
            logger.warn("⚠️ ⚠️ ⚠️  No accepted offers found for anchor")
            return paymentList
        }
        logger.info("⚱️ ⚱️ ⚱️  ${acceptedOffers.size} accepted offers found for investor, " +
                "start payments using: $stellarAnchorUrl")
        for (offer in acceptedOffers) {
            try {
                val response = subFlow(SinglePaymentFlow(
                        offerId = offer.state.data.offerId,
                        stellarAnchorUrl = stellarAnchorUrl,
                        investorId = offer.state.data.investor.identifier.id.toString(),
                        delayMinutesUntilNextPaymentFlow = delayMinutesUntilNextPaymentFlow))
                paymentList.add(response)
            } catch (e:Exception) {
                logger.error("SinglePaymentFlow failed", e)
            }
        }
        logger.info("$pp Payment list created OK: ${paymentList.size} payment states created $pp")

        return paymentList
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
        private val logger = LoggerFactory.getLogger(MultiplePaymentsFlow::class.java)
    }

}
