package com.bfn.flows.queries

import com.bfn.contractstates.states.InvoiceState
import com.bfn.flows.services.InvoiceFinderService
import net.corda.core.flows.FlowException
import net.corda.core.flows.FlowLogic
import net.corda.core.flows.StartableByRPC
import org.slf4j.LoggerFactory

@StartableByRPC
class FindInvoiceFlow(
        private val id: String) : FlowLogic<InvoiceState>() {

    @Throws(FlowException::class)
    override fun call(): InvoiceState {
        val serviceHub = serviceHub
        val service = serviceHub.cordaService(InvoiceFinderService::class.java)
        val m = service.findInvoice(id)
        if (m == null) {
            Companion.logger.info("\uD83D\uDD06 Invoice $id not found")
        }
        return m!!
    }

    companion object {
        private val logger = LoggerFactory.getLogger(FindInvoiceFlow::class.java)

    }

}
