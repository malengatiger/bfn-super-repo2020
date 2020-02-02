package com.bfn.flows.anchor

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.states.AnchorState
import com.bfn.contractstates.states.InvoiceOfferState
import com.bfn.contractstates.states.InvoiceState
import com.r3.corda.lib.accounts.workflows.flows.RequestKeyForAccount
import com.template.InvoiceOfferContract
import net.corda.core.contracts.StateAndRef
import net.corda.core.flows.*
import net.corda.core.node.services.Vault
import net.corda.core.node.services.queryBy
import net.corda.core.node.services.vault.PageSpecification
import net.corda.core.node.services.vault.QueryCriteria
import net.corda.core.transactions.TransactionBuilder
import org.slf4j.LoggerFactory
import java.time.LocalDate
import java.time.ZoneId
import java.util.*


@InitiatingFlow
@StartableByRPC
class AnchorMakeOffersFlow() : FlowLogic<List<InvoiceOfferState>>() {

    @Suspendable
    override fun call(): List<InvoiceOfferState> {
        Companion.logger.info("$pp AnchorMakeOffersFlow started ... $pp")

        val existingAnchor = serviceHub.vaultService.queryBy(AnchorState::class.java).states.singleOrNull()
                ?: throw IllegalArgumentException("Anchor does not exist")

        val criteria = QueryCriteria.VaultQueryCriteria(Vault.StateStatus.UNCONSUMED)
        val states = serviceHub.vaultService.queryBy<InvoiceState>(
                criteria = criteria,
                paging = PageSpecification(
                        pageNumber = 1, pageSize = 1000)
        ).states
        val list: MutableList<InvoiceOfferState> = mutableListOf()

        states.forEach() {
            val offer = processInvoice(it, existingAnchor.state.data)
            if (offer != null) {
                list.add(offer)
            }
        }
        val anchorParty = RequestKeyForAccount(existingAnchor.state.data.account).ourIdentity
        list.forEach() {
            val command = InvoiceOfferContract.MakeOffer()
            val txBuilder = TransactionBuilder(serviceHub.networkMapCache.notaryIdentities.first())
            val supplierParty = RequestKeyForAccount(it.supplier).ourIdentity
            txBuilder.addCommand(command, anchorParty.owningKey, supplierParty.owningKey)
            txBuilder.addOutputState(it)
            val tx = serviceHub.signInitialTransaction(txBuilder)
            if (supplierParty.name.organisation != anchorParty.name.organisation) {
                val session = initiateFlow(supplierParty)
                val signedTransaction = subFlow(CollectSignaturesFlow(
                        partiallySignedTx = tx, sessionsToCollectFrom = listOf(session)))
                subFlow(FinalityFlow(signedTransaction, listOf(session)))
                logger.info("\uD83D\uDC7D Transaction finalized with Supplier on another node")
            } else {
                logger.info("\uD83D\uDC7D Transaction finalized with Supplier on same node as anchor")
            }
        }
        logger.info("Anchor has made ${list.size} invoice offers")
        return list
    }

    @Suspendable
    private fun processInvoice(state: StateAndRef<InvoiceState>, anchor: AnchorState): InvoiceOfferState? {
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
        return InvoiceOfferState(
                invoiceId = invoice.invoiceId,
                invoiceNumber = invoice.invoiceNumber,
                discount = disc,
                customer = invoice.customerInfo,
                supplier = invoice.supplierInfo,
                offerAmount = offerDouble,
                investor = anchor.account,
                offerDate = Date(),
                originalAmount = invoice.totalAmount,
                ownerDate = Date(), accepted = false, externalId = invoice.externalId
        )
    }
    @Suspendable
    private fun getValidDiscount(invoice:InvoiceState, anchor: AnchorState): Double {
        var discount = 0.0
        anchor.tradeMatrices.forEach() {
            val now = LocalDate.now()
            val invoiceDate = convertToLocalDateViaInstant(invoice.dateRegistered!!)
            val someDate = now.minusDays(it.maximumInvoiceAgeInDays.toLong())
            var isWithinAge = false
            if (invoiceDate!!.toEpochDay() > someDate.toEpochDay()) {
                isWithinAge = true
            }
            if (it.startInvoiceAmount >= invoice.totalAmount
                    && it.endInvoiceAmount <= invoice.totalAmount
                    && isWithinAge) {
                discount = it.offerDiscount
                return discount
            }
        }

        return discount;
    }
    @Suspendable
    private fun convertToLocalDateViaInstant(dateToConvert: Date): LocalDate? {
        return dateToConvert.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate()
    }
    private val pp = "\uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95";

    companion object {
        private val logger = LoggerFactory.getLogger(AnchorMakeOffersFlow::class.java)
    }

}
