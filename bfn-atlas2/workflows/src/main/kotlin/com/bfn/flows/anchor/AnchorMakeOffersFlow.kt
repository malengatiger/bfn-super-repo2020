package com.bfn.flows.anchor

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.states.AnchorState
import com.bfn.contractstates.states.InvoiceOfferState
import com.bfn.contractstates.states.InvoiceState
import com.bfn.flows.todaysDate
import com.r3.corda.lib.accounts.workflows.flows.RequestKeyForAccount
import com.template.InvoiceOfferContract
import net.corda.core.contracts.StateAndRef
import net.corda.core.flows.*
import net.corda.core.node.services.Vault
import net.corda.core.node.services.vault.PageSpecification
import net.corda.core.node.services.vault.QueryCriteria
import net.corda.core.transactions.TransactionBuilder
import org.slf4j.LoggerFactory
import java.security.PublicKey


@InitiatingFlow
@StartableByRPC
class AnchorMakeOffersFlow : FlowLogic<List<InvoiceOfferState>>() {

    @Suspendable
    override fun call(): List<InvoiceOfferState> {
        Companion.logger.info("$pp AnchorMakeOffersFlow started ... $pp")

        val existingAnchor = serviceHub.vaultService.queryBy(AnchorState::class.java).states.singleOrNull()
                ?: throw IllegalArgumentException("Anchor does not exist")

        val criteria = QueryCriteria.VaultQueryCriteria(Vault.StateStatus.UNCONSUMED)
        val states = serviceHub.vaultService.queryBy(
                contractStateType = InvoiceState::class.java,
                criteria = criteria,
                paging = PageSpecification(
                        pageNumber = 1, pageSize = 1000)
        ).states
        logger.info("$mm Invoices found on node: " +
                "\uD83D\uDD06  ${states.size} .. getting anchor Party ...")
        val anchorParty = serviceHub.myInfo.legalIdentities.first()
        logger.info("$mm Anchor Party: " +
                "\uD83D\uDD06  ${anchorParty.name} .. will attempt to make offers ...")
        var cnt = 0
        var cnt2 = 0
        val offerList:MutableList<InvoiceOfferState> = mutableListOf()
        val sessions: MutableList<FlowSession> = mutableListOf()
        val keys:MutableMap<String, PublicKey> = mutableMapOf()
        keys[anchorParty.toString()] = anchorParty.owningKey
        val command = InvoiceOfferContract.MakeOffer()
        val txBuilder = TransactionBuilder(serviceHub.networkMapCache.notaryIdentities.first())
        states.forEach() {
            val offer = processInvoice(it, existingAnchor.state.data)
            if (offer != null) {
                logger.info("$mm Offer created: discount: ${offer.discount} " +
                        "\uD83D\uDC9A offerAmount: ${offer.offerAmount} \uD83D\uDC9A")
                offerList.add(offer)
                keys[it.state.data.supplierInfo.host.toString()] = it.state.data.supplierInfo.host.owningKey
                txBuilder.addInputState(it)
                txBuilder.addOutputState(offer)
                cnt++
            } else {
                logger.info("$mm This invoice does NOT meet anchor requirements" +
                        " \uD83C\uDF4E\uD83C\uDF4E\uD83C\uDF4E totalAmount: ${it.state.data.totalAmount}")
                cnt2++
            }
        }
        logger.info("$mm Building transaction ...  \uD83D\uDC9A \uD83D\uDC9A \uD83D\uDC9A Offers created: $cnt  " +
                "\uD83C\uDF4E Invoices rejected: $cnt2 \uD83C\uDF4E")

        txBuilder.addCommand(command, keys.values.toList())
        logger.info("\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 Adding ${offerList.size} output states ...")
        offerList.forEach() {
            val supplierParty = it.supplier.host
            if (supplierParty.name.organisation != anchorParty.name.organisation) {
                val session = initiateFlow(supplierParty)
                sessions.add(session)
                cnt2++
            }
        }

        logger.info(".... \uD83D\uDD06 signInitialTransaction for this offer ..... ")
        val tx = serviceHub.signInitialTransaction(txBuilder)
        cnt2 = 0
        if (sessions.isNotEmpty()) {
            val signedTransaction = subFlow(CollectSignaturesFlow(
                    partiallySignedTx = tx, sessionsToCollectFrom = sessions))
            subFlow(FinalityFlow(signedTransaction, sessions))
            logger.info("\uD83D\uDC7D Offer Transaction finalized with Supplier on another node")
            cnt2++
        } else {
            subFlow(FinalityFlow(tx, listOf()))
            logger.info("\uD83D\uDC7D Offer Transaction finalized with Supplier on same node as anchor")
        }

        logger.info("$bbx Yebo! \uD83C\uDF4E Anchor has made  \uD83C\uDF4E ${offerList.size} invoice offers; " +
                "  \uD83C\uDF4E $cnt suppliers from this node;  \uD83C\uDF4E $cnt2 " +
                "suppliers from other nodes \uD83C\uDF4E ")
        return offerList
    }


    @Suspendable
    private fun processInvoice(state: StateAndRef<InvoiceState>, anchor: AnchorState): InvoiceOfferState? {
        logger.info("\uD83D\uDE0E Processing invoice ... \uD83D\uDE0E \uD83D\uDE0E validating against anchor profile")
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
                acceptanceDate = todaysDate(), accepted = false, externalId = invoice.externalId
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

    private val pp = "\uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95";
    private val mm = "\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35"
    private val bbx = "\uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D\uD83D\uDC7D \uD83D\uDC7D \uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E "

    companion object {
        private val logger = LoggerFactory.getLogger(AnchorMakeOffersFlow::class.java)
    }

}
