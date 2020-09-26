package com.bfn.flows.services

import com.bfn.contractstates.states.PaymentRequestState
import com.bfn.contractstates.states.SupplierPaymentState
import com.bfn.flows.StellarPaymentDTO
import com.bfn.flows.todaysDate
import khttp.post
import khttp.responses.Response
import net.corda.core.node.AppServiceHub
import net.corda.core.node.services.CordaService
import net.corda.core.serialization.SingletonSerializeAsToken
import org.slf4j.LoggerFactory
import java.util.*

@CordaService
class StellarAnchorService(
        private val serviceHub: AppServiceHub) : SingletonSerializeAsToken() {

    fun sendSupplierPayment(supplierPayment: SupplierPaymentState,
                            stellarAnchorUrl: String): Response {

        logger.info("\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E StellarAnchorService: " +
                "call the Stellar Anchor server to send SupplierPayment ... ")
        val headers = mapOf("Content-Type" to "application/json")

        val userFinderService = serviceHub.cordaService(UserFinderService::class.java)
        val investor = userFinderService.findUser(
                supplierPayment.acceptedOffer.investor.identifier.id.toString())
        val supplier = userFinderService.findUser(
                supplierPayment.acceptedOffer.supplier.identifier.id.toString())

        val profileFinderService = serviceHub.cordaService(ProfileFinderService::class.java)
        val profile = profileFinderService.findSupplierProfile(
                supplierPayment.acceptedOffer.supplier.identifier.id.toString())

        var assetCode = "ZAR"
        if (profile != null) {
            assetCode = profile.state.data.assetCode
        }
        var result: Response? = null
        if (investor != null && supplier != null) {
            val stellarPayment = StellarPaymentDTO(
                    paymentRequestId = UUID.randomUUID().toString(),
                    amount = supplierPayment.acceptedOffer.offerAmount,
                    assetCode = assetCode,
                    date = todaysDate(),
                    destinationAccount = supplier.stellarAccountId,
                    sourceAccount = investor.stellarAccountId

            )
            logger.info("\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E " +
                    "StellarAnchorService: Request for payment to be sent over the wire: sent to " +
                    "\uD83C\uDF4E $stellarAnchorUrl \uD83C\uDF4E")

            //todo - check that something is returned by the Stellar Anchor
             result = post(
                     url = stellarAnchorUrl,
                     data = stellarPayment,
                     headers = headers)

            logger.info("\uD83E\uDD6C $stellarAnchorUrl RESPONSE: " +
                    "statusCode: ${result.statusCode} text: ${result.text}   ")

            if (result.statusCode == 200) {
                logger.info("\uD83E\uDD6C result status is A-OK! " +
                        "PaymentRequest has been successfully returned!" +
                        " \uD83C\uDF51 \uD83C\uDF51 ")
            } else {
                logger.info("\uD83D\uDC80 \uD83D\uDC80\uD83D\uDC80 " +
                        "StellarAnchorService:sendSupplierPayment fucked up! : " +
                        "statusCode: ${result.statusCode} text: ${result.text}  \uD83C\uDF4E  \uD83C\uDF4E")
            }
        } else {
            throw IllegalArgumentException("Investor or supplier missing")
        }
        return result
    }

    companion object {
        private val logger = LoggerFactory.getLogger(StellarAnchorService::class.java)
        const val PAYMENT_SUCCEEDED = 0

    }
}