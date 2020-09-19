package com.bfn.flows.invoices

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.states.InvoiceOfferState
import com.bfn.flows.regulator.ReportToRegulatorFlow
import com.bfn.flows.services.InvoiceOfferFinderService
import com.template.InvoiceOfferContract
import net.corda.core.flows.*
import net.corda.core.identity.Party
import net.corda.core.transactions.SignedTransaction
import net.corda.core.transactions.TransactionBuilder
import net.corda.core.utilities.ProgressTracker
import org.slf4j.LoggerFactory
import java.security.PublicKey


@InitiatingFlow
@StartableByRPC
class InvoiceOfferFlow(private val invoiceOfferState: InvoiceOfferState) : FlowLogic<SignedTransaction>() {
    private val sendingTransaction = ProgressTracker.Step("Sending transaction to counterParty")
    private val generatingTransaction = ProgressTracker.Step("Generating transaction")
    private val verifyingTransaction = ProgressTracker.Step("Verifying contract constraints.")
    private val signingTransaction = ProgressTracker.Step("Signing transaction with our private key.")
    private val gatheringTransactions: ProgressTracker.Step = object : ProgressTracker.Step("Gathering the counterParty's signature.") {
        override fun childProgressTracker(): ProgressTracker? {
            Companion.logger.info("\uD83C\uDF3A \uD83C\uDF3A ProgressTracker childProgressTracker ...")
            return CollectSignaturesFlow.tracker()
        }
    }
    private val finalizingTransaction: ProgressTracker.Step = object : ProgressTracker.Step("Obtaining notary signature and recording transaction.") {
        override fun childProgressTracker(): ProgressTracker? {
            return FinalityFlow.tracker()
        }
    }

    override val progressTracker = ProgressTracker(
            generatingTransaction,
            verifyingTransaction,
            signingTransaction,
            gatheringTransactions,
            finalizingTransaction,
            sendingTransaction
    )

    @Suspendable
    @Throws(FlowException::class)
    override fun call(): SignedTransaction {
        Companion.logger.info("\uD83E\uDD1F \uD83E\uDD1F  \uD83E\uDD1F \uD83E\uDD1F  " +
                "... InvoiceOfferFlow call started ...")
        val notary = serviceHub.networkMapCache.notaryIdentities[0]
        checkDuplicate()

        if (invoiceOfferState.supplier.name == invoiceOfferState.investor.name) {
            throw IllegalArgumentException("Investor and Supplier cannot be the same entity")
        }

        progressTracker.currentStep = generatingTransaction
        val txBuilder = TransactionBuilder(notary)
        txBuilder.addOutputState(invoiceOfferState, InvoiceOfferContract.ID)

        progressTracker.currentStep = verifyingTransaction
        return processFlow(txBuilder)
    }

    @Suspendable
    private fun processFlow(txBuilder: TransactionBuilder): SignedTransaction {
        val map: MutableMap<String, Party> = mutableMapOf()
        val investorOrg: String = invoiceOfferState.investor.host.name.organisation
        val supplierOrg: String = invoiceOfferState.supplier.host.name.organisation

        map[investorOrg] = invoiceOfferState.investor.host
        map[supplierOrg] = invoiceOfferState.supplier.host
        val keys: MutableList<PublicKey> = mutableListOf()
        map.values.forEach() {
            keys.add(it.owningKey)
        }
        val command = InvoiceOfferContract.MakeOffer()
        txBuilder.addCommand(command, keys)

        progressTracker.currentStep = verifyingTransaction
        txBuilder.verify(serviceHub)
        progressTracker.currentStep = signingTransaction
        val signedTx = serviceHub.signInitialTransaction(txBuilder)

        progressTracker.currentStep = sendingTransaction
        val mSessions: MutableList<FlowSession> = mutableListOf()
        map.values.forEach() {
            if (it.toString() != serviceHub.myInfo.legalIdentities.first().toString()) {
                mSessions.add(initiateFlow(it))
            }
        }
        if (mSessions.isEmpty()) {
            Companion.logger.info(" \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 " +
                    "All participants are LOCAL ... \uD83D\uDD06")
            val mSignedTransactionDone = subFlow(
                    FinalityFlow(signedTx, listOf()))
            Companion.logger.info("\uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D  SINGLE NODE ==> " +
                    " \uD83E\uDD66 \uD83E\uDD66  \uD83E\uDD66 \uD83E\uDD66 FinalityFlow has been executed " +
                    "...\uD83E\uDD66 \uD83E\uDD66")
            return mSignedTransactionDone

        } else {
            Companion.logger.info(" \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 " +
                    " Participants are LOCAL and REMOTE ... \uD83D\uDD06")
            val mSignedTransactionDone = subFlow(
                    FinalityFlow(signedTx, mSessions))
            Companion.logger.info("\uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D  MULTI NODE ==> " +
                    " \uD83E\uDD66 \uD83E\uDD66  \uD83E\uDD66 \uD83E\uDD66 FinalityFlow has been executed " +
                    "...\uD83E\uDD66 \uD83E\uDD66")
            return mSignedTransactionDone
        }

    }

    @Suspendable
    @Throws(FlowException::class)
    private fun reportToRegulator(mSignedTransactionDone: SignedTransaction) {
        Companion.logger.info("\uD83D\uDCCC \uD83D\uDCCC \uD83D\uDCCC  Talking to the Regulator, for compliance, Senor! .............")
        try {
            subFlow(ReportToRegulatorFlow(mSignedTransactionDone))
            Companion.logger.info("\uD83D\uDCCC \uD83D\uDCCC \uD83D\uDCCC  DONE talking to the Regulator, Phew!")
        } catch (e: Exception) {
            Companion.logger.error(" \uD83D\uDC7F  \uD83D\uDC7F  \uD83D\uDC7F Regulator fell down.  \uD83D\uDC7F IGNORED  \uD83D\uDC7F ", e)
            throw FlowException("Regulator fell down!")
        }
    }

    @Suspendable
    @Throws(FlowException::class)
    private fun checkDuplicate() {
        val srv = serviceHub.cordaService(InvoiceOfferFinderService::class.java)
        val list = srv.getOffersOnNode();
        var isFound = false
        Companion.logger.info(" \uD83D\uDCA6  \uD83D\uDCA6 Number of InvoiceOfferStates:  \uD83D\uDCA6 ${list.size} \uD83D\uDCA6")

        list.forEach() {
            if (invoiceOfferState.invoiceId.toString()
                    == it.state.data.invoiceId.toString()
                    && invoiceOfferState.investor.identifier.id.toString()
                    == it.state.data.investor.identifier.id.toString()
                    && invoiceOfferState.offerAmount == it.state.data.offerAmount) {
                isFound = true
            }
        }
        if (isFound) {
            throw FlowException("\uD83D\uDC7F InvoiceOfferState is already on file")
        }
    }

    @Suspendable
    @Throws(FlowException::class)
    private fun collectSignatures(signedTx: SignedTransaction, sessions: List<FlowSession>): SignedTransaction {

        progressTracker.currentStep = gatheringTransactions

        val signedTransaction = subFlow(CollectSignaturesFlow(
                partiallySignedTx = signedTx, sessionsToCollectFrom = sessions))
        Companion.logger.info("\uD83C\uDFBD \uD83C\uDFBD \uD83C\uDFBD \uD83C\uDFBD  " +
                "Signatures collected OK!  \uD83D\uDE21 \uD83D\uDE21 " +
                ".... will call FinalityFlow ... \uD83C\uDF3A \uD83C\uDF3A txId: "
                + signedTransaction.id.toString())

        progressTracker.currentStep = finalizingTransaction
        val mSignedTransactionDone = subFlow(
                FinalityFlow(signedTransaction, sessions))

        Companion.logger.info("\uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D  " +
                " \uD83D\uDC4C \uD83D\uDC4C \uD83D\uDC4C  \uD83E\uDD66 \uD83E\uDD66  " +
                "\uD83E\uDD66 \uD83E\uDD66  \uD83E\uDD66 \uD83E\uDD66 MULTIPLE NODE(S): FinalityFlow has been executed ... " +
                "\uD83E\uDD66 \uD83E\uDD66")

        return mSignedTransactionDone
    }


    companion object {
        private val logger = LoggerFactory.getLogger(InvoiceOfferFlow::class.java)

    }

    init {
        Companion.logger.info(("\uD83C\uDF3A \uD83C\uDF3A InvoiceOfferFlow constructor with invoiceOfferState supplier: \uD83C\uDF4F "
                + invoiceOfferState.supplier.toString()) + "\n investor: " + invoiceOfferState.investor.toString())
    }
}
