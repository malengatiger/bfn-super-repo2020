package com.bfn.client.web
//class AdminController {
//
//}

//
import com.bfn.client.TesterBee
import com.bfn.client.data.*
import com.google.firebase.auth.UserRecord
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
@RequestMapping("/admin") // The paths for HTTP requests are relative to this base path.
class AdminController(rpc: NodeRPCConnection) {
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
    private lateinit var  crossNodeService:CrossNodeService

    @Autowired
    private lateinit var  stellarAccountService:StellarAccountService


    @GetMapping(value = ["/test"], produces = [MediaType.TEXT_PLAIN_VALUE])
    @Throws(Exception::class)
    private fun testerRun(): String {
        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 starting DemoUtil: buildDemo ... \uD83C\uDF4F ")
       val msg = TesterBee.runMe();
        logger.info("\n\n\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 TesterBee completed " +
                 "    \uD83E\uDDE1 \uD83D\uDC9B \uD83D\uDC9A \uD83D\uDC99 \uD83D\uDC9C\n\n")
        return "Tester Done: $msg"
    }

    @GetMapping(value = ["/demo"], produces = [MediaType.APPLICATION_JSON_VALUE])
    @Throws(Exception::class)
    private fun buildDemo(@RequestParam numberOfAccounts:String): DemoSummary? {
        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 starting DemoDataService: buildDemo ... \uD83C\uDF4F number accts: $numberOfAccounts")

        val num = numberOfAccounts.toInt()
        val result = demoDataService.generateLocalNodeAccounts(proxy, num)
        logger.info("\n\n\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 DemoUtil result: " +
                " \uD83C\uDF4F " + GSON.toJson(result)
                + "    \uD83E\uDDE1 \uD83D\uDC9B \uD83D\uDC9A \uD83D\uDC99 \uD83D\uDC9C\n\n")
        return result
    }

    @GetMapping(value = ["/deleteFirebase"], produces = [MediaType.TEXT_PLAIN_VALUE])
    @Throws(Exception::class)
    private fun deleteFirebase(): String {
        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 starting deleteFirebase: ... \uD83C\uDF4F ")
        firebaseService.deleteUsers()
        firebaseService.deleteCollections()
        return "\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 deleteFirebase completed. \uD83C\uDF4F "
    }
    @GetMapping(value = ["/makeAnchorOffers"], produces = [MediaType.APPLICATION_JSON_VALUE])
    @Throws(Exception::class)
    private fun makeAnchorOffers(): List<InvoiceOfferDTO>? {
        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 starting makeAnchorOffers: ... \uD83C\uDF4F ")
        return networkOperatorBeeService.makeOffers(proxy)
    }

    @GetMapping(value = ["/makeSinglePayment"], produces = [MediaType.APPLICATION_JSON_VALUE])
    @Throws(Exception::class)
    private fun makeSinglePayment(@RequestParam invoiceId: String): SupplierPaymentDTO? {
        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 starting makeSinglePayment: ... \uD83C\uDF4F ")
        return networkOperatorBeeService.makeSinglePayment(proxy, invoiceId = invoiceId)
    }
    @GetMapping(value = ["/makeMultiplePayments"], produces = [MediaType.APPLICATION_JSON_VALUE])
    @Throws(Exception::class)
    private fun makeMultiplePayments(delayMinutesUntilNextPaymentFlow: Long): List<SupplierPaymentDTO>? {
        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 starting makeMultiplePayments: ... \uD83C\uDF4F ")
        return networkOperatorBeeService.makeMultiplePayments(proxy, delayMinutesUntilNextPaymentFlow)
    }

    @GetMapping(value = ["/getInvoicesAcrossNodes"], produces = [MediaType.APPLICATION_JSON_VALUE])
    @Throws(Exception::class)
    private fun getInvoicesAcrossNodes(): List<InvoiceDTO>? {
        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 starting getInvoicesAcrossNodes: ... \uD83C\uDF4F ")

        val list = crossNodeService.getInvoicesAcrossNodes();
        list.forEach() {
            logger.info("\uD83C\uDF4E \uD83C\uDF4E ${it.supplier.host} " +
                    "\uD83C\uDF51 supplier: ${it.supplier.name} " +
                    "\uD83E\uDD66 customer: ${it.customer.name} amount: ${it.amount}")
        }
        return list
    }
    @GetMapping(value = ["/generateOffers"], produces = [MediaType.APPLICATION_JSON_VALUE])
    @Throws(Exception::class)
    private fun generateOffers(@RequestParam max: Int?): String? {
        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 starting DemoUtil: generateOffers ... \uD83C\uDF4F ")
        var maximumRecords = 200;
        if (max != null) maximumRecords = max
        val result = demoDataService.generateOffers(proxy, maximumRecords)
        logger.info(result)
        return result
    }

    @GetMapping(value = ["/getAnchor"], produces = [MediaType.APPLICATION_JSON_VALUE])
    @Throws(Exception::class)
    private fun getAnchor(@RequestParam identifier: String): NetworkOperatorDTO? {
        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 starting getAnchor signIn ... \uD83C\uDF4F ")
        return networkOperatorBeeService.getNetworkOperator(proxy, identifier);
    }
    @GetMapping(value = ["/getAccounts"], produces = [MediaType.APPLICATION_JSON_VALUE])
    @Throws(Exception::class)
    private fun getAccounts(): List<AccountInfoDTO> {
        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 starting getAccounts signIn ... \uD83C\uDF4F ")
        return workerBeeService.getNodeAccounts(proxy)
    }

    @PostMapping(value = ["/generateInvoices"], produces = [MediaType.APPLICATION_JSON_VALUE])
    @Throws(Exception::class)
    private fun generateInvoices(numberOfInvoicesPerAccount:Int ): String? {
        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 AdminController: ... generateInvoices ...")
        val result = demoDataService.generateInvoices(proxy, numberOfInvoicesPerAccount = 5)
        logger.info(result)
        return result
    }

    @PostMapping(value = ["/createStellarAccount"], produces = [MediaType.APPLICATION_JSON_VALUE])
    @Throws(Exception::class)
    private fun createStellarAccount(): StellarResponse? {
        logger.info("\n\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E  " +
                "Creating Stellar Account by calling Stellar anchor server $stellarAnchorUrl ")
        val stellarResponse
                = stellarAccountService.createStellarAccount(proxy = proxy)

        logger.info(" \uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40 " +
                "AdminController.createStellarAccount returns responseBag:  ${GSON.toJson(stellarResponse)}")

        return stellarResponse;
    }

    @PostMapping(value = ["/createNetworkOperator"], produces = [MediaType.APPLICATION_JSON_VALUE])
    @Throws(Exception::class)
    private fun createNetworkOperator(@RequestBody networkOperator: NetworkOperatorDTO): NetworkOperatorDTO? {
        logger.info("\n\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E  " +
                "Creating Network Operator:, check fields, tradeFrequencyInMinutes, defaultOfferDiscount ...  ${GSON.toJson(networkOperator)}")
        val operator =  networkOperatorBeeService.createNetworkOperator(
                networkOperator = networkOperator, proxy = proxy)
        logger.info(" \uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40 " +
                "networkOperatorBeeService.createNetworkOperator returns operator:  ${GSON.toJson(operator)}")

        return operator;
    }
    @PostMapping(value = ["/updateNetworkOperator"], produces = [MediaType.APPLICATION_JSON_VALUE])
    @Throws(Exception::class)
    private fun updateNetworkOperator(@RequestBody networkOperator: NetworkOperatorDTO): NetworkOperatorDTO? {
        return networkOperatorBeeService.updateNetworkOperator(networkOperator = networkOperator, proxy = proxy)
    }

    @PostMapping(value = ["/startAccountRegistrationFlow"], produces = [MediaType.APPLICATION_JSON_VALUE])
    @Throws(Exception::class)
    private fun startAccountRegistrationFlow(@RequestBody user: UserDTO): UserDTO? {
        logger.info(" \uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40" +
                " startAccountRegistrationFlow ... ${user.accountInfo.name}")
        return workerBeeService.startAccountRegistrationFlow(proxy, user.accountInfo.name,
                user.email, user.cellphone, user.password)
    }
    @PostMapping(value = ["/startAccountInfoQueryFlow"], produces = [MediaType.APPLICATION_JSON_VALUE])
    @Throws(Exception::class)
    private fun startAccountInfoQuery(@RequestParam identifier: String): AccountInfoDTO {
        return workerBeeService.startAccountInfoQueryFlow(proxy, identifier)
    }

    @PostMapping(value = ["/addSupplierProfile"], produces = [MediaType.APPLICATION_JSON_VALUE])
    @Throws(Exception::class)
    private fun addSupplierProfile(@RequestBody profile: SupplierProfileStateDTO): String? {
        val acct = workerBeeService.getNodeAccount(proxy, identifier = profile.account.identifier)
       return acct.let { workerBeeService.createSupplierProfile(proxy, profile, it!!) }
    }
    @PostMapping(value = ["/addInvestorProfile"], produces = [MediaType.APPLICATION_JSON_VALUE])
    @Throws(Exception::class)
    private fun addInvestorProfile(@RequestBody profile: InvestorProfileStateDTO): String? {
        val acct = workerBeeService.getNodeAccount(proxy, identifier = profile.account.identifier)
        return acct.let { workerBeeService.createInvestorProfile(proxy, profile, it!!) }
    }

    @get:GetMapping(value = ["/getStates"], produces = [MediaType.APPLICATION_JSON_VALUE])
    val states: List<String>
        get() {
            return workerBeeService.getStates(proxy)
        }

    @GetMapping(value = ["/findInvoicesForCustomer"])
    @Throws(Exception::class)
    fun findInvoicesForCustomer(
                         @RequestParam(value = "accountId", required = true) accountId: String): List<InvoiceDTO> {
        return workerBeeService.findInvoicesForCustomer(proxy, accountId)
    }
    @GetMapping(value = ["/findInvoicesForSupplier"])
    @Throws(Exception::class)
    fun findInvoicesForSupplier(
            @RequestParam(value = "accountId", required = true) accountId: String): List<InvoiceDTO> {
        return workerBeeService.findInvoicesForSupplier(proxy, accountId)
    }
    @GetMapping(value = ["/findInvoicesForNode"])
    @Throws(Exception::class)
    fun findInvoicesForNode(): List<InvoiceDTO> {
        return workerBeeService.findInvoicesForNode(proxy)
    }
    @GetMapping(value = ["/findInvoicesForInvestor"])
    @Throws(Exception::class)
    fun findInvoicesForInvestor(@RequestParam(value = "accountId", required = true) accountId: String): List<InvoiceDTO> {
        return workerBeeService.findInvoicesForInvestor(proxy, accountId)
    }

    @GetMapping(value = ["/findOffersForInvestor"])
    @Throws(Exception::class)
    fun findOffersForInvestor(@RequestParam(value = "accountId", required = true) accountId: String): List<InvoiceOfferDTO> {
        return workerBeeService.findOffersForInvestor(proxy, accountId)
    }
    @GetMapping(value = ["/findOffersForSupplier"])
    @Throws(Exception::class)
    fun findOffersForSupplier(@RequestParam(value = "accountId", required = true) accountId: String): List<InvoiceOfferDTO> {
        return workerBeeService.findOffersForSupplier(proxy, accountId)
    }
    @GetMapping(value = ["/findOffersForNode"])
    @Throws(Exception::class)
    fun findOffersForNode(): List<InvoiceOfferDTO> {
        return workerBeeService.findOffersForNode(proxy)
    }

    @GetMapping(value = ["/getProxy"])
    @Throws(Exception::class)
    fun getProxy(): CordaRPCOps {
        return proxy
    }
    @GetMapping(value = ["/makeInvoiceOffers"])
    @Throws(Exception::class)
    fun makeInvoiceOffers(@RequestParam investorId: String): List<InvoiceOfferDTO> {
        return workerBeeService.makeInvoiceOffers(proxy, investorId)
    }
    @PostMapping(value = ["/createInvestorProfile"])
    @Throws(Exception::class)
    fun createInvestorProfile(@RequestBody profile: InvestorProfileStateDTO): String? {
        val acct = workerBeeService.getNodeAccount(proxy, identifier = profile.account.identifier)
        return acct.let { workerBeeService.createInvestorProfile(proxy, profile, it!!) }
    }
    @GetMapping(value = ["/getSupplierProfile"])
    @Throws(Exception::class)
    fun getSupplierProfile(@RequestParam(value = "accountId") accountId: String?): SupplierProfileStateDTO? {
        return workerBeeService.getSupplierProfile(proxy, accountId)
    }
    @GetMapping(value = ["/getInvestorProfile"])
    @Throws(Exception::class)
    fun getInvestorProfile(@RequestParam(value = "accountId") accountId: String?): InvestorProfileStateDTO? {
        return workerBeeService.getInvestorProfile(proxy, accountId)
    }
    @PostMapping(value = ["/createSupplierProfile"])
    @Throws(Exception::class)
    fun createSupplierProfile(@RequestBody profile: SupplierProfileStateDTO): String? {
        val acct = workerBeeService.getNodeAccount(proxy, identifier = profile.account.identifier)
        return acct.let { workerBeeService.createSupplierProfile(proxy, profile, it!!) }
    }

    @GetMapping(value = ["/getUser"])
    @Throws(Exception::class)
    fun getUser(@RequestParam(value = "email", required = false) email: String?): UserRecord? {
        return firebaseService.getUser(email)
    }


    @GetMapping(value = ["/getUsers"])
    fun getUsersFromFirestore() : MutableList<UserDTO> {
        val start = Date()

            val users = firebaseService.getBFNUsers()
            ResponseTimer.writeResponse(start = start,
                    callName = "getUsersFromFirestore", profile = profile)

        return users
    }


    @GetMapping(value = ["/getAccount"])
    @Throws(Exception::class)
    fun getAccount(@RequestParam(value = "accountId") accountId: String?): AccountInfoDTO {
        return workerBeeService.getAccount(proxy, accountId)
    }


    @GetMapping(value = ["/hello"], produces = ["text/plain"])
     fun hello(): String {
        logger.info("/ requested. will say hello  \uD83D\uDC9A  \uD83D\uDC9A  \uD83D\uDC9A")
        return "\uD83D\uDC9A  BFNWebApi: AdminController says  \uD83E\uDD6C HELLO WORLD!  \uD83D\uDC9A  \uD83D\uDC9A"
    }

    @GetMapping(value = ["/ping"], produces = [MediaType.APPLICATION_JSON_VALUE])
     fun ping(): String {
        val msg = ("\uD83E\uDDE1 \uD83D\uDC9B \uD83D\uDC9A AdminController:BFN Web API pinged: " + Date().toString()
                + " \uD83E\uDDE1 \uD83D\uDC9B \uD83D\uDC9A")
        val start = Date()
        logger.info(msg)
        val nodeInfo = proxy.nodeInfo()
        logger.info("\uD83E\uDDA0 \uD83E\uDDA0 \uD83E\uDDA0 node pinged: "
                + nodeInfo.legalIdentities[0].name.toString()
                + proxy.networkParameters.toString() + " \uD83E\uDDA0 \uD83E\uDDA0 \uD83E\uDDA0 ")

        val mm = "\uD83C\uDF3A \uD83C\uDF3A \uD83C\uDF3A \uD83C\uDF3A  AdminController: node pinged: " +
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

    @get:GetMapping(value = ["/getDashboardData"], produces = [MediaType.APPLICATION_JSON_VALUE])
    private val dashboardData: DashboardData
        get() = workerBeeService.getDashboardData(proxy)

    @GetMapping(value = ["/nodes"], produces = [MediaType.APPLICATION_JSON_VALUE])
    fun listNodes(): List<NodeInfoDTO> {
        val start = Date()
        val nodes = workerBeeService.listNodes(proxy)
        ResponseTimer.writeResponse(start = start,
                callName = "listNodes", profile = profile)
        return nodes
    }

    @GetMapping(value = ["/notaries"], produces = [MediaType.APPLICATION_JSON_VALUE])
    private fun listNotaries(): List<String> {
        val start = Date()
        val mm = workerBeeService.listNotaries(proxy)
        ResponseTimer.writeResponse(start = start,
                callName = "listNotaries", profile = profile)
        return mm
    }

    @GetMapping(value = ["/flows"], produces = [MediaType.APPLICATION_JSON_VALUE])
    private fun listFlows(): List<String> {
        val start = Date()
        val mm = workerBeeService.listFlows(proxy)
        ResponseTimer.writeResponse(start = start,
                callName = "listFlows", profile = profile)
        return mm
    }

    private inner class PingResult internal constructor(var message: String, var nodeInfo: String)

    companion object {
        private val logger = LoggerFactory.getLogger(AdminController::class.java)
        private val GSON = GsonBuilder().setPrettyPrinting().create()
    }

    init {
        logger.info("\uD83C\uDF3A \uD83C\uDF3A \uD83C\uDF3A AdminController:" +
                " NodeRPCConnection proxy has been injected: \uD83C\uDF3A "
                + proxy.nodeInfo().toString() +  " \uD83C\uDF3A ")
    }
}
