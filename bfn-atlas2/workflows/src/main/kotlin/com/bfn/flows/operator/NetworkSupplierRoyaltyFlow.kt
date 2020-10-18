package com.bfn.flows.operator

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.states.NetworkSupplierRoyaltyState
import com.r3.corda.lib.accounts.workflows.ourIdentity
import com.template.NetworkSupplierRoyaltyContract
import net.corda.core.flows.FinalityFlow
import net.corda.core.flows.FlowLogic
import net.corda.core.flows.InitiatingFlow
import net.corda.core.flows.StartableByRPC
import net.corda.core.transactions.SignedTransaction
import net.corda.core.transactions.TransactionBuilder
import org.slf4j.LoggerFactory

/**
 * Manage network operator royalty payments
 * Royalties are derived from supplier payments
 */
@InitiatingFlow
@StartableByRPC
class NetworkSupplierRoyaltyFlow(private val supplierRoyalty: NetworkSupplierRoyaltyState ) : FlowLogic<SignedTransaction>() {

    @Suspendable
    override fun call(): SignedTransaction {
        Companion.logger.info(pp + "NetworkSupplierRoyaltyFlow started, name: ${supplierRoyalty.amount}")

        val command = NetworkSupplierRoyaltyContract.CreateRoyalty()

        val txBuilder = TransactionBuilder(serviceHub.networkMapCache.notaryIdentities.first())
        txBuilder.addCommand(command, serviceHub.ourIdentity.owningKey)
        txBuilder.addOutputState(supplierRoyalty)
        txBuilder.verify(serviceHub)

        val tx = serviceHub.signInitialTransaction(txBuilder)
        subFlow(FinalityFlow(tx, listOf()))

        Companion.logger.info("$pp Yebo Gogo!! - NetworkSupplierRoyaltyFlow executed OK $pp")
        return tx
    }

    private val pp = "\uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95";
    companion object {
        private val logger = LoggerFactory.getLogger(NetworkSupplierRoyaltyFlow::class.java)
    }

}
