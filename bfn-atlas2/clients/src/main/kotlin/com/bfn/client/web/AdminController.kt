package com.bfn.client.web
//class AdminController {
//
//}

//
import com.bfn.client.Emo
import com.bfn.client.TesterBee
import com.bfn.client.data.*
import com.bfn.client.web.services.*
import com.bfn.contractstates.states.AcceptedOfferState
import com.bfn.flows.StellarPaymentDTO
import com.google.firebase.auth.UserRecord
import com.google.gson.GsonBuilder
import net.corda.core.messaging.CordaRPCOps
import net.corda.core.node.services.Vault
import net.corda.core.node.services.vault.PageSpecification
import net.corda.core.node.services.vault.QueryCriteria
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
    private lateinit var workerBeeService: WorkerBeeService

    @Autowired
    private lateinit var demoDataService: DemoDataService

    @Autowired
    private lateinit var networkOperatorBeeService: NetworkOperatorBeeService

    @Autowired
    private lateinit var firebaseService: FirebaseService

    @Autowired
    private lateinit var crossNodeService: CrossNodeService

    @Autowired
    private lateinit var stellarAnchorService: StellarAnchorService


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
    private fun buildDemo(@RequestParam numberOfAccounts: String,
                          @RequestHeader("Authorization") token: String): DemoSummary? {
        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 " +
                "starting DemoDataService: buildDemo ... \uD83C\uDF4F number accts: $numberOfAccounts")

        val num = numberOfAccounts.toInt()
        val mToken = token.substring(7)
        val result = demoDataService.generateLocalNodeAccounts(proxy, num, mToken)
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
            logger.info("\uD83C\uDF4E \uD83C\uDF4E ${it.supplier?.host} " +
                    "\uD83C\uDF51 supplier: ${it.supplier?.name} " +
                    "\uD83E\uDD66 customer: ${it.customer?.name} amount: ${it.amount}")
        }
        return list
    }
//    @GetMapping(value = ["/generateOffers"], produces = [MediaType.APPLICATION_JSON_VALUE])
//    @Throws(Exception::class)
//    private fun generateOffers(@RequestParam max: Int?): String? {
//        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 starting demoDataService: generateOffers ... \uD83C\uDF4F ")
//
//        val result = demoDataService.generateInvoiceOffers(proxy)
//        logger.info(result)
//        return result
//    }

    @GetMapping(value = ["/getNetworkOperator"], produces = [MediaType.APPLICATION_JSON_VALUE])
    @Throws(Exception::class)
    private fun getNetworkOperator(@RequestParam identifier: String): NetworkOperatorDTO? {
        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 starting getAnchor signIn ... \uD83C\uDF4F ")
        return networkOperatorBeeService.getNetworkOperator(proxy);
    }

    @GetMapping(value = ["/getAccounts"], produces = [MediaType.APPLICATION_JSON_VALUE])
    @Throws(Exception::class)
    private fun getAccounts(): List<AccountInfoDTO> {
        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 starting getAccounts ... \uD83C\uDF4F ")
        return workerBeeService.getNodeAccounts(proxy)
    }

    @GetMapping(value = ["/getNetworkAccounts"], produces = [MediaType.APPLICATION_JSON_VALUE])
    @Throws(Exception::class)
    private fun getNetworkAccounts(): List<AccountInfoDTO> {
        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 " +
                "starting getNetworkAccounts ... \uD83C\uDF4F ")
        return workerBeeService.getNetworkAccounts(proxy)
    }
//
//
//    @GetMapping(value = ["/generateInvoices"], produces = [MediaType.APPLICATION_JSON_VALUE])
//    @Throws(Exception::class)
//    private fun generateInvoices(numberOfInvoicesPerAccount:Int ): String? {
//        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 AdminController: ... generateInvoices ...")
//        val result = demoDataService.generateInvoices(proxy)
//        logger.info(result)
//        return result
//    }

    @PostMapping(value = ["/createStellarAccount"], produces = [MediaType.APPLICATION_JSON_VALUE])
    @Throws(Exception::class)
    private fun createStellarAccount(@RequestHeader("Authorization") token: String): StellarResponse? {
        logger.info("\n\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E  " +
                "Creating Stellar Account by calling Stellar anchor server $stellarAnchorUrl ")
        val mToken = token.substring(7)
        val stellarResponse = stellarAnchorService.createStellarAccount(mToken)

        logger.info(" \uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40 " +
                "AdminController.createStellarAccount returns responseBag:  ${GSON.toJson(stellarResponse)}")

        return stellarResponse;
    }

    @PostMapping(value = ["/createNetworkOperator"], produces = [MediaType.APPLICATION_JSON_VALUE])
    @Throws(Exception::class)
    private fun createNetworkOperator(@RequestBody networkOperator: NetworkOperatorDTO,
                                      investorProfile: InvestorProfileStateDTO,
                                      supplierProfile: SupplierProfileStateDTO,@RequestHeader("Authorization") token: String): NetworkOperatorDTO? {

        logger.info("\n\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E  " +
                "Creating Network Operator:, check fields, tradeFrequencyInMinutes, defaultOfferDiscount ...  ${GSON.toJson(networkOperator)}")

        val mToken = token.substring(7)
        val operator = networkOperatorBeeService.createNetworkOperator(
                networkOperator = networkOperator,
                proxy = proxy,
                investorProfile = investorProfile,
                supplierProfile = supplierProfile, token = mToken)

        logger.info(" \uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40 " +
                "networkOperatorBeeService.createNetworkOperator returns operator:  ${GSON.toJson(operator)}")

        return operator;
    }

    @PostMapping(value = ["/updateNetworkOperator"], produces = [MediaType.APPLICATION_JSON_VALUE])
    @Throws(Exception::class)
    private fun updateNetworkOperator(@RequestBody networkOperator: NetworkOperatorDTO): NetworkOperatorDTO? {
        return networkOperatorBeeService.updateNetworkOperator(
                networkOperator = networkOperator, proxy = proxy)
    }
    @PostMapping(value = ["/sendPayment"],
            consumes = [MediaType.APPLICATION_JSON_VALUE],
            produces = [MediaType.APPLICATION_JSON_VALUE])
    @Throws(Exception::class)
    private fun sendPayment(@RequestBody paymentRequest: StellarPaymentDTO, @RequestHeader("Authorization") token: String): Int {
        logger.info(" \uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40" +
                " sendPayment using stellarAnchorService... sourceAccount: ${paymentRequest.sourceAccount} " +
                "destinationAccount: ${paymentRequest.destinationAccount} token: $token")
        if (paymentRequest.sourceAccount == "tbd") {
            throw Exception("Source Account is invalid")
        }
        if (paymentRequest.destinationAccount == "tbd") {
            throw Exception("Destination Account is invalid")
        }
        val mToken = token.substring(7)
        return stellarAnchorService.sendPayment(paymentRequest, mToken)
    }
    @PostMapping(value = ["/startAccountRegistrationFlow"], produces = [MediaType.APPLICATION_JSON_VALUE])
    @Throws(Exception::class)
    private fun startAccountRegistrationFlow(@RequestBody user: UserDTO, @RequestHeader("Authorization") token: String): UserDTO? {
        logger.info(" \uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40" +
                " startAccountRegistrationFlow ... ${user.accountInfo.name}")
        val mToken = token.substring(7)
        return workerBeeService.startAccountRegistrationFlow(proxy, user.accountInfo.name,
                user.email, user.cellphone, user.password, mToken)
    }

    @PostMapping(value = ["/startInvoiceOfferFlow"], produces = [MediaType.APPLICATION_JSON_VALUE])
    @Throws(Exception::class)
    private fun startInvoiceOfferFlow(@RequestBody invoice: InvoiceDTO,
                                      offer: InvoiceOfferDTO): InvoiceOfferDTO? {
        logger.info(" \uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40" +
                " startInvoiceOfferFlow ... ${offer.investor?.name}")
        return workerBeeService.startInvoiceOfferFlow(proxy = proxy, invoice = invoice, invoiceOffer = offer)
    }

    @PostMapping(value = ["/startAccountInfoQueryFlow"], produces = [MediaType.APPLICATION_JSON_VALUE])
    @Throws(Exception::class)
    private fun startAccountInfoQuery(@RequestParam identifier: String): AccountInfoDTO {
        return workerBeeService.startAccountInfoQueryFlow(proxy, identifier)
    }

    @PostMapping(value = ["/addSupplierProfile"], produces = [MediaType.APPLICATION_JSON_VALUE])
    @Throws(Exception::class)
    private fun addSupplierProfile(@RequestBody profile: SupplierProfileStateDTO): String? {
        val acct = workerBeeService.getNodeAccount(proxy, identifier = profile.account!!.identifier)
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

    //// LISTS 🔵🔵🔵🔵🔵🔵🔵🔵🔵
    @GetMapping(value = ["/getPurchaseOrders"])
    @Throws(Exception::class)
    fun getPurchaseOrders(
            @RequestParam startDate: String,
            @RequestParam endDate: String): List<PurchaseOrderDTO> {
        return firebaseService.getPurchaseOrders(startDate, endDate)
    }
    @GetMapping(value = ["/getSupplierPurchaseOrders"])
    @Throws(Exception::class)
    fun getSupplierPurchaseOrders(
            @RequestParam identifier: String): List<PurchaseOrderDTO> {
        return firebaseService.getSupplierPurchaseOrders(identifier)
    }
    
    @GetMapping(value = ["/getCustomerPurchaseOrders"])
    @Throws(Exception::class)
    fun getCustomerPurchaseOrders(
            @RequestParam identifier: String): List<PurchaseOrderDTO> {
        return firebaseService.getCustomerPurchaseOrders(identifier)
    }
    
    @GetMapping(value = ["/getSupplierInvoiceOffers"])
    @Throws(Exception::class)
    fun getSupplierInvoiceOffers(
            @RequestParam identifier: String): List<InvoiceOfferDTO> {
        return firebaseService.getSupplierInvoiceOffers(identifier)
    }
    
    @GetMapping(value = ["/getSupplierAcceptedOffers"])
    @Throws(Exception::class)
    fun getSupplierAcceptedOffers(
            @RequestParam identifier: String): List<AcceptedOfferDTO> {
        return firebaseService.getSupplierAcceptedOffers(identifier)
    }
    
    @GetMapping(value = ["/getInvestorAcceptedOffers"])
    @Throws(Exception::class)
    fun getInvestorAcceptedOffers(
            @RequestParam identifier: String): List<AcceptedOfferDTO> {
        return firebaseService.getInvestorAcceptedOffers(identifier)
    }
    
    @GetMapping(value = ["/getInvestorPaymentsByCustomer"])
    @Throws(Exception::class)
    fun getInvestorPaymentsByCustomer(
            @RequestParam identifier: String): List<InvestorPaymentDTO> {
        return firebaseService.getInvestorPaymentsByCustomer(identifier)
    }

    @GetMapping(value = ["/getSupplierPaymentsBySupplier"])
    @Throws(Exception::class)
    fun getSupplierPaymentsBySupplier(
            @RequestParam identifier: String): List<SupplierPaymentDTO> {
        return firebaseService.getSupplierPaymentsBySupplier(identifier)
    }

    @GetMapping(value = ["/getInvestorPaymentsBySupplier"])
    @Throws(Exception::class)
    fun getInvestorPaymentsBySupplier(
            @RequestParam identifier: String): List<InvestorPaymentDTO> {
        return firebaseService.getInvestorPaymentsBySupplier(identifier)
    }

    @GetMapping(value = ["/getSupplierPaymentsByInvestor"])
    @Throws(Exception::class)
    fun getSupplierPaymentsByInvestor(
            @RequestParam identifier: String): List<SupplierPaymentDTO> {
        return firebaseService.getSupplierPaymentsByInvestor(identifier)
    }

    @GetMapping(value = ["/getInvestorPaymentsByInvestor"])
    @Throws(Exception::class)
    fun getInvestorPaymentsByInvestor(
            @RequestParam identifier: String): List<InvestorPaymentDTO> {
        return firebaseService.getInvestorPaymentsByInvestor(identifier)
    }

    @GetMapping(value = ["/getSupplierRoyalties"])
    @Throws(Exception::class)
    fun getSupplierRoyalties(
            @RequestParam startDate: String,
            @RequestParam endDate: String): List<NetworkSupplierRoyaltyDTO> {
        return firebaseService.getSupplierRoyalties(startDate, endDate)
    }

    @GetMapping(value = ["/getInvestorRoyalties"])
    @Throws(Exception::class)
    fun getInvestorRoyalties(
            @RequestParam startDate: String,
            @RequestParam endDate: String): List<NetworkInvestorRoyaltyDTO> {
        return firebaseService.getInvestorRoyalties(startDate, endDate)
    }

    @GetMapping(value = ["/getInvoices"])
    @Throws(Exception::class)
    fun getInvoices(
            @RequestParam startDate: String,
            @RequestParam endDate: String): List<InvoiceDTO> {
        return firebaseService.getInvoices(startDate, endDate)
    }

    @GetMapping(value = ["/getInvoiceOffers"])
    @Throws(Exception::class)
    fun getInvoiceOffers(
            @RequestParam startDate: String,
            @RequestParam endDate: String): List<InvoiceOfferDTO> {
        return firebaseService.getInvoiceOffers(startDate, endDate)
    }

    @GetMapping(value = ["/getAcceptedInvoiceOffers"])
    @Throws(Exception::class)
    fun getAcceptedInvoiceOffers(
            @RequestParam startDate: String,
            @RequestParam endDate: String): List<AcceptedOfferDTO> {
        return firebaseService.getAcceptedInvoiceOffersByPeriod(startDate, endDate)
    }

    @GetMapping(value = ["/checkAcceptedInvoiceOffers"])
    @Throws(Exception::class)
    fun checkAcceptedInvoiceOffers(): List<AcceptedOfferDTO> {

        val criteria = QueryCriteria.VaultQueryCriteria(status = Vault.StateStatus.UNCONSUMED);
        val page = proxy.vaultQueryByWithPagingSpec(
                criteria = criteria,
                contractStateType = AcceptedOfferState::class.java, paging = PageSpecification(
                pageNumber = 1, pageSize = 500
        ))
        val mList: MutableList<AcceptedOfferDTO> = mutableListOf()
        for (m in page.states) {
            mList.add(DTOUtil.getDTO(m.state.data))
        }
        logger.info("${Emo.RED_APPLES} UNCONSUMED Accepted Offers from Ledger: ${mList.size}")
        return mList;

    }

    @GetMapping(value = ["/getSupplierPayments"])
    @Throws(Exception::class)
    fun getSupplierPayments(
            @RequestParam startDate: String,
            @RequestParam endDate: String): List<SupplierPaymentDTO> {
        return firebaseService.getSupplierPaymentsBySupplier(startDate, endDate)
    }

    @GetMapping(value = ["/getCustomerProfiles"])
    @Throws(Exception::class)
    fun getCustomerProfiles(): List<CustomerProfileStateDTO> {
        return workerBeeService.findCustomerProfiles(proxy)
    }

    @GetMapping(value = ["/getInvestorProfiles"])
    @Throws(Exception::class)
    fun getInvestorProfiles(): List<InvestorProfileStateDTO> {
        return workerBeeService.findInvestorProfiles(proxy)
    }

    @GetMapping(value = ["/getSupplierProfiles"])
    @Throws(Exception::class)
    fun getSupplierProfiles(): List<SupplierProfileStateDTO> {
        return workerBeeService.findSupplierProfiles(proxy)
    }

    @GetMapping(value = ["/getNetworkNodes"])
    @Throws(Exception::class)
    fun getNetworkNodes(): List<NodeInfoDTO> {
        return firebaseService.getNetworkNodes()
    }

    //// 🔵🔵🔵🔵
    @GetMapping(value = ["/findInvoicesForCustomer"])
    @Throws(Exception::class)
    fun findInvoicesForCustomer(
            @RequestParam(value = "identifier", required = true) identifier: String): List<InvoiceDTO> {
        return workerBeeService.findInvoicesForCustomer(proxy, identifier)
    }

    @GetMapping(value = ["/findInvoicesForSupplier"])
    @Throws(Exception::class)
    fun findInvoicesForSupplier(
            @RequestParam(value = "identifier", required = true) identifier: String): List<InvoiceDTO> {
        return workerBeeService.findInvoicesOnLedgerForSupplier(proxy, identifier)
    }

    @GetMapping(value = ["/findInvoicesForNode"])
    @Throws(Exception::class)
    fun findInvoicesForNode(): List<InvoiceDTO> {
        return workerBeeService.findInvoicesOnLedgerForNode(proxy)
    }

    @GetMapping(value = ["/findPurchaseOrdersForNode"])
    @Throws(Exception::class)
    fun findPurchaseOrdersForNode(): List<PurchaseOrderDTO> {
        return workerBeeService.findPurchaseOrdersOnLedgerForNode(proxy)
    }

    @GetMapping(value = ["/findInvoicesForInvestor"])
    @Throws(Exception::class)
    fun findInvoicesForInvestor(@RequestParam(value = "identifier", required = true) identifier: String): List<InvoiceDTO> {
        return workerBeeService.findInvoicesOnLedgerForInvestor(proxy, identifier)
    }

    @GetMapping(value = ["/acceptBestOfferForInvoice"])
    @Throws(Exception::class)
    fun acceptBestOfferForInvoice(
            supplierAccountId: String,
            invoiceId: String): AcceptedOfferDTO? {

        return workerBeeService.acceptBestOfferForInvoice(proxy = proxy,
                supplierAccountId = supplierAccountId,
                invoiceId = invoiceId)
    }

    @GetMapping(value = ["/findAcceptedOffersForInvestor"])
    @Throws(Exception::class)
    fun findAcceptedOffersForInvestor(
            investorId: String): List<AcceptedOfferDTO> {
        return workerBeeService.findAcceptedOffersForInvestor(proxy, investorId)
    }

    @GetMapping(value = ["/findOffersForInvestor"])
    @Throws(Exception::class)
    fun findOffersForInvestor(
            investorId: String): List<InvoiceOfferDTO> {
        return workerBeeService.findOffersForInvestor(proxy, investorId)
    }
    //getConsumedSupplierPayment
    @GetMapping(value = ["/getConsumedSupplierPayment"], produces = [MediaType.APPLICATION_JSON_VALUE])
    @Throws(Exception::class)
    fun getConsumedSupplierPayment(offerId: String): SupplierPaymentDTO? {
        return workerBeeService.getSupplierPayment(proxy, offerId = offerId)
    }


    @GetMapping(value = ["/makeSupplierPaymentForOffer"], produces = [MediaType.APPLICATION_JSON_VALUE])
    @Throws(Exception::class)
    fun makeSupplierPaymentForOffer(offerId: String, @RequestHeader("Authorization") token: String): SupplierPaymentDTO? {
        val mToken = token.substring(7)
        return stellarAnchorService.makeSupplierPaymentForOffer(
                proxy, offerId = offerId, token = mToken)
    }
    @GetMapping(value = ["/makeInvestorPaymentForOffer"], produces = [MediaType.APPLICATION_JSON_VALUE])
    @Throws(Exception::class)
    fun makeInvestorPaymentForOffer(offerId: String, @RequestHeader("Authorization") token: String): InvestorPaymentDTO? {
        val mToken = token.substring(7)
        return stellarAnchorService.makeInvestorPaymentForOffer(proxy, offerId = offerId, token = mToken)
    }

    @GetMapping(value = ["/findOffersForSupplier"])
    @Throws(Exception::class)
    fun findOffersForSupplier(@RequestParam(value = "identifier", required = true) identifier: String): List<InvoiceOfferDTO> {
        return workerBeeService.findOffersForSupplier(proxy, identifier)
    }

    @GetMapping(value = ["/findSupplierPaymentsForNode"])
    @Throws(Exception::class)
    fun findSupplierPaymentsForNode(): List<SupplierPaymentDTO> {
        return workerBeeService.findSupplierPaymentsOnLedgerForNode(proxy)
    }
    @GetMapping(value = ["/findInvestorPaymentsForNode"])
    @Throws(Exception::class)
    fun findInvestorPaymentsForNode(): List<InvestorPaymentDTO> {
        return workerBeeService.findInvestorPaymentsOnLedgerForNode(proxy)
    }
    @GetMapping(value = ["/findSupplierPaymentsForInvestor"])
    @Throws(Exception::class)
    fun findSupplierPaymentsForInvestor(@RequestParam investorId: String): List<SupplierPaymentDTO> {
        return workerBeeService.findSupplierPaymentsOnLedgerForInvestor(proxy, investorId = investorId)
    }
    @GetMapping(value = ["/findInvestorPaymentsForInvestor"])
    @Throws(Exception::class)
    fun findInvestorPaymentsForInvestor(@RequestParam investorId: String): List<InvestorPaymentDTO> {
        return workerBeeService.findInvestorPaymentsOnLedgerForInvestor(proxy, investorId = investorId)
    }
    @GetMapping(value = ["/findSupplierPaymentsForSupplier"])
    @Throws(Exception::class)
    fun findSupplierPaymentsForSupplier(@RequestParam supplierId: String): List<SupplierPaymentDTO> {
        return workerBeeService.findSupplierPaymentsOnLedgerForSupplier(proxy, supplierId = supplierId)
    }
    @GetMapping(value = ["/findSupplierPaymentsForCustomer"])
    @Throws(Exception::class)
    fun findSupplierPaymentsForCustomer(@RequestParam customerId: String): List<SupplierPaymentDTO> {
        return workerBeeService.findSupplierPaymentsForOnLedgerCustomer(proxy, customerId = customerId)
    }
    @GetMapping(value = ["/findInvestorPaymentsForCustomer"])
    @Throws(Exception::class)
    fun findInvestorPaymentsForCustomer(@RequestParam customerId: String): List<InvestorPaymentDTO> {
        return workerBeeService.findInvestorPaymentsOnLedgerForCustomer(proxy, customerId = customerId)
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
        return workerBeeService.makeOffersOnInvoicesForInvestor(proxy, investorId)
    }

    @PostMapping(value = ["/createInvestorProfile"])
    @Throws(Exception::class)
    fun createInvestorProfile(@RequestBody profile: InvestorProfileStateDTO): String? {
        val acct = workerBeeService.getNodeAccount(proxy, identifier = profile.account.identifier)
        return acct.let { workerBeeService.createInvestorProfile(proxy, profile, it!!) }
    }

    @GetMapping(value = ["/getSupplierProfile"])
    @Throws(Exception::class)
    fun getSupplierProfile(@RequestParam(value = "identifier") identifier: String): SupplierProfileStateDTO? {
        return workerBeeService.getSupplierProfile(proxy, identifier)
    }

    @GetMapping(value = ["/getInvestorProfile"])
    @Throws(Exception::class)
    fun getInvestorProfile(@RequestParam(value = "identifier") identifier: String): InvestorProfileStateDTO? {
        return firebaseService.getInvestorProfile(identifier)
    }

    @GetMapping(value = ["/makeInvestorOffers"])
    @Throws(Exception::class)
    fun makeInvestorOffers(investorId: String): List<InvoiceOfferDTO> {
        return workerBeeService.makeInvestorOffers(proxy,investorId);
    }
    @PostMapping(value = ["/createSupplierProfile"])
    @Throws(Exception::class)
    fun createSupplierProfile(@RequestBody profile: SupplierProfileStateDTO): String? {
        val acct = workerBeeService.getNodeAccount(proxy, identifier = profile.account!!.identifier)
        return acct.let { workerBeeService.createSupplierProfile(proxy, profile, it!!) }
    }

    @GetMapping(value = ["/getUser"])
    @Throws(Exception::class)
    fun getUser(@RequestParam(value = "email", required = false) email: String?): UserRecord? {
        return firebaseService.getUser(email)
    }

    @GetMapping(value = ["/getAnchor"])
    @Throws(Exception::class)
    fun getAnchor(): Anchor? {
        return firebaseService.getAnchor()
    }


    @GetMapping(value = ["/getUsers"])
    fun getUsersFromFirestore(): MutableList<UserDTO> {
        val start = Date()

        val users = firebaseService.getBFNUsers()
        ResponseTimer.writeResponse(start = start,
                callName = "getUsersFromFirestore", profile = profile)

        return users
    }

    @GetMapping(value = ["/getAccount"])
    @Throws(Exception::class)
    fun getAccount(@RequestParam(value = "identifier") identifier: String?): AccountInfoDTO {
        return workerBeeService.getAccount(proxy, identifier)
    }


    @GetMapping(value = ["/hello"], produces = ["text/plain"])
    fun hello(): String {
        logger.info("/ requested. will say hello  \uD83D\uDC9A  \uD83D\uDC9A  \uD83D\uDC9A")
        return "\uD83D\uDC9A  BFNWebApi: AdminController says  \uD83E\uDD6C HELLO WORLD!  \uD83D\uDC9A  \uD83D\uDC9A"
    }

    @GetMapping(value = ["/ping"], produces = [MediaType.APPLICATION_JSON_VALUE])
    fun ping(): String {
        println("\uD83D\uDE21 \uD83D\uDE21 \uD83D\uDE21 ")
        val msg =("\uD83E\uDDE1 \uD83D\uDC9B \uD83D\uDC9A AdminController:BFN Web API pinged: " + Date().toString()
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
        return mm
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
                + proxy.nodeInfo().toString() + " \uD83C\uDF3A ")
    }
}
