package com.bfn.flows.queries

import com.bfn.contractstates.states.InvoiceOfferState
import com.bfn.flows.services.InvoiceOfferFinderService
import net.corda.core.flows.FlowException
import net.corda.core.flows.FlowLogic
import net.corda.core.flows.StartableByRPC
import org.slf4j.LoggerFactory

@StartableByRPC
class InvoiceOfferQueryFlow(
        private val id: String?,
        private val action: Int) : FlowLogic<List<InvoiceOfferState>>() {

    @Throws(FlowException::class)
    override fun call(): List<InvoiceOfferState> {
        val service = serviceHub.cordaService(InvoiceOfferFinderService::class.java)


        when (action) {
            FIND_FOR_NODE -> return getOffers()
            FIND_FOR_INVESTOR -> return service.getOffersForInvestor(id!!)
            FIND_FOR_SUPPLIER -> return service.getOffersForSupplier(id!!)
        }

        return getOffers()
    }
    private fun getOffers(): List<InvoiceOfferState> {
        val service = serviceHub.cordaService(InvoiceOfferFinderService::class.java)
        val mList:  MutableList<InvoiceOfferState> = mutableListOf()
        service.getOffersOnNode().forEach() {
            mList.add(it.state.data)
        }
        return mList
    }
    companion object {
        private val logger = LoggerFactory.getLogger(InvoiceQueryFlow::class.java)
        const val FIND_FOR_NODE = 1
        const val FIND_FOR_SUPPLIER = 2
        const val FIND_FOR_INVESTOR = 3
    }



}
