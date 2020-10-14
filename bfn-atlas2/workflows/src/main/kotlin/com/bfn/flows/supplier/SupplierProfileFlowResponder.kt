package com.bfn.flows.supplier

import co.paralleluniverse.fibers.Suspendable
import com.bfn.flows.Em
import com.r3.corda.lib.accounts.workflows.ourIdentity
import net.corda.core.flows.*
import net.corda.core.transactions.SignedTransaction
import org.slf4j.LoggerFactory

@InitiatedBy(SupplierProfileFlow::class)
class SupplierProfileFlowResponder(private val counterPartySession: FlowSession) : FlowLogic<SignedTransaction>() {
    @Suspendable
    @Throws(FlowException::class)
    override fun call(): SignedTransaction {
       Companion.logger.info("${Em.FERNS}${Em.FERNS}  " +
               "SupplierProfileFlowResponder starting ....")
        val myself = serviceHub.ourIdentity
        val party = counterPartySession.counterparty

        Companion.logger.info("\uD83C\uDF45 \uD83C\uDF45 SupplierProfileFlowResponder: " +
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
                "SupplierProfileFlowResponder Transaction finalized " +
                "${Em.FERNS}${Em.FERNS}  ${signedTransaction.id}")

        return signedTransaction
    }

    companion object {
        private val logger = LoggerFactory.getLogger(SupplierProfileFlowResponder::class.java)
    }

}
