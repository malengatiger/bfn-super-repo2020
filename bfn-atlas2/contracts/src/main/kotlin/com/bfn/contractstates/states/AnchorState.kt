package com.bfn.contractstates.states

import com.bfn.contractstates.contracts.InvestorProfileContract
import com.google.common.collect.ImmutableList
import com.r3.corda.lib.accounts.contracts.states.AccountInfo
import net.corda.core.contracts.BelongsToContract
import net.corda.core.contracts.ContractState
import net.corda.core.identity.AbstractParty
import net.corda.core.identity.Party
import net.corda.core.serialization.CordaSerializable
import java.math.BigDecimal
import java.util.*

@CordaSerializable
@BelongsToContract(InvestorProfileContract::class)
class AnchorState(val issuedBy: Party,
                  val account: AccountInfo,
                  val minimumInvoiceAmount: BigDecimal,
                  val maximumInvoiceAmount: BigDecimal,
                  val maximumInvestment: BigDecimal,
                  val tradeFrequencyInMinutes: Int,
                  val defaultOfferDiscount: Double,
                  val tradeMatrices: MutableList<TradeMatrix>,
                  val date: Date,
                  val name: String,
                  val email: String,
                  val cellphone: String
                   ) : ContractState {

    override val participants: List<AbstractParty>
        get() = ImmutableList.of<AbstractParty>(issuedBy)

}
