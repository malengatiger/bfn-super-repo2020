package com.bfn.client.web

import com.bfn.client.Emo
import com.bfn.client.data.*
import com.bfn.client.web.services.FirebaseService
import com.bfn.client.web.services.NetworkOperatorBeeService
import com.bfn.client.web.services.StellarAnchorService
import com.bfn.client.web.services.WorkerBeeService
import com.bfn.contractstates.states.NetworkOperatorState
import com.bfn.contractstates.states.PurchaseOrderState
import com.bfn.flows.todaysDate
import com.google.gson.GsonBuilder
import com.r3.corda.lib.accounts.contracts.states.AccountInfo
import net.corda.core.contracts.StateAndRef
import net.corda.core.internal.Emoji
import net.corda.core.messaging.CordaRPCOps
import net.corda.core.node.NodeInfo
import net.corda.core.node.services.Vault
import net.corda.core.node.services.vault.PageSpecification
import net.corda.core.node.services.vault.QueryCriteria
import org.joda.time.DateTime
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.io.BufferedReader
import java.io.InputStreamReader
import java.math.BigDecimal
import java.net.HttpURLConnection
import java.net.URL
import java.util.*
import javax.annotation.PostConstruct
import kotlin.collections.HashMap

@Service
class DemoDataService {
    private val logger = LoggerFactory.getLogger(DemoDataService::class.java)
    private val gson = GsonBuilder().setPrettyPrinting().create()

    private var suppliers: MutableList<AccountInfoDTO> = mutableListOf()
    private var customers: MutableList<AccountInfoDTO> = mutableListOf()
    private var investors: MutableList<AccountInfoDTO> = mutableListOf()

    private val demoSummary = DemoSummary()
    private var myNode: NodeInfo? = null

    @Value("\${stellarAnchorUrl}")
    private lateinit var stellarAnchorUrl: String

    @Value("\${customerNodeUrl}")
    private lateinit var customerNodeUrl: String

    @Value("\${spring.profiles.active}")
    private var profile: String = "dev"

    @PostConstruct
    fun init() {
        logger.info("\uD83D\uDD35 \uD83D\uDD35 DemoUtil service has been initialized ...")
    }

    @Autowired
    private lateinit var firebaseService: FirebaseService

    @Autowired
    private lateinit var workerBeeService: WorkerBeeService

    @Autowired
    private lateinit var networkOperatorService: NetworkOperatorBeeService

    @Autowired
    private lateinit var customerNodeService: CustomerNodeService

    @Autowired
    private lateinit var stellarAnchorService: StellarAnchorService

    /**
     * Generate data for the main anchor node : NetworkOperator is created here as well as Accounts
     */
    fun generateAnchorNodeData(mProxy: CordaRPCOps,
                               numberOfAccounts: Int,
                               demoAdminEmail:String, token: String): String {
        logger.info("\n\uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40 " +
                "Generating data for the main anchor Node: " +
                "NetworkOperator + Suppliers + Investors; " +
                "${Emo.BLUE_DOT}numberOfAccounts to generate: $numberOfAccounts")

        deleteFirebaseShit(demoAdminEmail)
        createNetworkOperator(mProxy, token)
        generateLocalNodeAccounts(mProxy, numberOfAccounts, token)

        val msg = "\n\n\uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40 DemoDataService: " +
                "generateAnchorNodeData COMPLETE! \uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40\n"
        logger.info(msg)
        return msg
    }

    private fun deleteFirebaseShit(demoAdminEmail:String) {
        val users = firebaseService.getBFNUsers()
        users.forEach {
            if (it.email != "bfnadmin@bfn.com" && it.email != demoAdminEmail) {
                firebaseService.deleteAuthUser(it.uid)
            }
        }
        firebaseService.deleteCollection(collectionName = BFN_SUPPLIER_PROFILES)
        firebaseService.deleteCollection(collectionName = NETWORK_OPERATOR)
        firebaseService.deleteCollection(collectionName = BFN_USERS)
        firebaseService.deleteCollection(collectionName = BFN_RESPONSE_TIMES)
        firebaseService.deleteCollection(collectionName = BFN_INVOICES)
        firebaseService.deleteCollection(collectionName = BFN_INVOICE_OFFERS)
        firebaseService.deleteCollection(collectionName = BFN_TOKENS)
        firebaseService.deleteCollection(collectionName = BFN_CUSTOMER_PROFILES)
        firebaseService.deleteCollection(collectionName = BFN_INVESTOR_PROFILES)
        firebaseService.deleteCollection(collectionName = BFN_ACCEPTED_OFFERS)
        firebaseService.deleteCollection(collectionName = BFN_SUPPLIER_PAYMENTS)
        firebaseService.deleteCollection(collectionName = BFN_INVESTOR_PAYMENTS)
        firebaseService.deleteCollection(collectionName = INVESTOR_ROYALTIES)
        firebaseService.deleteCollection(collectionName = SUPPLIER_ROYALTIES)

        logger.info("\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E Firebase clean up completed")
    }


    var accounts: List<AccountInfoDTO> = mutableListOf()

    /**
     * Generate data for the customer node : Accounts are created for several customers
     */
    fun generateCustomerNodeData(mProxy: CordaRPCOps, numberOfMonths: Int, token: String): String {
        logger.info("\n\n\n\uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40 " +
                "Generating data for the Customer Node: Customers only, Boss!")

        accounts = workerBeeService.getNodeAccounts(proxy = mProxy)
        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 " +
                "generateCustomerNodeData: Accounts found on the current node: " + accounts.size)
        val node = mProxy.nodeInfo()
        var cnt = 0
        accounts.forEach {
            logger.info(" \uD83C\uDF4E Account found on node: ${it.name} ${it.host}")
            if (it.host == node.addresses[0].host) {
                cnt++
            }
        }
        if (cnt > 0) {
            throw Exception("\uD83D\uDE1D \uD83D\uDE1D ${accounts.size} " +
                    "Accounts exist on the node. \uD83C\uDF4E Not a good look. Should we close down shop?")
        }

        firebaseService.deleteCollection(BFN_CUSTOMER_PROFILES)
        firebaseService.deleteCollection(BFN_INVOICES)
        firebaseService.deleteCollection(BFN_PURCHASE_ORDERS)
        firebaseService.deleteCollection(BFN_INVOICE_OFFERS)
        firebaseService.deleteCollection(BFN_ACCEPTED_OFFERS)

        createCustomers(mProxy,token)
        generatePurchaseOrders(mProxy, numberOfMonths)
        generateInvoices(mProxy)

        val msg = "\n\n\uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40 " +
                "DemoDataService: generateCustomerNodeData COMPLETE! " +
                "\uD83E\uDD6E \uD83E\uDD6E \uD83E\uDD6E\n"
        logger.info(msg)
        logger.info("\n\n\n\n")
        return msg
    }

    var purchaseOrderCount = 0

    fun generatePurchaseOrders(mProxy: CordaRPCOps, numberOfMonths: Int): String {
        val msg = "\n\n\uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40 " +
                "DemoDataService: generatePurchaseOrders starting ........! " +
                "\uD83E\uDD6E \uD83E\uDD6E \uD83E\uDD6E\n"
        logger.info(msg)
        purchaseOrderCount = 0
        accounts = workerBeeService.getAllNodeAccountDTOs(mProxy)
        val operator = firebaseService.getNetworkOperator() ?: throw Exception("Network Operator missing ${Emo.ERRORS}")
        accounts.forEach {
            logger.info("\uD83C\uDF4E Account found on node, " +
                    "\uD83C\uDF40 ${it.name} \uD83C\uDF40 ${it.host}")
            if (it.host.contains("Customer")) {
                customers.add(it)
            } else {
                if (!it.name.contains(operator.account!!.name)) {
                    suppliers.add(it)
                }
            }
        }
        //create a set of PO's for each customer ....
        logger.info("\n\n\n${Emo.FERNS}" +
                " Start creating PurchaseOrders for " +
                "${customers.size} customers and ${suppliers.size} suppliers.... \n\n")

        customers.forEach() {
            createCustomerPurchaseOrders(mProxy, customer = it, numberOfMonths = numberOfMonths);
        }
        //create a set of PO's for each customer in random fashion ....
        customers.forEach() {
            createCustomerPurchaseOrdersRandomly(mProxy, customer = it, numberOfMonths = numberOfMonths);
        }
        customers.forEach() {
            createCustomerPurchaseOrders(mProxy, customer = it, numberOfMonths = 1);
        }

        val msg2 = "\n\n${Emo.RED_APPLES} " +
                "DemoDataService: generatePurchaseOrders COMPLETE! " +
                " $purchaseOrderCount purchaseOrders generated ${Emo.FERNS}\n\n"

        logger.info(msg2)
        logger.info("\n\n\n\n")
        return msg2
    }

    private fun createCustomerPurchaseOrders(mProxy: CordaRPCOps,
                                             customer: AccountInfoDTO,
                                             numberOfMonths: Int): String {

        val startDate = DateTime().minusMonths(numberOfMonths)
        logger.info("\n\n\n${Emo.FERNS}${Emo.FERNS}${Emo.FERNS} " +
                " Start creating PurchaseOrders for Customer: " +
                "${customer.name} ....${Emo.RED_APPLE} startDate: ${startDate.toDateTimeISO()} \n\n")

        for (supplier in suppliers) {
            var supplierPOs = 0
            for(num in 0..numberOfMonths) {
                val mDate = startDate.plusMonths(num);
                createPurchaseOrder(mProxy = mProxy,
                        customer = customer,
                        supplier = supplier,
                        date = mDate)
                supplierPOs++
            }
            logger.info("${Emo.ANGRIES}${Emo.ANGRIES} $supplierPOs " +
                    "PurchaseOrders created for supplier: ${supplier.name} from customer: ${customer.name}\n\n")
        }
        val msg = "${Emo.RED_APPLES} " +
                "DemoDataService: PurchaseOrders for Customer : ${customer.name} " +
                "and ${suppliers.size} Suppliers completed  " +
                "${Emo.RED_APPLES}\n"
        logger.info(msg)
        logger.info("\n\n")
        return msg
    }
    private fun createCustomerPurchaseOrdersRandomly(mProxy: CordaRPCOps,
                                             customer: AccountInfoDTO,
                                             numberOfMonths: Int): String {

        val startDate = DateTime().minusMonths(numberOfMonths)
        logger.info("\n\n\n${Emo.FERNS}${Emo.FERNS}${Emo.FERNS} " +
                " Start creating PurchaseOrders for Customer: " +
                "${customer.name} ....${Emo.RED_APPLE} startDate: ${startDate.toDateTimeISO()} \n\n")

        for (supplier in suppliers) {
            val chooseSupplier = random.nextInt(100)
            if (chooseSupplier > 60) {
                var supplierPOs = 0
                for (num in 0..numberOfMonths) {
                    val mDate = startDate.plusMonths(num)
                    val chooseMonth = random.nextInt(100)
                    if (chooseMonth < 60) {
                        createPurchaseOrder(mProxy = mProxy,
                                customer = customer,
                                supplier = supplier,
                                date = mDate)
                        supplierPOs++
                    }
                }
                logger.info("${Emo.ANGRIES}${Emo.ANGRIES} $supplierPOs " +
                        "PurchaseOrders created for supplier: ${supplier.name} from customer: ${customer.name}\n\n")
            }
        }
        val msg = "${Emo.RED_APPLES} " +
                "DemoDataService: PurchaseOrders for Customer : ${customer.name} " +
                "and ${suppliers.size} Suppliers completed  " +
                "${Emo.RED_APPLES}\n"
        logger.info(msg)
        logger.info("\n\n")
        return msg
    }

    private fun createPurchaseOrder(mProxy: CordaRPCOps,
                                    customer: AccountInfoDTO,
                                    supplier: AccountInfoDTO,
                                    date: DateTime): String {

        val sDate = date.plusDays(random.nextInt(5))
        val lDate = date.plusDays(random.nextInt(5))

        val poSmall = PurchaseOrderDTO(
                purchaseOrderId = UUID.randomUUID().toString(),
                purchaseOrderNumber = "" + System.currentTimeMillis() + "-" + random.nextInt(100),
                customer = customer,
                supplier = supplier,
                amount = getSmallPOAmount(),
                dateRegistered = sDate.toDateTimeISO().toString(),
                description = "\uD83C\uDF40 Demo: Small Purchase Order: ${customer.name} " +
                        "to supplier: ${supplier.name}. Used for testing and demo")

        val poLarge = PurchaseOrderDTO(
                purchaseOrderId = UUID.randomUUID().toString(),
                purchaseOrderNumber = "" + System.currentTimeMillis() + "-" + random.nextInt(100),
                customer = customer,
                supplier = supplier,
                amount = getLargePOAmount(),
                dateRegistered = lDate.toDateTimeISO().toString(),
                description = "\uD83C\uDF40 Demo: Large Purchase Order: ${customer.name} " +
                        "to supplier: ${supplier.name}. Used for testing and demo")

        val choice = random.nextInt(120)
        if (choice <= 50) {
            workerBeeService.createPurchaseOrder(mProxy, purchaseOrder = poSmall)
            logger.info("${Emo.PEAR} SMALL PO created: " +
                    "${Emo.YELLOW_BIRD}dateRegistered: ${poSmall.dateRegistered} ${Emo.YELLOW_BIRD} " +
                    "amt: ${poSmall.amount} customer:  ${customer.name} supplier: ${supplier.name}")
        } else {
            workerBeeService.createPurchaseOrder(mProxy, purchaseOrder = poLarge)
            logger.info("${Emo.PEAR} LARGE PO created:" +
                    " ${Emo.YELLOW_BIRD} dateRegistered: ${poLarge.dateRegistered} ${Emo.YELLOW_BIRD} " +
                    "amt: ${poLarge.amount}  customer:  ${customer.name} supplier: ${supplier.name}")
        }
        purchaseOrderCount++


        return "createPurchaseOrder: completed"

    }

    private fun getLargePOAmount(): String {
        val amt = random.nextInt(100) * 10850.00
        return if (amt < 100000.00) {
            val m = 500000.00  + ( 25000 * random.nextInt(5))
            m.toString()
        } else {
            amt.toString()
        }
    }

    private fun getSmallPOAmount(): String {
        var amt = random.nextInt(30) * 5000.00
        if (amt <= 10000.0) {
            amt = 4200.00
        }
        return amt.toString()
    }

    private fun getNetworkOperatorObject(): NetworkOperatorDTO {

        val email = "operator${System.currentTimeMillis()}@bfn.com"

        return NetworkOperatorDTO(
                email = email,
                cellphone = "+27710441887",
                date = DateTime().toDateTimeISO().toString(),
                password = "pass123",
                supplierRoyaltyPercentage = "1.0",
                investorRoyaltyPercentage = "1.5",
                account = AccountInfoDTO(
                        "TBD", "TBD",
                        "BFN Network Operator Ltd"
                )

        )

    }

    private fun getTradeMatrixItemsForOperator(): MutableList<TradeMatrixItemDTO> {

        val m1 = TradeMatrixItemDTO(
                "60000.00",
                "100000.00",
                "4.5",
                todaysDate()
        )

        val m2 = TradeMatrixItemDTO(
                "100001.00",
                "200000.00",
                "4.0",
                todaysDate()
        )
        val m3 = TradeMatrixItemDTO(
                "200001.00",
                "300000.00",
                "3.5",
                todaysDate()
        )
        val m4 = TradeMatrixItemDTO(
                "300001.00",
                "500000.00",
                "3.5",
                todaysDate()
        )
        val m5 = TradeMatrixItemDTO(
                "500001.00",
                "50000000.00",
                "3.0",
                todaysDate()
        )

        logger.info("${Emo.DICE}${Emo.DICE} Discounts: ${m1.offerDiscount}%, " +
                "${m2.offerDiscount}%, ${m3.offerDiscount}%, ${m4.offerDiscount}%, " +
                "${m5.offerDiscount}%")

        return mutableListOf(m1, m2, m3, m4, m5)
    }
    private fun getTradeMatrixItemsForInvestor(): MutableList<TradeMatrixItemDTO> {

        var disc1 = random.nextInt(15) * 1.0
        if (disc1 <= 3.0) {
            disc1 = 4.5
        }
        var disc2 = random.nextInt(10) * 1.0
        if (disc2 <= 3.0 || disc2 >= disc1) {
            disc2 = 3.5
        }
        var disc3 = random.nextInt(8) * 1.0
        if (disc3 <= 3.0 || disc3 >= disc2) {
            disc3 = 3.0
        }
        var disc4 = random.nextInt(6) * 1.0
        if (disc4 <= 3.0 || disc4 >= disc3) {
            disc4 = 2.6
        }
        var disc5 = random.nextInt(4) * 1.0
        if (disc5 <= 2.0 || disc5 >= disc4) {
            disc5 = 2.2
        }
        // disc1 minimum = 4.5% maximum = 15%
        // disc2 minimum = 3.5% maximum = 10%
        // disc3 minimum = 3.0% maximum = 8%
        // disc4 minimum = 2.6% maximum = 6%
        // disc1 minimum = 2.2% maximum = 4%

        val m1 = TradeMatrixItemDTO(
                "5000.00",
                "100000.00",
                disc1.toString(),
                todaysDate()
        )

        val m2 = TradeMatrixItemDTO(
                "100001.00",
                "200000.00",
                disc2.toString(),
                todaysDate()
        )

        val m3 = TradeMatrixItemDTO(
                "200001.00",
                "300000.00",
                disc3.toString(),
                todaysDate()
        )

        val m4 = TradeMatrixItemDTO(
                "300001.00",
                "500000.00",
                disc4.toString(),
                todaysDate()
        )

        val m5 = TradeMatrixItemDTO(
                "500001.00",
                "500000000.00",
                disc5.toString(),
                todaysDate()
        )

        logger.info("${Emo.DICE}${Emo.DICE} Discounts: ${m1.offerDiscount}%, " +
                "${m2.offerDiscount}%, ${m3.offerDiscount}%, ${m4.offerDiscount}%, " +
                "${m5.offerDiscount}%")

        return mutableListOf(m1, m2, m3, m4, m5)
    }
    @Throws(Exception::class)
    private fun createNetworkOperator(mProxy: CordaRPCOps, token: String): NetworkOperatorDTO? {
        logger.info("\n\n\uD83E\uDDA0 \uD83E\uDDA0 \uD83E\uDDA0 " +
                "Demo createNetworkOperator started ..... \uD83E\uDDA0 \uD83E\uDDA0")
        val page = mProxy.vaultQuery(NetworkOperatorState::class.java)
        if (page.states.isNotEmpty()) {
            logger.info("\uD83E\uDD6E \uD83E\uDD6E \uD83E\uDD6E " +
                    "Network Operator already exists: " +
                    page.states[0].state.data.account.name)
        }
        val operator = getNetworkOperatorObject()
        val investorProfile = InvestorProfileStateDTO(
                operator.account,
                "60000.00",
                "30000000.00",
                "1000000000.00",
                "6.0",
                "Investec Bank",
                "67246772893",
                "tbd",
                "tbd",
                getTradeMatrixItemsForOperator(),
                DateTime().toDateTimeISO().toString()
        )
        val supplierProfile = SupplierProfileStateDTO(
                operator.account, "Investec Bank",
                "67246772893", "5.0",
                "tbd", "tbd",
                "ZAR", todaysDate()
        )

        operator.password = "pass123"
        val result = networkOperatorService.createNetworkOperator(
                mProxy, operator, investorProfile, supplierProfile, token)
        logger.info("\uD83E\uDD6E \uD83E\uDD6E \uD83E\uDD6E " +
                "DemoDataService: createNetworkOperator result: " +
                gson.toJson(result) + " \uD83E\uDD6E \uD83E\uDD6E")
        return result
    }

    private val em4 = "\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 "

    @Throws(Exception::class)
    fun generateLocalNodeAccounts(mProxy: CordaRPCOps, numberOfAccounts: Int = 10, token: String): DemoSummary {
        val start = Date().time;
        logger.info(em4 +
                "DemoDataService started, proxy: $mProxy...   " +
                "will generate data $em4 ")

        myNode = mProxy.nodeInfo()
        logger.info(" \uD83D\uDD0B  \uD83D\uDD0B current node: ${
            myNode!!
                    .legalIdentities[0].name.commonName
        }  \uD83D\uDD0B ")
        if (myNode!!.legalIdentities[0].name.organisation.contains("Notary")) {
            throw Exception("Cannot add demo data to Notary")
        }
        if (myNode!!.legalIdentities[0].name.organisation.contains("Regulator")) {
            throw Exception("Cannot add demo data to Regulator")
        }
        logger.info("${Emoji.CODE_COOL_GUY} my node is: ${myNode!!.legalIdentities[0].name}")
        suppliers = mutableListOf()
        customers = mutableListOf()
        investors = mutableListOf()


        logger.info("👽 👽 👽 👽 start data generation:  numberOfAccounts $numberOfAccounts 👽 👽 👽 👽  ")

        generateAccounts(mProxy, numberOfAccounts,token)
        //
        val list = workerBeeService.getNodeAccounts(mProxy)
        var cnt = 0
        logger.info(" \uD83C\uDF4E  \uD83C\uDF4E Total Number of Accounts on Node after sharing:" +
                " \uD83C\uDF4E  \uD83C\uDF4E " + list.size)
        val userRecords = firebaseService.getBFNUsers()
        for (userRecord in userRecords) {
            cnt++
            logger.info("🔵 🔵 BFN UserDTO: 😡 #" + cnt + " - " + userRecord.accountInfo.name + " 😡 " + userRecord.email)
        }
        val end = Date().time;
        demoSummary.numberOfAccounts = list.size
        demoSummary.elapsedSeconds = (end - start / 1000).toDouble();
        return demoSummary
    }

    @Throws(Exception::class)
    fun generateAccounts(proxy: CordaRPCOps, numberOfAccounts: Int = 4, token: String): String {
        logger.info("\n\n$em1 ..... generateAccounts started ...  " +
                "\uD83D\uDD06 \uD83D\uDD06 ................. generating numberOfAccounts: $numberOfAccounts")

        val mMap: MutableMap<String,String> = mutableMapOf()
        while (mMap.keys.size < numberOfAccounts) {
            val name = getRandomName()
            mMap[name] = name
        }

        val mNames = mMap.values.toList()

        var cnt = 0
        for (x in 0..numberOfAccounts) {
            val prefix = "account" + System.currentTimeMillis()
            try {
                val mName = mNames[x]
                logger.info("\n\n\n$em1 ..... Starting AccountRegistrationFlow for $mName ...........\n")
                workerBeeService.startAccountRegistrationFlow(proxy,
                        accountName = mName,
                        email = "$prefix@bfn.com",
                        cellphone = phone,
                        password = "pass123", token = token)

                cnt++
            } catch (e1: Exception) {
                logger.warn("\uD83D\uDE21 \uD83D\uDE21 Unable to add account - probable duplicate name", e1)
            }
        }
        logger.info("\n\n$em1 generateAccounts complete ..." +
                "  \uD83D\uDD06 \uD83D\uDD06 added $cnt accounts\n\n")
        generateProfiles(proxy)
        val msg = "$em1 Generate accounts with profiles completed! \uD83C\uDF3A"
        logger.info(msg)
        return msg
    }

    fun generateProfiles(proxy: CordaRPCOps): String {
        val accountInfos = workerBeeService.getNodeAccounts(proxy = proxy)
        logger.info("\n\n\n$em1 getNodeAccounts complete ..." +
                "  \uD83D\uDD06 \uD83D\uDD06 found  ${accountInfos.size} ... " +
                "adding investor and supplier profiles for all accounts ........")
        //add profiles and generate invoices
        val operator = firebaseService.getNetworkOperator() ?: throw Exception("Network Operator Missing")
        val page = proxy.vaultQuery(AccountInfo::class.java)
        val err = "\uD83D\uDE21\uD83D\uDE21\uD83D\uDE21\uD83D\uDE21"
        for (state in page.states) {
            val user = firebaseService.getBFNUserByAccountName(state.state.data.name)
            if (operator.account!!.name != state.state.data.name) {
                try {
                    if (user != null) {
                        addInvestorProfile(
                                account = state,
                                proxy = proxy,
                                stellarAccountId = user.stellarAccountId)
                    }
                } catch (e: Exception) {
                    logger.error("$err Unable to add InvestorProfile for account", e)
                }
                try {
                    if (user != null) {
                        addSupplierProfile(
                                account = state,
                                proxy = proxy,
                                stellarAccountId = user.stellarAccountId)
                    }
                } catch (e: Exception) {
                    logger.error("$err Unable to add SupplierProfile for account", e)
                }
            }

        }
        val msg = "\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35" +
                "DemoDataService: generateProfiles: Account profile generation complete"
        logger.info(msg)
        return msg
    }

    private val em1 = "\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 ";
    private var nodes: List<NodeInfoDTO>? = null
    private var nodeInvoices: List<InvoiceDTO> = mutableListOf()

    fun generateOffersForNetworkOperator(proxy: CordaRPCOps): String {
        val operator = firebaseService.getNetworkOperator()
        if (operator != null) {
            logger.info("\uD83D\uDD35 generateOffersFromAccount starting ..... " +
                    "account: ${operator.account!!.name}: \uD83D\uDCA6 \uD83D\uDCA6")
            nodeInvoices = workerBeeService.findInvoicesForNode(proxy)
            generateOffersFromInvestor(proxy, operator.account!!)
        }
        val msg = "\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E " +
                "Total InvoiceOffers made by Account ${operator?.account?.name}"
        logger.info(msg)
        return msg
    }

    fun generateOffersFromInvestor(proxy: CordaRPCOps, investor: AccountInfoDTO): String {
        logger.info("\n\n\n${Emo.RED_APPLES} generateOffersFromInvestor starting ..... " +
                "${Emo.YELLOW_BIRD} INVESTOR: ${investor.name}: ${Emo.YELLOW_BIRD} from ${investor.host}")
        if (nodeInvoices.isEmpty()) {
            nodeInvoices = workerBeeService.findInvoicesForNode(proxy)
        }
        logger.info("${Emo.RAIN_DROPS} Will attempt to generate offers " +
                "for ${nodeInvoices.size} Invoices" +
                " for INVESTOR: ${investor.name} ${Emo.YELLOW_BIRD}️")

        val investorProfile = firebaseService.getInvestorProfile(investor.identifier)
                ?: throw Exception("Missing InvestorProfile, offers cannot be generated")
        var cntx = 0
        nodeInvoices.forEach() {
            if (investor.identifier == it.customer!!.identifier) {
                logger.info("${Emo.ANGRY} Customer cannot make offer on own invoice " +
                        "(at least for now!): " +
                        "${Emo.ANGRY} ${investor.name} ${Emo.ANGRY}");
            }
            val offer = registerInvoiceOffer(
                    proxy = proxy,
                    investor = investor,
                    invoice = it,
                    discount = investorProfile.defaultDiscount)

            if (offer != null) {
                cnt++
                cntx++
                logger.info("\uD83E\uDD66 \uD83E\uDD66 \uD83E\uDD66 \uD83E\uDD66 " +
                        "SUCCESSFULLY registered InvoiceOffer on Corda Ledger for supplier: \uD83C\uDF4F " +
                        "${it.supplier?.name} ${it.supplier?.host} " +
                        "\uD83C\uDF4F \uD83D\uDCA6 investor: ${investor.name} " +
                        "\uD83D\uDCA6 ${investor.host} \uD83E\uDDE9 \uD83E\uDDE9 " +
                        "offerAmount: ${offer.offerAmount} < originalAmount ${offer.originalAmount} INVOICE OFFER #$cnt added")
            }
        }

        val msg = "${Emo.COFFEE}${Emo.COFFEE}${Emo.COFFEE} " +
                "Total InvoiceOffers made by INVESTOR ${investor.name} " +
                ":${Emo.YELLOW_BIRD} $cntx offers ${Emo.YELLOW_BIRD} \n\n\n\n"
        logger.info(msg)
        return msg
    }

    var cnt = 0

    fun generateInvoiceOffers(proxy: CordaRPCOps): String {

        logger.info("\n\n\n${Emo.RAIN_DROPS} start generateInvoiceOffers " +
                ".......... ${Emo.RAIN_DROPS}\n\n");
        val acctList = workerBeeService.getNodeAccounts(proxy)
        //todo - find invoices on ALL nodes ... eh?
        nodeInvoices = workerBeeService.findInvoicesForNode(proxy)

        logger.info("${Emo.RED_APPLES}  Accounts on Node:  \uD83D\uDE21 \uD83D\uDE21 ️ ${acctList.size} ♻️")
        logger.info("${Emo.RED_APPLES}  Invoices on Node:  \uD83D\uDE21 \uD83D\uDE21 ️ ${nodeInvoices.size} \n\n️")
        cnt = 0

        // 🔵 🔵 For each account, generate offer for each invoice on the node  🔵 🔵
        acctList.forEach() {
            generateOffersFromInvestor(proxy = proxy, investor = it)
        }

        val msg = "${Emo.RED_APPLES} generateInvoiceOffers complete: " +
                "Total InvoiceOffers generated: \uD83E\uDD4F  $cnt \uD83E\uDD4F \n\n\n"
        logger.info(msg)
        return msg;
    }

    fun generateInvestorPayments(proxy:CordaRPCOps, token: String): List<InvestorPaymentDTO> {

        val mList: MutableList<InvestorPaymentDTO> = mutableListOf()
        val supplierPayments = workerBeeService.findSupplierPaymentsForNode(proxy)
        supplierPayments.forEach {
            //todo -  🍎 🍎 🍎 send payment to Stellar Anchor ....  🍎
            val payment = stellarAnchorService.makeInvestorPaymentForOffer(
                    proxy, it.acceptedOffer!!.offerId, token)
            if (payment != null) {
                mList.add(payment)
            }
        }
        logger.info("${Emo.FERNS} Generated ${mList.size} investorPayments ${Emo.RED_APPLE}")
        return mList;
    }

    @get:Throws(Exception::class)
    private val regulatorDashboard: DashboardData
        get() {
            var node: NodeInfoDTO? = null
            for (x in nodes!!) {
                if (x.addresses!![0].contains("Regulator")) {
                    node = x
                    break
                }
            }
            if (node == null) {
                throw Exception("Regulator not found")
            }
            val nodeUrl = node.webServerAddress + "admin/getDashboardData"
            val con = callNode(nodeUrl)
            var summary: DashboardData
            BufferedReader(InputStreamReader(con.inputStream, "utf-8")).use { br ->
                val response = StringBuilder()
                var responseLine: String = ""
                while (br.readLine().also { responseLine = it } != null) {
                    response.append(responseLine.trim())
                }
                summary = gson.fromJson(response.toString(), DashboardData::class.java)
                logger.info("\uD83E\uDD1F \uD83E\uDD1F \uD83E\uDD1F " +
                        "Response from Regulator: \uD83E\uDD1F SUMMARY:: " + node.addresses!![0] + " \uD83E\uDD1F "
                        + gson.toJson(summary) + "\n\n")
                return summary
            }
        }

    private fun addInvestorProfile(proxy: CordaRPCOps, account: StateAndRef<AccountInfo>, stellarAccountId: String) {
        logger.info(" \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 addInvestorProfile ..." +
                "  \uD83D\uDD06 \uD83D\uDD06 for account:  ${account.state.data.name} ... ")
        var disc = random.nextInt(5) * 1.0
        if (disc < 3.0) {
            disc = 3.5
        }
        var min = random.nextInt(50) * 1000.00
        if (min <= 3000.0) {
            min = 5000.00
        }
        var max = random.nextInt(1000) * 100000.00
        if (max <= 500000.0) {
            max = 2000000.00
        }

        val investorProfile = InvestorProfileStateDTO(
                DTOUtil.getDTO(account.state.data),
                "$min",
                "$max",
                "${max * 1000}",
                "$disc",
                "Investec Bank",
                "${System.currentTimeMillis()}-${random.nextInt(100)}",
                stellarAccountId,
                "tbd",
                getTradeMatrixItemsForInvestor(),
                todaysDate()
        )

        workerBeeService.createInvestorProfile(
                proxy = proxy,
                account = account.state.data,
                profile = investorProfile)

        logger.info("\uD83D\uDE0E \uD83D\uDE0E \uD83D\uDE0E " +
                " Yup! Created INVESTOR profile for account:  \uD83C\uDF3A ${account.state.data.name} " +
                gson.toJson(investorProfile) + " \uD83C\uDF0D \uD83C\uDF0D \n\n")
    }

    private fun addSupplierProfile(proxy: CordaRPCOps, account: StateAndRef<AccountInfo>, stellarAccountId: String) {
        logger.info("\n\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 addSupplierProfile ..." +
                "  \uD83D\uDD06 \uD83D\uDD06 for account:  ${account.state.data.name} ... ")
        var disc = random.nextInt(25) * 1.0
        if (disc < 5.0) {
            disc = 20.0
        }

        val prof = SupplierProfileStateDTO(
                account = DTOUtil.getDTO(account.state.data),
                dateRegistered = DateTime().toDateTimeISO().toString(),
                bankAccount = (random.nextInt(123445) * 132647).toString(),
                bank = "BlackOx Investment Bank",
                maximumDiscount = "$disc",
                stellarAccountId = stellarAccountId,
                rippleAccountId = "tbd",
                assetCode = "ZAR"
        )
        workerBeeService.createSupplierProfile(
                proxy = proxy,
                account = account.state.data,
                profile = prof)

        logger.info("\uD83E\uDD8A \uD83E\uDD8A \uD83E\uDD8A " +
                "Yebo! Created SUPPLIER profile for account: \uD83C\uDF3A ${account.state.data.name} " +
                gson.toJson(prof) + " \uD83C\uDF0D \uD83C\uDF0D")
    }

    @Throws(Exception::class)
    private fun callNode(nodeUrl: String): HttpURLConnection {
        val url = URL(nodeUrl)
        val con = url.openConnection() as HttpURLConnection
        con.requestMethod = "GET"
        con.setRequestProperty("Content-Type", "application/json; utf-8")
        con.setRequestProperty("Accept", "*/*")
        con.doOutput = true
        val code = con.responseCode
        logger.info("\uD83E\uDD1F \uD83E\uDD1F \uD83E\uDD1F " +
                "Node Call response code: \uD83D\uDE21 " + code + " \uD83D\uDE21  - " + nodeUrl)
        if (code != 200) {
            throw Exception("Failed with status code: $code")
        }
        return con
    }

    private val phone: String
        get() {
            val sb = StringBuilder()
            sb.append("27")
            sb.append(random.nextInt(9))
            sb.append(random.nextInt(9))
            sb.append(random.nextInt(9))
            sb.append(random.nextInt(9))
            sb.append(random.nextInt(9))
            sb.append(random.nextInt(9))
            sb.append(random.nextInt(9))
            sb.append(random.nextInt(9))
            sb.append(random.nextInt(9))
            return sb.toString()
        }

    private val random = Random(System.currentTimeMillis())
    private var invoiceCnt = 0

    /**
     * this call should be run on the CustomerNode1
     */
    fun generateInvoices(proxy: CordaRPCOps): String {
        logger.info("\n\n\n \uD83C\uDF4E \uD83C\uDF4E ...... generateInvoices: " +
                " Invoices to be generated for all purchase orders \n\n")

        val criteria = QueryCriteria.VaultQueryCriteria(status = Vault.StateStatus.UNCONSUMED)
        val page = proxy.vaultQueryByWithPagingSpec(
                contractStateType = PurchaseOrderState::class.java,
                criteria = criteria,
                paging = PageSpecification(pageNumber = 1, pageSize = 2000)
        )
        if (page.states.isEmpty()) {
            throw Exception("\uD83D\uDC19 Missing Purchase Orders. Invoices cannot be generated")
        } else {
            logger.info("\uD83C\uDF4E \uD83C\uDF4E We have found ${page.states.size} purchase orders on the network: ")
        }
        invoiceCnt = 0
        for (poStateAndRef in page.states) {
            val po = poStateAndRef.state.data
            val inv = InvoiceDTO(
                    purchaseOrder = DTOUtil.getDTO(po),
                    amount = po.amount,
                    customer = DTOUtil.getDTO(po.customer),
                    supplier = DTOUtil.getDTO(po.supplier),
                    description = po.description,
                    invoiceId = UUID.randomUUID().toString(),
                    dateRegistered = DateTime.parse(po.dateRegistered)
                            .plusDays(random.nextInt(5)).toDateTimeISO().toString(),
                    valueAddedTax = "15.0",
                    totalAmount = "tbd",
                    externalId = "tbd",
                    invoiceNumber = "" + System.currentTimeMillis() + "-" + random.nextInt(1000))

            val result = workerBeeService.startInvoiceRegistrationFlow(proxy, inv)
            invoiceCnt++
            logger.info("\n\n${Emo.RAIN_DROPS} Invoice generated from PO on Corda ledger: " +
                    "supplier: ${Emo.FLOWER_RED} ${result.supplier?.name} ${Emo.PRETZEL}")

        }

        val msh = "\n\n\n\uD83D\uDC9A \uD83D\uDC9A \uD83D\uDC9A :: " +
                "generateInvoices complete. Total Invoices generated on Node: " +
                "\uD83D\uDC9C $invoiceCnt \uD83D\uDC9C\n\n\n"
        logger.info(msh)
        return msh;
    }

    private val nodeInvoiceOffers: MutableList<InvoiceOfferDTO> = mutableListOf()

    @Throws(Exception::class)
    private fun registerInvoiceOffer(proxy: CordaRPCOps, invoice: InvoiceDTO,
                                     investor: AccountInfoDTO,
                                     discount: String): InvoiceOfferDTO? {

        val nDisc = BigDecimal(discount)
        val nTotalAmount = BigDecimal(invoice.totalAmount)
        val hundred = BigDecimal("100")
        val offer = (hundred - nDisc).divide(hundred).multiply(nTotalAmount)

        val mDate = DateTime.parse(invoice.dateRegistered);
        var plus = random.nextInt(7)
        if (plus == 0) {
            plus = 3
        }

        val xDate = mDate.plusDays(plus).plusHours(random.nextInt(10))
        val invoiceOffer = InvoiceOfferDTO(
                invoiceId = invoice.invoiceId,
                supplier = invoice.supplier,
                investor = investor,
                discount = discount,
                offerAmount = "$offer",
                originalAmount = invoice.totalAmount,
                externalId = invoice.externalId,
                invoiceNumber = invoice.invoiceNumber,
                investorDate = "tbd",
                acceptanceDate = "tbd",
                offerId = UUID.randomUUID().toString(),
                dateRegistered = xDate.toDateTimeISO().toString()
        )

        return try {
            val resultOffer = workerBeeService.startInvoiceOfferFlow(proxy, invoiceOffer, invoice) ?: return null
            nodeInvoiceOffers.add(resultOffer)
            resultOffer
        } catch (e: Exception) {
            logger.warn("${Emo.ERRORS} " +
                    "Failed to add offer on ledger; \uD83C\uDF4E " +
                    "we may be fucked or the investor profile validation failed! " +
                    "${Emo.ERROR}Returning null \uD83C\uDF4E ", e)
            null
        }

    }

    val concat = " \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 "

    private fun createCustomers(proxy: CordaRPCOps, token: String) {
        logger.info("\n\n\n\n")
        logger.info(concat
                + "Start createCustomers .... createCustomers  \uD83D\uDECE  ")

//        doOneCustomer(proxy, buildCustomerProfile(
//                "Pick & Pay Supermarkets",
//                minimumInvoiceAmount = "5000.00",
//                maximumInvoiceAmount = "100000.00"))
//        logger.info("\n\n\n\n")
//
//        doOneCustomer(proxy, buildCustomerProfile(
//                "Department of Public Works",
//                minimumInvoiceAmount = "50000.00",
//                maximumInvoiceAmount = "100000000.00"))
//        logger.info("\n\n\n\n")

        doOneCustomer(proxy, buildCustomerProfile(
                "Department of Health",
                minimumInvoiceAmount = "10000.00",
                maximumInvoiceAmount = "10000000.00"), token = token)
        logger.info("\n\n\n\n")

        doOneCustomer(proxy, buildCustomerProfile(
                "BMW South Africa Limited",
                minimumInvoiceAmount = "5000.00",
                maximumInvoiceAmount = "40000000.00"), token = token)
        logger.info("\n\n\n\n")


    }

    private fun buildCustomerProfile(name: String, minimumInvoiceAmount: String,
                                     maximumInvoiceAmount: String): CustomerProfileStateDTO {
        val suffix = "@bfn.com"
        val prefix = "cust"

        return CustomerProfileStateDTO(
                AccountInfoDTO("TBD", "TBD",
                        name),
                minimumInvoiceAmount,
                maximumInvoiceAmount,
                cellphone = phone,
                email = "$prefix${System.currentTimeMillis()}$suffix",
                dateRegistered = todaysDate(),
                stellarAccountId = "tbd",
                rippleAccountId = "tbd"
        )
    }

    private fun doOneCustomer(proxy: CordaRPCOps,
                              customerProfile: CustomerProfileStateDTO, token: String) {
        logger.info("\n\uD83D\uDD35 ........... Creating Customer ${customerProfile.account?.name}")
        val password = "pass123"
        try {
            val resultProfile = workerBeeService.createCustomerProfile(proxy, customerProfile, password, token)
            logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 " +
                    "Processed customerProfile returned from workerBeeService.createCustomer: "
                    + gson.toJson(resultProfile))
        } catch (e: Exception) {
            logger.info("\uD83D\uDD25 \uD83D\uDD25 \uD83D\uDD25 " +
                    "Customer creation failed , trying next one ...")
        }
    }

    var names: MutableList<String> = ArrayList()
    var uniqueNamesMap = HashMap<String, String?>()


    private fun getRandomName(): String {

        names.add("Jones Pty Ltd")
        names.add("Nkosi Associates")
        names.add("Maddow Enterprises")
        names.add("Xavier Inc.")
        names.add("House Inc.")
        names.add("Washington Brookes LLC")
        names.add("Johnson Associates Pty Ltd")
        names.add("Khulula Ltd")
        names.add("Innovation Partners")
        names.add("Peach Enterprises")
        names.add("Petersen Ventures Inc")
        names.add("Nixon Associates LLC")
        names.add("NamibianCool Inc.")
        names.add("BrothersFX Inc")
        names.add("Jabula Associates Pty Ltd")
        names.add("Graystone Khambule Ltd")
        names.add("Craighall Investments Ltd")
        names.add("Robert Grayson Associates")
        names.add("KZN Wildlife Pty Ltd")
        names.add("Bafana Spaza Pty Ltd")
        names.add("Kumar Enterprises Ltd")
        names.add("KrugerX Steel")
        names.add("TrainServices Pros Ltd")
        names.add("Topper PanelBeaters Ltd")
        names.add("Pelosi PAC LLC")
        names.add("Blackridge Inc.")
        names.add("BlackOx Inc.")
        names.add("Soweto Engineering Works Pty Ltd")
        names.add("Soweto Bakeries Ltd")
        names.add("BlackStone Partners Ltd")
        names.add("Constitution Associates LLC")
        names.add("Gauteng Manufacturers Ltd")
        names.add("Bidenstock Pty Ltd")
        names.add("Innovation Solutions Pty Ltd")
        names.add("Schiff Ventures Ltd")
        names.add("JohnnyUnitas Inc.")
        names.add("Process Innovation Partners")
        names.add("TrendSpotter Inc.")
        names.add("Naidoo Electronics Pty Ltd.")
        names.add("BlackOx Electronics Pty Ltd.")
        names.add("Baker-Smith Electronics Pty Ltd.")
        names.add("KnightRider Inc.")
        names.add("Fantastica Technology Inc.")
        names.add("Flickenburg Associates Pty Ltd")
        names.add("Cyber Operations Ltd")
        names.add("WorkerBees Inc.")
        names.add("FrickerRoad LLC.")
        names.add("Mamelodi Hustlers Pty Ltd")
        names.add("Wallace Incorporated")
        names.add("Peachtree Solutions Ltd")
        names.add("InnovateSpecialists Inc")
        names.add("DealMakers Pty Ltd")
        names.add("InvoiceHunters Pty Ltd")
        names.add("Clarity Solutions Inc")
        names.add("UK Holdings Ltd")
        names.add("Lauraine Pty Ltd")
        names.add("Paradigm Partners Inc")
        names.add("Washington Partners LLC")
        names.add("Motion Specialists Inc")
        names.add("OpenFlights Pty Ltd")
        names.add("ProServices Pty Ltd")
        names.add("TechnoServices Inc.")
        names.add("BrokerBoy Inc.")
        names.add("GermanTree Services Ltd")
        names.add("ShiftyRules Inc")
        names.add("BrookesBrothers Inc")
        names.add("PresidentialServices Pty Ltd")
        names.add("LawBook LLC")
        names.add("CampaignTech LLC")
        names.add("Tutankhamen Ventures Ltd")
        names.add("CrookesAndTugs Inc.")
        names.add("Coolidge Enterprises Inc")
        names.add("ProGuards Pty Ltd")
        names.add("BullFinch Ventures Ltd")
        names.add("ProGears Pty Ltd")
        names.add("HoverClint Ltd")
        names.add("KrugerBuild Pty Ltd")
        names.add("Treasure Hunters Inc")
        names.add("Kilimanjaro Consultants Ltd")
        names.add("Communications Brokers Ltd")
        names.add("VisualArts Inc")
        names.add("TownshipBusiness Ltd")
        names.add("HealthServices Pty Ltd")
        names.add("Macoute Professionals Ltd")
        names.add("Melber Pro Brokers Inc")
        names.add("Bronkies Park Pty Ltd")
        names.add("WhistleBlowers Inc.")
        names.add("Charles Mignon Pty Ltd")
        names.add("IntelligenceMaker Inc.")
        names.add("CroMagnon Industries")
        names.add("Status Enterprises LLC")
        names.add("Things Inc.")
        names.add("Rainmakers Ltd")
        names.add("Forensic Labs Ltd")
        names.add("DLT TechStars Inc")
        names.add("CordaBrokers Pty Ltd")
        val name = names[random.nextInt(names.size - 1)]
        if (uniqueNamesMap.containsKey(name)) {
            getRandomName();
        } else {
            uniqueNamesMap[name] = name
        }
        return name
    }

}
