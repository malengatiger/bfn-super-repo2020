package com.bfn.contractstates.states

import com.bfn.contractstates.contracts.SupplierPaymentContract
import net.corda.core.contracts.*
import net.corda.core.flows.FlowLogicRefFactory
import net.corda.core.identity.AbstractParty
import net.corda.core.serialization.CordaSerializable
import org.slf4j.LoggerFactory
import java.time.Instant
import java.util.*

@BelongsToContract(SupplierPaymentContract::class)
@CordaSerializable
class SupplierPaymentState(
         val acceptedOffer: InvoiceOfferState,
         val supplierProfile: SupplierProfileState,
         val date: String,
         val delayMinutesUntilNextPaymentFlow: Long,
         var paymentRequest: PaymentRequestState?,
         val paid: Boolean) : ContractState, SchedulableState {

    override val participants: List<AbstractParty>
        get() = listOf(acceptedOffer.supplier.host,
                acceptedOffer.customer.host, acceptedOffer.investor.host)

    override fun nextScheduledActivity(thisStateRef: StateRef, flowLogicRefFactory: FlowLogicRefFactory): ScheduledActivity? {
        val logger = LoggerFactory.getLogger(SupplierPaymentState::class.java)

        val requestTime: Instant = Date().toInstant()
        val responseTime = requestTime.plusSeconds(delayMinutesUntilNextPaymentFlow)
        val flowRef = flowLogicRefFactory.create(
                "com.bfn.flows.anchor.AnchorMakeMultiplePaymentsFlow",
                delayMinutesUntilNextPaymentFlow)

        logger.info("️\uD83C\uDFC0 \uD83C\uDFC0️ \uD83C\uDFC0 \uD83C\uDF4E " +
                "nextScheduledActivity: \uD83C\uDF4E ⏳⏳⏳ this should schedule the ️ " +
                "⚠️ AnchorMakeMultiplePaymentsFlow  ⚠️  : responseTime: $responseTime \uD83C\uDF4E")

        return ScheduledActivity(flowRef, responseTime)
    }


}
