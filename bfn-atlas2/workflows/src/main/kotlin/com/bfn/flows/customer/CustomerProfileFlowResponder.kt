package com.bfn.flows.customer

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.states.CustomerProfileState
import com.bfn.contractstates.states.InvoiceOfferState
import com.bfn.contractstates.states.PurchaseOrderState
import com.bfn.flows.Em
import com.r3.corda.lib.accounts.workflows.ourIdentity
import net.corda.core.flows.*
import net.corda.core.transactions.SignedTransaction
import org.slf4j.LoggerFactory

@InitiatedBy(CustomerProfileFlow::class)
class CustomerProfileFlowResponder(private val counterPartySession: FlowSession) : FlowLogic<SignedTransaction>() {
    @Suspendable
    @Throws(FlowException::class)
    override fun call(): SignedTransaction {
       Companion.logger.info("${Em.DOLPHIN}${Em.DOLPHIN}${Em.DOLPHIN}${Em.DOLPHIN} " +
               "CustomerProfileFlowResponder starting ....")
        val myself = serviceHub.ourIdentity
        val party = counterPartySession.counterparty
        Companion.logger.info("\uD83C\uDF45 \uD83C\uDF45 This party: " + myself.name.toString() + ", party from session: \uD83C\uDF45 " + party.name.toString())

        val signTransactionFlow: SignTransactionFlow = object : SignTransactionFlow(counterPartySession) {
            @Suspendable
            @Throws(FlowException::class)
            override fun checkTransaction(stx: SignedTransaction) {
               logger.info("${Em.DOLPHIN}${Em.DOLPHIN}${Em.DOLPHIN} checkTransaction here " +
                        "${stx.id} outputStates ${stx.coreTransaction.outputStates.size}...")
                if (stx.coreTransaction.outputStates.size != 1) {
                    throw FlowException("There must be only one Output state")
                }
                if (stx.coreTransaction.outputStates.first() is CustomerProfileState) {

                } else {
                    throw FlowException("Output state must be CustomerProfileState")
                }
            }
        }
        subFlow(signTransactionFlow)
        val signedTransaction = subFlow(ReceiveFinalityFlow(counterPartySession))
        logger.info("${Em.DOLPHIN}${Em.DOLPHIN}${Em.DOLPHIN}  " +
                "CustomerProfileFlowResponder Transaction finalized " +
                "${Em.DOLPHIN} ${signedTransaction.id}")

        return signedTransaction
    }

    companion object {
        private val logger = LoggerFactory.getLogger(CustomerProfileFlowResponder::class.java)
    }

}
