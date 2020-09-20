package com.bfn.contractstates.states

import com.bfn.contractstates.contracts.PaymentRequestContract
import com.r3.corda.lib.accounts.contracts.states.AccountInfo
import net.corda.core.contracts.BelongsToContract
import net.corda.core.contracts.ContractState
import net.corda.core.identity.AbstractParty
import net.corda.core.serialization.CordaSerializable

// *********
// * PaymentRequestContract *
// *********

@BelongsToContract(PaymentRequestContract::class)
@CordaSerializable
class PaymentRequestState(

        val paymentRequestId: String,
        val supplierInfo: AccountInfo,
        val customerInfo: AccountInfo,
        val investorInfo: AccountInfo,
        val assetCode: String,
        val amount: String,
        val date: String) : ContractState {

    override val participants: List<AbstractParty>
        get() = listOf(supplierInfo.host,
                customerInfo.host, investorInfo.host)


}
