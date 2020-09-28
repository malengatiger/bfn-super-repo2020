package com.bfn.flows.operator

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.states.SupplierPaymentState
import com.bfn.flows.services.StellarAnchorService
import khttp.responses.Response
import net.corda.core.flows.FlowExternalOperation
import net.corda.core.flows.FlowLogic
import org.slf4j.LoggerFactory

class StellarPaymentFlow (
        private val supplierPayment: SupplierPaymentState,
        private val stellarAnchorUrl: String) : FlowLogic<Response>() {

    @Suspendable
    override fun call(): Response {

        // Call [FlowLogic.await] to execute an external operation
        // The result of the operation is returned to the flow
        val response: Response = await(
                // Pass in an implementation of [FlowExternalOperation]
                SendSupplierPaymentToStellarAnchor(
                        stellarAnchorService = serviceHub.cordaService(
                                StellarAnchorService::class.java),
                        supplierPaymentState = supplierPayment,
                        stellarAnchorUrl = stellarAnchorUrl
                )
        )

        Companion.logger.info("\uD83C\uDF3C \uD83C\uDF3C " +
                "External Stellar Anchor response: $response")
        return response
    }

    /**
     * FlowExternalOperation class to enable the calling of the external Stellar Anchor server
     */
    class SendSupplierPaymentToStellarAnchor(
            private val stellarAnchorService: StellarAnchorService,
            private val supplierPaymentState: SupplierPaymentState,
            private val stellarAnchorUrl: String

    ) : FlowExternalOperation<Response> {

        // Implement [execute] which will be run on a thread outside of the flow's context
        override fun execute(deduplicationId: String): Response {
            logger.info("\uD83D\uDD35 RetrieveDataFromExternalSystem: " +
                    "Execute: ... deduplicationId: $deduplicationId : what the fuck is this?")
            return stellarAnchorService.sendSupplierPayment(
                    supplierPayment = supplierPaymentState,
                    stellarAnchorUrl = stellarAnchorUrl)
        }
    }
    companion object {
        private val logger = LoggerFactory.getLogger(StellarPaymentFlow::class.java)

    }
}