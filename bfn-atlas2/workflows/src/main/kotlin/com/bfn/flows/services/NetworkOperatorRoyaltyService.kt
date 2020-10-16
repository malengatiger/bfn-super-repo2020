package com.bfn.flows.services

import com.bfn.contractstates.states.InvestorPaymentState
import com.bfn.contractstates.states.SupplierPaymentState
import net.corda.core.node.services.CordaService

/**
 * Calculates royalties on operations for the Network Operator
 */
@CordaService
class NetworkOperatorRoyaltyService {

    fun calculateRoyalties(supplierPaymentState: SupplierPaymentState):SupplierPaymentState {
        //todo - calculate royalty amount
        //

        throw Exception("Under Construction")
    }
    fun calculateRoyalties(investorPaymentState: InvestorPaymentState):InvestorPaymentState {

        throw Exception("Under Construction")
    }
}