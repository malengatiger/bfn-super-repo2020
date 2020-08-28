package com.bfn.flows.anchor

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.contracts.AnchorContract
import com.bfn.contractstates.states.AnchorState
import com.r3.corda.lib.accounts.workflows.ourIdentity
import net.corda.core.flows.FinalityFlow
import net.corda.core.flows.FlowLogic
import net.corda.core.flows.InitiatingFlow
import net.corda.core.flows.StartableByRPC
import net.corda.core.transactions.TransactionBuilder
import org.slf4j.LoggerFactory
import java.util.*

/**
 * Replace old anchor state with this new one.
 */
@InitiatingFlow
@StartableByRPC
class AnchorUpdateFlow(
        private val anchor: AnchorState ) : FlowLogic<AnchorState>() {

    @Suspendable
    override fun call(): AnchorState {
        Companion.logger.info("$pp AnchorUpdateFlow started ...")

        val existingAnchor = serviceHub.vaultService.queryBy(AnchorState::class.java).states.singleOrNull()
                ?: throw IllegalArgumentException("Anchor does not exist")

        val command = AnchorContract.Update()
        val newAnchor =
            AnchorState(issuedBy = serviceHub.myInfo.legalIdentities.first(),
                account = existingAnchor.state.data.account, minimumInvoiceAmount = anchor.minimumInvoiceAmount,
                maximumInvoiceAmount = anchor.maximumInvoiceAmount, maximumInvestment = anchor.maximumInvestment,
                defaultOfferDiscount = anchor.defaultOfferDiscount, tradeFrequencyInMinutes = anchor.tradeFrequencyInMinutes,
                tradeMatrixItems = anchor.tradeMatrixItems, date = Date(), name = existingAnchor.state.data.name,
                    email = anchor.email, cellphone = anchor.cellphone)

        val txBuilder = TransactionBuilder(serviceHub.networkMapCache.notaryIdentities.first())
        txBuilder.addCommand(command, serviceHub.ourIdentity.owningKey)
        txBuilder.addInputState(existingAnchor)
        txBuilder.addOutputState(newAnchor)
        txBuilder.verify(serviceHub)

        val tx = serviceHub.signInitialTransaction(txBuilder)
        subFlow(FinalityFlow(tx, listOf()))
        Companion.logger.info(pp + "Yebo Gogo! - Anchor has been updated $pp")
        return newAnchor
    }

    private val pp = "\uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95";
    companion object {
        private val logger = LoggerFactory.getLogger(AnchorUpdateFlow::class.java)
    }

}
