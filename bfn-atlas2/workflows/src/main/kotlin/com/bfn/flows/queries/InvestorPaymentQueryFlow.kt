package com.bfn.flows.queries

import com.bfn.contractstates.states.InvestorPaymentState
import com.bfn.flows.services.InvestorPaymentFinderService
import com.bfn.flows.services.SupplierPaymentFinderService
import net.corda.core.flows.FlowException
import net.corda.core.flows.FlowLogic
import net.corda.core.flows.StartableByRPC
import org.slf4j.LoggerFactory

@StartableByRPC
class InvestorPaymentQueryFlow(
        private val id: String?,
        private val action: Int) : FlowLogic<List<InvestorPaymentState>>() {

    @Throws(FlowException::class)
    override fun call(): List<InvestorPaymentState> {
        val service = serviceHub.cordaService(InvestorPaymentFinderService::class.java)

        when (action) {
            FIND_FOR_NODE -> return getPayments()
            FIND_FOR_INVESTOR -> return service.findPaymentsForInvestor(investorId = id!!)
            FIND_FOR_SUPPLIER -> return service.findPaymentsForSupplier(supplierId = id!!)
            FIND_FOR_CUSTOMER -> return service.findPaymentsForCustomer(customerId  = id!!)
            FIND_FOR_INVOICE -> {
                val mList: MutableList<InvestorPaymentState> = mutableListOf()
                val state = service.findPaymentForInvoice(invoiceId = id!!)
                if (state != null) {
                    mList.add(state.state.data)
                }
                return mList

            }
        }

        return getPayments()
    }
    private fun getPayments(): List<InvestorPaymentState> {
        val service = serviceHub.cordaService(InvestorPaymentFinderService::class.java)
        val mList:  MutableList<InvestorPaymentState> = mutableListOf()
        service.getAllPaymentStateAndRefs().forEach() {
            mList.add(it.state.data)
        }
        return mList
    }
    companion object {
        private val logger = LoggerFactory.getLogger(InvestorPaymentQueryFlow::class.java)
        const val FIND_FOR_NODE = 1
        const val FIND_FOR_SUPPLIER = 2
        const val FIND_FOR_INVESTOR = 3
        const val FIND_FOR_INVOICE = 4
        const val FIND_FOR_CUSTOMER = 5
    }



}
