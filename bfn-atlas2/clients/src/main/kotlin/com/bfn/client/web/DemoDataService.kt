package com.bfn.client.web

import com.bfn.client.data.*
import com.bfn.contractstates.states.NetworkOperatorState
import com.bfn.flows.thisDate
import com.bfn.flows.todaysDate
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.r3.corda.lib.accounts.contracts.states.AccountInfo
import khttp.post
import net.corda.core.contracts.StateAndRef
import net.corda.core.internal.Emoji
import net.corda.core.messaging.CordaRPCOps
import net.corda.core.node.NodeInfo
import org.json.JSONObject
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

    /**
     * Generate data for the main anchor node : NetworkOperator is created here as well as Accounts
     */
    fun generateAnchorNodeData(mProxy: CordaRPCOps, numberOfAccounts: Int): String {
        logger.info("\n\uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40 " +
                "Generating data for the main anchor Node: NetworkOperator + Suppliers + Investors")
        createNetworkOperator(mProxy)
        generateLocalNodeAccounts(mProxy, numberOfAccounts)

        val msg = "\n\n\uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40 DemoDataService: " +
                "generateAnchorNodeData COMPLETE! \uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40\n"
        logger.info(msg)
        return msg
    }
    /**
     * Generate data for the customer node : Accounts are created for several customers
     */
    fun generateCustomerNodeData(mProxy: CordaRPCOps):String {
        logger.info("\uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40 " +
                "Generating data for the Customer Node: Customers only")
        createCustomers(mProxy, stellarAnchorUrl = stellarAnchorUrl)
        val msg = "\n\n\uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40 " +
                "DemoDataService: generateCustomerNodeData COMPLETE! " +
                "\uD83E\uDD6E \uD83E\uDD6E \uD83E\uDD6E\n"
        logger.info(msg)
        return msg
    }

    private fun getNetworkOperatorObject(): NetworkOperatorDTO {

        val mixes: MutableList<TradeMatrixItemDTO> = mutableListOf()
        val email = "operator${System.currentTimeMillis()}@bfn.com"
        val operator = NetworkOperatorDTO(
                minimumInvoiceAmount = 100000.00,
                maximumInvoiceAmount = 20000000.00,
                maximumInvestment = 1000000000.00,
                defaultOfferDiscount = 8.8,
                name = "BFN Network Operator Ltd",
                email = email,
                cellphone = "+27710441887",
                tradeFrequencyInMinutes = 240,
                tradeMatrixItems = mixes,
                date = todaysDate(),
                password = "pass123",
                rippleAccountId = "TBD",
                stellarAccountId = "TBD",
                uid = UUID.randomUUID().toString(),
                account = AccountInfoDTO(
                        "TBD", "TBD",
                        "BFN Network Operator Ltd"
                )

        )
        addTradeMatrixItems(operator)
        return operator

    }

    private fun addTradeMatrixItems(networkOperatorInvestor: NetworkOperatorDTO) {
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

        networkOperatorInvestor.tradeMatrixItems = mutableListOf(m2, m3, m4, m5, m6, m7)
    }

    @Throws(Exception::class)
    private fun createNetworkOperator(mProxy: CordaRPCOps): NetworkOperatorDTO? {
        logger.info("\n\n\uD83E\uDDA0 \uD83E\uDDA0 \uD83E\uDDA0 Demo createNetworkOperator started ..... \uD83E\uDDA0 \uD83E\uDDA0")
        val page = mProxy.vaultQuery(NetworkOperatorState::class.java)
        if (page.states.isNotEmpty()) {
            logger.info("\uD83E\uDD6E \uD83E\uDD6E \uD83E\uDD6E Network Operator already exists: ${page.states[0].state.data.account.name}")
        }

        val operator = getNetworkOperatorObject()
        val result = networkOperatorService.createNetworkOperator(mProxy, operator)
        logger.info("\uD83E\uDD6E \uD83E\uDD6E \uD83E\uDD6E Demo createNetworkOperator result: " +
                gson.toJson(result) + " \uD83E\uDD6E \uD83E\uDD6E")
        return result
    }
    @Throws(Exception::class)
    fun generateLocalNodeAccounts(mProxy: CordaRPCOps?, numberOfAccounts: Int = 10): DemoSummary {
        val start = Date().time;
        logger.info("\n\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 " +
                "DemoDataService started, proxy: ${mProxy.toString()}...  \uD83D\uDD06 \uD83D\uDD06 " +
                "will generate data 🧩🧩 ")

        myNode = mProxy!!.nodeInfo()
        logger.info(" \uD83D\uDD0B  \uD83D\uDD0B current node: ${myNode!!.addresses[0]}  \uD83D\uDD0B ")
        if (myNode!!.legalIdentities[0].name.organisation.contains("Notary")) {
            throw Exception("Cannot add demo data to Notary")
        }
        if (myNode!!.legalIdentities[0].name.organisation.contains("Regulator")) {
            throw Exception("Cannot add demo data to Regulator")
        }
        logger.info("${Emoji.CODE_COOL_GUY} my node is: ${myNode!!.addresses[0]}")
        suppliers = mutableListOf()
        customers = mutableListOf()
        investors = mutableListOf()


        logger.info("👽 👽 👽 👽 start data generation:  numberOfAccounts $numberOfAccounts 👽 👽 👽 👽  ")
        firebaseService.deleteCollection(collectionName = "accounts")
        generateAccounts(mProxy, numberOfAccounts)
        //
        val list = workerBeeService.getNodeAccounts(mProxy)
        var cnt = 0
        logger.info(" \uD83C\uDF4E  \uD83C\uDF4E Total Number of Accounts on Node after sharing:" +
                " \uD83C\uDF4E  \uD83C\uDF4E " + list.size)
        val userRecords = firebaseService.getUsers()
        for (userRecord in userRecords) {
            cnt++
            logger.info("🔵 🔵 userRecord 😡 #" + cnt + " - " + userRecord.displayName + " 😡 " + userRecord.email)
        }
        val end = Date().time;
        demoSummary.numberOfAccounts = list.size
        demoSummary.elapsedSeconds = (end - start / 1000).toDouble();
        return demoSummary
    }
    @Throws(Exception::class)
    fun generateAccounts(proxy: CordaRPCOps, count: Int = 10): String {
        logger.info("\n\n$em1 generateAccounts started ...  " +
                "\uD83D\uDD06 \uD83D\uDD06 ................. generating: $count")
        var cnt = 0
        for (x in 0..count) {
            val prefix = "account" + System.currentTimeMillis()
            try {
                val mName = randomName
                logger.info("$em1 Starting AccountRegistrationFlow for $mName")
                workerBeeService.startAccountRegistrationFlow(proxy,
                        mName,
                        "$prefix@gmail.com",
                        "pass123")
                cnt++
            } catch (e1: Exception) {
                logger.warn("\uD83D\uDE21 \uD83D\uDE21 Unable to add account - probable duplicate name")
            }
        }
        logger.info("$em1 generateAccounts complete ..." +
                "  \uD83D\uDD06 \uD83D\uDD06 added $cnt accounts")
        val accountInfos = workerBeeService.getNodeAccounts(proxy = proxy)
        logger.info("$em1 getNodeAccounts complete ..." +
                "  \uD83D\uDD06 \uD83D\uDD06 found  ${accountInfos.size} ... " +
                "adding investor and supplier profiles and generating invoices for all accounts ........")

        val page = proxy.vaultQuery(AccountInfo::class.java)
        for (state in page.states) {
            addInvestorProfile(account = state, proxy = proxy)
            addSupplierProfile(account = state, proxy = proxy)
            generateInvoices(proxy = proxy, accountInfo = DTOUtil.getDTO(state.state.data), count = 3)
        }
        val msg = "\uD83C\uDF3A \uD83C\uDF3A Generate accounts with profiles completed! \uD83C\uDF3A"
        logger.info(msg)
        return msg
    }

    private val em1 = "\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 ";
    private var nodes: List<NodeInfoDTO>? = null

    fun generateOffers(proxy: CordaRPCOps, maxRecords: Int = 3000): String {

        logger.info("\uD83D\uDD35 max records to generate: \uD83D\uDCA6 $maxRecords \uD83D\uDCA6");
        val acctList = workerBeeService.getNodeAccounts(proxy)
        val mList = workerBeeService.findInvoicesForNode(proxy)
        logger.info("Accounts on Node:  \uD83D\uDE21 \uD83D\uDE21 ️ ${acctList.size} ♻️")
        logger.info("Invoices on Node:  \uD83D\uDE21 \uD83D\uDE21 ️ ${mList.size} ♻️")

        var cnt = 0
        val shuffledInvoices = mList.shuffled()
        val shuffledAccts = acctList.shuffled()
        shuffledInvoices.forEach() { invoice ->
            if (invoice.supplier.host == proxy.nodeInfo().legalIdentities.first().toString()) {
                shuffledAccts.forEach() {
                    val account = it
                    if (invoice.supplier.name == account.name) {
                        logger.info("\uD83D\uDD35 Ignore: ${it.name} Account is the supplier. " +
                                "\uD83D\uDD35 Cannot offer invoice to self: \uD83C\uDF3A ${account.name}")
                    } else {
                        if (cnt < maxRecords) {
                            var discount = random.nextInt(25) * 1.5
                            if (discount == 0.0) {
                                discount = 4.5
                            }
                            logger.info("\uD83D\uDE21 Processing .... ${invoice.invoiceNumber} " +
                                    "\uD83C\uDF4F ${invoice.amount} for account:  \uD83D\uDC9C ${account.name}")
                            var isAnchor = false
                            if (account.name.contains("Anchor")) {
                                isAnchor = true
                            }
                            registerInvoiceOffer(
                                    proxy = proxy,
                                    supplier = invoice.supplier,
                                    investor = account,
                                    invoice = invoice,
                                    discount = discount, isAnchor = isAnchor)
                            logger.info("\uD83D\uDE21 registered InvoiceOffer for supplier: \uD83C\uDF4F " +
                                    "${invoice.supplier.name} ${invoice.supplier.host} " +
                                    "\uD83C\uDF4F \uD83D\uDCA6 investor: ${account.name} \uD83D\uDCA6 ${account.host} ")
                            cnt++
                        }
                    }
                }
            }
        }
        val msg = "\uD83E\uDDE1 \uD83D\uDC9B  Offers generated: \uD83E\uDD4F  $cnt \uD83E\uDD4F "
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
                "  \uD83D\uDD06 \uD83D\uDD06 found  ${account.state.data.name} ... ")
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
                stellarAccountId = "TBD", rippleAccountId = "TBD"
        )

        workerBeeService.createInvestorProfile(
                proxy = proxy,
                account = account.state.data,
                profile = investorProfile)

        logger.info("\uD83D\uDE0E Create INVESTOR profile  \uD83C\uDF3A ${account.state.data.name} " +
                "- RESPONSE: statusCode: \uD83C\uDF0D \uD83C\uDF0D \n")
    }

    private fun addSupplierProfile(proxy: CordaRPCOps, account: StateAndRef<AccountInfo>) {
        logger.info(" \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 addSupplierProfile ..." +
                "  \uD83D\uDD06 \uD83D\uDD06 found  ${account.state.data.name} ... ")
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

        logger.info("\uD83E\uDD8A Created SUPPLIER profile for \uD83C\uDF3A ${account.state.data.name} " +
                "- RESPONSE: statusCode: \uD83C\uDF0D \uD83C\uDF0D")
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
    private lateinit var accountInfo: AccountInfoDTO
    private val cal: Calendar = GregorianCalendar.getInstance()
    private var invoiceCnt = 0

    fun generateInvoices(proxy: CordaRPCOps, accountInfo: AccountInfoDTO, count: Int): String {
        this.accountInfo = accountInfo
        val page = proxy.vaultQuery(NetworkOperatorState::class.java)
        if (page.states.isEmpty()) {
            throw Exception("Missing NetworkOperator")
        }
        val networkOperator = page.states[0].state.data
        logger.info("\uD83C\uDF4E \uD83C\uDF4E Network Operator: ${gson.toJson(networkOperator)}")
        val accounts = workerBeeService.getNodeAccounts(proxy).shuffled()
        if (accounts.isEmpty()) {
            throw Exception("Failed. \uD83D\uDD06 \uD83D\uDD06 generateInvoices could not find Accounts on the Node")
        }
        logger.info("\n\uD83D\uDC9C \uD83D\uDC9C \uD83D\uDC9C number of invoices to generate for each account: $count " +
                "\uD83D\uDC9C node accounts: ${accounts.size}")
        repeatCount = 0
        invoiceCnt = 0

        //todo - generate monthly invoices starting jan 2019
        cal.set(2020, 8, 1)
        var cnt3 = 0
        for (i in 1..count) {
            logger.info("⏰ ⏰ ⏰ create invoices for month:  ⏰ ${cal.time}  ⏰ \n")
            cnt3 = 0;
            accounts.forEach() {
                if (it.identifier == networkOperator.account.identifier.toString()) {
                    logger.info("\uD83C\uDF4E Ignoring invoice generation for ${networkOperator.account.name}")
                } else {
                    startInvoiceFlow(proxy, it)
                    invoiceCnt++
                    cnt3++
                }
            }
            cal.add(Calendar.MONTH, 1)
            logger.info("\n\n⏰ ⏰ ⏰ created $invoiceCnt invoices this month; \uD83D\uDD35 " +
                    "roll over to the next month:  ⏰ ${cal.time}  ⏰ \n\n")
        }

        demoSummary.numberOfInvoices = invoiceCnt
        return "\uD83D\uDC9A \uD83D\uDC9A \uD83D\uDC9A :: Total Invoices generated on Node: $invoiceCnt \uD83D\uDC9C"
    }

    private fun startInvoiceFlow(proxy: CordaRPCOps, accountInfoDTO: AccountInfoDTO) {
        logger.info("startInvoiceFlow: \uD83D\uDC9C \uD83D\uDC9C \uD83D\uDC9C account: ${gson.toJson(accountInfoDTO)}")
        val invoice = buildInvoice(accountInfoDTO)
        val smallInvoice = buildSmallInvoice(accountInfoDTO)

        if (invoice != null) {
            val result = workerBeeService.startInvoiceRegistrationFlow(proxy, invoice)
            logger.info("\uD83D\uDC9C LARGE startInvoiceRegistrationFlow: " +
                    "generated, result: ${result.totalAmount} ${result.invoiceId}")
        } else {
            logger.info("\uD83D\uDC9C LARGE startInvoiceRegistrationFlow: \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 invoice is NULL");
        }
        if (smallInvoice != null) {
            val result = workerBeeService.startInvoiceRegistrationFlow(proxy, smallInvoice)
            logger.info("\uD83D\uDC9C SMALL startInvoiceRegistrationFlow: " +
                    "generated, result: ${result.totalAmount} ${result.invoiceId}")
        } else {
            logger.info("\uD83D\uDC9C SMALL startInvoiceRegistrationFlow: \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 smallInvoice is NULL");
        }
    }

    private var repeatCount = 0
    private fun buildInvoice(supplier: AccountInfoDTO): InvoiceDTO? {

        if (supplier.name == accountInfo.name) {
            logger.info("Supplier Name is the same as CustomerName: ${supplier.name} customer: ${accountInfo.name}")
            throw Exception("Supplier Name is the same as CustomerName: ${supplier.name} customer: ${accountInfo.name}");
        }
        var num = random.nextInt(1000)
        if (num >= 700) num = 2000

        return InvoiceDTO(
                invoiceNumber = "INV_" + System.currentTimeMillis(),
                supplier = supplier,
                customer = accountInfo,
                amount = num * 1200.0,
                valueAddedTax = 15.0,
                totalAmount = num * 1200.0 * 1.15,
                description = "LARGE : Demo Invoice at ${Date()}",
                dateRegistered = thisDate(cal.time),
                invoiceId = UUID.randomUUID().toString(),
                externalId = UUID.randomUUID().toString()
        )


    }

    private fun buildSmallInvoice(supplier: AccountInfoDTO): InvoiceDTO? {

        if (supplier.name == accountInfo.name) {
            return null
        }
        val invoice: InvoiceDTO?
        var num = random.nextInt(200)
        if (num <= 50) num = 1000

        invoice = InvoiceDTO(
                invoiceNumber = "INV_" + System.currentTimeMillis(),
                supplier = supplier,
                customer = accountInfo,
                amount = num * 500.0,
                valueAddedTax = 15.0,
                totalAmount = num * 500.0 * 1.15,
                description = "SMALL: Demo Invoice at ${Date()}",
                dateRegistered = thisDate(cal.time),
                invoiceId = UUID.randomUUID().toString(),
                externalId = UUID.randomUUID().toString()
        )


        return invoice
    }

    private val nodeInvoiceOffers: MutableList<InvoiceOfferDTO> = ArrayList()

    @Throws(Exception::class)
    private fun registerInvoiceOffer(proxy: CordaRPCOps, invoice: InvoiceDTO, supplier: AccountInfoDTO,
                                     investor: AccountInfoDTO, discount: Double, isAnchor: Boolean = false) {


        val invoiceOffer = InvoiceOfferDTO(
                invoiceId = invoice.invoiceId,
                supplier = supplier,
                investor = investor,
                offerDate = todaysDate(),
                discount = discount,
                accepted = false,
                offerAmount = (100.0 - discount / 100) * invoice.totalAmount,
                originalAmount = invoice.totalAmount,
                externalId = invoice.externalId, invoiceNumber = invoice.invoiceNumber,
                investorDate = todaysDate(), acceptanceDate = todaysDate(),
                offerId = UUID.randomUUID().toString(), isAnchor = isAnchor
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
        logger.info(concat
                + "Start createCustomers .... createCustomers  \uD83D\uDECE  ")

        doOneCustomer(proxy, stellarAnchorUrl, buildCustomerProfile("Pick & Pay"))
        doOneCustomer(proxy, stellarAnchorUrl, buildCustomerProfile("Department of Public Works"))
        doOneCustomer(proxy, stellarAnchorUrl, buildCustomerProfile("Department of Public Works"))
        doOneCustomer(proxy, stellarAnchorUrl, buildCustomerProfile("Shoprite"))
        doOneCustomer(proxy, stellarAnchorUrl, buildCustomerProfile("Ashanti Gold Mining"))
        doOneCustomer(proxy, stellarAnchorUrl, buildCustomerProfile("Department of Transport"))


    }

    private fun buildCustomerProfile(name: String): CustomerProfileStateDTO {
        val suffix = "@bfn.com"
        val prefix = "cust_"

        return CustomerProfileStateDTO(
                AccountInfoDTO("TBD", "TBD",
                        name),
                5000.00,
                120000000.00,
                cellphone = "+27 99 999 9000",
                email = "$prefix${System.currentTimeMillis()}$suffix",
                dateRegistered = Date(),
                stellarAccountId = "TBD",
                rippleAccountId = "TBD"
        )
    }

    private fun doOneCustomer(proxy: CordaRPCOps, stellarAnchorUrl: String, profile: CustomerProfileStateDTO) {
        logger.info("\uD83D\uDD35 Creating Customer ${profile.account.name}")

        val password = "pass123"
        try {
            val resultProfile = workerBeeService.createCustomer(proxy, stellarAnchorUrl, profile, password)
            logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 Processed customerProfile returned: " + gson.toJson(resultProfile))


        } catch (e: Exception) {
            logger.info("\uD83D\uDD25 \uD83D\uDD25 \uD83D\uDD25 Customer creation failed , trying next one ...")
            throw Exception("Customer creation failed")
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
