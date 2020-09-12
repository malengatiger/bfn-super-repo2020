package com.bfn.flows

import co.paralleluniverse.fibers.Suspendable
import com.r3.corda.lib.accounts.contracts.states.AccountInfo
import com.r3.corda.lib.accounts.workflows.internal.accountService
import net.corda.core.flows.FlowLogic
import net.corda.core.flows.InitiatingFlow
import net.corda.core.flows.StartableByRPC
import net.corda.core.transactions.SignedTransaction
import net.corda.core.utilities.ProgressTracker

@StartableByRPC
@InitiatingFlow
class CreateAccountFlow(
        private val account: String
) : FlowLogic<AccountInfo>() {
    override val progressTracker = ProgressTracker()
    @Suspendable
    override fun call(): AccountInfo {
        logger.info("\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E " +
                "... CreateAccountFlow: call started \uD83C\uDF4E \uD83C\uDF4E")

        val future = serviceHub.accountService.createAccount(account)
        val acctInfo = future.get().state.data

        val nodes = serviceHub.networkMapCache.allNodes
        val me = serviceHub.myInfo;

        logger.warn("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 " +
                "Sharing new account across ${nodes.size - 2} nodes")
        nodes.forEach() {
            if (me.legalIdentities[0].name == it.legalIdentities.first().name) {
                logger.info("Ignore: account on this node, no need to share with self")
            } else {
                if (it.legalIdentities.first().name.toString().contains("Notary") ||
                        it.legalIdentities.first().name.toString().contains("Regulator")) {
                    logger.info("Ignore: this is a Notary or Regulator")
                } else {
                    logger.info("Share with nodes ${it.legalIdentities.first().name}")
                    serviceHub.accountService.shareAccountInfoWithParty(
                            accountId = acctInfo.identifier.id, party = it.legalIdentities.first())
                    logger.info(" \uD83C\uDF40  \uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40 Account ${acctInfo.name} " +
                            "shared with ${it.legalIdentities[0].name}")
                }
            }
        }

        logger.info("\uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D  account : $acctInfo " +
                "-   \uD83D\uDC9A \uD83D\uDC9A \uD83D\uDC9A created and shared across nodes \uD83D\uDC7D ; returning account info")
        return acctInfo

    }


}

