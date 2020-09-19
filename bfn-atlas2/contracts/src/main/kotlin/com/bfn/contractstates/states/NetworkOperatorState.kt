package com.bfn.contractstates.states

import com.bfn.contractstates.contracts.NetworkOperatorContract
import com.r3.corda.lib.accounts.contracts.states.AccountInfo
import net.corda.core.contracts.BelongsToContract
import net.corda.core.contracts.ContractState
import net.corda.core.identity.AbstractParty
import net.corda.core.identity.Party
import net.corda.core.serialization.CordaSerializable
import java.util.*

@CordaSerializable
@BelongsToContract(NetworkOperatorContract::class)
class NetworkOperatorState(
                           val account: AccountInfo,
                           val date: Date,
                           val email: String,
                           val cellphone: String
                   ) : ContractState {

    override val participants: List<AbstractParty>
        get() = listOf(account.host)

}
