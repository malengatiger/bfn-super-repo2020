package com.bfn.contractstates.states

import com.google.common.collect.ImmutableList
import com.r3.corda.lib.accounts.contracts.states.AccountInfo
import com.template.InvoiceOfferContract
import net.corda.core.contracts.BelongsToContract
import net.corda.core.contracts.ContractState
import net.corda.core.identity.AbstractParty
import net.corda.core.serialization.CordaSerializable
import org.slf4j.LoggerFactory
import java.util.*

@CordaSerializable
@BelongsToContract(InvoiceOfferContract::class)
class InvoiceOfferState(val invoiceId: UUID,
                        val offerAmount: Double,
                        val discount: Double,
                        val originalAmount: Double,
                        val supplier: AccountInfo,
                        val investor: AccountInfo, val offerDate: Date,
                        val ownerDate: Date, val invoiceNumber: String, val customer: AccountInfo) : ContractState {
    private val logger = LoggerFactory.getLogger(InvoiceOfferState::class.java)
    override val participants: List<AbstractParty>
        get() = ImmutableList.of<AbstractParty>(supplier.host,
                investor.host)

}
