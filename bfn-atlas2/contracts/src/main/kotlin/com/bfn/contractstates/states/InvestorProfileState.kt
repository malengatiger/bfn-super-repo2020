package com.bfn.contractstates.states

import com.bfn.contractstates.contracts.InvestorProfileContract
import com.google.common.collect.ImmutableList
import net.corda.core.contracts.BelongsToContract
import net.corda.core.contracts.ContractState
import net.corda.core.identity.AbstractParty
import net.corda.core.identity.Party
import net.corda.core.serialization.CordaSerializable
import java.math.BigDecimal
import java.util.*

@CordaSerializable
@BelongsToContract(InvestorProfileContract::class)
class InvestorProfileState(var issuedBy: Party,
                           val accountId: String,
                           val minimumInvoiceAmount: BigDecimal,
                           val maximumInvoiceAmount: BigDecimal,
                           val totalInvestment: BigDecimal,
                           val defaultDiscount: Double,
                           var date: Date
                   ) : ContractState {

    override val participants: List<AbstractParty>
        get() = ImmutableList.of<AbstractParty>(issuedBy)

}
