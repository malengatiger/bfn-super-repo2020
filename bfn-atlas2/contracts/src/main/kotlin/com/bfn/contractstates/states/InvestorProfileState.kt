package com.bfn.contractstates.states

import com.bfn.contractstates.contracts.InvestorProfileContract
import com.r3.corda.lib.accounts.contracts.states.AccountInfo
import net.corda.core.contracts.BelongsToContract
import net.corda.core.contracts.ContractState
import net.corda.core.identity.AbstractParty
import net.corda.core.identity.Party
import net.corda.core.serialization.CordaSerializable
import java.util.*

@CordaSerializable
@BelongsToContract(InvestorProfileContract::class)
class InvestorProfileState(
                           val account: AccountInfo,
                           val minimumInvoiceAmount: Double,
                           val maximumInvoiceAmount: Double,
                           val totalInvestment: Double,
                           val defaultDiscount: Double,
                           val bank: String,
                           val bankAccount: String,
                           val stellarAccountId: String,
                           val rippleAccountId: String,
                           val tradeMatrixItems: MutableList<TradeMatrixItem>,
                           var date: Date
                   ) : ContractState {

    override val participants: List<AbstractParty>
        get() = listOf(account.host)

}
