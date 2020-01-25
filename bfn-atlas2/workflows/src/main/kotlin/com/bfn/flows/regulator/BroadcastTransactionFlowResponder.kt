package com.bfn.flows.regulator

import co.paralleluniverse.fibers.Suspendable
import com.r3.corda.lib.accounts.workflows.ourIdentity
import net.corda.core.flows.*
import net.corda.core.node.StatesToRecord
import org.slf4j.LoggerFactory
@InitiatedBy(BroadcastTransactionFlow::class)
class BroadcastTransactionFlowResponder(private val counterPartySession: FlowSession) : FlowLogic<Void?>() {
    @Suspendable
    @Throws(FlowException::class)
    override fun call(): Void? {

        Companion.logger.info("\uD83E\uDD6C \uD83E\uDD6C \uD83E\uDD6C \uD83E\uDD6C \uD83E\uDD6C \uD83E\uDD6C " +
        "BroadcastTransactionFlowResponder starting .... \uD83D\uDD0A \uD83D\uDD0A \uD83D\uDD0A ")
        val myself = serviceHub.ourIdentity
        val party = counterPartySession.counterparty
        Companion.logger.info("\uD83C\uDF45 \uD83C\uDF45 This party:  \uD83C\uDF45 $myself" +
                "party from session: \uD83C\uDF45  $party")

        subFlow(ReceiveTransactionFlow(counterPartySession,
                false, StatesToRecord.ALL_VISIBLE))
        Companion.logger.info("\uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D  BroadcastTransactionFlowResponder Transaction received " +
                "\uD83D\uDC4C \uD83D\uDC4C \uD83D\uDC4C \uD83E\uDD1F \uD83C\uDF4F \uD83C\uDF4E ")
        return null
    }

    companion object {
        private val logger = LoggerFactory.getLogger(BroadcastTransactionFlowResponder::class.java)
    }

}
