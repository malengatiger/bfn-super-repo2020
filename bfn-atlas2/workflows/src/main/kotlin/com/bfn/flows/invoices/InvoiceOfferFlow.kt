package com.bfn.flows.invoices

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.states.InvoiceOfferState
import com.bfn.flows.regulator.ReportToRegulatorFlow
import com.bfn.flows.services.InvoiceOfferFinderService
import com.google.common.collect.ImmutableList
import com.template.InvoiceOfferContract
import net.corda.core.flows.*
import net.corda.core.identity.Party
import net.corda.core.transactions.SignedTransaction
import net.corda.core.transactions.TransactionBuilder
import net.corda.core.utilities.ProgressTracker
import org.slf4j.LoggerFactory


@InitiatingFlow
@StartableByRPC
class InvoiceOfferFlow(invoiceOfferState: InvoiceOfferState) : FlowLogic<SignedTransaction>() {
    private val invoiceOfferState: InvoiceOfferState = invoiceOfferState
    private val SENDING_TRANSACTION = ProgressTracker.Step("Sending transaction to counterParty")
    private val GENERATING_TRANSACTION = ProgressTracker.Step("Generating transaction based on new IOU.")
    private val VERIFYING_TRANSACTION = ProgressTracker.Step("Verifying contract constraints.")
    private val SIGNING_TRANSACTION = ProgressTracker.Step("Signing transaction with our private key.")
    private val GATHERING_SIGNATURES: ProgressTracker.Step = object : ProgressTracker.Step("Gathering the counterparty's signature.") {
        override fun childProgressTracker(): ProgressTracker? {
            Companion.logger.info("\uD83C\uDF3A \uD83C\uDF3A ProgressTracker childProgressTracker ...")
            return CollectSignaturesFlow.tracker()
        }
    }
    private val FINALISING_TRANSACTION: ProgressTracker.Step = object : ProgressTracker.Step("Obtaining notary signature and recording transaction.") {
        override fun childProgressTracker(): ProgressTracker? {
            return FinalityFlow.tracker()
        }
    }

    override val progressTracker = ProgressTracker(
            GENERATING_TRANSACTION,
            VERIFYING_TRANSACTION,
            SIGNING_TRANSACTION,
            GATHERING_SIGNATURES,
            FINALISING_TRANSACTION,
            SENDING_TRANSACTION
    )

    @Suspendable
    @Throws(FlowException::class)
    override fun call(): SignedTransaction {
        val serviceHub = serviceHub
        Companion.logger.info("\uD83E\uDD1F \uD83E\uDD1F  \uD83E\uDD1F \uD83E\uDD1F  ... InvoiceOfferFlow call started ...")
        val notary = serviceHub.networkMapCache.notaryIdentities[0]
        checkDuplicate()

        if (invoiceOfferState.supplier.name == invoiceOfferState.investor.name) {
            throw IllegalArgumentException("Investor and Supplier cannot be the same entity")
        }
       
        val command = InvoiceOfferContract.MakeOffer()
        val investorParty = invoiceOfferState.investor.host //subFlow(RequestKeyForAccount(investorAccount))
        val supplierParty = invoiceOfferState.supplier.host //subFlow(RequestKeyForAccount(supplierAccount))

        val txBuilder = TransactionBuilder(notary)
        txBuilder.addOutputState(invoiceOfferState, InvoiceOfferContract.ID)
        txBuilder.addCommand(command, supplierParty.owningKey,
                investorParty.owningKey)

        return processFlow(txBuilder, investorParty, supplierParty)
    }

    @Suspendable
    private fun processFlow(txBuilder: TransactionBuilder, investorParty: Party, supplierParty: Party): SignedTransaction {
        progressTracker.currentStep = VERIFYING_TRANSACTION
        txBuilder.verify(serviceHub)
        progressTracker.currentStep = SIGNING_TRANSACTION
        val signedTx = serviceHub.signInitialTransaction(txBuilder)

        val nodeInfo = serviceHub.myInfo
        val investorOrg: String = invoiceOfferState.investor.host.name.organisation
        val supplierOrg: String = invoiceOfferState.supplier.host.name.organisation
        val thisNodeOrg = nodeInfo.legalIdentities.first().name.organisation

        val supplierStatus: Int
        val investorStatus: Int
        val supplierSession: FlowSession
        val investorSession: FlowSession
        var signedTransaction: SignedTransaction? = null
        supplierStatus = if (supplierOrg.equals(thisNodeOrg, ignoreCase = true)) {
            LOCAL_SUPPLIER
        } else {
            REMOTE_SUPPLIER
        }
        investorStatus = if (investorOrg.equals(thisNodeOrg, ignoreCase = true)) {
            LOCAL_INVESTOR
        } else {
            REMOTE_INVESTOR
        }
        if (supplierStatus == LOCAL_SUPPLIER && investorStatus == LOCAL_INVESTOR) {
            Companion.logger.info(" \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 " +
                    "All participants are LOCAL ... \uD83D\uDD06")
            val mSignedTransactionDone = subFlow(
                    FinalityFlow(signedTx, ImmutableList.of<FlowSession>()))
            Companion.logger.info("\uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D  SAME NODE ==> " +
                    " \uD83E\uDD66 \uD83E\uDD66  \uD83E\uDD66 \uD83E\uDD66 FinalityFlow has been executed " +
                    "...\uD83E\uDD66 \uD83E\uDD66")
            return mSignedTransactionDone

        }
        Companion.logger.info("\uD83D\uDE21 \uD83D\uDE21 \uD83D\uDE21 " +
                "Supplier and/or Investor are NOT on the same node ..." +
                "  \uD83D\uDE21 flowSession(s) required \uD83D\uDE21")

        if (supplierStatus == LOCAL_SUPPLIER && investorStatus == REMOTE_INVESTOR) {
            Companion.logger.info(" \uD83D\uDE21  \uD83D\uDE21 \uD83D\uDE21 " +
                    "Investor is REMOTE \uD83D\uDE21 ")
            investorSession = initiateFlow(investorParty)
            signedTransaction = collectSignatures(signedTx, ImmutableList.of(
                    investorSession))
            return signedTransaction
        }
        if (supplierStatus == REMOTE_SUPPLIER && investorStatus == REMOTE_INVESTOR) {
            Companion.logger.info(" \uD83D\uDE21  \uD83D\uDE21 \uD83D\uDE21 " +
                    "Supplier and Investor are REMOTE \uD83D\uDE21 ")
            investorSession = initiateFlow(investorParty)

            return if (invoiceOfferState.investor.host.name == invoiceOfferState.supplier.host.name) {
                signedTransaction = collectSignatures(signedTx, ImmutableList.of(
                        investorSession))
                signedTransaction
            } else {
                supplierSession = initiateFlow(supplierParty)
                signedTransaction = collectSignatures(signedTx, ImmutableList.of(
                        investorSession, supplierSession))
                signedTransaction
            }

        }
        if (supplierStatus == REMOTE_SUPPLIER && investorStatus == LOCAL_INVESTOR) {
            Companion.logger.info(" \uD83D\uDE21  \uD83D\uDE21 \uD83D\uDE21 " +
                    "Supplier is REMOTE \uD83D\uDE21 ")
            supplierSession = initiateFlow(supplierParty)
            signedTransaction = collectSignatures(signedTx, ImmutableList.of(
                    supplierSession))
            return signedTransaction
        }

        return signedTransaction!!
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

        progressTracker.currentStep = GATHERING_SIGNATURES

        val signedTransaction = subFlow(CollectSignaturesFlow(
                partiallySignedTx = signedTx, sessionsToCollectFrom = sessions))
        Companion.logger.info("\uD83C\uDFBD \uD83C\uDFBD \uD83C\uDFBD \uD83C\uDFBD  " +
                "Signatures collected OK!  \uD83D\uDE21 \uD83D\uDE21 " +
                ".... will call FinalityFlow ... \uD83C\uDF3A \uD83C\uDF3A txId: "
                + signedTransaction.id.toString())
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
        private const val LOCAL_SUPPLIER = 1
        private const val LOCAL_INVESTOR = 2
        private const val REMOTE_SUPPLIER = 3
        private const val REMOTE_INVESTOR= 4
    }

    init {
        Companion.logger.info(("\uD83C\uDF3A \uD83C\uDF3A InvoiceOfferFlow constructor with invoiceOfferState supplier: \uD83C\uDF4F "
                + invoiceOfferState.supplier.toString()) + "\n investor: " + invoiceOfferState.investor.toString())
    }
}
