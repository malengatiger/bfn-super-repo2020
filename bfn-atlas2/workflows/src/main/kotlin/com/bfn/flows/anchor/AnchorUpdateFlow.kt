package com.bfn.flows.anchor

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.contracts.AnchorContract
import com.bfn.contractstates.states.AnchorState
import com.bfn.contractstates.states.TradeMatrix
import com.r3.corda.lib.accounts.contracts.states.AccountInfo
import com.r3.corda.lib.accounts.workflows.internal.accountService
import com.r3.corda.lib.accounts.workflows.ourIdentity
import net.corda.core.flows.FinalityFlow
import net.corda.core.flows.FlowLogic
import net.corda.core.flows.InitiatingFlow
import net.corda.core.flows.StartableByRPC
import net.corda.core.transactions.TransactionBuilder
import org.slf4j.LoggerFactory
import java.math.BigDecimal
import java.util.*


@InitiatingFlow
@StartableByRPC
class AnchorUpdateFlow(
                       private val minimumInvoiceAmount: BigDecimal,
                       private val maximumInvoiceAmount: BigDecimal,
                       private val maximumInvestment: BigDecimal,
                       private val tradeFrequencyInMinutes: Int,
                       private val tradeMatrices: MutableList<TradeMatrix>,
                       private val defaultOfferDiscount: Double ) : FlowLogic<AnchorState>() {

    @Suspendable
    override fun call(): AnchorState {
        Companion.logger.info("$pp AnchorUpdateFlow started ...")

        val existingAnchor = serviceHub.vaultService.queryBy(AnchorState::class.java).states.singleOrNull()
                ?: throw IllegalArgumentException("Anchor does not exist")

        val command = AnchorContract.Update()
        val anchor =
            AnchorState(issuedBy = serviceHub.myInfo.legalIdentities.first(),
                account = existingAnchor.state.data.account, minimumInvoiceAmount = minimumInvoiceAmount,
                maximumInvoiceAmount = maximumInvoiceAmount, maximumInvestment = maximumInvestment,
                defaultOfferDiscount = defaultOfferDiscount, tradeFrequencyInMinutes = tradeFrequencyInMinutes,
                tradeMatrices = tradeMatrices, date = Date())

        val txBuilder = TransactionBuilder(serviceHub.networkMapCache.notaryIdentities.first())
        txBuilder.addCommand(command, serviceHub.ourIdentity.owningKey)
        txBuilder.addInputState(existingAnchor)
        txBuilder.addOutputState(anchor)
        txBuilder.verify(serviceHub)

        val tx = serviceHub.signInitialTransaction(txBuilder)
        subFlow(FinalityFlow(tx, listOf()))
        Companion.logger.info(pp + "Yebo Gogo! - Anchor has been updated $pp")
        return anchor
    }

    private val pp = "\uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95";
    companion object {
        private val logger = LoggerFactory.getLogger(AnchorUpdateFlow::class.java)
    }

}
