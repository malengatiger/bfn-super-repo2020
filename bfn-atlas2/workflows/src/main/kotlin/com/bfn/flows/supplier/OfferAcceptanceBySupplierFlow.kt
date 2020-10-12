package com.bfn.flows.supplier

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.states.AcceptedOfferState
import com.bfn.flows.regulator.ReportToRegulatorFlow
import com.bfn.flows.services.InvoiceFinderService
import com.bfn.flows.services.InvoiceOfferFinderService
import com.bfn.flows.todaysDate
import com.r3.corda.lib.accounts.workflows.ourIdentity
import com.template.AcceptedOfferContract
import net.corda.core.flows.*
import net.corda.core.identity.Party
import net.corda.core.transactions.SignedTransaction
import net.corda.core.transactions.TransactionBuilder
import org.slf4j.LoggerFactory


/**
 * Supplier accepts offer made by Investor and creates an AcceptedOfferState
 */
@InitiatingFlow
@StartableByRPC
class OfferAcceptanceBySupplierFlow(
        private val offerId: String) : FlowLogic<AcceptedOfferState>() {
    @Suspendable
    @Throws(FlowException::class, IllegalArgumentException::class)
    override fun call(): AcceptedOfferState {
        Companion.logger.info("$nn OfferAcceptanceBySupplierFlow started ..offerId: \uD83C\uDF4E $offerId \uD83D\uDE21 ")

        val offerFinderService = serviceHub.cordaService(InvoiceOfferFinderService::class.java)
        val invoiceOfferState = offerFinderService.findInvoiceOffer(offerId)
                ?: throw IllegalArgumentException("Offer not found")

        val allOffersByInvoice = offerFinderService.findOffersByInvoice(
                invoiceOfferState.state.data.invoiceId.toString())
        val invoiceFinderService = serviceHub.cordaService(InvoiceFinderService::class.java)
        val invoiceState = invoiceFinderService.findInvoiceStateAndRef(
                invoiceOfferState.state.data.invoiceId.toString())
        if (invoiceState == null) {
            val msg = "\uD83D\uDE21 Invoice consumed; Offer has already been accepted \uD83D\uDE21 "
            logger.warn(msg)
            throw IllegalArgumentException(msg)
        }

        val acceptedOffer = AcceptedOfferState(
                invoiceId = invoiceOfferState.state.data.invoiceId,
                invoiceNumber = invoiceOfferState.state.data.invoiceNumber,
                offerAmount = invoiceOfferState.state.data.offerAmount,
                discount = invoiceOfferState.state.data.discount,
                externalId = invoiceOfferState.state.data.externalId,
                originalAmount = invoiceOfferState.state.data.originalAmount,
                customer = invoiceState.state.data.customerInfo,
                supplier = invoiceOfferState.state.data.supplier,
                investor = invoiceOfferState.state.data.investor,
                offerId = invoiceOfferState.state.data.offerId,
                acceptanceDate = todaysDate(),
                dateRegistered = invoiceOfferState.state.data.dateRegistered
        )
        val command = AcceptedOfferContract.AcceptOffer()
        val txBuilder = TransactionBuilder(serviceHub.networkMapCache.notaryIdentities[0])

        val supplierParty = acceptedOffer.supplier
        val customerParty = acceptedOffer.customer
        val investorParty = acceptedOffer.investor

        logger.info("\uD83C\uDF1E Adding ${allOffersByInvoice.size} offers to transaction inputState  \uD83C\uDF1E")
        //consume all outstanding offers and replace with accepted offer
        allOffersByInvoice.forEach() {
            txBuilder.addInputState(it)
        }
        txBuilder.addInputState(invoiceState)
        txBuilder.addCommand(command, mutableListOf(
                supplierParty.host.owningKey,
                customerParty.host.owningKey,
                investorParty.host.owningKey))
        txBuilder.addOutputState(acceptedOffer)

        txBuilder.verify(serviceHub)
        val signedTx = serviceHub.signInitialTransaction(txBuilder)

        val signedTxFinal = processAcceptance(
                customer = customerParty.host,
                supplier = supplierParty.host,
                investor = investorParty.host,
                signedTx = signedTx,
                offer = acceptedOffer)

        reportToRegulator(signedTxFinal)
        logger.info("\uD83D\uDC9C \uD83D\uDC9C Offer accepted: \uD83C\uDF1D " +
                "investor: ${acceptedOffer.investor.name} " +
                "supplier: ${acceptedOffer.supplier.name} " +
                "customer: ${acceptedOffer.customer.name} " +
                "Offer Amt: ${acceptedOffer.offerAmount} " +
                "Original AmT: ${acceptedOffer.originalAmount} " +
                "discount: ${acceptedOffer.discount}% \uD83C\uDF1D ")

        return acceptedOffer
    }
//todo - 🍎 🍎 🍎 resolve the Party vs AnonymousParty thing with Accounts SDK - keys fail when trying RequestAccountKey thing ... 🍎
    @Suspendable
    private fun processAcceptance(
            offer: AcceptedOfferState,
            customer: Party,
            supplier: Party,
            investor: Party,
            signedTx: SignedTransaction): SignedTransaction {
        val flowSessions: MutableList<FlowSession> = mutableListOf()

        val mName = serviceHub.ourIdentity.name.organisation
        if (offer.customer.host.name.organisation!= mName) {
            flowSessions.add(initiateFlow(customer))
        }
        if (offer.supplier.host.name.organisation!= mName) {
            flowSessions.add(initiateFlow(supplier))
        }
        if (offer.investor.host.name.organisation!= mName) {
            flowSessions.add(initiateFlow(investor))
        }

        return if (flowSessions.isEmpty()) {
            Companion.logger.info("$nn All participants are LOCAL ... \uD83D\uDD06")
            subFlow(FinalityFlow(signedTx, listOf()))
            signedTx
        } else {
            Companion.logger.info("$nn Participants are LOCAL/REMOTE ... \uD83D\uDD06")
            collectSignaturesAndFinalize(signedTx, flowSessions)
        }
    }

    @Suspendable
    @Throws(FlowException::class)
    private fun collectSignaturesAndFinalize(
            signedTx: SignedTransaction, sessions: List<FlowSession>): SignedTransaction {

        val signedTransaction = subFlow(CollectSignaturesFlow(
                partiallySignedTx = signedTx, sessionsToCollectFrom = sessions))
        logger.info("$nn OfferAcceptanceBySupplierFlow: Signatures collected OK!  \uD83D\uDE21 \uD83D\uDE21 " +
                ".... will call FinalityFlow ... \uD83C\uDF3A \uD83C\uDF3A ")
        val mSignedTransactionDone = subFlow(
                FinalityFlow(signedTransaction, sessions))

        logger.info("$xx OfferAcceptanceBySupplierFlow: MULTIPLE NODE(S): FinalityFlow has been executed ... $xx ")

        return mSignedTransactionDone
    }

    @Suspendable
    @Throws(FlowException::class)
    private fun reportToRegulator(mSignedTransactionDone: SignedTransaction) {
        logger.info("\uD83D\uDCCC \uD83D\uDCCC \uD83D\uDCCC  Talking to the Regulator, for SupplierOfferAcceptance compliance, Senor! .............")
        try {
            subFlow(ReportToRegulatorFlow(mSignedTransactionDone))
            logger.info("\uD83D\uDCCC \uD83D\uDCCC \uD83D\uDCCC  DONE talking to the Regulator for SupplierOfferAcceptanceFlow, Phew!")
        } catch (e: Exception) {
            logger.error(" \uD83D\uDC7F  \uD83D\uDC7F  \uD83D\uDC7F Regulator fell down.  \uD83D\uDC7F IGNORED  \uD83D\uDC7F ", e)
            throw FlowException("Regulator fell down on SupplierOfferAcceptanceFlow!")
        }
    }

    companion object {
        private val logger = LoggerFactory.getLogger(OfferAcceptanceBySupplierFlow::class.java)
        private const val nn = "\uD83C\uDFBD \uD83C\uDFBD \uD83C\uDFBD \uD83C\uDFBD"
        private const val xx = "\uD83D\uDC4C \uD83D\uDC4C \uD83D\uDC4C  \uD83E\uDD66 \uD83E\uDD66 \uD83E\uDD66 \uD83E\uDD66 \uD83E\uDD66 \uD83E\uDD66"
        const val OFFER_NOT_FOUND = -1
        const val OFFER_ALREADY_ACCEPTED = -2
        const val OFFER_ACCEPTED = 0
    }

}
