package com.bfn.contractstates.states

import com.r3.corda.lib.accounts.contracts.states.AccountInfo
import com.template.AcceptedOfferContract
import net.corda.core.contracts.BelongsToContract
import net.corda.core.contracts.ContractState
import net.corda.core.identity.AbstractParty
import net.corda.core.serialization.CordaSerializable
import java.util.*

@CordaSerializable
@BelongsToContract(AcceptedOfferContract::class)
class AcceptedOfferState(val invoiceId: UUID,
                         val offerAmount: String,
                         val discount: String,
                         val originalAmount: String,
                         val supplier: SupplierProfileState,
                         val investor: InvestorProfileState,
                         val acceptanceDate: String,
                         val externalId: String,
                         val invoiceNumber: String,
                         val offerId: String,
                         val dateRegistered: String,
                         val customer: CustomerProfileState) : ContractState {

    override val participants: List<AbstractParty>
        get() = listOf(supplier.account.host,
                investor.account.host, customer.account.host)

}
