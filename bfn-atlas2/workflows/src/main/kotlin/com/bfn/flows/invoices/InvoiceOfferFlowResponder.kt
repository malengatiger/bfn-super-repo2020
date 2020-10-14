package com.bfn.flows.invoices

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.states.InvoiceOfferState
import com.r3.corda.lib.accounts.workflows.ourIdentity
import net.corda.core.flows.*
import net.corda.core.transactions.SignedTransaction
import org.slf4j.LoggerFactory

@InitiatedBy(InvoiceOfferFlow::class)
class InvoiceOfferFlowResponder(private val counterPartySession: FlowSession) : FlowLogic<SignedTransaction>() {
    @Suspendable
    @Throws(FlowException::class)
    override fun call(): SignedTransaction {
       Companion.logger.info("\uD83E\uDD6C \uD83E\uDD6C \uD83E\uDD6C \uD83E\uDD6C \uD83E\uDD6C \uD83E\uDD6C " +
               "InvoiceOfferFlowResponder starting ....")
        val myself = serviceHub.ourIdentity
        val party = counterPartySession.counterparty
        Companion.logger.info("\uD83C\uDF45 \uD83C\uDF45 This party: " + myself.name.toString() + ", party from session: \uD83C\uDF45 " + party.name.toString())

        val signTransactionFlow: SignTransactionFlow = object : SignTransactionFlow(counterPartySession) {
            @Suspendable
            @Throws(FlowException::class)
            override fun checkTransaction(stx: SignedTransaction) {
                InvoiceOfferFlowResponder.logger.info("\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 checkTransaction here " +
                        "${stx.id} outputStates ${stx.coreTransaction.outputStates.size}...")
                if (stx.coreTransaction.outputStates.size != 1) {
                    throw FlowException("There must be only one Output state")
                }
                if (stx.coreTransaction.outputStates.first() is InvoiceOfferState) {

                } else {
                    throw FlowException("Output state must be InvoiceOfferState")
                }
            }
        }
        subFlow(signTransactionFlow)
        val signedTransaction = subFlow(ReceiveFinalityFlow(counterPartySession))
        Companion.logger.info("\uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D  InvoiceOfferFlowResponder Transaction finalized " +
                "\uD83D\uDC4C \uD83D\uDC4C \uD83D\uDC4C \uD83E\uDD1F \uD83C\uDF4F \uD83C\uDF4E ${signedTransaction.id}")

        return signedTransaction
    }

    companion object {
        private val logger = LoggerFactory.getLogger(InvoiceOfferFlowResponder::class.java)
    }

}
