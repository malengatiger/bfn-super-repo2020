package com.bfn.flows.customer

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.contracts.PurchaseOrderContract
import com.bfn.contractstates.states.PurchaseOrderState
import com.r3.corda.lib.accounts.workflows.flows.RequestKeyForAccount
import com.r3.corda.lib.tokens.workflows.utilities.toParty
import net.corda.core.flows.*
import net.corda.core.identity.AnonymousParty
import net.corda.core.transactions.SignedTransaction
import net.corda.core.transactions.TransactionBuilder
import org.slf4j.LoggerFactory
import java.security.PublicKey


@InitiatingFlow
@StartableByRPC
class PurchaseOrderFlow(private val purchaseOrder: PurchaseOrderState) : FlowLogic<SignedTransaction>() {

    @Suspendable
    override fun call(): SignedTransaction {
        Companion.logger.info("\uD83D\uDE39 \uD83D\uDE39 \uD83D\uDE39  \uD83C\uDFC8 \uD83C\uDFC8 " +
                "\uD83C\uDFC8 \uD83C\uDFC8 \uD83C\uDFC8 \uD83C\uDFC8 " +
                "PurchaseOrderFlow started, customer: ${purchaseOrder.customer.name} " +
                "supplier: ${purchaseOrder.supplier.name}" )

        val txBuilder = TransactionBuilder(serviceHub.networkMapCache.notaryIdentities.first())
        val signedTx = processFlow(txBuilder = txBuilder)

        Companion.logger.info("\uD83D\uDE39 \uD83D\uDE39 \uD83D\uDE39  " +
                "PurchaseOrder has been created on the ledger for: " +
                "customer: ${purchaseOrder.customer.name} " +
                "supplier: ${purchaseOrder.supplier.name} \uD83E\uDD8A \uD83E\uDD8A")
        return signedTx
    }
    @Suspendable
    private fun processFlow(txBuilder: TransactionBuilder): SignedTransaction {
        Companion.logger.info("\uD83C\uDFC8 \uD83C\uDFC8 " +
                "\uD83C\uDFC8 \uD83C\uDFC8 \uD83C\uDFC8 \uD83C\uDFC8 " +
                "PurchaseOrderFlow:processFlow started, customer: ${purchaseOrder.customer.name} " +
                "supplier: ${purchaseOrder.supplier.name} \uD83C\uDF4E" )

        val supplierOrg: String = purchaseOrder.supplier.host.name.organisation
        val customerOrg: String = purchaseOrder.customer.host.name.organisation

        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 RequestKeyForAccount for " +
                "supplier: ${purchaseOrder.supplier.name} " +
                "and customer: ${purchaseOrder.customer.name} ... about to request ....")

        val supplierKey = purchaseOrder.supplier.host
        val customerKey = purchaseOrder.customer.host

        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 " +
                "Have requested keys for supplier key: ${supplierKey.owningKey} " +
                "customer key: ${customerKey.owningKey} ... about to create transaction using txBuilder ...")

        val command = PurchaseOrderContract.Create()
        txBuilder.addCommand(
                command, mutableListOf(supplierKey.owningKey, customerKey.owningKey))
        txBuilder.addOutputState(purchaseOrder)
        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 " +
                " about to verify and initially sign the transaction ... ")
        txBuilder.verify(serviceHub)
        val signedTx = serviceHub.signInitialTransaction(txBuilder)

        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 " +
                "Transaction initial signature done: $signedTx, \uD83C\uDF4E building sessions ...")
        val mSessions: MutableList<FlowSession> = mutableListOf()

        val node = serviceHub.myInfo.legalIdentities[0].name.organisation
        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 This node is: $node " +
                "compare to supplier: $supplierOrg customer: $customerOrg ")
        if (supplierOrg != node) {
            mSessions.add(initiateFlow(supplierKey))
        }
        if (customerOrg != node) {
            mSessions.add(initiateFlow(customerKey))
        }
        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 " +
                "Sessions created: ${mSessions.size}. Check for ZERO sessions \uD83C\uDF4E")
        return if (mSessions.isEmpty()) {
            logger.info(" \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 " +
                    "All participants are LOCAL ... \uD83D\uDD06")
            val mSignedTransactionDone = subFlow(
                    FinalityFlow(signedTx, listOf()))
            logger.info("\uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D  SINGLE NODE ==> " +
                    " \uD83E\uDD66 \uD83E\uDD66  \uD83E\uDD66 \uD83E\uDD66 FinalityFlow has been executed " +
                    "...\uD83E\uDD66 \uD83E\uDD66")
            mSignedTransactionDone
        } else {
            PurchaseOrderFlow.logger.info("\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 " +
                    " Participants are LOCAL and REMOTE ... about to collect signatures: " +
                    "\uD83D\uDD06 for ${mSessions.size} sessions")
            collectSignaturesAndFinalize(signedTx = signedTx, sessions = mSessions)
        }

    }
    @Suspendable
    @Throws(FlowException::class)
    private fun collectSignaturesAndFinalize(signedTx: SignedTransaction,
                                             sessions: List<FlowSession>): SignedTransaction {
        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 " +
                " running collectSignaturesAndFinalize for ${sessions.size} sessions ...")

        val signedTransaction = subFlow(CollectSignaturesFlow(
                partiallySignedTx = signedTx, sessionsToCollectFrom = sessions))

        logger.info("\uD83C\uDFBD \uD83C\uDFBD \uD83C\uDFBD \uD83C\uDFBD  " +
                "Signatures collected OK!  \uD83D\uDE21 \uD83D\uDE21 " +
                ".... will call FinalityFlow ... \uD83C\uDF3A \uD83C\uDF3A txId: "
                + signedTransaction.id.toString())

        val mSignedTransactionDone = subFlow(
                FinalityFlow(signedTransaction, sessions))

        logger.info("\uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D  " +
                " \uD83D\uDC4C \uD83D\uDC4C \uD83D\uDC4C  \uD83E\uDD66 \uD83E\uDD66  " +
                "\uD83E\uDD66 \uD83E\uDD66  \uD83E\uDD66 \uD83E\uDD66 " +
                "MULTIPLE NODE(S): FinalityFlow has been executed : PurchaseOrder created ... " +
                "\uD83E\uDD66 \uD83E\uDD66")

        return mSignedTransactionDone
    }


    companion object {
        private val logger = LoggerFactory.getLogger(PurchaseOrderFlow::class.java)
    }

}
