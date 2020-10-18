package com.bfn.flows.operator

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.states.NetworkInvestorRoyaltyState
import com.r3.corda.lib.accounts.workflows.ourIdentity
import com.template.NetworkInvestorRoyaltyContract
import net.corda.core.flows.FinalityFlow
import net.corda.core.flows.FlowLogic
import net.corda.core.flows.InitiatingFlow
import net.corda.core.flows.StartableByRPC
import net.corda.core.transactions.SignedTransaction
import net.corda.core.transactions.TransactionBuilder
import org.slf4j.LoggerFactory

/**
 * Manage network operator royalty payments
 * Royalties are derived from investor payments
 */
@InitiatingFlow
@StartableByRPC
class NetworkInvestorRoyaltyFlow(
        private val investorRoyalty: NetworkInvestorRoyaltyState) : FlowLogic<SignedTransaction>() {

    @Suspendable
    override fun call(): SignedTransaction {
        Companion.logger.info(pp + "NetworkInvestorRoyaltyFlow started, name: ${investorRoyalty.amount}")

        val command = NetworkInvestorRoyaltyContract.CreateRoyalty()

        val txBuilder = TransactionBuilder(serviceHub.networkMapCache.notaryIdentities.first())
        txBuilder.addCommand(command, serviceHub.ourIdentity.owningKey)
        txBuilder.verify(serviceHub)
        txBuilder.addOutputState(investorRoyalty)

        val tx = serviceHub.signInitialTransaction(txBuilder)
        subFlow(FinalityFlow(tx, listOf()))

        Companion.logger.info("$pp Yebo Gogo!! - NetworkInvestorRoyaltyFlow done OK $pp")
        return tx
    }

    private val pp = "\uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95";
    companion object {
        private val logger = LoggerFactory.getLogger(NetworkInvestorRoyaltyFlow::class.java)
    }

}
