package com.bfn.flows

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.contracts.InvestorProfileContract
import com.bfn.contractstates.contracts.UserContract
import com.bfn.contractstates.states.UserState
import com.bfn.flows.supplier.SupplierProfileFlow
import com.r3.corda.lib.accounts.contracts.states.AccountInfo
import com.r3.corda.lib.accounts.workflows.internal.accountService
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
        return signedTx

    }
    companion object {
        private val logger = LoggerFactory.getLogger(CreateUserFlow::class.java)
    }

}

