package com.bfn.flows.scheduled

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.states.OfferAndTokenState
import com.bfn.flows.services.InvoiceFinderService
import com.bfn.flows.services.InvoiceOfferFinderService
import com.bfn.flows.supplier.BestOfferForInvoiceFlow
import net.corda.core.flows.FlowLogic
import net.corda.core.flows.InitiatingFlow
import net.corda.core.flows.SchedulableFlow
import net.corda.core.flows.StartableByRPC

@InitiatingFlow
@StartableByRPC
@SchedulableFlow
class RunAuctionFlow() : FlowLogic<List<OfferAndTokenState>?>() {

    @Suspendable
    override fun call(): List<OfferAndTokenState> {
        logger.info("\uD83E\uDD63 \uD83E\uDD63 \uD83E\uDD63 \uD83E\uDD63 " +
                "RunAuctionFlow: \uD83C\uDF45 Select BEST OFFERS for each invoice  \uD83E\uDD63 ")
        val offerService = serviceHub.cordaService(InvoiceOfferFinderService::class.java)
        val invoiceService = serviceHub.cordaService(InvoiceFinderService::class.java)
        val offers = offerService.getOffersOnNode()
        logger.info("\uD83E\uDD63 \uD83E\uDD63 Total offers on Node: ${offers.size}")
        val invoices = invoiceService.findInvoicesForNode()
        val tokens: MutableList<OfferAndTokenState> = mutableListOf()
        invoices.forEach() {

            val offerAndTokenState = subFlow(BestOfferForInvoiceFlow(
                    supplierAccountId = it.supplierInfo.identifier.id.toString(),
                    invoiceId = it.invoiceId.toString()))
            if (offerAndTokenState != null) {
                tokens.add(offerAndTokenState)
                logger.info("\uD83E\uDD63 \uD83E\uDD63 \uD83E\uDD63 \uD83E\uDD63 " +
                        " Best Offer: ${offerAndTokenState.invoiceOffer.investor.name} offers: ${offerAndTokenState.invoiceOffer.offerAmount} " +
                        " at a discount of: ${offerAndTokenState.invoiceOffer.discount}% \uD83E\uDD63 \uD83E\uDD63 " +
                        "- token: ${offerAndTokenState.token}")
            }

        }

        logger.info("\uD83E\uDD63 \uD83E\uDD63 \uD83E\uDD63 \uD83E\uDD63 RunAuctionFlow: " +
                "invoices: ${invoices.size} \uD83D\uDECE\uD83D\uDECE " +
                "Tokens created: ${tokens.size} \uD83D\uDECE\uD83D\uDECE")
        return tokens
    }

}
