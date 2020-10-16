package com.bfn.flows.operator

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.contracts.NetworkOperatorContract
import com.bfn.contractstates.states.NetworkOperatorState
import com.r3.corda.lib.accounts.workflows.ourIdentity
import net.corda.core.flows.FinalityFlow
import net.corda.core.flows.FlowLogic
import net.corda.core.flows.InitiatingFlow
import net.corda.core.flows.StartableByRPC
import net.corda.core.transactions.SignedTransaction
import net.corda.core.transactions.TransactionBuilder
import org.slf4j.LoggerFactory

/**
 * Manage network operator royalty payments
 * Royalties are derived from supplier and investor payments
 */
@InitiatingFlow
@StartableByRPC
class NetworkOperatorSupplierRoyaltyFlow(private val supplierPaymentId: String ) : FlowLogic<SignedTransaction>() {

    @Suspendable
    override fun call(): SignedTransaction {
        Companion.logger.info(pp + "NetworkOperatorSupplierRoyaltyFlow started, name: $supplierPaymentId" )

        val existingOperator = serviceHub.vaultService.queryBy(NetworkOperatorState::class.java).states.singleOrNull()
        if (existingOperator != null) {
            val msg = "\uD83C\uDFC0 There can be only one Kobe Bryant!! RIP \uD83C\uDFC0"
            logger.warn(msg)
            throw IllegalArgumentException("NetworkOperator already exists: ${existingOperator.state.data.account.name}")
        }
        val command = NetworkOperatorContract.Create()

        val txBuilder = TransactionBuilder(serviceHub.networkMapCache.notaryIdentities.first())
        txBuilder.addCommand(command, serviceHub.ourIdentity.owningKey)
//        txBuilder.addOutputState(networkOperatorState)
        txBuilder.verify(serviceHub)

        val tx = serviceHub.signInitialTransaction(txBuilder)
        subFlow(FinalityFlow(tx, listOf()))

        Companion.logger.info("$pp Yebo Gogo!! -NetworkOperatorSupplierRoyaltyFlow: $supplierPaymentId $pp")
        return tx
    }

    private val pp = "\uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95";
    companion object {
        private val logger = LoggerFactory.getLogger(NetworkOperatorSupplierRoyaltyFlow::class.java)
    }

}
