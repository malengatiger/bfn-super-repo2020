package com.bfn.contractstates.states

import com.google.common.collect.ImmutableList
import com.r3.corda.lib.accounts.contracts.states.AccountInfo
import com.template.InvoiceOfferContract
import net.corda.core.contracts.BelongsToContract
import net.corda.core.contracts.ContractState
import net.corda.core.identity.AbstractParty
import net.corda.core.serialization.CordaSerializable
import java.math.BigDecimal
import java.util.*

@CordaSerializable
@BelongsToContract(InvoiceOfferContract::class)
class InvoiceOfferState(val invoiceId: UUID,
                        val offerAmount: BigDecimal,
                        val discount: Double,
                        val originalAmount: BigDecimal,
                        val supplier: AccountInfo,
                        val investor: AccountInfo,
                        val offerDate: Date,
                        val ownerDate: Date,
                        val externalId: String,
                        val invoiceNumber: String,
                        val accepted: Boolean,
                        val customer: AccountInfo) : ContractState {

    override val participants: List<AbstractParty>
        get() = ImmutableList.of<AbstractParty>(supplier.host,
                investor.host)

}
