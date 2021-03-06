package com.bfn.client.web
//class AdminController {
//
//}

//
import com.bfn.client.data.InvestorPaymentDTO
import com.bfn.client.web.services.*
import com.google.gson.GsonBuilder
import net.corda.core.messaging.CordaRPCOps
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*
import java.util.*

/**
 * Define your API endpoints here.
 */
@RestController
@CrossOrigin(maxAge = 3600)
@RequestMapping("/demo") // The paths for HTTP requests are relative to this base path.
class DemoDataController(rpc: NodeRPCConnection) {
    private val proxy: CordaRPCOps = rpc.proxy
    @Value("\${spring.profiles.active}")
    private lateinit var profile: String

    @Value("\${stellarAnchorUrl}")
    private lateinit var stellarAnchorUrl: String
    
    @Autowired
    private lateinit var  workerBeeService: WorkerBeeService
    @Autowired
    private  lateinit var  demoDataService: DemoDataService

    @Autowired
    private lateinit var  networkOperatorBeeService: NetworkOperatorBeeService
    
    @Autowired
    private lateinit var  firebaseService: FirebaseService

    @Autowired
    private lateinit var  crossNodeService: CrossNodeService

    @Autowired
    private lateinit var  networkService: StellarAnchorService

//    @Autowired
//    private lateinit var clientDemoDataDriver: ClientDemoDataDriver

    @GetMapping(value = ["/generateAnchorNodeData"], produces = [MediaType.TEXT_PLAIN_VALUE])
    @Throws(Exception::class)
    private fun generateAnchorNodeData(numberOfAccounts:String, demoAdminEmail:String,
                                       @RequestHeader("Authorization") token: String): String? {
        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 " +
                "starting DemoDataController: generateAnchorNodeData " +
                "... \uD83C\uDF4F number accts: $numberOfAccounts")

        val num = numberOfAccounts.toInt()
        val mToken = token.substring(7)
        val result = demoDataService.generateAnchorNodeData(proxy, num, demoAdminEmail, mToken)
        logger.info("\n\n\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 DemoDataController:generateAnchorNodeData result: " +
                " \uD83C\uDF4F " + GSON.toJson(result)
                + "    \uD83E\uDDE1 \uD83D\uDC9B \uD83D\uDC9A \uD83D\uDC99 \uD83D\uDC9C\n\n")
        return result
    }
    @GetMapping(value = ["/generateProfiles"], produces = [MediaType.TEXT_PLAIN_VALUE])
    @Throws(Exception::class)
    private fun generateProfiles(): String? {
        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 " +
                "starting DemoDataController: generateProfiles " +
                "... \uD83C\uDF4F ")

        val result = demoDataService.generateProfiles(proxy)
        logger.info("\n\n\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 " +
                "DemoDataController:generateProfiles result: " +
                 "    \uD83E\uDDE1 \uD83D\uDC9B \uD83D\uDC9A \uD83D\uDC99 \uD83D\uDC9C\n\n")
        return result
    }
    @GetMapping(value = ["/generatePurchaseOrders"])
    @Throws(Exception::class)
    private fun generatePurchaseOrders(@RequestParam numberOfMonths: Int): String? {
        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 " +
                "starting DemoDataController: generatePurchaseOrders " +
                "... \uD83C\uDF4F ")

        val result = demoDataService.generatePurchaseOrders(proxy, numberOfMonths)
        val result2 = demoDataService.generateInvoices(proxy)
        val result3 = demoDataService.generateInvoiceOffers(proxy)
        val result4 = demoDataService.generateInvoiceOffers(proxy)
        val result5 = clientDemoDataDriver.generateOfferAcceptances(
                "http://localhost:10050")
        val result6 = clientDemoDataDriver.generateSupplierPayments(
                "http://localhost:10050")
        val result7 = clientDemoDataDriver.generateInvestorPayments(
                "http://localhost:10050")

        logger.info("\n\n\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 " +
                "DemoDataController:generatePurchaseOrders result: $result " +
                "  \uD83E\uDDE1 \uD83D\uDC9B \uD83D\uDC9A \uD83D\uDC99 \uD83D\uDC9C\n\n")
        return result
    }
    @GetMapping(value = ["/generateInvoices"], produces = [MediaType.TEXT_PLAIN_VALUE])
    @Throws(Exception::class)
    private fun generateInvoices(): String? {
        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 " +
                "starting DemoDataController: generateInvoices " +
                "... \uD83C\uDF4F ")

        val result = demoDataService.generateInvoices(proxy)
        logger.info("\n\n\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 " +
                "DemoDataController:generateInvoices result: " +
                "    \uD83E\uDDE1 \uD83D\uDC9B \uD83D\uDC9A \uD83D\uDC99 \uD83D\uDC9C\n\n")
        return result
    }
    @GetMapping(value = ["/generateInvoiceOffers"], produces = [MediaType.TEXT_PLAIN_VALUE])
    @Throws(Exception::class)
    private fun generateInvoiceOffers(): String? {
        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 " +
                "starting DemoDataController: generateInvoiceOffers " +
                "... \uD83C\uDF4F ")

        val result = demoDataService.generateInvoiceOffers(proxy)
        logger.info("\n\n\n\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 " +
                "DemoDataController:generateInvoiceOffers result: " +
                " $result   \uD83E\uDDE1 \uD83D\uDC9B \uD83D\uDC9A \uD83D\uDC99 \uD83D\uDC9C\n\n")
        return result
    }
    @GetMapping(value = ["/generateOffersForNetworkOperator"], produces = [MediaType.TEXT_PLAIN_VALUE])
    @Throws(Exception::class)
    private fun generateOffersForNetworkOperator(): String? {
        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 " +
                "starting DemoDataController: generateOffersForNetworkOperator " +
                "... \uD83C\uDF4F ")

        val result = demoDataService.generateOffersForNetworkOperator(proxy)
        logger.info("\n\n\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 " +
                "DemoDataController:generateOffersForNetworkOperator result: " +
                " $result   \uD83E\uDDE1 \uD83D\uDC9B \uD83D\uDC9A \uD83D\uDC99 \uD83D\uDC9C\n\n")
        return result
    }
    @GetMapping(value = ["/generateOffersFromAccount"], produces = [MediaType.TEXT_PLAIN_VALUE])
    @Throws(Exception::class)
    private fun generateOffersFromAccount(accountId:String): String? {
        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 " +
                "starting DemoDataController: createOffersFromAccount " +
                "... \uD83C\uDF4F ")

        val acct = workerBeeService.getAccount(proxy = proxy, accountId = accountId)
        val result = demoDataService.generateOffersFromInvestor(proxy,acct)
        logger.info("\n\n\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 " +
                "DemoDataController:generateOffersFromAccount result: " +
                " $result   \uD83E\uDDE1 \uD83D\uDC9B \uD83D\uDC9A \uD83D\uDC99 \uD83D\uDC9C\n\n")
        return result
    }
    @GetMapping(value = ["/generateAnchorNodeAccounts"], produces = [MediaType.TEXT_PLAIN_VALUE])
    @Throws(Exception::class)
    private fun generateAnchorNodeAccounts(numberOfAccounts:String,
                                           @RequestHeader("Authorization") token: String): String? {
        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 " +
                "starting DemoDataController: generateAnchorNodeAccounts " +
                "... \uD83C\uDF4F number accts: $numberOfAccounts")
        val num = numberOfAccounts.toInt()
        val mToken = token.substring(7)
        val result = demoDataService.generateAccounts(proxy = proxy, numberOfAccounts = num, token = mToken)
        logger.info("\n\n\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 DemoDataController:generateAnchorNodeAccounts result: " +
                " \uD83C\uDF4F " + GSON.toJson(result)
                + "    \uD83E\uDDE1 \uD83D\uDC9B \uD83D\uDC9A \uD83D\uDC99 \uD83D\uDC9C\n\n")
        return result
    }
    @GetMapping(value = ["/generateCustomerNodeData"], produces = [MediaType.TEXT_PLAIN_VALUE])
    @Throws(Exception::class)
    private fun generateCustomerNodeData(numberOfMonths:Int,
                                         @RequestHeader("Authorization") token: String): String? {
        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 " +
                "starting DemoDataController: generateCustomerNodeData ... \uD83C\uDF4F ")
        val mToken = token.substring(7)
        val result = demoDataService.generateCustomerNodeData(proxy, numberOfMonths, mToken)
        logger.info("\n\n\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 DemoDataController:generateCustomerNodeData result: " +
                " \uD83C\uDF4F " + GSON.toJson(result)
                + "    \uD83E\uDDE1 \uD83D\uDC9B \uD83D\uDC9A \uD83D\uDC99 \uD83D\uDC9C\n\n")
        return result
    }
    @GetMapping(value = ["/generateInvestorPayments"], produces = [MediaType.APPLICATION_JSON_VALUE])
    @Throws(Exception::class)
    private fun generateInvestorPayments(@RequestHeader("Authorization") token: String): List<InvestorPaymentDTO> {
        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 " +
                "starting DemoDataController: generateInvestorPayments ... \uD83C\uDF4F ")

        val mToken = token.substring(7)
        val result = demoDataService.generateInvestorPayments(proxy, mToken)
        logger.info("\n\n\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 " +
                "DemoDataController:generateInvestorPayments result: " +
                " \uD83C\uDF4F " + result.size
                + "  investorPayments generated  \uD83E\uDDE1 ")
        return result
    }
    @Autowired
    private lateinit var clientDemoDataDriver: ClientDemoDataDriverService

    @GetMapping(value = ["/startClientDemoDriver"], produces = [MediaType.APPLICATION_JSON_VALUE])
    @Throws(Exception::class)
    private fun startClientDemoDriver(
            @RequestParam seed: String?,
            @RequestHeader("Authorization") token: String): String{
        logger.info("\n\n\n\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 " +
                "starting DemoDataController: startClient ... \uD83C\uDF4F ")

        val mToken = token.substring(7)
        clientDemoDataDriver.startTheWork(
                networkOperatorUrl = "http://localhost:10050",
                customerUrl = "http://localhost:10053",
                authToken = mToken, seed = seed)

        val msg = ("\n\n\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 " +
                "DemoDataController:startClient result: " +
                " \uD83C\uDF4F "
                + "  Demo Data generated  \uD83E\uDDE1 ")
        logger.info(msg)
        return msg
    }

    @GetMapping(value = ["/getProxy"])
    @Throws(Exception::class)
    fun getProxy(): CordaRPCOps {
        return proxy
    }

    @GetMapping(value = ["/hello"], produces = ["text/plain"])
     fun hello(): String {
        logger.info("/ requested. will say hello  \uD83D\uDC9A  \uD83D\uDC9A  \uD83D\uDC9A")
        return "\uD83D\uDC9A  BFNWebApi: DemoDataController says  \uD83E\uDD6C HELLO WORLD!  \uD83D\uDC9A  \uD83D\uDC9A"
    }

    @GetMapping(value = ["/ping"], produces = [MediaType.APPLICATION_JSON_VALUE])
     fun ping(): String {
        val msg = ("\uD83E\uDDE1 \uD83D\uDC9B \uD83D\uDC9A DemoDataController:BFN Web API pinged: " + Date().toString()
                + " \uD83E\uDDE1 \uD83D\uDC9B \uD83D\uDC9A")
        val start = Date()
        logger.info(msg)
        val nodeInfo = proxy.nodeInfo()
        logger.info("\uD83E\uDDA0 \uD83E\uDDA0 \uD83E\uDDA0 node pinged: "
                + nodeInfo.legalIdentities[0].name.toString()
                + proxy.networkParameters.toString() + " \uD83E\uDDA0 \uD83E\uDDA0 \uD83E\uDDA0 ")

        val mm = "\uD83C\uDF3A \uD83C\uDF3A \uD83C\uDF3A \uD83C\uDF3A  DemoDataController: node pinged: " +
                nodeInfo.legalIdentities[0].name.toString() +
                " \uD83C\uDF3A \uD83C\uDF3A \uD83C\uDF3A \uD83C\uDF3A " +
                proxy.networkParameters.toString()
        for (user in firebaseService.getBFNUsers()) {
            logger.info("\uD83D\uDC9B Firebase auth user: \uD83D\uDE21 ${user.accountInfo.name} ${user.email}")
        }

        ResponseTimer.writeResponse(start = start,
                callName = "ping", profile = profile)
        return  mm
    }


    private inner class PingResult internal constructor(var message: String, var nodeInfo: String)

    companion object {
        private val logger = LoggerFactory.getLogger(DemoDataController::class.java)
        private val GSON = GsonBuilder().setPrettyPrinting().create()
    }

    init {
        logger.info("\uD83C\uDF3A \uD83C\uDF3A \uD83C\uDF3A AdminController:" +
                " NodeRPCConnection proxy has been injected: \uD83C\uDF3A "
                + proxy.nodeInfo().toString() +  " \uD83C\uDF3A ")
    }
}
