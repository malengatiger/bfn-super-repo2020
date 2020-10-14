package com.bfn.flows.queries

import com.bfn.contractstates.states.PurchaseOrderState
import com.bfn.flows.services.PurchaseOrderFinderService
import net.corda.core.flows.FlowException
import net.corda.core.flows.FlowLogic
import net.corda.core.flows.StartableByRPC
import org.slf4j.LoggerFactory

@StartableByRPC
class PurchaseOrderQueryFlow(
        private val id: String?,
        private val action: Int) : FlowLogic<List<PurchaseOrderState>>() {

    @Throws(FlowException::class)
    override fun call(): List<PurchaseOrderState> {

        when (action) {
            FIND_FOR_NODE -> return getNodeInvoices()
            FIND_FOR_SUPPLIER -> return findPurchaseOrdersForSupplier(id!!)
            FIND_FOR_CUSTOMER -> return findPurchaseOrdersForCustomer(id!!)
        }

        return getNodeInvoices()
    }

    private fun findPurchaseOrdersForCustomer(customerId: String) : List<PurchaseOrderState> {
        val service = serviceHub.cordaService(PurchaseOrderFinderService::class.java)
        val mList: MutableList<PurchaseOrderState> = mutableListOf()
        service.findAllPurchaseOrders().forEach() {
            if (it.state.data.customer.identifier.id.toString() == customerId) {
                mList.add(it.state.data)
            }
        }
        return mList
    }
    private fun findPurchaseOrdersForSupplier( supplierId: String) : List<PurchaseOrderState> {
        val service = serviceHub.cordaService(PurchaseOrderFinderService::class.java)
        val mList: MutableList<PurchaseOrderState> = mutableListOf()
        service.findAllPurchaseOrders().forEach() {
            if (it.state.data.supplier.identifier.id.toString() == supplierId) {
                mList.add(it.state.data)
            }
        }
        return mList
    }

    private fun getNodeInvoices() : List<PurchaseOrderState> {
        val service = serviceHub.cordaService(PurchaseOrderFinderService::class.java)
        val mList: MutableList<PurchaseOrderState> = mutableListOf()
        service.findAllPurchaseOrders().forEach() {
            mList.add(it.state.data)
        }
        return mList
    }

    companion object {
        private val logger = LoggerFactory.getLogger(PurchaseOrderQueryFlow::class.java)
        const val FIND_FOR_NODE = 1
        const val FIND_FOR_SUPPLIER = 2
        const val FIND_FOR_CUSTOMER = 3
    }

}
