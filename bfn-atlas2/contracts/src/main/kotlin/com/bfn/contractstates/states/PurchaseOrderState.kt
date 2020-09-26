package com.bfn.contractstates.states

import com.bfn.contractstates.contracts.PurchaseOrderContract
import com.r3.corda.lib.accounts.contracts.states.AccountInfo
import net.corda.core.contracts.BelongsToContract
import net.corda.core.contracts.ContractState
import net.corda.core.identity.AbstractParty
import net.corda.core.serialization.CordaSerializable
import java.util.*

@CordaSerializable
@BelongsToContract(PurchaseOrderContract::class)
class PurchaseOrderState(
                    val purchaseOrderId: String,
                    val purchaseOrderNumber: String,
                    val customer: AccountInfo,
                    val supplier: AccountInfo,
                    val amount: String,
                    val dateRegistered: Date,
                    val description: String
                   ) : ContractState {

    override val participants: List<AbstractParty>
        get() = listOf(customer.host, supplier.host)

}
