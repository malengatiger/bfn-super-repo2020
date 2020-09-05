package com.bfn.client.local

import com.google.gson.GsonBuilder
import com.bfn.client.data.*
import com.bfn.client.services.DTOUtil
import com.bfn.client.services.FirebaseService
import com.bfn.client.services.WorkerBeeService

import com.bfn.contractstates.states.TradeMatrixItem
import com.bfn.flows.thisDate
import com.bfn.flows.todaysDate
import com.google.gson.Gson
import com.r3.corda.lib.accounts.contracts.states.AccountInfo
import khttp.get
import khttp.post
import net.corda.core.contracts.StateAndRef
import net.corda.core.internal.Emoji
import net.corda.core.messaging.CordaRPCOps
import net.corda.core.node.NodeInfo
import org.json.JSONObject
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
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

    @PostConstruct
    fun init() {
        logger.info("\uD83D\uDD35 \uD83D\uDD35 DemoUtil service has been initialized ...")
    }

    @Autowired
    private lateinit var firebaseService: FirebaseService

    @Autowired
    private lateinit var workerBeeServiceService: WorkerBeeService


    fun createNetworkOperator(url: String, deleteFirebase: Boolean) {

        logger.info("\uD83D\uDE21 createAnchor for Node $url deleteFirebase: $deleteFirebase .......... \uD83D\uDE21 \uD83D\uDE21 ")

        if (deleteFirebase) {
            logger.info("\uD83D\uDE21 deleting Firebase auth users and collections \uD83D\uDE21 \uD83D\uDE21 ")
            val response0 = get(
                    timeout = 990000000.0,
                    url = "$url/bfn/admin/deleteFirebase")
            logger.info("\uD83C\uDF4E deleteFirebase; RESPONSE: statusCode: " +
                    "${response0.statusCode} - ${response0.text}")
        }


        val mixes: MutableList<TradeMatrixItem> = mutableListOf()
        val operator = NetworkOperatorDTO(
                minimumInvoiceAmount = 100000.00,
                maximumInvoiceAmount = 20000000.00,
                maximumInvestment = 1000000000.00,
                defaultOfferDiscount = 8.8,
                name = "BFN Network Anchor",
                email = "anchor1@bfn.com",
                cellphone = "+27710441887",
                tradeFrequencyInMinutes = 240,
                tradeMatrixItems = mixes,
                date = todaysDate(),
                password = "bfnanchor33",
                uid = UUID.randomUUID().toString(),
                issuedBy = "TBD", accountId = "TBD"

        )
        addTradeMatrixItems(operator)
        val mGson = Gson()
        val json = mGson.toJson(operator)
        val jsonObject = JSONObject(json)
        logger.info("\uD83C\uDF4E Anchor about to be created: ${gson.toJson(operator)} \uD83C\uDF4E")
        val response = post(
                json = jsonObject,
                timeout = 990000000.0,
                url = "$url/bfn/admin/createAnchor")

        logger.info("\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E create Anchor; RESPONSE: statusCode: " +
                "🌍 ${response.statusCode} 🌍  - ${response.text}")

    }

    private fun addTradeMatrixItems(networkOperatorInvestor: NetworkOperatorDTO) {
        val m2 = TradeMatrixItem(
                startInvoiceAmount = 2000001.00,
                endInvoiceAmount = 300000.00,
                offerDiscount = 8.3,
                date = todaysDate()
        )
        val m3 = TradeMatrixItem(
                startInvoiceAmount = 300001.00,
                endInvoiceAmount = 400000.00,
                offerDiscount = 7.9,
                date = todaysDate()
        )
        val m4 = TradeMatrixItem(
                startInvoiceAmount = 400001.00,
                endInvoiceAmount = 500000.00,
                offerDiscount = 7.4,
                date = todaysDate()
        )
        val m5 = TradeMatrixItem(
                startInvoiceAmount = 500001.00,
                endInvoiceAmount = 1000000.00,
                offerDiscount = 5.5,
                date = todaysDate())
        val m6 = TradeMatrixItem(
                startInvoiceAmount = 1000001.00,
                endInvoiceAmount = 10000000.00,
                offerDiscount = 4.2,
                date = todaysDate())
        val m7 = TradeMatrixItem(
                startInvoiceAmount = 10000001.00,
                endInvoiceAmount = 100000000.00,
                offerDiscount = 3.1,
                date = todaysDate())

        networkOperatorInvestor.tradeMatrixItems = mutableListOf(m2, m3, m4, m5, m6, m7)
    }

//    var customer: AccountInfoDTO? = null
//    val random = Random(Date().time)

    private fun createCustomer(url: String) {
        val user = UserDTO(name = "CustomerNode1",
                password = "customer#001$",
                cellphone = "+27710441887",
                email = "customer001@bfn.com")

        val mGson = Gson()
        val jsonObject = JSONObject(mGson.toJson(user))
        val response = post(
                json = jsonObject,
                timeout = 990000000.0,
                url = "$url/bfn/admin/startAccountRegistrationFlow")

        logger.info("\uD83C\uDF4E  create Customer Account; RESPONSE: " +
                " 🌍 $response 🌍   " )
        //todo - write to Firebase auth .....
        firebaseService.createBFNAccount(accountInfo = AccountInfoDTO(identifier = "", name = user.name, host = url, status = ""));
    }
    
    
    
    
    
    @Throws(Exception::class)
    fun generateLocalNodeAccounts(mProxy: CordaRPCOps?, numberOfAccounts: Int = 1): DemoSummary {
        val start = Date().time;
        logger.info("\n\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 " +
                "DemoUtil started, proxy: ${mProxy.toString()}...  \uD83D\uDD06 \uD83D\uDD06 " +
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

        //
        logger.info(" 👽 👽 👽 👽 start data generation:  numberOfAccounts $numberOfAccounts 👽 👽 👽 👽  ")
        generateAccounts(mProxy,numberOfAccounts)
        //
        val list = workerBeeServiceService.getNodeAccounts(mProxy)
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

    private var nodes: List<NodeInfoDTO>? = null

    fun generateOffers(proxy: CordaRPCOps, maxRecords: Int = 3000): String {

        logger.info("\uD83D\uDD35 max records to generate: \uD83D\uDCA6 $maxRecords \uD83D\uDCA6");
        val acctList = workerBeeServiceService.getNodeAccounts(proxy)
        val mList = workerBeeServiceService.findInvoicesForNode(proxy)
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

    private fun makeProfilesForNode(proxy: CordaRPCOps, url: String) {
        val page = proxy.vaultQuery(AccountInfo::class.java)
        var cnt = 0
        page.states.forEach() {
            if (it.state.data.name == "NetworkAnchorNode" || it.state.data.name == "CustomerNode1") {
                logger.info("Ignore anchor and CustomerNode1. \uD83C\uDF3A No need to create profiles")
            } else {
                if (it.state.data.host.toString() == proxy.nodeInfo().legalIdentities.first().toString()) {
                    cnt++
                    addSupplierProfile(it, url)
                    addInvestorProfile(it, url)
                }
            }
        }
        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35" +
                " \uD83D\uDD35 \uD83D\uDD35 Profiles generated: $cnt")
    }

    private fun addInvestorProfile(it: StateAndRef<AccountInfo>, url: String) {
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
                issuedBy = "thisNode",
                account = DTOUtil.getDTO(it.state.data),
                date = todaysDate(),
                defaultDiscount = disc,
                minimumInvoiceAmount = min,
                totalInvestment = 2999000.00,
                maximumInvoiceAmount = max,
                bank = "BlackOx Investment Bank",
                bankAccount = (random.nextInt(12345) * 647).toString()
        )

        val mGson = Gson()
        val json = mGson.toJson(investorProfile)
        val jsonObject = JSONObject(json)
        val resp = post(
                url = "$url/bfn/admin/createInvestorProfile",
                json = jsonObject,
                timeout = 8000000000.0
        )
        logger.info("\uD83D\uDE0E Create INVESTOR profile  \uD83C\uDF3A ${it.state.data.name} " +
                "- RESPONSE: statusCode: \uD83C\uDF0D ${resp.statusCode} \uD83C\uDF0D \n")
    }

    private fun addSupplierProfile(account: StateAndRef<AccountInfo>, url: String) {
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
                issuedBy = "moi"
        )
        val mGson = Gson()
        val json = mGson.toJson(prof)
        val jsonObject = JSONObject(json)
        val resp = post(
                url = "$url/bfn/admin/createSupplierProfile",
                json = jsonObject,
                timeout = 8000000000.0
        )
        logger.info("\uD83E\uDD8A Create SUPPLIER profile for \uD83C\uDF3A ${account.state.data.name} " +
                "- RESPONSE: statusCode: \uD83C\uDF0D ${resp.statusCode} \uD83C\uDF0D")
    }


    @Throws(Exception::class)
    private fun executeForeignNodeDemoData(node: NodeInfoDTO) {
        logger.info("\n\n\uD83E\uDD1F \uD83E\uDD1F \uD83E\uDD1F " +
                "Node Demo Data to Generate: " + node.webServerAddress)
        val nodeUrl = node.webServerAddress + "admin/demo?deleteFirestore=false"
        val con = callNode(nodeUrl)
        var summary: DemoSummary?
        BufferedReader(InputStreamReader(con.inputStream, "utf-8")).use { br ->
            val response = StringBuilder()
            var responseLine: String = ""
            while (br.readLine().also { responseLine = it } != null) {
                response.append(responseLine.trim())
            }
            summary = gson.fromJson(response.toString(), DemoSummary::class.java)
            logger.info("\uD83E\uDD1F \uD83E\uDD1F \uD83E\uDD1F " +
                    "Response from Demo: \uD83E\uDD1F SUMMARY: NODE: " + node.addresses!![0] + " \uD83E\uDD1F "
                    + gson.toJson(summary) + "\n\n")
        }
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

    @Throws(Exception::class)
    private fun generateAccounts(proxy: CordaRPCOps, count: Int = 9) {
        logger.info("\n\n\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 generateAccounts started ...  " +
                "\uD83D\uDD06 \uD83D\uDD06 count: $count")
        for (x in 0..count) {
            val phone = phone
            val prefix = myNode!!.legalIdentities[0].name.organisation
            try {
                workerBeeServiceService.startAccountRegistrationFlow(proxy,
                        randomName,
                        "$prefix$phone@gmail.com",
                        "pass123")
            } catch (e1: Exception) {
                logger.warn("Unable to add account - probable duplicate name")
            }
        }
        logger.info(" \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 registerSupplierAccounts complete ..." +
                "  \uD83D\uDD06 \uD83D\uDD06 added " + suppliers!!.size + " accounts")
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
    private lateinit var customer: AccountInfoDTO
    private val cal: Calendar = GregorianCalendar.getInstance()
    private var invoiceCnt = 0
    fun generateInvoices(proxy: CordaRPCOps, customer: AccountInfoDTO, count: Int = 40): String {
        this.customer = customer
        val accounts = workerBeeServiceService.getNodeAccounts(proxy).shuffled()
        logger.info("\uD83D\uDC9C \uD83D\uDC9C \uD83D\uDC9C accounts to have invoices generated: $count; generating 12 months worth of invoices")
        repeatCount = 0
        invoiceCnt = 0

        //todo - generate monthly invoices starting jan 2019
        cal.set(2019,0,25)
        for (i in 1..2) {
            logger.info("⏰ ⏰ ⏰ create invoices for month:  ⏰ ${cal.time}  ⏰ \n")
            var cnt2 = 0
            accounts.forEach() {
                if (it.name == "NetworkAnchorNode" || it.name == "CustomerNode1") {
                    logger.info("${it.name} \uD83E\uDD80 this baby don't do invoices. IGNORED! \uD83D\uDC2C ")
                } else {
                    val randomInvoice = random.nextBoolean()
                    if (randomInvoice) {
                        startInvoiceFlow(proxy,it)
                        cnt2++
                    }
                }

            }
            cal.add(Calendar.MONTH,1)
            logger.info("\n\n⏰ ⏰ ⏰ created $cnt2 invoices this month; \uD83D\uDD35 " +
                    "roll over to the next month:  ⏰ ${cal.time}  ⏰ \n\n")
        }

        demoSummary.numberOfInvoices = invoiceCnt
        return "\uD83D\uDC9A Invoices on Node: $invoiceCnt \uD83D\uDC9C"
    }

    private fun startInvoiceFlow(proxy: CordaRPCOps, it: AccountInfoDTO) {

        val invoice = buildInvoice(it)
        val smallInvoice = buildSmallInvoice(it)
        val choice = random.nextBoolean()
        if (choice) {
            if (invoice != null) {
                val result = workerBeeServiceService.startInvoiceRegistrationFlow(proxy, invoice)
                invoiceCnt++
                logger.info("\uD83D\uDC9C LARGE invoice #$invoiceCnt" +
                        "generated, result: ${result.totalAmount} ${result.invoiceId}")
            }
        } else {
            if (smallInvoice != null) {
                val result = workerBeeServiceService.startInvoiceRegistrationFlow(proxy, smallInvoice)
                invoiceCnt++
                logger.info("\uD83D\uDC9C SMALL invoice #$invoiceCnt " +
                        "generated, result: ${result.totalAmount} ${result.invoiceId}")
            }
        }
    }


    private var repeatCount = 0
    private fun buildInvoice(supplier: AccountInfoDTO): InvoiceDTO? {

        if (supplier.name == customer.name) {
            return null
        }
        var invoice: InvoiceDTO? = null
        var num = random.nextInt(1000)
        if (num == 0) num = 33
        if (supplier.name != customer.name) {
            invoice = InvoiceDTO(
                    invoiceNumber = "INV_" + System.currentTimeMillis(),
                    supplier = supplier,
                    customer = customer,
                    amount = num * 1200.0,
                    valueAddedTax = 15.0,
                    totalAmount = num * 1.15,
                    description = "LARGE : Demo Invoice at ${Date()}",
                    dateRegistered = thisDate(cal.time),
                    invoiceId = UUID.randomUUID().toString(),
                    externalId = UUID.randomUUID().toString()
            )
        } else {
            logger.warn("... ... \uD83E\uDD80 \uD83E\uDD80 Supplier and Customer are the same. Ignoring ...\uD83D\uDC2C ")
        }

        return invoice


    }
    private fun buildSmallInvoice(supplier: AccountInfoDTO): InvoiceDTO? {

        if (supplier.name == customer.name) {
            return null
        }
        val invoice: InvoiceDTO?
        var num = random.nextInt(200)
        if (num == 0) num = 10

            invoice = InvoiceDTO(
                    invoiceNumber = "INV_" + System.currentTimeMillis(),
                    supplier = supplier,
                    customer = customer,
                    amount = num * 500.0,
                    valueAddedTax = 15.0,
                    totalAmount = num * 1.15,
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
            val offer = workerBeeServiceService.startInvoiceOfferFlow(proxy, invoiceOffer)
            nodeInvoiceOffers.add(offer)
        } catch (e: Exception) {
            logger.warn("Unable to add offer: ${e.message}")
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
