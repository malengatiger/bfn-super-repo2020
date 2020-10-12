package com.bfn.contractstates.states

import com.bfn.contractstates.contracts.SupplierPaymentContract
import net.corda.core.contracts.*
import net.corda.core.flows.FlowLogicRefFactory
import net.corda.core.identity.AbstractParty
import net.corda.core.schemas.MappedSchema
import net.corda.core.schemas.PersistentState
import net.corda.core.schemas.QueryableState
import net.corda.core.serialization.CordaSerializable
import org.slf4j.LoggerFactory
import java.time.Instant
import java.util.*

@BelongsToContract(SupplierPaymentContract::class)
@CordaSerializable
class SupplierPaymentState(
        val supplierPaymentId: String,
        val acceptedOffer: AcceptedOfferState,
        val supplierProfile: SupplierProfileState,
        val dateRegistered: String) : QueryableState {

    override val participants: List<AbstractParty>
        get() = listOf(acceptedOffer.supplier.host,
                acceptedOffer.customer.host, acceptedOffer.investor.host)

    override fun generateMappedObject(schema: MappedSchema): PersistentState {
        TODO("Not yet implemented")
    }

    override fun supportedSchemas(): Iterable<MappedSchema> {
        TODO("Not yet implemented")
    }

}
