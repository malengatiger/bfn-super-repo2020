package com.bfn.client.web

import com.bfn.client.data.*
import com.bfn.contractstates.states.NetworkOperatorState
import com.bfn.flows.todaysDate
import com.google.gson.GsonBuilder
import com.r3.corda.lib.accounts.contracts.states.AccountInfo
import net.corda.core.contracts.StateAndRef
import net.corda.core.internal.Emoji
import net.corda.core.messaging.CordaRPCOps
import net.corda.core.node.NodeInfo
import org.joda.time.DateTime
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.io.BufferedReader
import java.io.InputStreamReader
import java.net.HttpURLConnection
import java.net.URL
import java.util.*
import javax.annotation.PostConstruct

@Service
class DemoDataService {
    private val logger = LoggerFactory.getLogger(DemoDataService::class.java)
    private val gson = GsonBuilder().setPrettyPrinting().create()

    private var suppliers: MutableList<AccountInfoDTO>? = null
    private var customers: MutableList<AccountInfoDTO>? = null
    private var investors: MutableList<AccountInfoDTO>? = null
    private val demoSummary = DemoSummary()
    private var myNode: NodeInfo? = null

    @Value("\${stellarAnchorUrl}")
    private lateinit var stellarAnchorUrl: String

    @Value("\${customerNodeUrl}")
    private lateinit var customerNodeUrl: String

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
                "Generating data for the main anchor Node: NetworkOperator + Suppliers + Investors")

        deleteFirebaseShit()
        val operator = createNetworkOperator(mProxy)

        val accountInfo = workerBeeService.getNodeAccount(
                mProxy, operator!!.account.identifier!!)

        generateLocalNodeAccounts(mProxy, numberOfAccounts)

        val msg = "\n\n\uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40 DemoDataService: " +
                "generateAnchorNodeData COMPLETE! \uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40\n"
        logger.info(msg)
        return msg
    }

    private fun deleteFirebaseShit() {
        val users = firebaseService.getBFNUsers()
        users.forEach {
            firebaseService.deleteAuthUser(it.uid)
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
        logger.info("\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E Firebase clean up completed")
    }

    /**
     * Generate data for the customer node : Accounts are created for several customers
     */
    fun generateCustomerNodeData(mProxy: CordaRPCOps): String {
        logger.info("\n\n\n\uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40 " +
                "Generating data for the Customer Node: Customers only, Boss!")

        val accts = workerBeeService.getNodeAccounts(proxy = mProxy)
        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 " +
                "Accounts found on the current node: " + accts.size)
        val node = mProxy.nodeInfo()
        var cnt = 0
        accts.forEach {
            logger.info(" \uD83C\uDF4E Account found on node: ${it.name} ${it.host}")
            if (it.host == node.addresses[0].host) {
                cnt++
            }
        }
        if (cnt > 0) {
            throw Exception("\uD83D\uDE1D \uD83D\uDE1D ${accts.size} " +
                    "Accounts exist on the node. Should we close down shop?")
        }

        firebaseService.deleteCollection(BFN_CUSTOMER_PROFILES)

        createCustomers(mProxy, stellarAnchorUrl = stellarAnchorUrl)
        val msg = "\n\n\uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40 " +
                "DemoDataService: generateCustomerNodeData COMPLETE! " +
                "\uD83E\uDD6E \uD83E\uDD6E \uD83E\uDD6E\n"
        logger.info(msg)
        logger.info("\n\n\n\n")
        return msg
    }

    private fun getNetworkOperatorObject(): NetworkOperatorDTO {

        val email = "operator${System.currentTimeMillis()}@bfn.com"

        return NetworkOperatorDTO(
                email = email,
                cellphone = "+27710441887",
                date = todaysDate(),
                password = "pass123",
                account = AccountInfoDTO(
                        "TBD", "TBD",
                        "BFN Network Operator Ltd"
                )

        )

    }

    private fun getTradeMatrixItems(): MutableList<TradeMatrixItemDTO> {
        val m2 = TradeMatrixItemDTO(
                startInvoiceAmount = 2000001.00,
                endInvoiceAmount = 300000.00,
                offerDiscount = 8.3,
                date = todaysDate()
        )
        val m3 = TradeMatrixItemDTO(
                startInvoiceAmount = 300001.00,
                endInvoiceAmount = 400000.00,
                offerDiscount = 7.9,
                date = todaysDate()
        )
        val m4 = TradeMatrixItemDTO(
                startInvoiceAmount = 400001.00,
                endInvoiceAmount = 500000.00,
                offerDiscount = 7.4,
                date = todaysDate()
        )
        val m5 = TradeMatrixItemDTO(
                startInvoiceAmount = 500001.00,
                endInvoiceAmount = 1000000.00,
                offerDiscount = 5.5,
                date = todaysDate())
        val m6 = TradeMatrixItemDTO(
                startInvoiceAmount = 1000001.00,
                endInvoiceAmount = 10000000.00,
                offerDiscount = 4.2,
                date = todaysDate())
        val m7 = TradeMatrixItemDTO(
                startInvoiceAmount = 10000001.00,
                endInvoiceAmount = 100000000.00,
                offerDiscount = 3.1,
                date = todaysDate())

        return mutableListOf(m2, m3, m4, m5, m6, m7)
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
        val user = firebaseService.getBFNUserByAccountName(operator.account.name)
        val profile = InvestorProfileStateDTO(
                account = operator.account,
                minimumInvoiceAmount = 60000.00,
                maximumInvoiceAmount = 3000000.00,
                defaultDiscount = 15.0,
                totalInvestment = 1000000000.00,
                bank = "Investec Bank",
                bankAccount = "67246772893",
                date = DateTime().toDateTimeISO().toString(),
                rippleAccountId = user!!.rippleAccountId,
                stellarAccountId = user.stellarAccountId,
                tradeMatrixItems = getTradeMatrixItems()

        )
        operator.password = "pass123"
        val result = networkOperatorService.createNetworkOperator(mProxy, operator, profile)
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
                "DemoDataService started, proxy: ${mProxy.toString()}...   " +
                "will generate data $em4 ")

        myNode = mProxy.nodeInfo()
        logger.info(" \uD83D\uDD0B  \uD83D\uDD0B current node: ${myNode!!
                .legalIdentities[0].name.commonName}  \uD83D\uDD0B ")
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
    fun generateAccounts(proxy: CordaRPCOps, numberOfAccounts: Int = 10): String {
        logger.info("\n\n$em1 ..... generateAccounts started ...  " +
                "\uD83D\uDD06 \uD83D\uDD06 ................. generating: $numberOfAccounts")
        var cnt = 0
        for (x in 0..numberOfAccounts) {
            val prefix = "account" + System.currentTimeMillis()
            try {
                val mName = randomName
                logger.info("\n\n\n$em1 ..... Starting AccountRegistrationFlow for $mName ...........\n")
                workerBeeService.startAccountRegistrationFlow(proxy,
                        mName,
                        "$prefix@gmail.com",
                        "099 999 9003",
                        "pass123")

                cnt++
            } catch (e1: Exception) {
                logger.warn("\uD83D\uDE21 \uD83D\uDE21 Unable to add account - probable duplicate name")
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
        logger.info("$em1 getNodeAccounts complete ..." +
                "  \uD83D\uDD06 \uD83D\uDD06 found  ${accountInfos.size} ... " +
                "adding investor and supplier profiles and generating invoices for all accounts ........")
        //add profiles and generate invoices
        val page = proxy.vaultQuery(AccountInfo::class.java)
        val err = "\uD83D\uDE21\uD83D\uDE21\uD83D\uDE21\uD83D\uDE21"
        for (state in page.states) {
            try {
                addInvestorProfile(account = state, proxy = proxy)
            } catch (e: Exception) {
                logger.error("$err Unable to add InvestorProfile for account", e)
            }
            try {
                addSupplierProfile(account = state, proxy = proxy)
            } catch (e: Exception) {
                logger.error("$err Unable to add SupplierProfile for account", e)
            }

        }
        val msg = "\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35" +
                "DemoDataService: generateProfiles: Account profile generation complete"
        logger.info(msg)
        return msg
    }

    private val em1 = "\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 ";
    private var nodes: List<NodeInfoDTO>? = null

    fun generateOffersFromAccount(proxy: CordaRPCOps, accountInfo: AccountInfoDTO):String {
        logger.info("\uD83D\uDD35 generateOffersFromNetworkOperator starting .....: \uD83D\uDCA6 \uD83D\uDCA6");
        val mList = workerBeeService.findInvoicesForNode(proxy)
        logger.info("Invoices on Node:  \uD83D\uDE21 \uD83D\uDE21 ️ ${mList.size} ♻️")

        val profile = firebaseService.getInvestorProfile(accountInfo.identifier)
                ?: throw Exception("Missing InvestorProfile")
        var cnt = 0
        for (invoice in mList) {
            logger.info("\uD83D\uDE21 Processing .... ${invoice.invoiceNumber} " +
                    "\uD83C\uDF4F ${invoice.amount} for Network Operator account:  " +
                    "\uD83D\uDC9C ${accountInfo.name}")
            val ok = workerBeeService.validateInvoiceAgainstProfile(
                    proxy = proxy, investorProfile = profile, invoice = invoice)
            if (ok) {
                registerInvoiceOffer(
                        proxy = proxy,
                        investor = accountInfo,
                        invoice = invoice,
                        discount = profile.defaultDiscount)
                cnt++
                logger.info("\uD83D\uDE21 registered InvoiceOffer for supplier: \uD83C\uDF4F " +
                        "${invoice.supplier.name} ${invoice.supplier.host} " +
                        "\uD83C\uDF4F \uD83D\uDCA6 investor: ${accountInfo.name} " +
                        "\uD83D\uDCA6 ${accountInfo.host} ")
            } else {
                logger.info("\uD83C\uDF4E \uD83C\uDF4E InvoiceOffer NOT made, invoice not valid against investor profile")
            }
        }
        val msg = "\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E " +
                "InvoiceOffers made by Network Operator : $cnt"
        logger.info(msg)
        return msg
    }
    fun generateInvoiceOffers(proxy: CordaRPCOps): String {

        logger.info("\uD83D\uDD35 start generateOffers .......... \uD83D\uDCA6 \uD83D\uDCA6");
        val acctList = workerBeeService.getNodeAccounts(proxy)
        val mList = workerBeeService.findInvoicesForNode(proxy)

        logger.info("\uD83D\uDE21 \uD83D\uDE21 Accounts on Node:  \uD83D\uDE21 \uD83D\uDE21 ️ ${acctList.size} ♻️")
        logger.info("\uD83D\uDE21 \uD83D\uDE21 Invoices on Node:  \uD83D\uDE21 \uD83D\uDE21 ️ ${mList.size} ♻️")

        var cnt = 0
        val shuffledInvoices = mList.shuffled()
        val shuffledAccts = acctList.shuffled()
        shuffledInvoices.forEach() { invoice ->
            if (invoice.supplier.host == proxy.nodeInfo().legalIdentities.first().toString()) {
                shuffledAccts.forEach() {
                    val account = it
                    if (invoice.supplier.identifier == account.identifier) {
                        logger.info("\uD83D\uDD35 Ignore: ${it.name} Account is the supplier. " +
                                "\uD83D\uDD35 Cannot offer invoice to self: \uD83C\uDF3A ${account.name}")
                    } else {
                        generateOffersFromAccount(proxy = proxy, accountInfo = account)
                        cnt++
                    }
                }
            }
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

    private fun addInvestorProfile(proxy: CordaRPCOps, account: StateAndRef<AccountInfo>) {
        logger.info(" \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 addInvestorProfile ..." +
                "  \uD83D\uDD06 \uD83D\uDD06 for account:  ${account.state.data.name} ... ")
        var disc = random.nextInt(10) * 1.5
        if (disc < 3.0) {
            disc = 3.5
        }
        var min = random.nextInt(10) * 1000.00
        if (min == 0.0) {
            min = 1000.00
        }
        var max = random.nextInt(200) * 1000.00
        if (max == 0.0) {
            max = 200000.00
        }
        val investorProfile = InvestorProfileStateDTO(
                account = DTOUtil.getDTO(account.state.data),
                date = todaysDate(),
                defaultDiscount = disc,
                minimumInvoiceAmount = min,
                totalInvestment = 24999000.00,
                maximumInvoiceAmount = max,
                bank = "BlackOx Investment Bank",
                bankAccount = (random.nextInt(12345) * 647).toString(),
                stellarAccountId = "TBD", rippleAccountId = "TBD",
                tradeMatrixItems = getTradeMatrixItems()
        )

        workerBeeService.createInvestorProfile(
                proxy = proxy,
                account = account.state.data,
                profile = investorProfile)

        logger.info("\uD83D\uDE0E \uD83D\uDE0E \uD83D\uDE0E " +
                " Yup! Created INVESTOR profile for account:  \uD83C\uDF3A ${account.state.data.name} " +
                gson.toJson(investorProfile) + " \uD83C\uDF0D \uD83C\uDF0D \n\n")
    }

    private fun addSupplierProfile(proxy: CordaRPCOps, account: StateAndRef<AccountInfo>) {
        logger.info("\n\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 addSupplierProfile ..." +
                "  \uD83D\uDD06 \uD83D\uDD06 for account:  ${account.state.data.name} ... ")
        var disc = random.nextInt(5) * 2.5
        if (disc < 2.0) {
            disc = 6.5
        }

        val prof = SupplierProfileStateDTO(
                account = DTOUtil.getDTO(account.state.data),
                date = todaysDate(),
                bankAccount = (random.nextInt(123445) * 132647).toString(),
                bank = "BlackOx Investment Bank",
                maximumDiscount = disc,
                stellarAccountId = "TBD", rippleAccountId = "TBD"
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
    private val cal: Calendar = GregorianCalendar.getInstance()
    private var invoiceCnt = 0


    fun generateInvoices(proxy: CordaRPCOps, numberOfInvoicesPerAccount: Int): String {
        logger.info("\n\n\n \uD83C\uDF4E \uD83C\uDF4E ...... generateInvoices: " +
                " Invoices to be generated for all accounts except for Network Operator \n\n")

        val page = proxy.vaultQuery(NetworkOperatorState::class.java)
        if (page.states.isEmpty()) {
            throw Exception("\uD83D\uDC19 Missing NetworkOperator")
        } else {
            logger.info("\uD83C\uDF4E \uD83C\uDF4E We have found the network operator: "
                    + page.states[0].state.data.account.name)
        }
        val networkOperatorState = page.states[0].state.data
        val suppliers = workerBeeService.getNodeAccounts(proxy)
        if (suppliers.isEmpty()) {
            throw Exception("\n\n\uD83D\uDC19 Invoice generation Failed. \uD83D\uDD06 \uD83D\uDD06 " +
                    "generateInvoices could not find Accounts on the Node")
        }
        logger.info("\uD83D\uDC9C \uD83D\uDC9C \uD83D\uDC9C " +
                "\uD83D\uDC9C Number of Suppliers to process:  " +
                "\uD83C\uDF3C ${suppliers.size} \uD83C\uDF3C ....")
        logger.info("\uD83D\uDC9C \uD83D\uDC9C \uD83D\uDC9C " +
                "number of invoices to attempt to generate for each account: " +
                "\uD83C\uDF3C $numberOfInvoicesPerAccount ")
        invoiceCnt = 0

        val customers = customerNodeService.getCustomers()
        if (customers.isEmpty()) {
            val m = "\n\n\n\n\uD83D\uDE1D\uD83D\uDE1D\uD83D\uDE1D No customers found, quiting ..."
            logger.info(m)
            return m
        } else {
            logger.info("\uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40  We have customers from the node!  " +
                    "\uD83E\uDD80 there are ${customers.size} customers. We cooking with gas! " +
                    "\uD83D\uDC37 \uD83D\uDC37")
        }

        for (supplier in suppliers) {
            if (supplier.identifier == networkOperatorState.account.identifier.id.toString()) {
                logger.info("\uD83D\uDD35 \uD83D\uDD35  \uD83D\uDD35 \uD83D\uDD35" +
                        "Invoice generation ignored for the Network Operator .............. "
                        + networkOperatorState.account.name)
                continue
            }
            val filteredCustomers: MutableMap<String, AccountInfoDTO> = mutableMapOf()
            for (c in customers) {
                val x = random.nextInt(100)
                if (x < 50) {
                    filteredCustomers[c.identifier] = c;
                }
            }

            val mCustomers = filteredCustomers.values.toMutableList()
            if (mCustomers.isEmpty()) {
                logger.info("\n\n\n\uD83D\uDD35 \uD83D\uDD35  \uD83D\uDD35 \uD83D\uDD35" +
                        "Random customer list is empty; trying this shit again .............. ")
                generateInvoices(proxy,numberOfInvoicesPerAccount)
            }
            logger.info("\n\n\n\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35  " +
                    "${supplier.name} is about to generate invoices for " +
                    "${mCustomers.size} customers for ${supplier.name}\n\n")
            for (customer in mCustomers) {
                logger.info("\n\n\n\uD83C\uDF50 \uD83C\uDF50 Generating invoices for Customer: " +
                        "${customer.name} \uD83E\uDDE9 Supplier: ${supplier.name}  \uD83E\uDDE9 ........")
                cal.set(2020, 6, 1)
                for (x in 0..numberOfInvoicesPerAccount) {
                    try {
                        startInvoiceFlow(proxy, customer, supplier, DateTime(cal.time))
                        cal.add(Calendar.MONTH, 1)
                    } catch (e: Exception) {
                        logger.error("\uD83D\uDE21 \uD83D\uDE21 \uD83D\uDE21 " +
                                "Invoice failed to generate for supplier: ${gson.toJson(supplier)}", e)
                    }
                }
            }
        }
        demoSummary.numberOfInvoices = invoiceCnt
        val msh =  "\n\n\n\uD83D\uDC9A \uD83D\uDC9A \uD83D\uDC9A :: " +
                "generateInvoices complete. Total Invoices generated on Node: " +
                "\uD83D\uDC9C $invoiceCnt \uD83D\uDC9C\n\n\n"
        logger.info(msh)
        return msh;
    }

    private fun startInvoiceFlow(proxy: CordaRPCOps, customer: AccountInfoDTO,
                                 supplier: AccountInfoDTO, date: DateTime) {
        logger.info("\n\n...... ........... .........  \uD83D\uDD35 \uD83D\uDD35 " +
                "startInvoiceFlow: \uD83D\uDC9C \uD83D\uDC9C \uD83D\uDC9C " +
                "account: ${supplier.name}")

        val largeInvoice = buildLargeInvoice(customer, supplier, date)
        val smallInvoice = buildSmallInvoice(customer, supplier, date)

        if (largeInvoice != null) {
            val choice = random.nextInt(100)
            if (choice > 49) {
                val result = workerBeeService.startInvoiceRegistrationFlow(proxy, largeInvoice)
                logger.info("\uD83D\uDC9C LARGE startInvoiceFlow: startInvoiceRegistrationFlow " +
                        "executed, result totalAmount: ${result.totalAmount} ")
                logger.info("\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 " +
                        "LARGE invoice added to ledger; ${gson.toJson(result)} " +
                        "\uD83E\uDD66 \uD83E\uDD52 \uD83E\uDD6C\n\n\n")
                invoiceCnt++
            }
        } else {
            logger.info("\uD83D\uDC9C LARGE startInvoiceFlow: " +
                    "\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 invoice is NULL");
        }
        if (smallInvoice != null) {
            val choice = random.nextInt(100)
            if (choice > 49) {
                val result = workerBeeService.startInvoiceRegistrationFlow(proxy, smallInvoice)
                logger.info("\uD83D\uDC9C SMALL startInvoiceFlow: startInvoiceRegistrationFlow " +
                        "executed, result totalAmount: ${result.totalAmount} ")
                logger.info("\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 " +
                        " SMALL invoice added to ledger; ${gson.toJson(result)} " +
                        "\uD83E\uDD66 \uD83E\uDD52 \uD83E\uDD6C\n\n\n")
                invoiceCnt++
            }
        } else {
            logger.info("\uD83D\uDC9C SMALL startInvoiceFlow: " +
                    "\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 smallInvoice is NULL");
        }
    }

    private fun buildLargeInvoice(customer: AccountInfoDTO,
                                  supplier: AccountInfoDTO, date: DateTime): InvoiceDTO? {

        var num = random.nextInt(1000)
        if (num >= 700) num = 2000
        if (num <= 200) num = 1000

        if (supplier.name == customer.name) {
            logger.info("Invalid invoice;  supplier: ${supplier.name} customer: ${customer.name}")
            return null
        }

        val suffix = random.nextInt(100)

        return InvoiceDTO(
                invoiceNumber = "INV_" + System.currentTimeMillis() + "-" + suffix,
                supplier = supplier,
                customer = customer,
                amount = num * 1200.0,
                valueAddedTax = 15.0,
                totalAmount = num * 1200.0 * 1.15,
                description = "LARGE : Demo Invoice at ${date.toDateTimeISO()}",
                dateRegistered = date.toDateTimeISO().toString(),
                invoiceId = UUID.randomUUID().toString(),
                externalId = "tbd"
        )
    }

    private fun buildSmallInvoice(customer: AccountInfoDTO,
                                  supplier: AccountInfoDTO, date: DateTime): InvoiceDTO? {

        var num = random.nextInt(200)
        if (num <= 20) num = 100

        if (supplier.name == customer.name) {
            logger.info("Invalid invoice; supplier: ${supplier.name} customer: ${customer.name}")
            return null
        }
        val suffix = random.nextInt(100)

        return InvoiceDTO(
                invoiceNumber = "INV_" + System.currentTimeMillis()+ "-" + suffix,
                supplier = supplier,
                customer = customer,
                amount = num * 500.0,
                valueAddedTax = 15.0,
                totalAmount = num * 500.0 * 1.15,
                description = "Small Demo Invoice at ${date.toDateTimeISO()}",
                dateRegistered = date.toDateTimeISO().toString(),
                invoiceId = UUID.randomUUID().toString(),
                externalId = "tbd"
        )
    }

    private val nodeInvoiceOffers: MutableList<InvoiceOfferDTO> = ArrayList()

    @Throws(Exception::class)
    private fun registerInvoiceOffer(proxy: CordaRPCOps, invoice: InvoiceDTO,
                                     investor: AccountInfoDTO,
                                     discount: Double) {


        val invoiceOffer = InvoiceOfferDTO(
                invoiceId = invoice.invoiceId,
                supplier = invoice.supplier,
                investor = investor,
                offerDate = DateTime().toDateTimeISO().toString(),
                discount = discount,
                accepted = false,
                offerAmount = (100.0 - discount / 100) * invoice.totalAmount,
                originalAmount = invoice.totalAmount,
                externalId = invoice.externalId,
                invoiceNumber = invoice.invoiceNumber,
                investorDate = DateTime().toDateTimeISO().toString(),
                acceptanceDate = "tbd",
                offerId = UUID.randomUUID().toString(),
                isAnchor = false
        )
        try {
            val offer = workerBeeService.startInvoiceOfferFlow(proxy, invoiceOffer)
            nodeInvoiceOffers.add(offer)
        } catch (e: Exception) {
            logger.warn("Unable to add offer: ${e.message}")
        }
    }

    val concat = " \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 "

    private fun createCustomers(proxy: CordaRPCOps, stellarAnchorUrl: String) {
        logger.info("\n\n\n\n")
        logger.info(concat
                + "Start createCustomers .... createCustomers  \uD83D\uDECE  ")

        doOneCustomer(proxy, stellarAnchorUrl, buildCustomerProfile(
                "Pick & Pay Supermarkets",
                minimumInvoiceAmount = 5000.00,
                maximumInvoiceAmount = 100000.00))
        logger.info("\n\n\n\n")
        doOneCustomer(proxy, stellarAnchorUrl, buildCustomerProfile(
                "Department of Public Works",
                minimumInvoiceAmount = 50000.00,
                maximumInvoiceAmount = 100000000.00))
        logger.info("\n\n\n\n")
        doOneCustomer(proxy, stellarAnchorUrl, buildCustomerProfile(
                "Department of Health",
                minimumInvoiceAmount = 10000.00,
                maximumInvoiceAmount = 1000000.00))
        logger.info("\n\n\n\n")
        doOneCustomer(proxy, stellarAnchorUrl, buildCustomerProfile(
                "Shoprite Supermarkets",
                minimumInvoiceAmount = 15000.00,
                maximumInvoiceAmount = 300000.00))
        logger.info("\n\n\n\n")
        doOneCustomer(proxy, stellarAnchorUrl, buildCustomerProfile(
                "Ashanti Gold Mining",
                minimumInvoiceAmount = 500000.00,
                maximumInvoiceAmount = 60000000.00))
        logger.info("\n\n\n\n")
        doOneCustomer(proxy, stellarAnchorUrl, buildCustomerProfile(
                "Department of Transport",
                minimumInvoiceAmount = 5000.00,
                maximumInvoiceAmount = 8000000.00))
        logger.info("\n\n\n\n")
        doOneCustomer(proxy, stellarAnchorUrl, buildCustomerProfile(
                "Standard Bank",
                minimumInvoiceAmount = 5000.00,
                maximumInvoiceAmount = 900000000.00))
        logger.info("\n\n\n\n")
        doOneCustomer(proxy, stellarAnchorUrl, buildCustomerProfile(
                "BMW South Africa Limited",
                minimumInvoiceAmount = 5000.00, maximumInvoiceAmount = 40000000.00))
        logger.info("\n\n\n\n")


    }

    private fun buildCustomerProfile(name: String, minimumInvoiceAmount: Double,
                                     maximumInvoiceAmount: Double): CustomerProfileStateDTO {
        val suffix = "@bfn.com"
        val prefix = "cust"

        return CustomerProfileStateDTO(
                AccountInfoDTO("TBD", "TBD",
                        name),
                minimumInvoiceAmount,
                maximumInvoiceAmount,
                cellphone = phone,
                email = "$prefix${System.currentTimeMillis()}$suffix",
                dateRegistered = Date(),
                stellarAccountId = "TBD",
                rippleAccountId = "TBD"
        )
    }

    private fun doOneCustomer(proxy: CordaRPCOps, stellarAnchorUrl: String,
                              customerProfile: CustomerProfileStateDTO) {
        logger.info("\n\uD83D\uDD35 ........... Creating Customer ${customerProfile.account.name}")

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
    var map = HashMap<String, String?>()

    fun getSomeName(): String {
        return randomName
    }

    @get:Throws(Exception::class)
    val randomName: String
        get() {
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
            if (map.containsKey(name)) {
                throw Exception("Random name collision")
            } else {
                map[name] = name
            }
            return name
        }

}
