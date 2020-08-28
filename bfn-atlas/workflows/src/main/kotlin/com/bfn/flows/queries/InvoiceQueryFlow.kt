package com.bfn.flows.queries

import com.bfn.contractstates.states.InvoiceState
import com.bfn.flows.services.InvoiceFinderService
import net.corda.core.flows.FlowException
import net.corda.core.flows.FlowLogic
import net.corda.core.flows.StartableByRPC
import org.slf4j.LoggerFactory

@StartableByRPC
class InvoiceQueryFlow(
        private val id: String?,
        private val action: Int) : FlowLogic<List<InvoiceState>>() {

    @Throws(FlowException::class)
    override fun call(): List<InvoiceState> {
        val serviceHub = serviceHub
        val service = serviceHub.cordaService(InvoiceFinderService::class.java)

        when (action) {
            FIND_FOR_NODE -> return service.findInvoicesForNode()
            FIND_FOR_INVESTOR -> return service.findInvoicesForInvestor(id!!)
            FIND_FOR_SUPPLIER -> return service.findInvoicesForSupplier(id!!)
            FIND_FOR_CUSTOMER -> return service.findInvoicesForCustomer(id!!)
        }

        return service.findInvoicesForNode()
    }

    companion object {
        private val logger = LoggerFactory.getLogger(InvoiceQueryFlow::class.java)
        const val FIND_FOR_NODE = 1
        const val FIND_FOR_SUPPLIER = 2
        const val FIND_FOR_INVESTOR = 3
        const val FIND_FOR_CUSTOMER = 4
    }

}
