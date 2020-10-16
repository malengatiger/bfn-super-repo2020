package com.bfn.contractstates.states

import com.bfn.contractstates.contracts.InvestorPaymentContract
import com.bfn.contractstates.contracts.SupplierProfileContract
import net.corda.core.contracts.*
import net.corda.core.identity.AbstractParty
import net.corda.core.serialization.CordaSerializable

@BelongsToContract(SupplierProfileContract::class)
@CordaSerializable
class SupplierPaymentState(
        val supplierPaymentId: String,
        val acceptedOffer: AcceptedOfferState,
        val supplierProfile: SupplierProfileState,
        val customerProfile: CustomerProfileState,
        val dateRegistered: String) : ContractState {

    override val participants: List<AbstractParty>
        get() = listOf(acceptedOffer.supplier.account.host,
                acceptedOffer.customer.account.host, acceptedOffer.investor.account.host)

}
