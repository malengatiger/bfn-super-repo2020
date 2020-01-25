package com.bfn.flows.regulator

import co.paralleluniverse.fibers.Suspendable
import com.r3.corda.lib.accounts.workflows.ourIdentity
import net.corda.core.flows.*
import net.corda.core.identity.Party
import net.corda.core.transactions.SignedTransaction
import org.slf4j.LoggerFactory
import java.lang.Exception

@StartableByRPC
@InitiatingFlow
class BroadcastTransactionFlow(private val signedTransaction: SignedTransaction) : FlowLogic<Void?>() {
    @Suspendable
    @Throws(FlowException::class)
    override fun call(): Void? {
        Companion.logger.info("\uD83D\uDE21 \uD83D\uDE21 \uD83D\uDE21 \uD83D\uDD0A \uD83D\uDD0A " +
                "BroadcastTransactionFlow - share transaction with nodes " +
                "\uD83D\uDD0A \uD83D\uDE21 \uD83D\uDE21 \uD83D\uDE21 ")

        val meParty = serviceHub.ourIdentity
        val otherNodes = serviceHub.networkMapCache.allNodes
        otherNodes.forEach() {
            val party = it.legalIdentities.first()
            if (party.name.organisation == meParty.name.organisation
                    || party.name.organisation.contains("Notary")) {
                logger.info("\uD83D\uDE0E \uD83D\uDE0E ignore notary and $meParty and do not share this transaction")
            } else {
                try {
                    val counterPartySession = initiateFlow(party)
                    logger.info("\uD83D\uDE0E \uD83D\uDE0E Sending transaction to \uD83C\uDF3F $party  \uD83C\uDF3F")
                    subFlow(SendTransactionFlow(counterPartySession, signedTransaction))
                } catch (e: Exception) {
                    Companion.logger.warn("\uD83D\uDE0E \uD83D\uDE0E Unable to send transaction to $party")
                }
            }
        }

        Companion.logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35  " +
                "\uD83E\uDD1F transaction sharing with  ${otherNodes.size - 2} other nodes is " +
                "\uD83E\uDD1F COMPLETE \uD83E\uDD1F")

        return null
    }

    companion object {
        private val logger = LoggerFactory.getLogger(BroadcastTransactionFlow::class.java)
    }

}
