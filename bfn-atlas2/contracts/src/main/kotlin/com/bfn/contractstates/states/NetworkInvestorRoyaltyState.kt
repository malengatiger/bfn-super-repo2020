package com.bfn.contractstates.states

import com.r3.corda.lib.accounts.contracts.states.AccountInfo
import com.template.AcceptedOfferContract
import com.template.NetworkInvestorRoyaltyContract
import com.template.NetworkSupplierRoyaltyContract
import net.corda.core.contracts.BelongsToContract
import net.corda.core.contracts.ContractState
import net.corda.core.identity.AbstractParty
import net.corda.core.identity.Party
import net.corda.core.serialization.CordaSerializable
import java.util.*

@CordaSerializable
@BelongsToContract(NetworkInvestorRoyaltyContract::class)
class NetworkInvestorRoyaltyState(val networkRoyaltyId: UUID,
                                  val amount: String,
                                  val royaltyPercentage: String,
                                  val networkOperator: Party,
                                  val investorPayment: InvestorPaymentState,
                                  val dateRegistered: String) : ContractState {

    override val participants: List<AbstractParty>
        get() = listOf(networkOperator)

}
