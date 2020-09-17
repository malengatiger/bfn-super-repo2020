package com.bfn.flows.supplier

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.contracts.InvestorProfileContract
import com.bfn.contractstates.states.SupplierProfileState
import com.bfn.flows.services.ProfileFinderService
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
                "SupplierProfileFlow started, accountId: ${supplierProfileState.account.identifier} " )
        val account = serviceHub.accountService.accountInfo(UUID.fromString(supplierProfileState.account.identifier.toString()))
                ?: throw IllegalArgumentException("SupplierProfileFlow: \uD83D\uDC4E\uD83C\uDFFD Account not found: ${supplierProfileState.account.identifier.toString()}")

        val profile = serviceHub.cordaService(ProfileFinderService::class.java)
                .findSupplierProfile(supplierProfileState.account.identifier.toString())
        if (profile == null) {
            Companion.logger.info("\uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95 will create new profile ... ")
        } else {
            Companion.logger.info("\uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95 will update profile ... ")
        }

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
        return signedTx
    }

    companion object {
        private val logger = LoggerFactory.getLogger(SupplierProfileFlow::class.java)
    }

}
