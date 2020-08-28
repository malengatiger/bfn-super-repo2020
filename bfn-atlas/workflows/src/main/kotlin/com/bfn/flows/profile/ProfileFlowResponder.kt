package com.bfn.flows.profile

import co.paralleluniverse.fibers.Suspendable
import com.r3.corda.lib.accounts.workflows.ourIdentity
import net.corda.core.flows.*
import net.corda.core.transactions.SignedTransaction
import org.slf4j.LoggerFactory

@InitiatedBy(ProfileFlow::class)
class ProfileFlowResponder(private val counterPartySession: FlowSession) : FlowLogic<SignedTransaction>() {
    @Suspendable
    @Throws(FlowException::class)
    override fun call(): SignedTransaction {
       Companion.logger.info("\uD83D\uDC65 \uD83D\uDC65 \uD83D\uDC65 \uD83D\uDC65  " +
               "ProfileFlowResponder starting ....")
        val myself = serviceHub.ourIdentity
        val party = counterPartySession.counterparty
        Companion.logger.info("\uD83D\uDC65 \uD83D\uDC65 This party: " + myself.name.toString() + ", party from session: \uD83C\uDF45 " + party.name.toString())

        val signTransactionFlow: SignTransactionFlow = object : SignTransactionFlow(counterPartySession) {
            @Suspendable
            @Throws(FlowException::class)
            override fun checkTransaction(stx: SignedTransaction) {
                ProfileFlowResponder.logger.info("\uD83D\uDC65 \uD83D\uDC65 checkTransaction here " +
                        "${stx.id} inputStates ${stx.coreTransaction.inputs.size}...")

            }
        }
        Companion.logger.info("\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 run subFlow SignTransactionFlow ...")
        subFlow(signTransactionFlow)
        val signedTransaction = subFlow(ReceiveFinalityFlow(counterPartySession))
        Companion.logger.info("\uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D  ProfileFlowResponder Transaction finalized " +
                "\uD83D\uDC4C \uD83D\uDC4C \uD83D\uDC4C \uD83D\uDC65 \uD83D\uDC65 \uD83C\uDF4E ${signedTransaction.id}")

        return signedTransaction

    }

    companion object {
        private val logger = LoggerFactory.getLogger(ProfileFlowResponder::class.java)
    }

}
