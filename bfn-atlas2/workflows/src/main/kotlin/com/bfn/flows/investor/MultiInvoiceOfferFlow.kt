package com.bfn.flows.investor

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.states.InvestorProfileState
import com.bfn.contractstates.states.InvoiceOfferState
import com.bfn.contractstates.states.InvoiceState
import com.bfn.flows.services.InvoiceFinderService
import com.bfn.flows.services.ProfileFinderService
import com.bfn.flows.todaysDate
import net.corda.core.flows.*
import org.slf4j.LoggerFactory
import java.math.BigDecimal
import java.util.*

/**
 * Investor makes multiple Offers for buying lots of Invoices 🌸
 */
@SchedulableFlow
@InitiatingFlow
@StartableByRPC
class MultiInvoiceOfferFlow(
        private val investorId: String) : FlowLogic<List<InvoiceOfferState>>() {

    @Suspendable
    @Throws(FlowException::class)
    override fun call(): List<InvoiceOfferState> {
        Companion.logger.info("\uD83E\uDD1F \uD83E\uDD1F  \uD83E\uDD1F \uD83E\uDD1F  " +
                "... MultiInvoiceOfferFlow call started ...")
        val invoices = serviceHub.cordaService(InvoiceFinderService::class.java).getAllInvoiceStateAndRefs()
        val investorProfile = serviceHub.cordaService(ProfileFinderService::class.java).findInvestorProfile(investorId)
                ?: throw Exception("InvestorProfile not found")

        val mList: MutableList<InvoiceOfferState> = mutableListOf()
        for (invoice in invoices) {
            try {
                val offer = buildOffer(investorProfile = investorProfile.state.data, invoice = invoice.state.data)
                subFlow(InvoiceOfferFlow(invoiceOfferState = offer))
                mList.add(offer)
            } catch (e:Exception) {
                logger.info("\uD83D\uDC38 InvoiceOffer not made for invoice amount:" +
                        " ${invoice.state.data.totalAmount}, \uD83D\uDC7D invalid re investor profile")
            }
        }

        return mList
    }


    private fun buildOffer(invoice: InvoiceState, investorProfile: InvestorProfileState): InvoiceOfferState {

        val pair = getOfferAmountAndDiscount(invoice,investorProfile)
        return InvoiceOfferState(
                invoiceId = invoice.invoiceId, discount = pair.second,
                originalAmount = invoice.totalAmount, offerDate = todaysDate(),
                offerAmount = pair.first, offerId = UUID.randomUUID().toString(),
                supplier = invoice.supplierInfo, customer = invoice.customerInfo,
                externalId = invoice.externalId,acceptanceDate = "tbd",
                accepted = false, invoiceNumber = invoice.invoiceNumber,
                investor = investorProfile.account,
                dateRegistered = todaysDate()
        )
    }

    /**
     * Use the investor's profile to calculate offer amount
     */
    private fun getOfferAmountAndDiscount(invoice:InvoiceState, investorProfile: InvestorProfileState): Pair<String,String> {

        if (investorProfile.tradeMatrixItems.isEmpty()) {
            val amt = BigDecimal(invoice.totalAmount)
            val startAmt = BigDecimal(investorProfile.minimumInvoiceAmount)
            val endAmt = BigDecimal(investorProfile.maximumInvoiceAmount)
            if (amt in startAmt .. endAmt) {
                val disc = BigDecimal("100") - BigDecimal(investorProfile.defaultDiscount)
                val offerAmount = amt.multiply(disc.divide(BigDecimal("100")))
                return Pair(first = offerAmount.toString(), second = investorProfile.defaultDiscount)
            }
        }
        for (item in investorProfile.tradeMatrixItems) {
            val amt = BigDecimal(invoice.totalAmount)
            val startAmt = BigDecimal(item.startInvoiceAmount)
            val endAmt = BigDecimal(item.endInvoiceAmount)
            if (amt in startAmt .. endAmt) {
                val disc = BigDecimal("100") - BigDecimal(item.offerDiscount)
                val offerAmount = amt.multiply(disc.divide(BigDecimal("100")))
                return Pair(first = offerAmount.toString(), second = item.offerDiscount)
            }
        }
        throw Exception("Invoice does not meet Investor profile requirements")
    }

    companion object {
        private val logger = LoggerFactory.getLogger(MultiInvoiceOfferFlow::class.java)
    }

    init {
        Companion.logger.info(("\uD83C\uDF3A \uD83C\uDF3A MultiInvoiceOfferFlow constructor with investor: \uD83C\uDF4F "
                + investorId))
    }
}
