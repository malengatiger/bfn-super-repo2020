package com.bfn.contractstates.states

import com.bfn.contractstates.contracts.AnchorContract
import com.r3.corda.lib.accounts.contracts.states.AccountInfo
import net.corda.core.contracts.BelongsToContract
import net.corda.core.contracts.ContractState
import net.corda.core.identity.AbstractParty
import net.corda.core.identity.Party
import net.corda.core.serialization.CordaSerializable
import java.util.*

@CordaSerializable
@BelongsToContract(AnchorContract::class)
class AnchorState(val issuedBy: Party,
                  val account: AccountInfo,
                  val minimumInvoiceAmount: Double,
                  val maximumInvoiceAmount: Double,
                  val maximumInvestment: Double,
                  val tradeFrequencyInMinutes: Int,
                  val defaultOfferDiscount: Double,
                  val tradeMatrixItems: MutableList<TradeMatrixItem>,
                  val date: Date,
                  val name: String,
                  val email: String,
                  val cellphone: String
                   ) : ContractState {

    override val participants: List<AbstractParty>
        get() = listOf(issuedBy)

}
