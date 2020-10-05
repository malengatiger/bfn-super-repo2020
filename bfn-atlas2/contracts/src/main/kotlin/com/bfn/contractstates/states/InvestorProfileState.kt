package com.bfn.contractstates.states

import com.bfn.contractstates.contracts.InvestorProfileContract
import com.r3.corda.lib.accounts.contracts.states.AccountInfo
import net.corda.core.contracts.BelongsToContract
import net.corda.core.contracts.ContractState
import net.corda.core.identity.AbstractParty
import net.corda.core.serialization.CordaSerializable
import java.util.*

@CordaSerializable
@BelongsToContract(InvestorProfileContract::class)
class InvestorProfileState(
        val account: AccountInfo,
        val minimumInvoiceAmount: String,
        val maximumInvoiceAmount: String,
        val totalInvestment: String,
        val defaultDiscount: String,
        val bank: String,
        val bankAccount: String,
        val stellarAccountId: String,
        val rippleAccountId: String,
        val tradeMatrixItems: MutableList<TradeMatrixItem>,
        var date: String
                   ) : ContractState {

    override val participants: List<AbstractParty>
        get() = listOf(account.host)

}
