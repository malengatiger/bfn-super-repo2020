package com.bfn.contractstates.states

import com.r3.corda.lib.accounts.contracts.states.AccountInfo
import com.template.InvoiceOfferContract
import net.corda.core.contracts.BelongsToContract
import net.corda.core.contracts.ContractState
import net.corda.core.identity.AbstractParty
import net.corda.core.serialization.CordaSerializable
import java.util.*

@CordaSerializable
@BelongsToContract(InvoiceOfferContract::class)
class InvoiceOfferState(val invoiceId: UUID,
                        val offerAmount: String,
                        val discount: String,
                        val originalAmount: String,
                        val supplier: AccountInfo,
                        val investor: AccountInfo,
                        val offerDate: String,
                        val acceptanceDate: String,
                        val externalId: String,
                        val invoiceNumber: String,
                        val accepted: Boolean,
                        val offerId: String,
                        val customer: AccountInfo) : ContractState {

    override val participants: List<AbstractParty>
        get() = listOf(supplier.host,
                investor.host, customer.host)

}
