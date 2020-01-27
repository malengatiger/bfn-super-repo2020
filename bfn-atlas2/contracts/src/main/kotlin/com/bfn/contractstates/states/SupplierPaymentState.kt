package com.bfn.contractstates.states

import com.bfn.contractstates.contracts.InvoiceContract
import com.bfn.contractstates.contracts.SupplierPaymentContract
import com.r3.corda.lib.accounts.contracts.states.AccountInfo
import net.corda.core.contracts.BelongsToContract
import net.corda.core.contracts.ContractState
import net.corda.core.identity.AbstractParty
import net.corda.core.serialization.CordaSerializable
import org.slf4j.LoggerFactory
import java.math.BigDecimal
import java.util.*

@BelongsToContract(SupplierPaymentContract::class)
@CordaSerializable
class SupplierPaymentState(private val acceptedOffer: InvoiceOfferState,
                           private val supplierProfile: SupplierProfileState,
                           private val datePaid: Date?,
                           private val date: Date) : ContractState {

    override val participants: List<AbstractParty>
        get() = listOf(acceptedOffer.supplier.host,
                acceptedOffer.customer.host, acceptedOffer.investor.host)


}
