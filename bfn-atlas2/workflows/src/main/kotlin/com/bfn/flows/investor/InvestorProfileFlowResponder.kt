package com.bfn.flows.investor

import co.paralleluniverse.fibers.Suspendable
import com.bfn.flows.Em
import com.r3.corda.lib.accounts.workflows.ourIdentity
import net.corda.core.flows.*
import net.corda.core.transactions.SignedTransaction
import org.slf4j.LoggerFactory

@InitiatedBy(InvestorProfileFlow::class)
class InvestorProfileFlowResponder(private val counterPartySession: FlowSession) : FlowLogic<SignedTransaction>() {
    @Suspendable
    @Throws(FlowException::class)
    override fun call(): SignedTransaction {
       Companion.logger.info("${Em.FERNS}${Em.FERNS}  " +
               "InvestorProfileFlowResponder starting ....")
        val myself = serviceHub.ourIdentity
        val party = counterPartySession.counterparty

        Companion.logger.info("${Em.FERNS}${Em.FERNS}  InvestorProfileFlowResponder: " +
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
        Companion.logger.info("${Em.FERNS}${Em.FERNS}   " +
                "InvestorProfileFlowResponder Transaction finalized " +
                "${Em.FERNS}${Em.FERNS}  ${signedTransaction.id}")

        return signedTransaction
    }

    companion object {
        private val logger = LoggerFactory.getLogger(InvestorProfileFlowResponder::class.java)
    }

}
