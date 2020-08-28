package com.bfn.flows.queries

import com.bfn.contractstates.states.OfferAndTokenState
import com.bfn.flows.services.TokenFinderService
import net.corda.core.flows.FlowException
import net.corda.core.flows.FlowLogic
import net.corda.core.flows.StartableByRPC

@StartableByRPC
class TokenQueryFlow(
        private val accountId: String?) : FlowLogic<List<OfferAndTokenState>>() {

    @Throws(FlowException::class)
    override fun call(): List<OfferAndTokenState> {
        val service = serviceHub.cordaService(TokenFinderService::class.java)
        if (accountId != null) {
            return service.findTokensForAccount(accountId)
        }

        return service.findTokensForNode()
    }



}
