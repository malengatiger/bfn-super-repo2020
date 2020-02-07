package com.bfn.flows.supplier

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.states.InvoiceOfferState
import com.bfn.contractstates.states.InvoiceState
import com.bfn.flows.regulator.BroadcastTransactionFlow
import com.bfn.flows.services.InvoiceFinderService
import com.bfn.flows.services.InvoiceOfferFinderService
import com.bfn.flows.todaysDate
import com.r3.corda.lib.accounts.workflows.ourIdentity
import com.template.InvoiceOfferContract
import net.corda.core.contracts.StateAndRef
import net.corda.core.flows.*
import net.corda.core.identity.Party
import net.corda.core.node.services.Vault
import net.corda.core.node.services.vault.PageSpecification
import net.corda.core.node.services.vault.QueryCriteria
import net.corda.core.transactions.SignedTransaction
import net.corda.core.transactions.TransactionBuilder
import org.slf4j.LoggerFactory
import java.lang.IllegalArgumentException
import java.security.PublicKey

@InitiatingFlow
@StartableByRPC
class SupplierOfferAcceptanceFlow(private val invoiceId: String) : FlowLogic<SignedTransaction>() {
    @Suspendable
    @Throws(FlowException::class, IllegalArgumentException::class)
    override fun call(): SignedTransaction {
        Companion.logger.info("$nn SupplierOfferAcceptanceFlow started ... \uD83C\uDF4E $invoiceId \uD83D\uDE21 ")

        //todo - 🍎 this query HAS to improve !!!
        val invoiceState = serviceHub.cordaService(InvoiceFinderService::class.java)
                .findInvoiceStateAndRef(invoiceId)
                ?: throw IllegalArgumentException("\uD83D\uDE21 Original unconsumed invoice not found \uD83D\uDE21 ")

        val offerFinderService = serviceHub.cordaService(InvoiceOfferFinderService::class.java)
        var invoiceOfferState = offerFinderService.findAnchorOffer(invoiceId)
        if (invoiceOfferState == null) {
            invoiceOfferState = offerFinderService.findRegularOffer(invoiceId)
            if (invoiceOfferState == null) {
                throw IllegalArgumentException("Invoice Offer not found on Node")
            }
        }

        val acceptedOffer = InvoiceOfferState(
                invoiceId = invoiceState!!.state.data.invoiceId,
                invoiceNumber = invoiceState!!.state.data.invoiceNumber,
                offerDate = invoiceOfferState.state.data.offerDate,
                offerAmount = invoiceOfferState.state.data.offerAmount,
                discount = invoiceOfferState.state.data.discount,
                externalId = invoiceOfferState.state.data.externalId,
                originalAmount = invoiceOfferState.state.data.originalAmount,
                customer = invoiceState!!.state.data.customerInfo,
                supplier = invoiceOfferState.state.data.supplier,
                investor = invoiceOfferState.state.data.investor,
                acceptanceDate = todaysDate(),
                accepted = true
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
        txBuilder.addInputState(invoiceOfferState)
        txBuilder.addInputState(invoiceState!!)
        txBuilder.addCommand(command, keys)
        txBuilder.addOutputState(acceptedOffer)

        Companion.logger.info("$nn verify and sign this fucking Transaction ...! \uD83C\uDF1D ")
        txBuilder.verify(serviceHub)
        val signedTx = serviceHub.signInitialTransaction(txBuilder)
        val parties = map.values.toList()
        return processAcceptance(parties,signedTx)
    }

    @Suspendable
    private fun processAcceptance(
            parties: List<Party>,
            signedTx: SignedTransaction) : SignedTransaction{
        val flowSessions: MutableList<FlowSession> = mutableListOf()
        logger.info("process offer and finalize acceptance: \uD83C\uDF1D ${parties.size} parties in this thing ...\uD83C\uDF1D ")
        parties.forEach() {
            if (it.toString() != serviceHub.ourIdentity.toString()) {
                flowSessions.add(initiateFlow(it))
            }
        }

        return if (flowSessions.isEmpty()) {
            Companion.logger.info("$nn All participants are LOCAL ... \uD83D\uDD06")
            subFlow(BroadcastTransactionFlow(signedTx))
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

        logger.info("$xx MULTIPLE NODE(S): FinalityFlow has been executed ... $xx " )

        return mSignedTransactionDone
    }
    companion object {
        private val logger = LoggerFactory.getLogger(SupplierOfferAcceptanceFlow::class.java)
        private const val nn = "\uD83C\uDFBD \uD83C\uDFBD \uD83C\uDFBD \uD83C\uDFBD"
        private const val xx = "\uD83D\uDC4C \uD83D\uDC4C \uD83D\uDC4C  \uD83E\uDD66 \uD83E\uDD66 \uD83E\uDD66 \uD83E\uDD66 \uD83E\uDD66 \uD83E\uDD66"
    }

}
