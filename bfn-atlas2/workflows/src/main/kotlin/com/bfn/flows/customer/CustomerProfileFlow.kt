package com.bfn.flows.customer

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.contracts.CustomerProfileContract
import com.bfn.contractstates.contracts.InvestorProfileContract
import com.bfn.contractstates.states.CustomerProfileState
import com.bfn.flows.services.ProfileFinderService
import com.bfn.flows.services.UserFinderService
import com.r3.corda.lib.accounts.workflows.flows.RequestKeyForAccount
import com.r3.corda.lib.accounts.workflows.flows.ShareStateAndSyncAccounts
import com.r3.corda.lib.accounts.workflows.internal.accountService
import com.r3.corda.lib.accounts.workflows.ourIdentity
import net.corda.core.flows.*
import net.corda.core.transactions.SignedTransaction
import net.corda.core.transactions.TransactionBuilder
import org.slf4j.LoggerFactory
import java.util.*


@InitiatingFlow
@StartableByRPC
class CustomerProfileFlow(private val customerProfile: CustomerProfileState) : FlowLogic<SignedTransaction>() {

    @Suspendable
    override fun call(): SignedTransaction {
        Companion.logger.info("\uD83D\uDE39 \uD83D\uDE39 \uD83D\uDE39  \uD83C\uDFC8 \uD83C\uDFC8 " +
                "\uD83C\uDFC8 \uD83C\uDFC8 \uD83C\uDFC8 \uD83C\uDFC8 " +
                "CustomerProfileFlow started, accountId: ${customerProfile.account.identifier} " )
        val command = CustomerProfileContract.Create()
        val account = serviceHub.accountService.accountInfo(customerProfile.account.identifier.id)
                ?: throw IllegalArgumentException("CustomerProfileFlow: \uD83D\uDC4E\uD83C\uDFFD " +
                        "Account not found: ${customerProfile.account.name}")

        val profile = serviceHub.cordaService(ProfileFinderService::class.java)
                .findCustomerProfile(customerProfile.account.identifier.toString())

        Companion.logger.info("\uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95  build tx ...")
        val txBuilder = TransactionBuilder(serviceHub.networkMapCache.notaryIdentities.first())
        txBuilder.addCommand(command, listOf(serviceHub.ourIdentity.owningKey))
        if (profile != null) {
            txBuilder.addInputState(profile)
        }
        txBuilder.addOutputState(customerProfile)
        txBuilder.verify(serviceHub)

        Companion.logger.info("\uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95  Signing transaction ... ")
        val tx = serviceHub.signInitialTransaction(txBuilder)
        if (customerProfile.account.host.name.toString() == serviceHub.ourIdentity.name.toString()) {
            val signedTx = subFlow(FinalityFlow(tx, listOf()))
            Companion.logger.info("\uD83D\uDE39 \uD83D\uDE39 \uD83D\uDE39  " +
                    "Customer Profile has been created on the ledger for: " +
                    "${account.state.data.name} \uD83E\uDD8A \uD83E\uDD8A")
            return signedTx
        } else {
            throw FlowException("Under Construction - how do we handle this?")
        }
    }
    @Suspendable
    private fun shareState() {
        logger.info("Sharing CustomerProfile state with all nodes in network")
        val me = serviceHub.myInfo.legalIdentities[0]
        val nodes = serviceHub.networkMapCache.allNodes
        for (node in nodes) {
            if (node.legalIdentities[0].name.toString() != me.name.toString()) {
                val userStateAndRef = serviceHub.cordaService(UserFinderService::class.java)
                        .findUserStateAndRef(accountId = customerProfile.account.identifier.id.toString())
                if (userStateAndRef != null) {
                    subFlow(ShareStateAndSyncAccounts(
                            state = userStateAndRef,
                            partyToShareWith = node.legalIdentities[0]))
                    logger.info("\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E " +
                            "CustomerProfile ${customerProfile.account.name} " +
                            "has been shared with party ${node.legalIdentities[0].name} \uD83E\uDDE9")
                }
            }
        }


    }

    companion object {
        private val logger = LoggerFactory.getLogger(CustomerProfileFlow::class.java)
    }

}
