package com.bfn.flows.supplier

import co.paralleluniverse.fibers.Suspendable
import com.r3.corda.lib.accounts.workflows.ourIdentity
import net.corda.core.flows.*
import net.corda.core.transactions.SignedTransaction
import org.slf4j.LoggerFactory

@InitiatedBy(FindBestOfferForInvoiceFlow::class)
class FindBestOfferForInvoiceFlowResponder(private val counterPartySession: FlowSession) : FlowLogic<SignedTransaction>() {
    @Suspendable
    @Throws(FlowException::class)
    override fun call(): SignedTransaction {
       Companion.logger.info("\uD83E\uDD6C \uD83E\uDD6C \uD83E\uDD6C \uD83E\uDD6C \uD83E\uDD6C \uD83E\uDD6C " +
               "BestOfferForInvoiceFlowResponder starting ....")
        val myself = serviceHub.ourIdentity
        val party = counterPartySession.counterparty

        Companion.logger.info("\uD83C\uDF45 \uD83C\uDF45 BestOfferForInvoiceFlowResponder: " +
                "This party: \uD83C\uDF4E $myself \uD83C\uDF45 \uD83C\uDF45 counterParty: $party" )

        val signTransactionFlow: SignTransactionFlow = object : SignTransactionFlow(counterPartySession) {
            @Suspendable
            @Throws(FlowException::class)
            override fun checkTransaction(stx: SignedTransaction) {
                //todo - any validation here?

            }
        }

        subFlow(signTransactionFlow)
        val signedTransaction = subFlow(ReceiveFinalityFlow(counterPartySession))
        Companion.logger.info("\uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D  " +
                "BestOfferForInvoiceFlowResponder Transaction finalized " +
                "\uD83D\uDC4C \uD83D\uDC4C \uD83D\uDC4C \uD83E\uDD1F \uD83C\uDF4F \uD83C\uDF4E ${signedTransaction.id}")

        return signedTransaction
    }

    companion object {
        private val logger = LoggerFactory.getLogger(FindBestOfferForInvoiceFlowResponder::class.java)
    }

}
