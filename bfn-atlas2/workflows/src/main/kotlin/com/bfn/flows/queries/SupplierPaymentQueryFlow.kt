package com.bfn.flows.queries

import com.bfn.contractstates.states.SupplierPaymentState
import com.bfn.flows.services.SupplierPaymentFinderService
import net.corda.core.flows.FlowException
import net.corda.core.flows.FlowLogic
import net.corda.core.flows.StartableByRPC
import org.slf4j.LoggerFactory

@StartableByRPC
class SupplierPaymentQueryFlow(
        private val id: String?,
        private val action: Int) : FlowLogic<List<SupplierPaymentState>>() {

    @Throws(FlowException::class)
    override fun call(): List<SupplierPaymentState> {
        val service = serviceHub.cordaService(SupplierPaymentFinderService::class.java)

        when (action) {
            FIND_FOR_NODE -> return getPayments()
            FIND_FOR_INVESTOR -> return service.findPaymentsForInvestor(investorId = id!!)
            FIND_FOR_SUPPLIER -> return service.findPaymentsForSupplier(supplierId = id!!)
            FIND_FOR_CUSTOMER -> return service.findPaymentsForCustomer(customerId  = id!!)
            FIND_FOR_INVOICE -> {
                val mList: MutableList<SupplierPaymentState> = mutableListOf()
                val state = service.findPaymentForInvoice(invoiceId = id!!)
                if (state != null) {
                    mList.add(state.state.data)
                }
                return mList
            }
            FIND_FOR_OFFER -> {
                val mList: MutableList<SupplierPaymentState> = mutableListOf()
                val state = service.findSupplierPaymentForOffer(offerId = id!!)
                if (state != null) {
                    mList.add(state.state.data)
                }
                return mList
            }
        }

        return getPayments()
    }
    private fun getPayments(): List<SupplierPaymentState> {
        val service = serviceHub.cordaService(SupplierPaymentFinderService::class.java)
        val mList:  MutableList<SupplierPaymentState> = mutableListOf()
        service.getAllPaymentStateAndRefs().forEach() {
            mList.add(it.state.data)
        }
        return mList
    }
    companion object {
        private val logger = LoggerFactory.getLogger(SupplierPaymentQueryFlow::class.java)
        const val FIND_FOR_NODE = 1
        const val FIND_FOR_SUPPLIER = 2
        const val FIND_FOR_INVESTOR = 3
        const val FIND_FOR_INVOICE = 4
        const val FIND_FOR_OFFER = 5
        const val FIND_FOR_CUSTOMER = 6
    }



}
