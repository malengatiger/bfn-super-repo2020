package com.bfn.flows

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.contracts.InvestorProfileContract
import com.bfn.contractstates.states.InvestorProfileState
import com.bfn.flows.services.InvoiceFinderService
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
class InvestorProfileFlow(private val investorProfile: InvestorProfileState) : FlowLogic<SignedTransaction>() {

    @Suspendable
    override fun call(): SignedTransaction {
        Companion.logger.info("\uD83D\uDE39 \uD83D\uDE39 \uD83D\uDE39  \uD83C\uDFC8 \uD83C\uDFC8 \uD83C\uDFC8 \uD83C\uDFC8 \uD83C\uDFC8 \uD83C\uDFC8 " +
                "InvestorProfileFlow started, accountId: ${investorProfile.accountId} " )
        val command = InvestorProfileContract.CreateProfile()
        val account = serviceHub.accountService.accountInfo(UUID.fromString(investorProfile.accountId))
                ?: throw IllegalArgumentException("InvestorProfileFlow: \uD83D\uDC4E\uD83C\uDFFD Account not found: ${investorProfile.accountId}")

        val profile = serviceHub.cordaService(ProfileFinderService::class.java)
                .findInvestorProfile(investorProfile.accountId)
        if (profile == null) {
            Companion.logger.info("\uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95 will create new profile ... ")
        } else {
            Companion.logger.info("\uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95 will update profile ... ")
        }
        Companion.logger.info("\uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95  build tx ...")
        val txBuilder = TransactionBuilder(serviceHub.networkMapCache.notaryIdentities.first())
        txBuilder.addCommand(command, serviceHub.ourIdentity.owningKey)
        if (profile != null) {
            txBuilder.addInputState(profile)
        }
        txBuilder.addOutputState(investorProfile)
        txBuilder.verify(serviceHub)

        Companion.logger.info("\uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95  Signing transaction ... ")
        val tx = serviceHub.signInitialTransaction(txBuilder)
        val signedTx = subFlow(FinalityFlow(tx, listOf()))
        Companion.logger.info("\uD83D\uDE39 \uD83D\uDE39 \uD83D\uDE39  " +
                "Investor Profile has been created for: " +
                "${account.state.data.name} \uD83E\uDD8A \uD83E\uDD8A")
        return signedTx
    }

    companion object {
        private val logger = LoggerFactory.getLogger(InvestorProfileFlow::class.java)
    }

}
