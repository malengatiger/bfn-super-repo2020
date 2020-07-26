package com.bfn.contractstates.states

import com.bfn.contractstates.contracts.InvestorProfileContract
import com.bfn.contractstates.contracts.SupplierProfileContract
import net.corda.core.contracts.BelongsToContract
import net.corda.core.contracts.ContractState
import net.corda.core.identity.AbstractParty
import net.corda.core.identity.Party
import net.corda.core.serialization.CordaSerializable
import java.util.*

@CordaSerializable
@BelongsToContract(SupplierProfileContract::class)
class SupplierProfileState(val issuedBy: Party,
                           val accountId: String,
                           val maximumDiscount: Double,
                           val bank: String,
                           val bankAccount: String,
                           val date: Date = Date()
                   ) : ContractState {

    override val participants: List<AbstractParty>
        get() = listOf(issuedBy)

}
