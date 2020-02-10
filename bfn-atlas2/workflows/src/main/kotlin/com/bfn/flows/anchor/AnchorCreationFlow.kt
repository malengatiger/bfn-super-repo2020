package com.bfn.flows.anchor

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.contracts.AnchorContract
import com.bfn.contractstates.states.AnchorState
import com.r3.corda.lib.accounts.workflows.ourIdentity
import net.corda.core.flows.FinalityFlow
import net.corda.core.flows.FlowLogic
import net.corda.core.flows.InitiatingFlow
import net.corda.core.flows.StartableByRPC
import net.corda.core.transactions.SignedTransaction
import net.corda.core.transactions.TransactionBuilder
import org.slf4j.LoggerFactory

/**
 * Create the AnchorInvestor. A node can have only one of these.
 * This anchor investor owns and controls the node
 */
@InitiatingFlow
@StartableByRPC
class AnchorCreationFlow(private val anchor: AnchorState ) : FlowLogic<SignedTransaction>() {

    @Suspendable
    override fun call(): SignedTransaction {
        Companion.logger.info(pp + "AnchorCreationFlow started, name: ${anchor.name}" )

        val existingAnchor = serviceHub.vaultService.queryBy(AnchorState::class.java).states.singleOrNull()
        if (existingAnchor != null) {
            val msg = "\uD83C\uDFC0 There can be only one Kobe Bryant!! RIP \uD83C\uDFC0"
            logger.warn(msg)
            throw IllegalArgumentException("Anchor already exists: ${existingAnchor.state.data.account.name}")
        }
        val command = AnchorContract.Create()

        val txBuilder = TransactionBuilder(serviceHub.networkMapCache.notaryIdentities.first())
        txBuilder.addCommand(command, serviceHub.ourIdentity.owningKey)
        txBuilder.addOutputState(anchor)
        txBuilder.verify(serviceHub)

        val tx = serviceHub.signInitialTransaction(txBuilder)
        subFlow(FinalityFlow(tx, listOf()))
        Companion.logger.info("$pp Yebo Gogo!! - Anchor has been created: ${anchor.name} $pp")
        return tx
    }

    private val pp = "\uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95";
    companion object {
        private val logger = LoggerFactory.getLogger(AnchorCreationFlow::class.java)
    }

}
