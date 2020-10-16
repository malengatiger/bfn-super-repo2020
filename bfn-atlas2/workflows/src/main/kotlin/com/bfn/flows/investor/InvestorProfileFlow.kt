package com.bfn.flows.investor

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.contracts.InvestorProfileContract
import com.bfn.contractstates.states.InvestorProfileState
import com.bfn.flows.Em
import com.bfn.flows.services.ProfileFinderService
import com.r3.corda.lib.accounts.workflows.flows.ShareStateAndSyncAccounts
import com.r3.corda.lib.accounts.workflows.internal.accountService
import com.r3.corda.lib.accounts.workflows.ourIdentity
import net.corda.core.flows.FinalityFlow
import net.corda.core.flows.FlowLogic
import net.corda.core.flows.InitiatingFlow
import net.corda.core.flows.StartableByRPC
import net.corda.core.transactions.SignedTransaction
import net.corda.core.transactions.TransactionBuilder
import org.slf4j.LoggerFactory
import java.util.*


@InitiatingFlow
@StartableByRPC
class InvestorProfileFlow(private val investorProfile: InvestorProfileState) : FlowLogic<SignedTransaction>() {

    @Suspendable
    override fun call(): SignedTransaction {
        Companion.logger.info("${Em.DOG}${Em.DOG}${Em.DOG}${Em.DOG}  " +
                "InvestorProfileFlow started, accountId: ${investorProfile.account.identifier} ")
        val command = InvestorProfileContract.CreateProfile()
        val account = serviceHub.accountService.accountInfo(
                UUID.fromString(investorProfile.account.identifier.toString()))
                ?: throw IllegalArgumentException("InvestorProfileFlow: \uD83D\uDC4E\uD83C\uDFFD " +
                        "Account not found: ${investorProfile.account.identifier}")

        val profile = serviceHub.cordaService(ProfileFinderService::class.java)
                .findInvestorProfile(investorProfile.account.identifier.toString())

        val txBuilder = TransactionBuilder(serviceHub.networkMapCache.notaryIdentities.first())
        txBuilder.addCommand(command, serviceHub.ourIdentity.owningKey)
        if (profile != null) {
            txBuilder.addInputState(profile)
        }
        txBuilder.addOutputState(investorProfile)
        txBuilder.verify(serviceHub)

        val tx = serviceHub.signInitialTransaction(txBuilder)
        val signedTx = subFlow(FinalityFlow(tx, listOf()))
        Companion.logger.info("${Em.DOG}${Em.DOG}${Em.DOG}${Em.DOG}${Em.DOG}  " +
                "Investor Profile has been created for: " +
                "${account.state.data.name} \uD83E\uDD8A \uD83E\uDD8A")
        shareState()
        return signedTx
    }

    @Suspendable
    private fun shareState() {
        logger.info("${Em.DOG}${Em.DOG}${Em.DOG} Sharing InvestorProfile state with all nodes in network")
        val me = serviceHub.myInfo.legalIdentities[0]
        val nodes = serviceHub.networkMapCache.allNodes
        for (node in nodes) {
            if (node.legalIdentities[0].name.toString().contains("Notary") ||
                    node.legalIdentities[0].name.toString().contains("Regulator")) {
                logger.info("\uD83D\uDD35 No need to share state with this node: " +
                        "${node.legalIdentities[0].name}")
            } else {
                if (node.legalIdentities[0].name.toString() != me.name.toString()) {
                    val userStateAndRef = serviceHub.cordaService(ProfileFinderService::class.java)
                            .findInvestorProfile(investorAccountId = investorProfile.account.identifier.id.toString())
                    if (userStateAndRef != null) {
                        subFlow(ShareStateAndSyncAccounts(
                                state = userStateAndRef,
                                partyToShareWith = node.legalIdentities[0]))
                        logger.info("${Em.DOG}${Em.DOG}${Em.DOG} " +
                                "InvestorProfile ${investorProfile.account.name} " +
                                "has been shared with party ${node.legalIdentities[0].name} \uD83E\uDDE9")
                    }
                }
            }
        }

    }

    companion object {
        private val logger = LoggerFactory.getLogger(InvestorProfileFlow::class.java)
    }

}
