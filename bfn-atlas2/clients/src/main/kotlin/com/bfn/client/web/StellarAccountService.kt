package com.bfn.client.web


import com.bfn.client.data.StellarResponse
import com.google.gson.GsonBuilder
import khttp.post
import net.corda.core.internal.Emoji
import net.corda.core.messaging.CordaRPCOps
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.MediaType
import org.springframework.stereotype.Service

private val logx = LoggerFactory.getLogger(StellarAccountService::class.java)
private val gson = GsonBuilder().setPrettyPrinting().create()
@Autowired
private lateinit var firebaseService: FirebaseService
@Autowired
private lateinit var networkOperatorBeeService: NetworkOperatorBeeService

@Service
class StellarAccountService {

    @Value("\${stellarAnchorUrl}")
    private lateinit var stellarAnchorUrl: String

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

            logx.info("\uD83C\uDF4E \uD83C\uDF4E RESPONSE: statusCode: ${result.statusCode}  ")
            logx.info("\uD83C\uDF4E \uD83C\uDF4E RESPONSE: result text: ${result.text}  ")
            stellarResponse = gson.fromJson<StellarResponse>(result.text, StellarResponse::class.java)

            if (result.statusCode == 200) {
                logx.info("\uD83C\uDF51 \uD83C\uDF51 result status is KOOL! " +
                        "Stellar account has been successfully requested!" +
                        " \uD83C\uDF51 \uD83C\uDF51")
            } else {
                logx.info("\uD83C\uDF4E  \uD83C\uDF4E NetworkOperatorService:createStellarAccount fucked up! : " +
                        "${result.text}  \uD83C\uDF4E  \uD83C\uDF4E")
                throw Exception("Stellar account creation request FAILED ")

            }
            //update existing network operator
            try {
                val operator = firebaseService.getNetworkOperator()
                //todo - handle the seed from Stellar - store it encrypted on cloud storage ??? Done on stellar anchor server
                if (operator != null) {
                    operator.stellarAccountId = stellarResponse.accountId
                    logx.info("\uD83D\uDC99 \uD83D\uDC9C Stellar Account added from Anchor server. " +
                            "Update Account stellar data locally ... "
                            + gson.toJson(stellarResponse) + "\uD83D\uDC99 \uD83D\uDC9C")

                    logx.info("\uD83C\uDF4E \uD83C\uDF4E Update NetworkOperator on Ledger and Firestore ..... ")
                    networkOperatorBeeService.updateNetworkOperator(proxy = proxy, networkOperator = operator)
                    firebaseService.updateNetworkOperator(operator = operator)
                }

            } catch (e: Exception) {
                logger.warn("\uD83D\uDE21 \uD83D\uDE21 \uD83D\uDE21" +
                        " Network Operator query failed", e)
            }

        } catch (e:Exception) {
            logx.error(Emoji.CODE_NO_ENTRY+Emoji.CODE_NO_ENTRY +
                    " Stellar account creation for the BFN Network Operator failed. No Biggie! ... for now", e)
        }
        return stellarResponse
    }
}