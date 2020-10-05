package com.bfn.contractstates.states

import com.bfn.contractstates.contracts.CustomerProfileContract
import com.r3.corda.lib.accounts.contracts.states.AccountInfo
import net.corda.core.contracts.BelongsToContract
import net.corda.core.contracts.ContractState
import net.corda.core.identity.AbstractParty
import net.corda.core.serialization.CordaSerializable
import java.util.*

@CordaSerializable
@BelongsToContract(CustomerProfileContract::class)
class CustomerProfileState(
                    val account: AccountInfo,
                    val minimumInvoiceAmount: String,
                    val maximumInvoiceAmount: String,
                    val dateRegistered: String,
                    val email: String,
                    val stellarAccountId: String,
                    val rippleAccountId: String,
                    val cellphone: String
                   ) : ContractState {

    override val participants: List<AbstractParty>
        get() = listOf(account.host)

}
