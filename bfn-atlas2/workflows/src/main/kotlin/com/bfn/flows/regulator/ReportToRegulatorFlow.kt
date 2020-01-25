package com.bfn.flows.regulator

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.states.InvoiceState
import com.bfn.flows.services.RegulatorFinderService
import net.corda.core.flows.*
import net.corda.core.node.NodeInfo
import net.corda.core.transactions.SignedTransaction
import org.slf4j.LoggerFactory
import java.lang.IllegalArgumentException

@StartableByRPC
@InitiatingFlow
class ReportToRegulatorFlow(private val signedTransaction: SignedTransaction) : FlowLogic<Void?>() {
    @Suspendable
    @Throws(FlowException::class)
    override fun call(): Void? {
        Companion.logger.info("\uD83D\uDE21  \uD83D\uDE21  \uD83D\uDE21  \uD83D\uDE21 " +
                "reporting to Regulator, Senor!")
        val service = serviceHub.cordaService(RegulatorFinderService::class.java)
        val regulator: NodeInfo? = service.findRegulatorNode() ?: throw IllegalArgumentException("Regulator Node not found")

        val regulatorParty = regulator!!.legalIdentities.first()
        val session = initiateFlow(regulatorParty)

        subFlow(SendTransactionFlow(session,signedTransaction))
        Companion.logger.info("\uD83E\uDD6C \uD83E\uDD6C \uD83E\uDD6C" +
                "Done sending transaction to Regulator, Senor! \uD83E\uDD6C \uD83E\uDD6C " +
                "outputs: ${signedTransaction.coreTransaction.outputs.size}")
        
        return null
    }

    companion object {
        private val logger = LoggerFactory.getLogger(ReportToRegulatorFlow::class.java)
    }

}
