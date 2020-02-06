package com.bfn.flows.supplier

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.states.InvoiceOfferState
import com.bfn.flows.regulator.BroadcastTransactionFlow
import com.bfn.flows.services.InvoiceFinderService
import com.bfn.flows.services.InvoiceOfferFinderService
import com.bfn.flows.todaysDate
import com.r3.corda.lib.accounts.workflows.flows.RequestKeyForAccount
import com.r3.corda.lib.accounts.workflows.ourIdentity
import com.template.InvoiceOfferContract
import net.corda.core.flows.*
import net.corda.core.identity.Party
import net.corda.core.transactions.SignedTransaction
import net.corda.core.transactions.TransactionBuilder
import org.slf4j.LoggerFactory
import java.lang.IllegalArgumentException
import java.time.ZoneId
import java.time.format.DateTimeFormatter
import java.util.*

@InitiatingFlow
@StartableByRPC
class SupplierOfferAcceptanceFlow(private val invoiceId: String) : FlowLogic<SignedTransaction>() {
    @Suspendable
    @Throws(FlowException::class)
    override fun call(): SignedTransaction {

        val finderService = serviceHub.cordaService(InvoiceFinderService::class.java)
        val invoiceState = finderService.findInvoiceStateAndRef(invoiceId)
                ?: throw IllegalArgumentException("InvoiceState not found")
        val finderService2 = serviceHub.cordaService(InvoiceOfferFinderService::class.java)

        val invoiceOfferState = finderService2.findAnchorOffer(invoiceId)
                ?: throw IllegalArgumentException("Anchor InvoiceOfferState not found")

        val acceptedOffer = InvoiceOfferState(
                invoiceId = invoiceState.state.data.invoiceId,
                invoiceNumber = invoiceState.state.data.invoiceNumber,
                offerDate = invoiceOfferState.state.data.offerDate,
                offerAmount = invoiceOfferState.state.data.offerAmount,
                discount = invoiceOfferState.state.data.discount,
                externalId = invoiceOfferState.state.data.externalId,
                originalAmount = invoiceOfferState.state.data.originalAmount,
                customer = invoiceState.state.data.customerInfo,
                supplier = invoiceOfferState.state.data.supplier,
                investor = invoiceOfferState.state.data.investor,
                acceptanceDate = todaysDate(),
                accepted = true
        )
        val command = InvoiceOfferContract.AcceptOffer()
        val txBuilder = TransactionBuilder(serviceHub.networkMapCache.notaryIdentities[0])
        val anchorParty = RequestKeyForAccount(invoiceOfferState.state.data.investor).ourIdentity
        val supplierParty = RequestKeyForAccount(acceptedOffer.supplier).ourIdentity
        val customerParty = RequestKeyForAccount(acceptedOffer.customer).ourIdentity
        txBuilder.addInputState(invoiceState)
        txBuilder.addInputState(invoiceOfferState)
        txBuilder.addCommand(command,
                anchorParty.owningKey, supplierParty.owningKey,
                customerParty.owningKey)
        txBuilder.addOutputState(acceptedOffer)

        Companion.logger.info("\uD83D\uDD8D \uD83D\uDD8D \uD83D\uDD8D verify and sign Transaction ... ")
        txBuilder.verify(serviceHub)
        val signedTx = serviceHub.signInitialTransaction(txBuilder)
        val map: MutableMap<String, Party> = mutableMapOf()
        map[anchorParty.name.toString()] = anchorParty
        map[customerParty.name.toString()] = customerParty
        map[supplierParty.name.toString()] = supplierParty
        val parties = map.values.toList()
        return processAcceptance(parties,signedTx)
    }

    @Suspendable
    private fun processAcceptance(
            parties: List<Party>,
            signedTx: SignedTransaction) : SignedTransaction{
        val flowSessions: MutableList<FlowSession> = mutableListOf()

        parties.forEach() {
            if (it.toString() != serviceHub.ourIdentity.toString()) {
                flowSessions.add(initiateFlow(it))
            }
        }

        return if (flowSessions.isEmpty()) {
            Companion.logger.info(" \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 " +
                    "All participants are LOCAL ... \uD83D\uDD06")
            subFlow(BroadcastTransactionFlow(signedTx))
            signedTx
        } else {
            Companion.logger.info(" \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 " +
                    "Participants are LOCAL/REMOTE ... \uD83D\uDD06")
            collectSignaturesAndFinalize(signedTx, flowSessions)

        }
    }
    @Suspendable
    @Throws(FlowException::class)
    private fun collectSignaturesAndFinalize(
            signedTx: SignedTransaction, sessions: List<FlowSession>): SignedTransaction {


        val signedTransaction = subFlow(CollectSignaturesFlow(
                partiallySignedTx = signedTx, sessionsToCollectFrom = sessions))
        logger.info("\uD83C\uDFBD \uD83C\uDFBD \uD83C\uDFBD \uD83C\uDFBD  " +
                "Signatures collected OK!  \uD83D\uDE21 \uD83D\uDE21 " +
                ".... will call FinalityFlow ... \uD83C\uDF3A \uD83C\uDF3A ")
        val mSignedTransactionDone = subFlow(
                FinalityFlow(signedTransaction, sessions))

        logger.info("\uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D  " +
                " \uD83D\uDC4C \uD83D\uDC4C \uD83D\uDC4C  \uD83E\uDD66 \uD83E\uDD66  " +
                "\uD83E\uDD66 \uD83E\uDD66  \uD83E\uDD66 \uD83E\uDD66 MULTIPLE NODE(S): FinalityFlow has been executed ... " +
                "\uD83E\uDD66 \uD83E\uDD66")

        return mSignedTransactionDone
    }
    companion object {
        private val logger = LoggerFactory.getLogger(SupplierOfferAcceptanceFlow::class.java)

    }

}
