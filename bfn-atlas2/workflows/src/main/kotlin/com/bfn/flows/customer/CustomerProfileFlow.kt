package com.bfn.flows.customer

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.contracts.CustomerProfileContract
import com.bfn.contractstates.states.CustomerProfileState
import com.bfn.flows.Em
import com.bfn.flows.services.ProfileFinderService
import com.r3.corda.lib.accounts.workflows.flows.ShareStateAndSyncAccounts
import com.r3.corda.lib.accounts.workflows.internal.accountService
import com.r3.corda.lib.accounts.workflows.ourIdentity
import net.corda.core.flows.*
import net.corda.core.transactions.SignedTransaction
import net.corda.core.transactions.TransactionBuilder
import org.slf4j.LoggerFactory


@InitiatingFlow
@StartableByRPC
class CustomerProfileFlow(private val customerProfile: CustomerProfileState) : FlowLogic<SignedTransaction>() {

    @Suspendable
    override fun call(): SignedTransaction {
        Companion.logger.info("${Em.DOLPHIN}${Em.DOLPHIN}${Em.DOLPHIN}${Em.DOLPHIN} " +
                "CustomerProfileFlow started, accountId: ${customerProfile.account.identifier} " )
        val command = CustomerProfileContract.Create()
        val account = serviceHub.accountService.accountInfo(customerProfile.account.identifier.id)
                ?: throw IllegalArgumentException("CustomerProfileFlow: \uD83D\uDC4E\uD83C\uDFFD " +
                        "Account not found: ${customerProfile.account.name}")

        val profile = serviceHub.cordaService(ProfileFinderService::class.java)
                .findCustomerProfile(customerProfile.account.identifier.toString())

        val txBuilder = TransactionBuilder(serviceHub.networkMapCache.notaryIdentities.first())
        txBuilder.addCommand(command, listOf(serviceHub.ourIdentity.owningKey))
        if (profile != null) {
            txBuilder.addInputState(profile)
        }
        txBuilder.addOutputState(customerProfile)
        txBuilder.verify(serviceHub)

        Companion.logger.info("${Em.DOLPHIN}${Em.DOLPHIN}  Signing transaction ... ")
        val tx = serviceHub.signInitialTransaction(txBuilder)
        val signedTx = subFlow(FinalityFlow(tx, listOf()))
        Companion.logger.info("${Em.DOLPHIN} ${Em.DOLPHIN} ${Em.DOLPHIN} ${Em.DOLPHIN}  " +
                "Customer Profile has been created on the ledger for: " +
                "${account.state.data.name} \uD83E\uDD8A \uD83E\uDD8A")
        shareState()
        return signedTx
    }
    @Suspendable
    private fun shareState() {
        logger.info("${Em.DOLPHIN} ${Em.DOLPHIN} Sharing CustomerProfile state with all nodes in network")
        val me = serviceHub.myInfo.legalIdentities[0]
        val nodes = serviceHub.networkMapCache.allNodes
        for (node in nodes) {
            if (node.legalIdentities[0].name.toString().contains("Notary") ||
                    node.legalIdentities[0].name.toString().contains("Regulator")) {
                logger.info("\uD83D\uDD35 No need to share state with this node: " +
                        "${node.legalIdentities[0].name}")
            } else {
                if (node.legalIdentities[0].name.toString() != me.name.toString()) {
                    val stateAndRef = serviceHub.cordaService(ProfileFinderService::class.java)
                            .findCustomerProfile(customerId = customerProfile.account.identifier.id.toString())
                    if (stateAndRef != null) {
                        subFlow(ShareStateAndSyncAccounts(
                                state = stateAndRef,
                                partyToShareWith = node.legalIdentities[0]))
                        logger.info("\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E " +
                                "CustomerProfile ${customerProfile.account.name} " +
                                "has been shared with party ${node.legalIdentities[0].name} \uD83E\uDDE9")
                    } else {
                        logger.warn("${Em.ERRORS}Unable to share CustomerProfile with ${node.legalIdentities[0].name}")
                    }
                }
            }
        }


    }

    companion object {
        private val logger = LoggerFactory.getLogger(CustomerProfileFlow::class.java)
    }

}
