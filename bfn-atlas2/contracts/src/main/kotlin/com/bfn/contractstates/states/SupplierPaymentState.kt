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
        val acceptedOffer: InvoiceOfferState,
        val supplierProfile: SupplierProfileState,
        val date: String,
        val delayMinutesUntilNextPaymentFlow: Long,
        val paymentRequest: PaymentRequestState,
        val stellarAnchorUrl: String,
        val paid: Boolean) : QueryableState, SchedulableState {

    override val participants: List<AbstractParty>
        get() = listOf(acceptedOffer.supplier.host,
                acceptedOffer.customer.host, acceptedOffer.investor.host)

    override fun generateMappedObject(schema: MappedSchema): PersistentState {
        TODO("Not yet implemented")
    }

    override fun supportedSchemas(): Iterable<MappedSchema> {
        TODO("Not yet implemented")
    }

    override fun nextScheduledActivity(thisStateRef: StateRef,
                                       flowLogicRefFactory: FlowLogicRefFactory): ScheduledActivity? {
        val logger = LoggerFactory.getLogger(SupplierPaymentState::class.java)

        val requestTime: Instant = Date().toInstant()
        val responseTime = requestTime.plusSeconds(delayMinutesUntilNextPaymentFlow * 60)
        val flowRef = flowLogicRefFactory.create(
                "com.bfn.flows.investor.MultiplePaymentsFlow",
                acceptedOffer.investor,
                stellarAnchorUrl,
                delayMinutesUntilNextPaymentFlow)

        logger.info("️\uD83C\uDFC0 \uD83C\uDFC0️ \uD83C\uDFC0 \uD83C\uDF4E " +
                "nextScheduledActivity: \uD83C\uDF4E ⏳⏳⏳ this should schedule the ️ " +
                "⚠️ MultiplePaymentsFlow  ⚠️  : responseTime: $responseTime \uD83C\uDF4E")

        return ScheduledActivity(flowRef, responseTime)
    }


}
