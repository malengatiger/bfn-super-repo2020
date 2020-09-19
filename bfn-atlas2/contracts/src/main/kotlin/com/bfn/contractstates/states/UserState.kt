package com.bfn.contractstates.states

import com.bfn.contractstates.contracts.UserContract
import com.r3.corda.lib.accounts.contracts.states.AccountInfo
import net.corda.core.contracts.BelongsToContract
import net.corda.core.contracts.ContractState
import net.corda.core.identity.AbstractParty
import net.corda.core.serialization.CordaSerializable

// *********
// * State *
// *********
@BelongsToContract(UserContract::class)
@CordaSerializable
class UserState(val accountInfo: AccountInfo,
                val email: String,
                val cellphone: String,
                val stellarAccountId: String,
                val rippleAccountId: String,
                val uid: String) : ContractState {

    override val participants: List<AbstractParty>
        get() = listOf(accountInfo.host)


}
