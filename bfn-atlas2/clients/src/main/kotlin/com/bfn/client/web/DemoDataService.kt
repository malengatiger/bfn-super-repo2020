package com.bfn.client.web

import com.bfn.client.Emo
import com.bfn.client.data.*
import com.bfn.client.web.services.FirebaseService
import com.bfn.client.web.services.NetworkOperatorBeeService
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

    /**
     * Generate data for the main anchor node : NetworkOperator is created here as well as Accounts
     */
    fun generateAnchorNodeData(mProxy: CordaRPCOps, numberOfAccounts: Int): String {
        logger.info("\n\uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40 " +
                "Generating data for the main anchor Node: " +
                "NetworkOperator + Suppliers + Investors; " +
                "${Emo.BLUE_DOT}numberOfAccounts to generate: $numberOfAccounts")

        deleteFirebaseShit()
        createNetworkOperator(mProxy)
        generateLocalNodeAccounts(mProxy, numberOfAccounts)

        val msg = "\n\n\uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40 DemoDataService: " +
                "generateAnchorNodeData COMPLETE! \uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40\n"
        logger.info(msg)
        return msg
    }

    private fun deleteFirebaseShit() {
        val users = firebaseService.getBFNUsers()
        users.forEach {
            if (it.email != "bfnadmin@bfn.com") {
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

        logger.info("\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E Firebase clean up completed")
    }
    var accounts: List<AccountInfoDTO> = mutableListOf()
    /**
     * Generate data for the customer node : Accounts are created for several customers
     */
    fun generateCustomerNodeData(mProxy: CordaRPCOps, numberOfMonths:Int): String {
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

        createCustomers(mProxy)
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

    fun generatePurchaseOrders(mProxy: CordaRPCOps, numberOfMonths:Int = 3): String {
        val msg = "\n\n\uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40 " +
                "DemoDataService: generatePurchaseOrders starting ........! " +
                "\uD83E\uDD6E \uD83E\uDD6E \uD83E\uDD6E\n"
        logger.info(msg)
        purchaseOrderCount = 0
        accounts = workerBeeService.getAllNodeAccounts(mProxy)
        val operator = firebaseService.getNetworkOperator() ?:
            throw Exception("Network Operator missing ${Emo.ERRORS}")
        accounts.forEach {
            logger.info("\uD83C\uDF4E Account found on node, " +
                    "\uD83C\uDF40 ${it.name} \uD83C\uDF40 ${it.host}")
            if (it.host.contains("Customer")) {
               customers.add(it)
            } else {
                if (!it.name.contains(operator.account.name)) {
                    suppliers.add(it)
                }
            }
        }
        //create a set of PO's for each customer ....
        logger.info("\n\n\n${Emo.FERNS}" +
                " Start creating PurchaseOrders for " +
                "${customers.size} customers and ${suppliers.size} suppliers.... \n\n")

        for (customer in customers) {
            var mthIncrement = 0
            val startDate = DateTime().minusMonths(numberOfMonths)
            logger.info("${Emo.FERNS} " +
                    " Start creating PurchaseOrders for Customer: " +
                    "${customer.name} ....${Emo.RED_APPLE} startDate: ${startDate.toDateTimeISO()} \n\n")
            while (mthIncrement < numberOfMonths) {
                var mDate = startDate;
                if (mthIncrement > 0) {
                    mDate = startDate.plusMonths(mthIncrement)
                            .plusDays(random.nextInt(7))
                }
                createCustomerPurchaseOrders(mProxy, customer, mDate);
                mthIncrement++
            }
        }
        val msg2 = "\n\n${Emo.RED_APPLES} " +
                "DemoDataService: generatePurchaseOrders COMPLETE! " +
                " $purchaseOrderCount purchaseOrders generated ${Emo.FERNS}\n\n"

        logger.info(msg2)
        logger.info("\n\n\n\n")
        return msg2
    }
    private fun createCustomerPurchaseOrders(mProxy: CordaRPCOps,
                                             customer: AccountInfoDTO, date:DateTime): String {

        for (supplier in suppliers) {
            if (customer.identifier != supplier.identifier) {
                val mDate = date.plusDays(random.nextInt(14))
                createSmallAndLargePurchaseOrders(mProxy, customer, supplier, mDate)
            }
        }
        val msg = "\n\n${Emo.RED_APPLES} " +
                "DemoDataService: PurchaseOrders for Customer : ${customer.name} and ${suppliers.size} Suppliers completed  " +
                "${Emo.RED_APPLES}\n"
        logger.info(msg)
        logger.info("\n\n")
        return msg
    }
    private fun createSmallAndLargePurchaseOrders(mProxy: CordaRPCOps,
                                                  customer: AccountInfoDTO,
                                                  supplier: AccountInfoDTO,
                                                  date: DateTime): String {

        val sDate = date.plusDays(random.nextInt(14))
        val lDate = date.plusDays(random.nextInt(14))

        val poSmall = PurchaseOrderDTO(
                purchaseOrderId = UUID.randomUUID().toString(),
                purchaseOrderNumber = "" + System.currentTimeMillis()+ "-" + random.nextInt(100),
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

        val choice = random.nextInt(100)
        if (choice <= 40) {
            val msg1 = workerBeeService.createPurchaseOrder(mProxy, purchaseOrder = poSmall)
            purchaseOrderCount++
            logger.info("$msg1 ::: ${Emo.PEAR} SMALL PO created with date: " +
                    "${Emo.YELLOW_BIRD} ${poSmall.dateRegistered} " +
                    "amt: ${poSmall.amount} \n\n\n")
        } else {
            val msg2 = workerBeeService.createPurchaseOrder(mProxy, purchaseOrder = poLarge)
            purchaseOrderCount++
            logger.info("$msg2 ::: ${Emo.PEAR} LARGE PO created with date:" +
                    " ${Emo.YELLOW_BIRD} ${poLarge.dateRegistered} " +
                    "amt: ${poLarge.amount} \n\n\n ")
        }


        return "createSmallAndLargePurchaseOrders: completed"

    }
    private fun getLargePOAmount(): String {
        val amt = random.nextInt(50) * 10000.00
        return if (amt < 100000.00) {
            "500000.00"
        } else {
            amt.toString()
        }
    }
    private fun getSmallPOAmount(): String {
        var amt = random.nextInt(10) * 10000.00
        if (amt < 10000.00) {
            amt = 10000.00
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
                account = AccountInfoDTO(
                        "TBD", "TBD",
                        "BFN Network Operator Ltd"
                )

        )

    }

    private val m1List: MutableList<String> = mutableListOf()
    private val m2List: MutableList<String> = mutableListOf()
    private val m3List: MutableList<String> = mutableListOf()
    private val m4List: MutableList<String> = mutableListOf()
    private val m5List: MutableList<String> = mutableListOf()

    private fun getTradeMatrixItems(): MutableList<TradeMatrixItemDTO> {

        if (m1List.isEmpty()) {
            for (i in 20..25) {
               m1List.add("${i * 1.00}")
            }
            for (i in 15..19) {
                m2List.add("${i * 1.00}")
            }
            for (i in 12..14) {
                m3List.add("${i * 1.00}")
            }
            for (i in 8..11) {
                m4List.add("${i * 1.00}")
            }
            for (i in 2..7) {
                m5List.add("${i * 1.00}")
            }
        }


        val date = DateTime().toDateTimeISO().toString()
        val mDisc1 = m1List[random.nextInt(m1List.size - 1)]

        //todo - generate five ranges start and end amounts ....
        val multiplier = 10000.00
        var num1 = random.nextInt(10)
        if (num1 == 0 || num1 > 8) {
            num1 = 3
        }
        val start1 = (num1 * multiplier).toString()
        val end1 = (10 * multiplier).toString()

        val m1 = TradeMatrixItemDTO(
                start1,
                end1,
                mDisc1,
                date
        )

        val mDisc2 = m2List[random.nextInt(m2List.size - 1)]
        var num2 = random.nextInt(20)
        if (num2 < 11 || num1 > 18) {
            num2 = 11
        }
        val start2 = (num2 * multiplier).toString()
        val end2 = (20 * multiplier).toString()
        val m2 = TradeMatrixItemDTO(
                start2,
                end2,
                mDisc2,
                date
        )

        val mDisc3 = m3List[random.nextInt(m3List.size - 1)]
        var num3 = random.nextInt(30)
        if (num3 < 21 || num1 > 25) {
            num3 = 21
        }
        val start3 = (num3 * multiplier).toString()
        val end3 = (30 * multiplier).toString()
        val m3 = TradeMatrixItemDTO(
                start3,
                end3,
                mDisc3,
                date
        )
        val mDisc4 = m4List[random.nextInt(m4List.size - 1)]
        var num4 = random.nextInt(40)
        if (num4 < 31 || num1 > 37) {
            num4 = 31
        }
        val start4 = (num4 * multiplier).toString()
        val end4 = (40 * multiplier).toString()
        val m4 = TradeMatrixItemDTO(
                start4,
                end4,
                mDisc4,
                date)
        val mDisc5 = m5List[random.nextInt(m5List.size - 1)]
        var num5 = random.nextInt(50)
        if (num5 < 41 || num1 > 47) {
            num5 = 41
        }
        val start5 = (num5 * multiplier).toString()
        val end5 = (50 * multiplier).toString()
        val m5 = TradeMatrixItemDTO(
                start5,
                end5,
                mDisc5,
                date)


        logger.info("${Emo.DICE}${Emo.DICE}Discounts: ${m1.offerDiscount}%, " +
                "${m2.offerDiscount}%, ${m3.offerDiscount}%, ${m4.offerDiscount}%, " +
                "${m5.offerDiscount}%")

        return mutableListOf(m1, m2, m3, m4, m5)
    }

    @Throws(Exception::class)
    private fun createNetworkOperator(mProxy: CordaRPCOps): NetworkOperatorDTO? {
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
                "30000.00",
                "30000000.00",
                "1000000000.00",
                "3.0",
                "Investec Bank",
                "67246772893",
                "tbd",
                "tbd",
                getTradeMatrixItems(),
                DateTime().toDateTimeISO().toString()
        )
        val supplierProfile = SupplierProfileStateDTO(
                operator.account, "Investec Bank",
                "67246772893","5.0",
                "tbd", "tbd",
                "ZAR", todaysDate()
        )
        operator.password = "pass123"
        val result = networkOperatorService.createNetworkOperator(
                mProxy, operator, investorProfile, supplierProfile)
        logger.info("\uD83E\uDD6E \uD83E\uDD6E \uD83E\uDD6E " +
                "DemoDataService: createNetworkOperator result: " +
                gson.toJson(result) + " \uD83E\uDD6E \uD83E\uDD6E")
        return result
    }

    private val em4 = "\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 "

    @Throws(Exception::class)
    fun generateLocalNodeAccounts(mProxy: CordaRPCOps, numberOfAccounts: Int = 10): DemoSummary {
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

        generateAccounts(mProxy, numberOfAccounts)
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
    fun generateAccounts(proxy: CordaRPCOps, numberOfAccounts: Int = 20): String {
        logger.info("\n\n$em1 ..... generateAccounts started ...  " +
                "\uD83D\uDD06 \uD83D\uDD06 ................. generating numberOfAccounts: $numberOfAccounts")

        var cnt = 0
        for (x in 0..numberOfAccounts) {
            val prefix = "account" + System.currentTimeMillis()
            try {
                val mName = getRandomName()
                logger.info("\n\n\n$em1 ..... Starting AccountRegistrationFlow for $mName ...........\n")
                workerBeeService.startAccountRegistrationFlow(proxy,
                        mName,
                        "$prefix@gmail.com",
                        "099 999 9003",
                        "pass123")

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
        val operator = firebaseService.getNetworkOperator() ?:
                throw Exception("Network Operator Missing")
        val page = proxy.vaultQuery(AccountInfo::class.java)
        val err = "\uD83D\uDE21\uD83D\uDE21\uD83D\uDE21\uD83D\uDE21"
        for (state in page.states) {
            val user = firebaseService.getBFNUserByAccountName(state.state.data.name)
            if (operator.account.name != state.state.data.name) {
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
                    "account: ${operator.account.name}: \uD83D\uDCA6 \uD83D\uDCA6")
            nodeInvoices = workerBeeService.findInvoicesForNode(proxy)
            generateOffersFromAccount(proxy,operator.account)
        }
        val msg = "\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E " +
                "Total InvoiceOffers made by Account ${operator?.account?.name}"
        logger.info(msg)
        return msg
    }
    fun generateOffersFromAccount(proxy: CordaRPCOps, accountInfo: AccountInfoDTO): String {
        logger.info("\n\n\n${Emo.RED_APPLES} generateOffersFromAccount starting ..... " +
                "account: ${accountInfo.name}: \uD83D\uDCA6 \uD83D\uDCA6")
        if (nodeInvoices.isEmpty()) {
            nodeInvoices = workerBeeService.findInvoicesForNode(proxy)
        }
        logger.info("workerBeeService.findInvoicesForNode found Invoices on Node:" +
                "  \uD83D\uDE21 \uD83D\uDE21 ️ ${nodeInvoices.size} ♻️")

        val profile = firebaseService.getInvestorProfile(accountInfo.identifier)
                ?: throw Exception("Missing InvestorProfile, offers cannot be generated")
        var cntx = 0
        for (invoice in nodeInvoices) {
            val ok = workerBeeService.validateInvoiceAgainstProfile(
                    investorProfile = profile, invoice = invoice)
            if (ok) {
                val offer = registerInvoiceOffer(
                        proxy = proxy,
                        investor = accountInfo,
                        invoice = invoice,
                        discount = profile.defaultDiscount)
                if (offer != null) {
                    cnt++
                    cntx++
                    logger.info("\uD83E\uDD66 \uD83E\uDD66 \uD83E\uDD66 \uD83E\uDD66 " +
                            "SUCCESSFULLY registered InvoiceOffer on Corda Ledger for supplier: \uD83C\uDF4F " +
                            "${invoice.supplier?.name} ${invoice.supplier?.host} " +
                            "\uD83C\uDF4F \uD83D\uDCA6 investor: ${accountInfo.name} " +
                            "\uD83D\uDCA6 ${accountInfo.host} \uD83E\uDDE9 \uD83E\uDDE9 " +
                            "offerAmount: ${offer.offerAmount} < originalAmount ${offer.originalAmount}" + "\n\n\n")
                }
            } else {
                logger.info("\uD83D\uDD35 ...... ignoring this baby. did not meet compliance!! Boss!\n\n\n")
            }
        }
        val msg = "\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E " +
                "Total InvoiceOffers made by Account ${accountInfo.name} : $cntx offers \n\n\n"
        logger.info(msg)
        return msg
    }
    var cnt = 0
    fun generateInvoiceOffers(proxy: CordaRPCOps): String {

        logger.info("\n\n\n\uD83D\uDD35 start generateOffers .......... \uD83D\uDCA6 \uD83D\uDCA6\n\n");
        val acctList = workerBeeService.getNodeAccounts(proxy)
        //todo - find invoices on ALL nodes ... eh?
        nodeInvoices = workerBeeService.findInvoicesForNode(proxy)

        logger.info("\uD83D\uDE21 \uD83D\uDE21 Accounts on Node:  \uD83D\uDE21 \uD83D\uDE21 ️ ${acctList.size} ♻️")
        logger.info("\uD83D\uDE21 \uD83D\uDE21 Invoices on Node:  \uD83D\uDE21 \uD83D\uDE21 ️ ${nodeInvoices.size} ♻\n\n️")

        acctList.forEach() {
            generateOffersFromAccount(proxy = proxy, accountInfo = it)
        }

        val msg = "\uD83E\uDDE1 \uD83D\uDC9B generateInvoiceOffers complete: " +
                "Offers generated: \uD83E\uDD4F  $cnt \uD83E\uDD4F "
        logger.info(msg)
        return msg;
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
            min = 10000.00
        }
        var max = random.nextInt(1000) * 100000.00
        if (max <= 500000.0) {
            max = 200000.00
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
                getTradeMatrixItems(),
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
                    dateRegistered = po.dateRegistered,
                    valueAddedTax = "15.0",
                    totalAmount = "tbd",
                    externalId = "tbd",
                    invoiceNumber = "" + System.currentTimeMillis() + "-" + random.nextInt(1000))

            val result = workerBeeService.startInvoiceRegistrationFlow(proxy, inv)
            invoiceCnt++
            logger.info("\n\n${Emo.RAIN_DROPS} Invoice generated from PO on Corda ledger: ${gson.toJson(result)} ${Emo.PRETZEL}")
            
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
            val resultOffer = workerBeeService.startInvoiceOfferFlow(proxy, invoiceOffer)
            nodeInvoiceOffers.add(resultOffer)
            logger.info("\uD83C\uDFB2 \uD83C\uDFB2 Number of invoice offers made so far: ${nodeInvoiceOffers.size}")
            resultOffer
        } catch (e: Exception) {
            logger.warn("\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E " +
                    "Failed to add offer on ledger; \uD83C\uDF4E we are fucked! Returning null \uD83C\uDF4E ", e)
            null
        }

    }

    val concat = " \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 "

    private fun createCustomers(proxy: CordaRPCOps) {
        logger.info("\n\n\n\n")
        logger.info(concat
                + "Start createCustomers .... createCustomers  \uD83D\uDECE  ")

        doOneCustomer(proxy, buildCustomerProfile(
                "Pick & Pay Supermarkets",
                minimumInvoiceAmount = "5000.00",
                maximumInvoiceAmount = "100000.00"))
        logger.info("\n\n\n\n")

        doOneCustomer(proxy, buildCustomerProfile(
                "Department of Public Works",
                minimumInvoiceAmount = "50000.00",
                maximumInvoiceAmount = "100000000.00"))
        logger.info("\n\n\n\n")

        doOneCustomer(proxy, buildCustomerProfile(
                "Department of Health",
                minimumInvoiceAmount = "10000.00",
                maximumInvoiceAmount = "1000000.00"))
        logger.info("\n\n\n\n")

        doOneCustomer(proxy, buildCustomerProfile(
                "BMW South Africa Limited",
                minimumInvoiceAmount =  "5000.00",
                maximumInvoiceAmount =  "40000000.00"))
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
                              customerProfile: CustomerProfileStateDTO) {
        logger.info("\n\uD83D\uDD35 ........... Creating Customer ${customerProfile.account?.name}")
        val password = "pass123"
        try {
            val resultProfile = workerBeeService.createCustomerProfile(proxy, customerProfile, password)
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


    private fun  getRandomName(): String {

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
