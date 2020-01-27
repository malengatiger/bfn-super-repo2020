package com.bfn.contractstates.states

import com.bfn.contractstates.contracts.InvoiceContract
import com.r3.corda.lib.accounts.contracts.states.AccountInfo
import net.corda.core.contracts.BelongsToContract
import net.corda.core.contracts.ContractState
import net.corda.core.identity.AbstractParty
import net.corda.core.serialization.CordaSerializable
import org.slf4j.LoggerFactory
import java.math.BigDecimal
import java.util.*

// *********
// * State *
// *********
@BelongsToContract(InvoiceContract::class)
@CordaSerializable
class InvoiceState(val invoiceId: UUID,
                   val invoiceNumber: String,
                   val description: String,
                   val amount: BigDecimal,
                   val valueAddedTax: Double,
                   val totalAmount: BigDecimal,
                   val supplierInfo: AccountInfo,
                   val customerInfo: AccountInfo,
                   val externalId: String,
                   val dateRegistered: Date?) : ContractState {

    override val participants: List<AbstractParty>
        get() = listOf(supplierInfo.host,
                customerInfo.host)


}
