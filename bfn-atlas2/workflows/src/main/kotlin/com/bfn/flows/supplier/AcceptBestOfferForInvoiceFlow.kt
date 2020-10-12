package com.bfn.flows.supplier

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.states.AcceptedOfferState
import com.bfn.contractstates.states.InvoiceOfferState
import com.bfn.flows.Em
import com.bfn.flows.services.InvoiceOfferFinderService
import com.bfn.flows.services.ProfileFinderService
import com.r3.corda.lib.accounts.workflows.services.KeyManagementBackedAccountService
import net.corda.core.contracts.StateAndRef
import net.corda.core.flows.*
import org.slf4j.LoggerFactory
import java.math.BigDecimal
import java.util.*

/**
 * Supplier finds the best offer for their invoice and optionally accepts it when found
 */
@InitiatingFlow
@StartableByRPC
@SchedulableFlow
class AcceptBestOfferForInvoiceFlow(private val supplierAccountId: String,
                                    private val invoiceId: String) : FlowLogic<AcceptedOfferState?>() {

    @Suspendable
    @Throws(FlowException::class)
    override fun call(): AcceptedOfferState? {
        logger.info("\uD83E\uDD1F \uD83E\uDD1F \uD83E\uDD1F \uD83E\uDD1F \uD83E\uDD1F \uD83E\uDD1F \uD83E\uDD1F \uD83E\uDD1F " +
                "... \uD83D\uDE3C \uD83D\uDE3C AcceptBestOfferForInvoiceFlow call started ... \uD83D\uDE3C \uD83D\uDE3C ")
        val accountService = serviceHub.cordaService(KeyManagementBackedAccountService::class.java)
        val supplierAccount = accountService.accountInfo(UUID.fromString(supplierAccountId))!!.state.data
        logger.info(" \uD83C\uDF00 \uD83C\uDF00 ${supplierAccount.name} " +
                "selecting best offer for invoice: \uD83D\uDE3C $invoiceId... supplier: ${supplierAccount.name}")

        val pair = filterOffersByProfile()
        if (pair == null) {
            val msg = "\uD83D\uDC80 \uD83D\uDC80 \uD83D\uDC80 Unable to find acceptable offer. \uD83D\uDC80 "
            logger.info(msg)
            throw IllegalArgumentException(msg)
        }
        val offers = pair.first
        if (offers.isEmpty()) {
            val msg = "\uD83D\uDC80 \uD83D\uDC80 \uD83D\uDC80 No invoiceOffers found on node \uD83D\uDC80 "
            logger.info(msg)
            throw IllegalArgumentException(msg)
        }
        val selected = pair.second
        logger.info("\uD83C\uDF6F \uD83C\uDF6F \uD83C\uDF6F \uD83C\uDF6F " +
                "Yebo! Best Offer selected: \uD83C\uDF6F \uD83C\uDF6F ${selected.state.data.offerAmount} " +
                " supplier : ${selected.state.data.supplier.name}  ${selected.state.data.supplier.host} \uD83D\uDC4C " +
                " investor: ${selected.state.data.investor.name} ${selected.state.data.investor.host} \uD83E\uDDE9 ")
        // 🔵 🔵 accept the best offer found
        val acceptedOfferState = subFlow(OfferAcceptanceBySupplierFlow(selected.state.data.offerId))
        logger.info(" \uD83D\uDD35 \uD83D\uDD35 AcceptBestOfferForInvoiceFlow: " +
                "\uD83C\uDF4E Best InvoiceOffer has been selected and AcceptedOfferState created")
        return acceptedOfferState


    }

    @Suspendable
    private fun filterOffersByProfile(): Pair<MutableList<StateAndRef<InvoiceOfferState>>, StateAndRef<InvoiceOfferState>>? {

        val offerFinder = serviceHub.cordaService(InvoiceOfferFinderService::class.java)
        val offers = offerFinder.findOffersByInvoice(invoiceId = invoiceId)

        logger.info("${Em.FERNS} Offers found for the invoice:  \uD83C\uDFC0 " +
                "${offers.size} offers  \uD83C\uDFC0 ")
        if (offers.isEmpty()) {
            return null
        }
        val profile = serviceHub.cordaService(ProfileFinderService::class.java)
                .findSupplierProfile(supplierAccountId)

        var numberInvalid = 0
        if (profile == null) {
            logger.info("\uD83C\uDFB1 \uD83C\uDFB1 \uD83C\uDFB1  Profile is NULL. returning last of ${offers.size}")
            throw IllegalArgumentException("Supplier Profile not found")
        } else {
            logger.info("\uD83C\uDF21 \uD83C\uDF21 \uD83C\uDF21 \uD83C\uDF21 " +
                    "Filtering ${offers.size} offers based on profile: \uD83C\uDFC0 " +
                    "maxDiscount: ${profile.state.data.maximumDiscount}")
            val filteredList: MutableList<StateAndRef<InvoiceOfferState>> = mutableListOf()
            offers.forEach() {

                val disc = BigDecimal(it.state.data.discount)
                val max = BigDecimal(profile.state.data.maximumDiscount)
                if (disc <= max) {
                    filteredList.add(it)
                } else {
                    numberInvalid++
                }
            }
            return if (filteredList.isNotEmpty()) {
                val selected = chooseOne(filteredList)
                logger.info("\uD83D\uDD25\uD83D\uDD25 \uD83D\uDD25 ${filteredList.size} Offers made the cut; these did not make the cut:" +
                        " \uD83D\uDD25 $numberInvalid \uD83D\uDD25")
                log(filteredList, selected)
                Pair(filteredList, selected)
            } else {
                logger.info("\uD83D\uDD25\uD83D\uDD25 \uD83D\uDD25 No Offers made the cut:")
                null
            }
        }


    }

    @Suspendable
    private fun chooseOne(filteredList: List<StateAndRef<InvoiceOfferState>>): StateAndRef<InvoiceOfferState> {

        val sorted = filteredList.sortedBy { it.state.data.discount }
        val winningDiscount = sorted.first()
        val similarDiscount = sorted.toList().takeWhile { it.state.data.discount == winningDiscount.state.data.discount }
        if (similarDiscount.size == 1) {
            return similarDiscount[0]
        }
        //todo - 🍀 🍀 🍀 if there are multiple investors with same offer, select by some parameter; currently random offer is selected 🍀 🍀 🍀
        val index = Random(Date().time).nextInt(similarDiscount.size - 1)
        return similarDiscount[index]
    }

    @Suspendable
    private fun log(sorted: List<StateAndRef<InvoiceOfferState>>, selected: StateAndRef<InvoiceOfferState>) {
        logger.info("\uD83E\uDDE9 InvoiceOffers found for invoice:  \uD83C\uDF00 ${sorted.size}  selected: " +
                "\uD83E\uDDE9 ${selected.state.data.offerAmount}")
        logger.info("\uD83E\uDDE9 Best InvoiceOffer found: investor: ${selected.state.data.investor.name}  " +
                "\uD83E\uDDE9 ${selected.state.data.offerAmount}")
    }

    companion object {
        private val logger = LoggerFactory.getLogger(AcceptBestOfferForInvoiceFlow::class.java)
    }

}
