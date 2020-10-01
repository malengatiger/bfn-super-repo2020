package com.bfn.client.web.services


import com.bfn.client.Emo
import com.bfn.client.data.InvoiceOfferDTO
import com.bfn.client.data.StellarResponse
import com.bfn.client.data.SupplierPaymentDTO
import com.bfn.client.web.DTOUtil
import com.bfn.flows.PaymentRequestParams
import com.bfn.flows.StellarPaymentDTO
import com.bfn.flows.investor.SinglePaymentFlow
import com.bfn.flows.todaysDate
import com.google.gson.GsonBuilder
import khttp.post
import khttp.responses.Response
import net.corda.core.messaging.CordaRPCOps
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.MediaType
import org.springframework.stereotype.Service
import java.util.*

private val logx = LoggerFactory.getLogger(StellarAnchorService::class.java)
private val gson = GsonBuilder().setPrettyPrinting().create()
@Autowired
private lateinit var firebaseService: FirebaseService
@Autowired
private lateinit var networkOperatorBeeService: NetworkOperatorBeeService

@Service
class StellarAnchorService {
    private val logger = LoggerFactory.getLogger(WorkerBeeService::class.java)
    private val gson = GsonBuilder().setPrettyPrinting().create()

    @Value("\${stellarAnchorUrl}")
    private lateinit var stellarAnchorUrl: String

    @Autowired
    private lateinit var workerBeeService: WorkerBeeService

    @Autowired
    private lateinit var firebaseService: FirebaseService

    fun createStellarAccount(proxy: CordaRPCOps): StellarResponse? {
        val suffix = "createStellarAccount"
        logx.info("\n\uD83C\uDF30 Sending HTTP call to the BFN network to create a brand new Stellar ACCOUNT" +
                ": \uD83E\uDDE9 } \uD83C\uDF30 $stellarAnchorUrl$suffix")

        var stellarResponse: StellarResponse? = null
        try {
            logx.info("\uD83C\uDF4E call the Stellar anchor server and obtain a Stellar account ")
            val headers = mapOf("Content-Type" to MediaType.APPLICATION_JSON_VALUE)

            logx.info("\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E " +
                    "... Request for Stellar account to be sent over the wire: sent to " +
                    "\uD83C\uDF4E $stellarAnchorUrl$suffix \uD83C\uDF4E")

            val result = post(url = "$stellarAnchorUrl$suffix",  timeout = 990000000.0, headers = headers)

            logx.info("$good createStellarAccount RESPONSE: statusCode: ${result.statusCode}  ")
            logx.info("$good createStellarAccount RESPONSE: result text: ${result.text}  ")
            stellarResponse = gson.fromJson<StellarResponse>(result.text, StellarResponse::class.java)

            if (result.statusCode == 200) {
                logx.info("$good result status is KOOL! " +
                        "Stellar account has been successfully requested!" +
                        " \uD83C\uDF51 \uD83C\uDF51 ${gson.toJson(stellarResponse)}")
            } else {
                logx.info("$err  NetworkOperatorService:createStellarAccount fucked up! : " +
                        "statusCode: ${result.statusCode} text: ${result.text}  \uD83C\uDF4E  \uD83C\uDF4E")
                stellarResponse = null

            }
            //update existing network operator
//            try {
//                val operator = firebaseService.getNetworkOperator()
//                //todo - handle the seed from Stellar - store it encrypted on cloud storage ??? Done on stellar anchor server
//                if (operator != null && stellarResponse != null) {
//                    operator.stellarAccountId = stellarResponse.accountId
//                    logx.info("\uD83D\uDC99 \uD83D\uDC9C Stellar Account added from Anchor server. " +
//                            "Update Account stellar data locally ... "
//                            + gson.toJson(stellarResponse) + "\uD83D\uDC99 \uD83D\uDC9C")
//
//                    logx.info("\uD83C\uDF4E \uD83C\uDF4E Update NetworkOperator on Ledger and Firestore ..... ")
//                    networkOperatorBeeService.updateNetworkOperator(proxy = proxy, networkOperator = operator)
//                    firebaseService.updateNetworkOperator(operator = operator)
//                }
//
//            } catch (e: Exception) {
//                logger.warn(err +
//                        " Network Operator query failed", e)
//            }

        } catch (e:Exception) {
            logx.error(err +
                    " Stellar account creation for the BFN Network Operator failed. No Biggie! ... for now", e)
        }
        return stellarResponse
    }

    fun makePaymentForOffer(proxy: CordaRPCOps, offerId: String): SupplierPaymentDTO? {

       logger.info("${Emo.GOLD_BELL}${Emo.GOLD_BELL}${Emo.GOLD_BELL}${Emo.GOLD_BELL} StellarAnchorService: " +
                "call the Stellar Anchor server to send SupplierPayment ... ${Emo.GOLD_BELL}")

        val acceptedOffer = firebaseService.getInvoiceOffer(offerId) ?: throw Exception("Offer not found")
        if (!acceptedOffer.accepted) {
            throw Exception("${Emo.NOT_OK}Offer not accepted")
        }
        logger.info("${Emo.FERNS}${Emo.FERNS} SupplierPayment to be made for offer: " +
                "${gson.toJson(acceptedOffer)} ${Emo.FERNS}")
        val supplierProfile = firebaseService.getSupplierProfile(
                accountId = acceptedOffer.supplier!!.identifier)
        val investorProfile = firebaseService.getInvestorProfile(
                accountId = acceptedOffer.investor!!.identifier)

        var assetCode = "ZAR"
        if (supplierProfile != null) {
            assetCode = supplierProfile.assetCode
        }
        var result: Response? = null

        /*
         @PostMapping(value = "/sendPayment", produces = MediaType.APPLICATION_JSON_VALUE)
    public PaymentRequest sendPayment(PaymentRequest paymentRequest) throws Exception {

         */
        if (supplierProfile != null && investorProfile != null) {
            val stellarPayment = StellarPaymentDTO(
                    paymentRequestId = UUID.randomUUID().toString(),
                    amount = acceptedOffer.offerAmount,
                    assetCode = assetCode,
                    date = todaysDate(),
                    destinationAccount = supplierProfile.stellarAccountId,
                    sourceAccount = investorProfile.stellarAccountId
            )
            logger.info("${Emo.BLUE_DOT}${Emo.BLUE_DOT} sending to Stellar Anchor:" +
                    " ${gson.toJson(stellarPayment)} ")
            val headers = mapOf("Content-Type" to "application/json")
            val suffix = "sendPayment"
            val url = "$stellarAnchorUrl$suffix"
            logger.info("\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E " +
                    "StellarAnchorService:sendPayment: POST Request for payment to be sent over the wire: sent to " +
                    "\uD83C\uDF4E $url \uD83C\uDF4E")

            result = post(
                    url = url,
                    data = gson.toJson(stellarPayment),
                    headers = headers)

           logger.info("${Emo.GOLD_BELL}${Emo.GOLD_BELL}${Emo.GOLD_BELL}${Emo.GOLD_BELL}" +
                   " $url RESPONSE: " +
                    "statusCode: ${result.statusCode} text: ${result.text}   ")

            if (result.statusCode == 200) {
                return processOKPayment(acceptedOffer, url, proxy)
            } else {
               logger.info("${Emo.ERRORS} " +
                        "StellarAnchorService:sendPayment fucked up! : " +
                        "statusCode: ${result.statusCode} text: ${result.text}  \uD83C\uDF4E  \uD83C\uDF4E")
                throw Exception("${Emo.NOT_OK} ${Emo.NOT_OK} ${Emo.ERRORS} " +
                        "Stellar Anchor Payment failed : " +
                        "statusCode: ${result.statusCode} ${Emo.ANGRY} msg: ${result.text}")
            }
        } else {
            throw Exception("${Emo.ERROR}Investor or supplier missing")
        }

    }

    private fun processOKPayment(acceptedOffer: InvoiceOfferDTO, url: String, proxy: CordaRPCOps): SupplierPaymentDTO {
        logger.info("${Emo.RED_APPLES} result status is A-OK! " +
                "PaymentRequest has been successfully returned!" +
                " ${Emo.GOLD_BELL}")

        logger.info("${Emo.GLOBE}${Emo.GLOBE}${Emo.GLOBE} makePaymentForOffer: " +
                "Talking to corda SinglePaymentFlow ...")
        val delay: Long = 360
        val paymentRequestParams = PaymentRequestParams(
                offerId = acceptedOffer.offerId,
                investorId = acceptedOffer.investor!!.identifier,
                stellarAnchorUrl = url,
                delayMinutesUntilNextPaymentFlow = delay)
        val future = proxy.startFlowDynamic(SinglePaymentFlow::class.java,
                paymentRequestParams).returnValue
        val supplierPaymentState = future.get()
        firebaseService.addSupplierPayment(DTOUtil.getDTO(supplierPaymentState))

        logger.info("${Emo.GLOBE}${Emo.GLOBE}${Emo.GLOBE} SupplierPayment made on ledger: " +
                "${gson.toJson(supplierPaymentState)} ${Emo.SOCCER_BALL} \n\n\n")
        return DTOUtil.getDTO(supplierPaymentState)
    }

    private val good = "\uD83E\uDD6C \uD83E\uDD6C \uD83E\uDD6C \uD83E\uDD6C"
    private val err = "\uD83D\uDC7F \uD83D\uDE21 \uD83D\uDC7F \uD83D\uDE21 \uD83D\uDC7F \uD83D\uDE21"
}