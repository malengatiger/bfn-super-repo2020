package com.bfn.client.web

import com.bfn.client.dto.*
import com.bfn.client.local.DemoUtil
import com.bfn.client.web.WorkerBee.getAccount
import com.bfn.client.web.WorkerBee.getDashboardData
import com.bfn.client.web.WorkerBee.getNodeAccounts
import com.bfn.client.web.WorkerBee.getStates
import com.bfn.client.web.WorkerBee.listFlows
import com.bfn.client.web.WorkerBee.listNodes
import com.bfn.client.web.WorkerBee.listNotaries
import com.bfn.client.web.WorkerBee.startAccountRegistrationFlow
import com.google.firebase.auth.UserRecord
import com.google.gson.GsonBuilder
import net.corda.core.messaging.CordaRPCOps
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.core.env.Environment
import org.springframework.web.bind.annotation.*
import java.util.*

/**
 * Define your API endpoints here.
 */
@RestController
@RequestMapping("/admin") // The paths for HTTP requests are relative to this base path.
class AdminController(rpc: NodeRPCConnection) {
    private val proxy: CordaRPCOps = rpc.proxy
    @Value("\${spring.profiles.active}")
    private lateinit var profile: String
    @GetMapping(value = ["/demo"], produces = ["application/json"])
    @Throws(Exception::class)
    private fun buildDemo(@RequestParam deleteFirestore: Boolean, @RequestParam numberOfAccounts: Int = 9): DemoSummary {
        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 starting DemoUtil: buildDemo ... \uD83C\uDF4F deleteFirestore: $deleteFirestore")
        val result = DemoUtil.generateLocalNodeAccounts(proxy, deleteFirestore, numberOfAccounts)
        logger.info("\n\n\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 DemoUtil result: " +
                " \uD83C\uDF4F " + GSON.toJson(result)
                + "    \uD83E\uDDE1 \uD83D\uDC9B \uD83D\uDC9A \uD83D\uDC99 \uD83D\uDC9C\n\n")
        return result
    }
    @GetMapping(value = ["/getInvoicesAcrossNodes"], produces = ["application/json"])
    @Throws(Exception::class)
    private fun getInvoicesAcrossNodes(): List<InvoiceDTO> {
        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 starting getInvoicesAcrossNodes: ... \uD83C\uDF4F ")
        val cx = CrossNodeService()
        val list = cx.getInvoicesAcrossNodes();
        list.forEach() {
            logger.info("\uD83C\uDF4E \uD83C\uDF4E ${it.supplier?.host} " +
                    "\uD83C\uDF51 supplier: ${it.supplier?.name} " +
                    "\uD83E\uDD66 customer: ${it.customer?.name} amount: ${it.amount}")
        }
        return list
    }
    @GetMapping(value = ["/generateOffers"], produces = ["application/json"])
    @Throws(Exception::class)
    private fun generateOffers(@RequestParam max: Int?): String {
        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 starting DemoUtil: generateOffers ... \uD83C\uDF4F ")
        var maximumRecords = 200;
        if (max != null) maximumRecords = max
        val result = DemoUtil.generateOffers(proxy, maximumRecords)
        logger.info(result)
        return result
    }
    @GetMapping(value = ["/generateInvoices"], produces = ["application/json"])
    @Throws(Exception::class)
    private fun generateInvoices(@RequestParam max: String = "1"): String {
        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 AdminController: generateInvoices ... \uD83C\uDF4F max: $max")
        var maximumRecords: Int = max.toInt()
        val result = DemoUtil.generateInvoices(proxy, count = maximumRecords)
        logger.info(result)
        return result
    }
    @GetMapping(value = ["/generateCrossNodeInvoices"], produces = ["application/json"])
    @Throws(Exception::class)
    private fun generateCrossNodeInvoices(@RequestParam max: String = "1"): String {
        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 generateCrossNodeInvoices ... \uD83C\uDF4F ")
        val maximumRecords: Int = max.toInt();
        val result = DemoUtil.generateCrossNodeInvoices(proxy, maximumRecords)
        logger.info(result)
        return result
    }
    @GetMapping(value = ["/selectBestOffer"], produces = ["application/json"])
    @Throws(Exception::class)
    private fun selectBestOffer(@RequestParam accountId: String,
                                @RequestParam invoiceId: String): OfferAndTokenDTO? {

        val offerAndTokenDTO = WorkerBee.selectBestOffer(proxy = proxy,
                accountId = accountId, invoiceId = invoiceId)
        if (offerAndTokenDTO == null) {
            logger.info("\uD83D\uDC80 \uD83D\uDC80 \uD83D\uDC80 \uD83D\uDC80  NO OFFER MADE: \uD83C\uDF0E ")
        } else {
            logger.info("\uD83C\uDF0E \uD83C\uDF0E Best Offer found, Token Issued and returned: \uD83C\uDF0E $offerAndTokenDTO")
        }

        return offerAndTokenDTO
    }

    @PostMapping(value = ["/createAnchor"], produces = ["application/json"])
    @Throws(Exception::class)
    private fun createAnchor(@RequestBody anchor: AnchorDTO): AnchorDTO? {
        return AnchorBee.createAnchor(anchor = anchor, proxy = proxy)
    }

    @PostMapping(value = ["/startAccountRegistrationFlow"], produces = ["application/json"])
    @Throws(Exception::class)
    private fun startAccountRegistrationFlow(@RequestBody user: UserDTO): AccountInfoDTO {
        return startAccountRegistrationFlow(proxy, user.name!!,
                user.email, user.password, user.cellphone)
    }

    @PostMapping(value = ["/addSupplierProfile"], produces = ["application/json"])
    @Throws(Exception::class)
    private fun addSupplierProfile(@RequestBody profile: SupplierProfileStateDTO): String {
       return WorkerBee.createSupplierProfile(proxy,profile)
    }
    @PostMapping(value = ["/addInvestorProfile"], produces = ["application/json"])
    @Throws(Exception::class)
    private fun addInvestorProfile(@RequestBody profile: InvestorProfileStateDTO): String {
        return WorkerBee.createInvestorProfile(proxy,profile)
    }

    @get:GetMapping(value = ["/getStates"], produces = ["application/json"])
    val states: List<String>
        get() {
            return getStates(proxy)
        }

    @GetMapping(value = ["/findInvoicesForCustomer"])
    @Throws(Exception::class)
    fun findInvoicesForCustomer(
                         @RequestParam(value = "accountId", required = true) accountId: String): List<InvoiceDTO> {
        return WorkerBee.findInvoicesForCustomer(proxy, accountId)
    }
    @GetMapping(value = ["/findInvoicesForSupplier"])
    @Throws(Exception::class)
    fun findInvoicesForSupplier(
            @RequestParam(value = "accountId", required = true) accountId: String): List<InvoiceDTO> {
        return WorkerBee.findInvoicesForSupplier(proxy, accountId)
    }
    @GetMapping(value = ["/findInvoicesForNode"])
    @Throws(Exception::class)
    fun findInvoicesForNode(): List<InvoiceDTO> {
        return WorkerBee.findInvoicesForNode(proxy)
    }
    @GetMapping(value = ["/findInvoicesForInvestor"])
    @Throws(Exception::class)
    fun findInvoicesForInvestor(@RequestParam(value = "accountId", required = true) accountId: String): List<InvoiceDTO> {
        return WorkerBee.findInvoicesForInvestor(proxy, accountId)
    }

    @GetMapping(value = ["/findOffersForInvestor"])
    @Throws(Exception::class)
    fun findOffersForInvestor(@RequestParam(value = "accountId", required = true) accountId: String): List<InvoiceOfferDTO> {
        return WorkerBee.findOffersForInvestor(proxy, accountId)
    }
    @GetMapping(value = ["/findOffersForSupplier"])
    @Throws(Exception::class)
    fun findOffersForSupplier(@RequestParam(value = "accountId", required = true) accountId: String): List<InvoiceOfferDTO> {
        return WorkerBee.findOffersForSupplier(proxy, accountId)
    }
    @GetMapping(value = ["/findOffersForNode"])
    @Throws(Exception::class)
    fun findOffersForNode(): List<InvoiceOfferDTO> {
        return WorkerBee.findOffersForNode(proxy)
    }

    @GetMapping(value = ["/selectBestOffers"])
    @Throws(Exception::class)
    fun selectBestOffers(): List<OfferAndTokenDTO> {
        return WorkerBee.selectBestOffers(proxy)
    }
    @GetMapping(value = ["/getProxy"])
    @Throws(Exception::class)
    fun getProxy(): CordaRPCOps {
        return proxy
    }
    @GetMapping(value = ["/makeInvoiceOffers"])
    @Throws(Exception::class)
    fun makeInvoiceOffers(@RequestParam investorId: String): List<InvoiceOfferDTO> {
        return WorkerBee.makeInvoiceOffers(proxy,investorId)
    }
    @PostMapping(value = ["/createInvestorProfile"])
    @Throws(Exception::class)
    fun createInvestorProfile(@RequestBody profile: InvestorProfileStateDTO): String {
        return WorkerBee.createInvestorProfile(proxy, profile)
    }
    @GetMapping(value = ["/getSupplierProfile"])
    @Throws(Exception::class)
    fun getSupplierProfile(@RequestParam(value = "accountId") accountId: String?): SupplierProfileStateDTO? {
        return WorkerBee.getSupplierProfile(proxy,accountId)
    }
    @GetMapping(value = ["/getInvestorProfile"])
    @Throws(Exception::class)
    fun getInvestorProfile(@RequestParam(value = "accountId") accountId: String?): InvestorProfileStateDTO? {
        return WorkerBee.getInvestorProfile(proxy,accountId)
    }
    @PostMapping(value = ["/createSupplierProfile"])
    @Throws(Exception::class)
    fun createSupplierProfile(@RequestBody profile: SupplierProfileStateDTO): String {
        return WorkerBee.createSupplierProfile(proxy, profile)
    }

    @GetMapping(value = ["/getUser"])
    @Throws(Exception::class)
    fun getUser(@RequestParam(value = "email", required = false) email: String?): UserRecord? {
        return FirebaseUtil.getUser(email)
    }


    @GetMapping(value = ["/getUsers"])
    fun getUsersFromFirestore() : List<UserDTO> {
        val start = Date()
        val users: MutableList<UserDTO> = ArrayList()
        try {
            val userRecords = FirebaseUtil.getUsers()
            for (userRecord in userRecords) {
                logger.info("🔵 🔵 userRecord 😡 " + userRecord.displayName + " 😡 " + userRecord.email)
                val user = UserDTO()
                user.name = userRecord.displayName
                user.email = userRecord.email
                user.uid = userRecord.uid
                users.add(user)
            }
            ResponseTimer.writeResponse(start = start, 
                    callName = "getUsersFromFirestore", profile = profile)
        } catch (e: Exception) {
            e.printStackTrace()
        }
        return users
    }


    @GetMapping(value = ["/getAccount"])
    @Throws(Exception::class)
    fun getAccount(@RequestParam(value = "accountId") accountId: String?): AccountInfoDTO {
        return getAccount(proxy, accountId)
    }


    @GetMapping(value = ["/hello"], produces = ["text/plain"])
     fun hello(): String {
        logger.info("/ requested. will say hello  \uD83D\uDC9A  \uD83D\uDC9A  \uD83D\uDC9A")
        return "\uD83D\uDC9A  BFNWebApi: AdminController says  \uD83E\uDD6C HELLO WORLD!  \uD83D\uDC9A  \uD83D\uDC9A"
    }

    @GetMapping(value = ["/ping"], produces = ["application/json"])
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

        ResponseTimer.writeResponse(start = start, 
                callName = "ping", profile = profile)
        return  mm
    }

    @get:GetMapping(value = ["/getDashboardData"], produces = ["application/json"])
    private val dashboardData: DashboardData
        get() = getDashboardData(proxy)

    @GetMapping(value = ["/nodes"], produces = ["application/json"])
    fun listNodes(): List<NodeInfoDTO> {
        val start = Date()
        val nodes =listNodes(proxy)
        ResponseTimer.writeResponse(start = start, 
                callName = "listNodes", profile = profile)
        return nodes
    }

    @GetMapping(value = ["/notaries"], produces = ["application/json"])
    private fun listNotaries(): List<String> {
        val start = Date()
        val mm = listNotaries(proxy)
        ResponseTimer.writeResponse(start = start, 
                callName = "listNotaries", profile = profile)
        return mm
    }

    @GetMapping(value = ["/flows"], produces = ["application/json"])
    private fun listFlows(): List<String> {
        val start = Date()
        val mm = listFlows(proxy)
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
