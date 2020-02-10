package com.bfn.flows.anchor

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.states.AnchorState
import com.bfn.contractstates.states.InvoiceOfferState
import com.bfn.contractstates.states.InvoiceState
import com.bfn.flows.services.InvoiceFinderService
import com.bfn.flows.todaysDate
import com.template.InvoiceOfferContract
import net.corda.core.contracts.StateAndRef
import net.corda.core.flows.*
import net.corda.core.identity.Party
import net.corda.core.transactions.TransactionBuilder
import org.slf4j.LoggerFactory
import java.security.PublicKey
import java.util.*

/**
 * AnchorInvestor finds unconsumed invoices and makes offers to buy them
 */

@InitiatingFlow
@StartableByRPC
class AnchorMakeOffersFlow : FlowLogic<List<InvoiceOfferState>>() {

    @Suspendable
    override fun call(): List<InvoiceOfferState> {
        Companion.logger.info("$pp AnchorMakeOffersFlow started ... $pp")

        val existingAnchor = serviceHub.vaultService.queryBy(AnchorState::class.java).states.singleOrNull()
                ?: throw IllegalArgumentException("Anchor does not exist")

        val unconsumedInvoices = serviceHub.cordaService(InvoiceFinderService::class.java)
                .getAllInvoiceStateAnRefs()
        logger.info("$mm Unconsumed Invoices found on node: " +
                "\uD83D\uDD06  ${unconsumedInvoices.size} ")

        val anchorParty = existingAnchor.state.data.account.host
        val offerList:MutableList<InvoiceOfferState> = mutableListOf()
        if (unconsumedInvoices.isEmpty()) {
            return offerList
        }
        val sessions: MutableList<FlowSession> = mutableListOf()
        val keys:MutableMap<String, PublicKey> = mutableMapOf()
        keys[anchorParty.toString()] = anchorParty.owningKey

        val txBuilder = buildTransaction(unconsumedInvoices, existingAnchor, offerList, keys, anchorParty, sessions)
        finalize(txBuilder, sessions, offerList)
        return offerList
    }

    private fun buildTransaction(states: List<StateAndRef<InvoiceState>>,
                                 existingAnchor: StateAndRef<AnchorState>,
                                 offerList: MutableList<InvoiceOfferState>,
                                 keys: MutableMap<String, PublicKey>,
                                 anchorParty: Party, sessions: MutableList<FlowSession>): TransactionBuilder {
        var invoicesThatFailed = 0
        val command = InvoiceOfferContract.MakeOffer()
        val txBuilder = TransactionBuilder(serviceHub.networkMapCache.notaryIdentities.first())
        states.forEach() {
            val offer = attemptToCreateOffer(it, existingAnchor.state.data)
            if (offer != null) {
                offerList.add(offer)
                keys[it.state.data.supplierInfo.host.toString()] = it.state.data.supplierInfo.host.owningKey
                txBuilder.addOutputState(offer)
            } else {
                logger.info("$peppers This invoice does NOT meet anchor requirements" +
                        " \uD83C\uDF4E\uD83C\uDF4E\uD83C\uDF4E totalAmount: ${it.state.data.totalAmount} invoiceId: ${it.state.data.invoiceId} $peppers")
                invoicesThatFailed++
            }
        }
        logger.info("$mm Building transaction ...  \uD83D\uDC9A \uD83D\uDC9A \uD83D\uDC9A Offers created: ${offerList.size}  " +
                "\uD83C\uDF4E Invoices rejected: $invoicesThatFailed \uD83C\uDF4E")

        txBuilder.addCommand(command, keys.values.toList())
        logger.info("\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 Adding ${offerList.size} offers as output states ...")
        offerList.forEach() {
            val supplierParty = it.supplier.host
            if (supplierParty.name.organisation != anchorParty.name.organisation) {
                val session = initiateFlow(supplierParty)
                sessions.add(session)
            }
        }
        return txBuilder
    }

    @Suspendable
    private fun finalize(txBuilder: TransactionBuilder, sessions: MutableList<FlowSession>,
                         offerList: MutableList<InvoiceOfferState>) {
        val tx = serviceHub.signInitialTransaction(txBuilder)
        if (sessions.isNotEmpty()) {
            val signedTransaction = subFlow(CollectSignaturesFlow(
                    partiallySignedTx = tx, sessionsToCollectFrom = sessions))
            subFlow(FinalityFlow(signedTransaction, sessions))
            logger.info("\uD83D\uDC7D Offer Transaction finalized with Supplier on another node")
        } else {
            subFlow(FinalityFlow(tx, listOf()))
            logger.info("\uD83D\uDC7D Offer Transaction finalized with Supplier on same node as anchor")
        }

        logger.info("$bbx Yebo! \uD83C\uDF4E Anchor has made  \uD83C\uDF4E ${offerList.size} invoice offers: " +
                "  \uD83C\uDF4E ${offerList.size} suppliers from this node;  \uD83C\uDF4E ${sessions.size} " +
                "suppliers from other nodes \uD83C\uDF4E ")
    }


    /**
     * Check invoice against AnchorInvestor criteria for investing
     * Create InvoiceOffer where invoice meets ALL requirements
     */
    @Suspendable
    private fun attemptToCreateOffer(state: StateAndRef<InvoiceState>, anchor: AnchorState): InvoiceOfferState? {
        logger.info("\uD83D\uDE0E attemptToCreateOffer invoice ... \uD83D\uDE0E \uD83D\uDE0E validating against anchor profile")
        val invoice = state.state.data
        if (invoice.totalAmount < anchor.minimumInvoiceAmount) {
            return null
        }
        if (invoice.totalAmount > anchor.maximumInvoiceAmount) {
            return null
        }
        val disc = if (anchor.tradeMatrices.isEmpty()) {
            anchor.defaultOfferDiscount
        } else {
            getValidDiscount(invoice, anchor)
        }
        if (disc == 0.0) {
            return null
        }
        val mDisc = disc / 100
        val offerDouble = invoice.totalAmount * (1.0 - mDisc)

        logger.info("\uD83D\uDE0E Processing invoice ... \uD83D\uDD06 offer to be created with offerAmount: $offerDouble")
        return InvoiceOfferState(
                invoiceId = invoice.invoiceId,
                invoiceNumber = invoice.invoiceNumber,
                discount = disc,
                customer = invoice.customerInfo,
                supplier = invoice.supplierInfo,
                offerAmount = offerDouble,
                investor = anchor.account,
                offerDate = todaysDate(),
                originalAmount = invoice.totalAmount,
                acceptanceDate = todaysDate(), accepted = false,
                offerId = UUID.randomUUID().toString(),
                externalId = invoice.externalId
        )
    }
    @Suspendable
    private fun getValidDiscount(invoice:InvoiceState, anchor: AnchorState): Double {
        var discount = 0.0
        logger.info("\uD83E\uDD8A \uD83E\uDD8A Validating against trade matrices ... ${anchor.tradeMatrices.size}")
        anchor.tradeMatrices.forEach() {
            logger.info("\uD83D\uDD35  startInvoiceAmount : ${it.startInvoiceAmount} " +
                    "endInvoiceAmount: ${it.endInvoiceAmount} " +
                    "\uD83D\uDD35 \uD83D\uDD35  compare against invoice totalAmount: \uD83D\uDD35 ${invoice.totalAmount}")
            val range = (it.startInvoiceAmount..it.endInvoiceAmount)
            val isInRange = range.contains(invoice.totalAmount)
            if (isInRange) {
                discount = it.offerDiscount
                return discount
            }
        }
        logger.info("\uD83E\uDD8A \uD83E\uDD8A Discount from trade matrix: \uD83E\uDD8A $discount \uD83E\uDD8A")
        return discount;
    }

    private val pp = "\uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95"
    private val peppers = "\uD83C\uDF36 \uD83C\uDF36 \uD83C\uDF36 \uD83C\uDF36 "
    private val mm = "\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35"
    private val bbx = "\uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D\uD83D\uDC7D \uD83D\uDC7D \uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E "

    companion object {
        private val logger = LoggerFactory.getLogger(AnchorMakeOffersFlow::class.java)
    }

}
