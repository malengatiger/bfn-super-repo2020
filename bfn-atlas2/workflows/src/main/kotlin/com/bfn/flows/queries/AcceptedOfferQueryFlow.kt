package com.bfn.flows.queries

import com.bfn.contractstates.states.AcceptedOfferState
import com.bfn.flows.services.AcceptedOfferFinderService
import net.corda.core.flows.FlowException
import net.corda.core.flows.FlowLogic
import net.corda.core.flows.StartableByRPC
import org.slf4j.LoggerFactory

@StartableByRPC
class AcceptedOfferQueryFlow(
        private val id: String?,
        private val action: Int) : FlowLogic<List<AcceptedOfferState>>() {

    @Throws(FlowException::class)
    override fun call(): List<AcceptedOfferState> {
        val service = serviceHub.cordaService(AcceptedOfferFinderService::class.java)

        when (action) {
            FIND_FOR_NODE -> return getOffers()
            FIND_FOR_INVESTOR -> return service.getOffersForInvestor(id!!)
            FIND_FOR_SUPPLIER -> return service.getOffersForSupplier(id!!)
            FIND_FOR_OFFER ->  {
                val mList: MutableList<AcceptedOfferState> = mutableListOf()
                val state = service.findAcceptedOffer(offerId = id!!)
                if (state != null) {
                    mList.add(state.state.data)
                }

                return mList
            }
            FIND_FOR_INVOICE -> {
                val mList: MutableList<AcceptedOfferState> = mutableListOf()
                val states = service.findOffersByInvoice(id!!)
                for (state in states) {
                    mList.add(state.state.data)
                }
                return mList

            }
        }

        return getOffers()
    }
    private fun getOffers(): List<AcceptedOfferState> {
        val service = serviceHub.cordaService(AcceptedOfferFinderService::class.java)
        val mList:  MutableList<AcceptedOfferState> = mutableListOf()
        service.getOffersOnNode().forEach() {
            mList.add(it.state.data)
        }
        return mList
    }
    companion object {
        private val logger = LoggerFactory.getLogger(AcceptedOfferQueryFlow::class.java)
        const val FIND_FOR_NODE = 1
        const val FIND_FOR_SUPPLIER = 2
        const val FIND_FOR_INVESTOR = 3
        const val FIND_FOR_INVOICE = 4
        const val FIND_FOR_OFFER = 5
    }



}
