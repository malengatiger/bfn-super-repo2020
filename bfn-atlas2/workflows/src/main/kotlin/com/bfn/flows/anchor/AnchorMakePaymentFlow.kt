package com.bfn.flows.anchor

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.contracts.SupplierPaymentContract
import com.bfn.contractstates.states.AnchorState
import com.bfn.contractstates.states.InvoiceOfferState
import com.bfn.contractstates.states.InvoiceState
import com.bfn.contractstates.states.SupplierPaymentState
import com.bfn.flows.services.ProfileFinderService
import com.r3.corda.lib.accounts.workflows.flows.RequestKeyForAccount
import net.corda.core.contracts.StateAndRef
import net.corda.core.flows.*
import net.corda.core.transactions.TransactionBuilder
import org.slf4j.LoggerFactory
import java.time.LocalDate
import java.time.ZoneId
import java.util.*


@InitiatingFlow
@StartableByRPC
class AnchorMakePaymentFlow(private val acceptedOffer: InvoiceOfferState) : FlowLogic<SupplierPaymentState>() {

    @Suspendable
    override fun call(): SupplierPaymentState {
        Companion.logger.info("$pp AnchorMakePaymentFlow started ... $pp")

        val existingAnchor = serviceHub.vaultService.queryBy(AnchorState::class.java).states.singleOrNull()
                ?: throw IllegalArgumentException("Anchor does not exist")
        val anchorParty = RequestKeyForAccount(existingAnchor.state.data.account).ourIdentity
        val command = SupplierPaymentContract.Pay()
        val txBuilder = TransactionBuilder(serviceHub.networkMapCache.notaryIdentities.first())
        val supplierParty = RequestKeyForAccount(acceptedOffer.supplier).ourIdentity
        val customerParty = RequestKeyForAccount(acceptedOffer.customer).ourIdentity
        val supplierProfile = serviceHub.cordaService(ProfileFinderService::class.java)
                .findSupplierProfile(acceptedOffer.supplier.identifier.id.toString())

        val payment = SupplierPaymentState(
                acceptedOffer = acceptedOffer,
                supplierProfile = supplierProfile!!.state.data,
                date = Date(),
                datePaid = null

        )
        //todo - make EFT payment to supplier ... OR do this externally; kicked off in api?
        txBuilder.addCommand(command, anchorParty.owningKey, supplierParty.owningKey, customerParty.owningKey)
        txBuilder.addOutputState(payment)

        val tx = serviceHub.signInitialTransaction(txBuilder)
        val sessions: MutableList<FlowSession> = mutableListOf()
        if (supplierParty.name.organisation != anchorParty.name.organisation) {
            val session = initiateFlow(supplierParty)
            sessions.add(session)
        }
        if (customerParty.name.organisation != anchorParty.name.organisation) {
            val session = initiateFlow(customerParty)
            sessions.add(session)
        }
        if (sessions.isNotEmpty()) {
            val signedTransaction = subFlow(CollectSignaturesFlow(
                    partiallySignedTx = tx, sessionsToCollectFrom = sessions))
            subFlow(FinalityFlow(signedTransaction, sessions))
            logger.info("\uD83D\uDC7D Transaction finalized with Supplier/customer on ${sessions.size} remote nodes")
        }

        return payment
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
                ownerDate = Date(),
                externalId = invoice.externalId,
                accepted = false
        )
    }
    @Suspendable
    private fun getValidDiscount(invoice:InvoiceState, anchor: AnchorState): Double {
        var discount = 0.0
        anchor.tradeMatrices.forEach() {
            val now = LocalDate.now()
            val invoiceDate = LocalDate.parse(invoice.dateRegistered)
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
        private val logger = LoggerFactory.getLogger(AnchorMakePaymentFlow::class.java)
    }

}
