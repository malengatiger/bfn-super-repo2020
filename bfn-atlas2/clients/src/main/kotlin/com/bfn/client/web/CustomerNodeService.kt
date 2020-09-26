package com.bfn.client.web


import com.bfn.client.data.AccountInfoDTO
import com.bfn.client.web.services.FirebaseService
import com.bfn.client.web.services.NetworkOperatorBeeService
import com.google.gson.GsonBuilder
import khttp.get
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.MediaType
import org.springframework.stereotype.Service
import java.io.StringReader

private val logx = LoggerFactory.getLogger(CustomerNodeService::class.java)
private val gson = GsonBuilder().setPrettyPrinting().create()

@Autowired
private lateinit var firebaseService: FirebaseService

@Autowired
private lateinit var networkOperatorBeeService: NetworkOperatorBeeService

@Service
class CustomerNodeService {

    @Value("\${customerNodeUrl}")
    private lateinit var customerNodeUrl: String

    fun getCustomers(): List<AccountInfoDTO> {
        val suffix = "getAccounts"
        logx.info("\n\uD83C\uDF30 Sending HTTP call to the Customer  node to get a list of customers" +
                ": \uD83E\uDDE9 } \uD83C\uDF30 $customerNodeUrl$suffix")

        var customers: MutableList<AccountInfoDTO> = mutableListOf()

        logx.info("\uD83C\uDF4E call the Customer server and obtain a list of accounts ")
        val headers = mapOf("Content-Type" to MediaType.APPLICATION_JSON_VALUE)

        logx.info("\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E " +
                "... Request for accounts to be sent over the wire: sent to " +
                "\uD83C\uDF4E $customerNodeUrl$suffix \uD83C\uDF4E")

        val result = get(url = "$customerNodeUrl$suffix", timeout = 990000000.0, headers = headers)

        logx.info("$good getCustomers RESPONSE: statusCode: ${result.statusCode}  ")
        logx.info("$good getCustomers RESPONSE: result text: ${result.text}  ")

        if (result.statusCode == 200) {
            customers = getAccountsFromJson(result.text)
            logx.info("$good result status is KOOL! " +
                    "Customer accounts has been successfully requested!" +
                    " \uD83C\uDF51 \uD83C\uDF51 found: ${customers.size}")
            return customers
        } else {
            logx.info("$err  CustomerNodeService:getCustomers fucked up! : " +
                    "statusCode: ${result.statusCode} text: ${result.text}  \uD83C\uDF4E  \uD83C\uDF4E")
            throw Exception("We have a small problem, Sir! Customer list is not available;" +
                    " statusCode: ${result.statusCode}")
        }

    }
    private fun getAccountsFromJson(jsonStr: String): MutableList<AccountInfoDTO> {

        val stringReader = StringReader(jsonStr)
        val mList: MutableList<AccountInfoDTO> = gson.fromJson(
                stringReader , Array<AccountInfoDTO>::class.java).toMutableList()

        logger.info(" \uD83D\uDD35 Result list from JSON string has ${mList.size} customers")
        return mList
    }

    private val good = "\uD83E\uDD6C \uD83E\uDD6C \uD83E\uDD6C \uD83E\uDD6C"
    private val err = "\uD83D\uDC7F \uD83D\uDE21 \uD83D\uDC7F \uD83D\uDE21 \uD83D\uDC7F \uD83D\uDE21"
}