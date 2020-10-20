package com.bfn.client.web.services


import com.bfn.client.Emo
import com.bfn.client.data.*
import com.bfn.client.web.DTOUtil
import com.bfn.flows.PAYMENT_INVESTOR
import com.bfn.flows.PAYMENT_SUPPLIER
import com.bfn.flows.StellarPaymentDTO
import com.bfn.flows.queries.AcceptedOfferQueryFlow
import com.bfn.flows.todaysDate
import com.google.gson.GsonBuilder
import khttp.post
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

    @Autowired
    private lateinit var networkRoyaltyService: NetworkRoyaltyService

    fun sendPayment(stellarPayment: StellarPaymentDTO, token: String): Int {
        if (stellarPayment.sourceAccount == "tbd") {
            throw Exception("Source Account is invalid")
        }
        if (stellarPayment.destinationAccount == "tbd") {
            throw Exception("Destination Account is invalid")
        }
        val suffix = "sendPayment"
        logx.info("${Emo.SOCCER_BALL}${Emo.SOCCER_BALL}${Emo.SOCCER_BALL}${Emo.SOCCER_BALL}" +
                "Request(POST) for Stellar payment to be sent over the wire: sent to " +
                "\uD83C\uDF4E $stellarAnchorUrl$suffix \uD83C\uDF4E")

        val mHeaders:MutableMap<String,String> = mutableMapOf()
        mHeaders["Content-Type"] = MediaType.APPLICATION_JSON_VALUE
        mHeaders["Authorization"] = "Bearer $token"

        val result = post(url = "$stellarAnchorUrl$suffix",
                data = gson.toJson(stellarPayment),
                timeout = 990000000.0, headers = mHeaders)

        logx.info("$good sendPayment RESPONSE: returning statusCode: " +
                "${Emo.YELLOW_BIRD}${result.statusCode}  ${Emo.YELLOW_BIRD} " +
                "result text: ${Emo.BLUE_BIRD}${result.text}${Emo.BLUE_BIRD}  ")

        return result.statusCode
    }
    fun createStellarAccount(token: String): StellarResponse? {
        val suffix = "createStellarAccount"
        logx.info("\n\uD83C\uDF30 Sending HTTP call to the BFN network to create a brand new Stellar ACCOUNT" +
                ": \uD83E\uDDE9 } \uD83C\uDF30 $stellarAnchorUrl$suffix")

        var stellarResponse: StellarResponse? = null
        try {
            logx.info("\uD83C\uDF4E call the Stellar anchor server and obtain a Stellar account ")
            val mHeaders:MutableMap<String,String> = mutableMapOf()
            mHeaders["Content-Type"] = MediaType.APPLICATION_JSON_VALUE
            mHeaders["Authorization"] = "Bearer $token"
            logx.info("\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E " +
                    "... Request for Stellar account to be sent over the wire: sent to " +
                    "\uD83C\uDF4E $stellarAnchorUrl$suffix \uD83C\uDF4E")

            val result = post(url = "$stellarAnchorUrl$suffix",  timeout = 990000000.0, headers = mHeaders)

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

    fun makeSupplierPaymentForOffer(proxy: CordaRPCOps, offerId: String, token: String): SupplierPaymentDTO? {
       logger.info("${Emo.GOLD_BELL}${Emo.GOLD_BELL}${Emo.GOLD_BELL}${Emo.GOLD_BELL} " +
                "calling the Stellar Anchor server to send SupplierPayment ... " +
               " offerId: ${Emo.RED_APPLE} $offerId  ${Emo.RED_APPLE}")

        val future = proxy.startFlowDynamic(AcceptedOfferQueryFlow::class.java, offerId,
                AcceptedOfferQueryFlow.FIND_FOR_OFFER ).returnValue
        val mList = future.get()
        if (mList.isEmpty()) {
            throw Exception("${Emo.ERRORS} AcceptedOffer not found on ledger")
        }
        val acceptedOffer = DTOUtil.getDTO(mList.first())

        logger.info("${Emo.FERNS}${Emo.FERNS} SupplierPayment to be made for accepted offer: " +
                "investor: ${acceptedOffer.investor?.account?.name} " +
                "supplier: ${acceptedOffer.supplier?.account?.name} " +
                "offerAmount: ${acceptedOffer.offerAmount} ${Emo.FERNS}")
        val supplierProfile = firebaseService.getSupplierProfile(
                accountId = acceptedOffer.supplier!!.account!!.identifier)
        val investorProfile = firebaseService.getInvestorProfile(
                accountId = acceptedOffer.investor!!.account!!.identifier)

        var assetCode = "ZAR"
        if (supplierProfile != null) {
            assetCode = supplierProfile.assetCode
        }

        if (supplierProfile != null && investorProfile != null) {
            val stellarPayment = StellarPaymentDTO(
                    paymentRequestId = UUID.randomUUID().toString(),
                    amount = acceptedOffer.offerAmount,
                    assetCode = assetCode,
                    date = todaysDate(),
                    destinationAccount = supplierProfile.stellarAccountId,
                    sourceAccount = investorProfile.stellarAccountId,
                    paymentType = PAYMENT_SUPPLIER
            )
            val statusCode = sendPayment(stellarPayment, token)
            if (statusCode == 200) {
                val supplierPayment = networkRoyaltyService.startSupplierPaymentFlow(
                        offerId = acceptedOffer.offerId, proxy = proxy)
                networkRoyaltyService.processSupplierRoyalty(
                        proxy = proxy, stellarPayment = stellarPayment,
                        supplierPayment =  supplierPayment, token = token)
                return supplierPayment
            } else {
                throw Exception("${Emo.ERROR} makeSupplierPaymentForOffer failed: " +
                        "statusCode: $statusCode ${Emo.NOT_OK}")
            }
        } else {
            throw Exception("${Emo.ERROR} Investor or supplier missing ${Emo.NOT_OK}")
        }

    }

    fun makeInvestorPaymentForOffer(proxy: CordaRPCOps, offerId: String, token: String): InvestorPaymentDTO? {
        logger.info("${Emo.GOLD_BELL}${Emo.GOLD_BELL}${Emo.GOLD_BELL}${Emo.GOLD_BELL} " +
                "makeInvestorPaymentForOffer starting: INVESTOR GETTING PAID ... " +
                " ${Emo.RED_APPLE} offerId: $offerId  ${Emo.RED_APPLE}")

        val supplierPayment = workerBeeService.getSupplierPayment(proxy,offerId)
                ?: throw Exception("SupplierPayment not found ${Emo.NOT_OK}")

        logger.info("${Emo.GOLD_BELL}${Emo.GOLD_BELL} InvestorPayment to be made for consumed SupplierPayment: " +
                "investor: ${supplierPayment.acceptedOffer!!.investor?.account?.name} " +
                "supplier: ${supplierPayment.acceptedOffer!!.supplier?.account?.name} " +
                "customer: ${supplierPayment.acceptedOffer!!.customer?.account?.name} " +
                "offerAmount: ${supplierPayment.acceptedOffer!!.offerAmount} ${Emo.FERNS}")

        val customerProfile = firebaseService.getCustomerProfile(
                accountId = supplierPayment.acceptedOffer!!.customer!!.account!!.identifier)
        val investorProfile = firebaseService.getInvestorProfile(
                accountId = supplierPayment.acceptedOffer!!.investor!!.account!!.identifier)

        if (customerProfile != null && investorProfile != null) {
            val stellarPayment = StellarPaymentDTO(
                    paymentRequestId = UUID.randomUUID().toString(),
                    amount = supplierPayment.acceptedOffer!!.offerAmount,
                    assetCode = supplierPayment.acceptedOffer!!.supplier!!.assetCode,
                    date = todaysDate(),
                    destinationAccount = investorProfile.stellarAccountId,
                    sourceAccount = customerProfile.stellarAccountId,
                    paymentType = PAYMENT_INVESTOR
            )
            val statusCode = sendPayment(stellarPayment, token)
            if (statusCode == 200) {
                val investorPayment = networkRoyaltyService.startInvestorPaymentFlow(
                        supplierPayment.supplierPaymentId, proxy)
                networkRoyaltyService.processInvestorRoyalty(proxy, stellarPayment, investorPayment, token = token)
                return investorPayment
            } else {
                throw Exception("${Emo.ERROR} ${Emo.ERROR} " +
                        "stellarAnchorService.makeInvestorPaymentForOffer failed; " +
                        "statusCode: $statusCode ${Emo.NOT_OK}")
            }
        } else {
            throw Exception("${Emo.ERROR}Investor or supplier missing")
        }

    }


    private val good = "\uD83E\uDD6C \uD83E\uDD6C \uD83E\uDD6C \uD83E\uDD6C"
    private val err = "\uD83D\uDC7F \uD83D\uDE21 \uD83D\uDC7F \uD83D\uDE21 \uD83D\uDC7F \uD83D\uDE21"
}