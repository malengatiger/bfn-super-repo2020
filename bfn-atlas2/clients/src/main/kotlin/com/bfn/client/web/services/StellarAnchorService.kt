package com.bfn.client.web.services


import com.bfn.client.Emo
import com.bfn.client.data.*
import com.bfn.client.web.DTOUtil
import com.bfn.flows.StellarPaymentDTO
import com.bfn.flows.investor.SinglePaymentFlow
import com.bfn.flows.queries.AcceptedOfferQueryFlow
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

    fun sendPayment(stellarPayment: StellarPaymentDTO): Int {
        val suffix = "sendPayment"
        logx.info("${Emo.SOCCER_BALL}${Emo.SOCCER_BALL}" +
                "Request(POST) for Stellar payment to be sent over the wire: sent to " +
                "\uD83C\uDF4E $stellarAnchorUrl$suffix \uD83C\uDF4E")

        val headers = mapOf("Content-Type" to MediaType.APPLICATION_JSON_VALUE)
        val result = post(url = "$stellarAnchorUrl$suffix",
                data = gson.toJson(stellarPayment),
                timeout = 990000000.0, headers = headers)

        logx.info("$good sendPayment RESPONSE: returning statusCode: " +
                "${Emo.YELLOW_BIRD}${result.statusCode}  ${Emo.YELLOW_BIRD} " +
                "result text: ${Emo.BLUE_BIRD}${result.text}${Emo.BLUE_BIRD}  ")
        return result.statusCode
    }
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

       logger.info("${Emo.GOLD_BELL}${Emo.GOLD_BELL}${Emo.GOLD_BELL}${Emo.GOLD_BELL} " +
                "calling the Stellar Anchor server to send SupplierPayment ... " +
               " offerId: ${Emo.RED_APPLE} $offerId  ${Emo.RED_APPLE}")

        //todo - get acceptedOffer from ledger
        val future = proxy.startFlowDynamic(AcceptedOfferQueryFlow::class.java, offerId,
                AcceptedOfferQueryFlow.FIND_FOR_OFFER ).returnValue
        val mList = future.get()
        if (mList.isEmpty()) {
            throw Exception("${Emo.ERRORS} AcceptedOffer not found on ledger")
        }
        val acceptedOffer = DTOUtil.getDTO(mList.first())

        logger.info("${Emo.FERNS}${Emo.FERNS} SupplierPayment to be made for accepted offer: " +
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

            result = post(
                    url = url,
                    data = gson.toJson(stellarPayment),
                    headers = headers)

           logger.info("${Emo.GOLD_BELL}${Emo.GOLD_BELL}${Emo.GOLD_BELL}${Emo.GOLD_BELL}" +
                   " $url ${Emo.LEAF}RESPONSE: " +
                    "statusCode: ${result.statusCode} ${Emo.GOLD_BELL} text: ${result.text}   ")

            if (result.statusCode == 200) {
                return startSinglePaymentFlow(acceptedOffer, proxy)
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

    private fun startSinglePaymentFlow(acceptedOffer: AcceptedOfferDTO, proxy: CordaRPCOps): SupplierPaymentDTO {
        logger.info("${Emo.LEAF}${Emo.LEAF} result status is A-OK! ${Emo.LEAF}" +
                "PaymentRequest has been successfully returned!" +
                " ${Emo.GOLD_BELL}")

        logger.info("${Emo.GLOBE}${Emo.GLOBE}${Emo.GLOBE} makePaymentForOffer: " +
                "... Talking to Corda SinglePaymentFlow ... ${Emo.GLOBE} ")

        val future = proxy.startFlowDynamic(SinglePaymentFlow::class.java,
                acceptedOffer.offerId, acceptedOffer.investor!!.identifier).returnValue

        val supplierPaymentState = future.get()

        if (supplierPaymentState != null) {
            logger.info("${Emo.GLOBE}${Emo.GLOBE}${Emo.GLOBE}  " +
                    "${Emo.LEAF} supplierPayment recorded on Corda Ledger ${Emo.LEAF}")
            val dto = DTOUtil.getDTO(supplierPaymentState)
            firebaseService.addSupplierPayment(dto)
            logger.info("${Emo.GLOBE}${Emo.GLOBE}${Emo.GLOBE} SupplierPayment made on ledger: " +
                    "${gson.toJson(dto)} ${Emo.SOCCER_BALL}${Emo.SOCCER_BALL}${Emo.SOCCER_BALL} \n\n\n")
            return dto
        } else {
            throw Exception("Unable to save successful supplierPayment on Corda Ledger ${Emo.NOT_OK}")
        }
    }

    private val good = "\uD83E\uDD6C \uD83E\uDD6C \uD83E\uDD6C \uD83E\uDD6C"
    private val err = "\uD83D\uDC7F \uD83D\uDE21 \uD83D\uDC7F \uD83D\uDE21 \uD83D\uDC7F \uD83D\uDE21"
}