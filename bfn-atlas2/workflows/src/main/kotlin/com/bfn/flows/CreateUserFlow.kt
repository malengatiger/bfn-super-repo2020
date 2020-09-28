package com.bfn.flows

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.contracts.UserContract
import com.bfn.contractstates.states.UserState
import com.bfn.flows.services.UserFinderService
import com.r3.corda.lib.accounts.workflows.flows.ShareStateAndSyncAccounts
import com.r3.corda.lib.accounts.workflows.ourIdentity
import net.corda.core.flows.FinalityFlow
import net.corda.core.flows.FlowLogic
import net.corda.core.flows.InitiatingFlow
import net.corda.core.flows.StartableByRPC
import net.corda.core.transactions.SignedTransaction
import net.corda.core.transactions.TransactionBuilder
import net.corda.core.utilities.ProgressTracker
import org.slf4j.LoggerFactory

@StartableByRPC
@InitiatingFlow
class CreateUserFlow(
        private val user: UserState
) : FlowLogic<SignedTransaction>() {
    override val progressTracker = ProgressTracker()
    @Suspendable
    override fun call(): SignedTransaction {
        logger.info("\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E " +
                "... CreateUserFlow: call started \uD83C\uDF4E \uD83C\uDF4E")

        val txBuilder = TransactionBuilder(serviceHub.networkMapCache.notaryIdentities.first())
        val command = UserContract.Register()
        txBuilder.addCommand(command, serviceHub.ourIdentity.owningKey)

        txBuilder.addOutputState(user)
        txBuilder.verify(serviceHub)
        Companion.logger.info("\uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95  Signing transaction ... ")
        val tx = serviceHub.signInitialTransaction(txBuilder)
        val signedTx = subFlow(FinalityFlow(tx, listOf()))

        logger.info("\uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D  user : ${user.email} " )
        shareState()
        return signedTx

    }

    @Suspendable
    private fun shareState() {
        logger.info("Sharing user state with all nodes in network")
        val me = serviceHub.myInfo.legalIdentities[0]
        val nodes = serviceHub.networkMapCache.allNodes
        for (node in nodes) {
            if (node.legalIdentities[0].name.toString().contains("Notary") ||
                    node.legalIdentities[0].name.toString().contains("Regulator")) {
                logger.info("\uD83D\uDD35 No need to share state with this node: " +
                        "${node.legalIdentities[0].name}")
            } else {
                if (node.legalIdentities[0].name.toString() != me.name.toString()) {
                    val userStateAndRef = serviceHub.cordaService(UserFinderService::class.java)
                            .findUserStateAndRef(accountId = user.accountInfo.identifier.id.toString())
                    if (userStateAndRef != null) {
                        subFlow(ShareStateAndSyncAccounts(
                                state = userStateAndRef,
                                partyToShareWith = node.legalIdentities[0]))
                        logger.info("\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E " +
                                "User ${user.accountInfo.name} " +
                                "has been shared with party ${node.legalIdentities[0].name} \uD83E\uDDE9")
                    }
                }
            }
        }


    }
    companion object {
        private val logger = LoggerFactory.getLogger(CreateUserFlow::class.java)
    }


}

