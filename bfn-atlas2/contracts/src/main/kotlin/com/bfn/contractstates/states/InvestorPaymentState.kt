package com.bfn.contractstates.states

import com.bfn.contractstates.contracts.InvestorPaymentContract
import net.corda.core.contracts.*
import net.corda.core.identity.AbstractParty
import net.corda.core.serialization.CordaSerializable

/**
 * Customer pays the Investor; the OriginalAmount (Amount + Tax)
 */
@BelongsToContract(InvestorPaymentContract::class)
@CordaSerializable
class InvestorPaymentState(
         val investorPaymentId: String,
         val supplierPayment: SupplierPaymentState,
         val investorProfile: InvestorProfileState,
         val customerProfile: CustomerProfileState,
         val dateRegistered: String) : ContractState {

    override val participants: List<AbstractParty>
        get() = listOf(supplierPayment.acceptedOffer.supplier.account.host,
                supplierPayment.acceptedOffer.customer.account.host,
                supplierPayment.acceptedOffer.investor.account.host)

}
