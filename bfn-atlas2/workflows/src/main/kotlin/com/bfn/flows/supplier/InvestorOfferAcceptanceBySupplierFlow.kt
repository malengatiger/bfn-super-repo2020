package com.bfn.flows.supplier

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.states.InvoiceOfferState
import com.bfn.flows.regulator.ReportToRegulatorFlow
import com.bfn.flows.services.InvoiceFinderService
import com.bfn.flows.services.InvoiceOfferFinderService
import com.bfn.flows.todaysDate
import com.r3.corda.lib.accounts.workflows.ourIdentity
import com.template.InvoiceOfferContract
import net.corda.core.flows.*
import net.corda.core.identity.Party
import net.corda.core.transactions.SignedTransaction
import net.corda.core.transactions.TransactionBuilder
import org.slf4j.LoggerFactory
import java.lang.IllegalArgumentException
import java.security.PublicKey

/**
 * Supplier accepts offer made by casual Investor
 */
@InitiatingFlow
@StartableByRPC
class InvestorOfferAcceptanceBySupplierFlow(
        private val offerId: String) : FlowLogic<Int>() {
    @Suspendable
    @Throws(FlowException::class, IllegalArgumentException::class)
    override fun call(): Int {
        Companion.logger.info("$nn InvestorOfferAcceptanceBySupplierFlow started ..offerId: \uD83C\uDF4E $offerId \uD83D\uDE21 ")

        val offerFinderService = serviceHub.cordaService(InvoiceOfferFinderService::class.java)
        val invoiceOfferState = offerFinderService.findInvestorOffer(offerId)
                ?: return -1 //offer not found

        if (invoiceOfferState.state.data.accepted) {
            val msg = "\uD83D\uDE21 Offer has already been accepted \uD83D\uDE21 "
            logger.warn(msg)
            return -2 //offer already accepted
        }

        val allOffersByInvoice = offerFinderService.findOffersByInvoice(invoiceOfferState.state.data.invoiceId.toString())
        val invoiceFinderService = serviceHub.cordaService(InvoiceFinderService::class.java)
        val invoiceState = invoiceFinderService.findInvoiceStateAndRef(invoiceOfferState.state.data.invoiceId.toString())
        if (invoiceState == null) {
            val msg = "\uD83D\uDE21 Invoice consumed; Offer has already been accepted \uD83D\uDE21 "
            logger.warn(msg)
            return -1
        }

        val acceptedOffer = InvoiceOfferState(
                invoiceId = invoiceOfferState.state.data.invoiceId,
                invoiceNumber = invoiceOfferState.state.data.invoiceNumber,
                offerDate = invoiceOfferState.state.data.offerDate,
                offerAmount = invoiceOfferState.state.data.offerAmount,
                discount = invoiceOfferState.state.data.discount,
                externalId = invoiceOfferState.state.data.externalId,
                originalAmount = invoiceOfferState.state.data.originalAmount,
                customer = invoiceState.state.data.customerInfo,
                supplier = invoiceOfferState.state.data.supplier,
                investor = invoiceOfferState.state.data.investor,
                offerId = invoiceOfferState.state.data.offerId,
                acceptanceDate = todaysDate(),
                accepted = true,
                isAnchor = invoiceOfferState.state.data.isAnchor
        )
        val command = InvoiceOfferContract.AcceptOffer()
        val txBuilder = TransactionBuilder(serviceHub.networkMapCache.notaryIdentities[0])
        val anchorParty = serviceHub.myInfo.legalIdentities.first()
        val supplierParty = acceptedOffer.supplier.host
        val customerParty = acceptedOffer.customer.host
        val map: MutableMap<String, Party> = mutableMapOf()
        map[anchorParty.name.toString()] = anchorParty
        map[customerParty.name.toString()] = customerParty
        map[supplierParty.name.toString()] = supplierParty
        val keys: MutableList<PublicKey> = mutableListOf()
        map.values.forEach() {
            keys.add(it.owningKey)
        }
        logger.info("\uD83C\uDF1E Adding ${allOffersByInvoice.size} offers to transaction inputState  \uD83C\uDF1E")
        allOffersByInvoice.forEach() {
            txBuilder.addInputState(it)
        }
        txBuilder.addInputState(invoiceState)
        txBuilder.addCommand(command, keys)
        txBuilder.addOutputState(acceptedOffer)

        Companion.logger.info("$nn verify and sign this fucking Transaction ...! \uD83C\uDF1D ")
        txBuilder.verify(serviceHub)
        val signedTx = serviceHub.signInitialTransaction(txBuilder)
        val parties = map.values.toList()
        val signedTxFinal = processAcceptance(parties, signedTx)
        reportToRegulator(signedTxFinal)
        logger.info("\uD83D\uDC9C \uD83D\uDC9C Offer accepted: \uD83C\uDF1D investor: ${acceptedOffer.investor.name} supplier: ${acceptedOffer.supplier.name} " +
                "customer: ${acceptedOffer.customer.name} Offer Amt: ${acceptedOffer.offerAmount} " +
                "Original AmT: ${acceptedOffer.originalAmount} discount: ${acceptedOffer.discount}% \uD83C\uDF1D ")
        return 0
    }

    @Suspendable
    private fun processAcceptance(
            parties: List<Party>,
            signedTx: SignedTransaction): SignedTransaction {
        val flowSessions: MutableList<FlowSession> = mutableListOf()
        logger.info("process offer and finalize acceptance: \uD83C\uDF1D ${parties.size} parties in this thing ...\uD83C\uDF1D ")
        parties.forEach() {
            if (it.toString() != serviceHub.ourIdentity.toString()) {
                flowSessions.add(initiateFlow(it))
            }
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
        logger.info("$nn Signatures collected OK!  \uD83D\uDE21 \uD83D\uDE21 " +
                ".... will call FinalityFlow ... \uD83C\uDF3A \uD83C\uDF3A ")
        val mSignedTransactionDone = subFlow(
                FinalityFlow(signedTransaction, sessions))

        logger.info("$xx MULTIPLE NODE(S): FinalityFlow has been executed ... $xx ")

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
        private val logger = LoggerFactory.getLogger(InvestorOfferAcceptanceBySupplierFlow::class.java)
        private const val nn = "\uD83C\uDFBD \uD83C\uDFBD \uD83C\uDFBD \uD83C\uDFBD"
        private const val xx = "\uD83D\uDC4C \uD83D\uDC4C \uD83D\uDC4C  \uD83E\uDD66 \uD83E\uDD66 \uD83E\uDD66 \uD83E\uDD66 \uD83E\uDD66 \uD83E\uDD66"
    }

}
