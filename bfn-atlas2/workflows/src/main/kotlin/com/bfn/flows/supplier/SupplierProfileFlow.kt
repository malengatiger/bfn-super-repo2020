package com.bfn.flows.supplier

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.contracts.InvestorProfileContract
import com.bfn.contractstates.states.SupplierProfileState
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
class SupplierProfileFlow(private val supplierProfileState: SupplierProfileState) : FlowLogic<SignedTransaction>() {

    @Suspendable
    override fun call(): SignedTransaction {
        Companion.logger.info("\uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95  \uD83C\uDFC8 \uD83C\uDFC8 \uD83C\uDFC8 \uD83C\uDFC8 \uD83C\uDFC8 \uD83C\uDFC8 " +
                "SupplierProfileFlow started, accountId: ${supplierProfileState.account.identifier} ")
        val account = serviceHub.accountService.accountInfo(UUID.fromString(supplierProfileState.account.identifier.toString()))
                ?: throw IllegalArgumentException("SupplierProfileFlow: \uD83D\uDC4E\uD83C\uDFFD Account not found: ${supplierProfileState.account.identifier.toString()}")

        val profile = serviceHub.cordaService(ProfileFinderService::class.java)
                .findSupplierProfile(supplierProfileState.account.identifier.toString())


        val txBuilder = TransactionBuilder(serviceHub.networkMapCache.notaryIdentities.first())
        val command = InvestorProfileContract.CreateProfile()
        txBuilder.addCommand(command, serviceHub.ourIdentity.owningKey)
        if (profile != null) {
            txBuilder.addInputState(profile)
        }
        txBuilder.addOutputState(supplierProfileState)
        txBuilder.verify(serviceHub)
        Companion.logger.info("\uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95  Signing transaction ... ")
        val tx = serviceHub.signInitialTransaction(txBuilder)
        val signedTx = subFlow(FinalityFlow(tx, listOf()))

        Companion.logger.info("\uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95 " +
                "Supplier Profile has been created for account:" +
                " ${account.state.data.name} \uD83E\uDD8A \uD83E\uDD8A")
        shareState()
        return signedTx
    }

    @Suspendable
    private fun shareState() {
        logger.info("Sharing InvestorProfile state with all nodes in network")
        val me = serviceHub.myInfo.legalIdentities[0]
        val nodes = serviceHub.networkMapCache.allNodes
        for (node in nodes) {
            if (node.legalIdentities[0].name.toString().contains("Notary") ||
                    node.legalIdentities[0].name.toString().contains("Regulator")) {
                logger.info("\uD83D\uDD35 No need to share state with this node: " +
                        "${node.legalIdentities[0].name}")
            } else {
                if (node.legalIdentities[0].name.toString() != me.name.toString()) {
                    val profileStateAndRef = serviceHub.cordaService(ProfileFinderService::class.java)
                            .findSupplierProfile(supplierAccountId = supplierProfileState.account.identifier.id.toString())
                    if (profileStateAndRef != null) {
                        subFlow(ShareStateAndSyncAccounts(
                                state = profileStateAndRef,
                                partyToShareWith = node.legalIdentities[0]))
                        logger.info("\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E " +
                                "InvestorProfile ${supplierProfileState.account.name} " +
                                "has been shared with party ${node.legalIdentities[0].name} \uD83E\uDDE9")
                    }
                }
            }
        }


    }

    companion object {
        private val logger = LoggerFactory.getLogger(SupplierProfileFlow::class.java)
    }

}
