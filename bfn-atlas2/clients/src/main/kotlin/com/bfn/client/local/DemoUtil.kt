package com.bfn.client.local

import com.google.gson.GsonBuilder
import com.bfn.client.dto.*
import com.bfn.client.web.FirebaseUtil
import com.bfn.client.web.FirebaseUtil.deleteCollections
import com.bfn.client.web.FirebaseUtil.deleteUsers
import com.bfn.client.web.WorkerBee
import com.bfn.client.web.WorkerBee.getNetworkAccounts
import com.bfn.client.web.WorkerBee.getNodeAccounts
import com.bfn.client.web.WorkerBee.startAccountRegistrationFlow
import com.bfn.client.web.WorkerBee.startInvoiceOfferFlow
import com.bfn.client.web.WorkerBee.startInvoiceRegistrationFlow
import net.corda.core.messaging.CordaRPCOps
import net.corda.core.node.NodeInfo
import org.slf4j.LoggerFactory
import java.io.BufferedReader
import java.io.InputStreamReader
import java.net.HttpURLConnection
import java.net.URL
import java.util.*

object DemoUtil {
    private val logger = LoggerFactory.getLogger(DemoUtil::class.java)
    private val GSON = GsonBuilder().setPrettyPrinting().create()
    private var proxy: CordaRPCOps? = null
    private var suppliers: MutableList<AccountInfoDTO>? = null
    private var customers: MutableList<AccountInfoDTO>? = null
    private var investors: MutableList<AccountInfoDTO>? = null
    private val demoSummary = DemoSummary()
    private var myNode: NodeInfo? = null
    @Throws(Exception::class)
    fun generateLocalNodeAccounts(mProxy: CordaRPCOps?,
                                  deleteFirestore: Boolean, numberOfAccounts: Int = 1): DemoSummary {
        proxy = mProxy
        logger.info("\n\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 " +
                "DemoUtil started, proxy: ${proxy.toString()}...  \uD83D\uDD06 \uD83D\uDD06 " +
                "will generate data 🧩🧩 deleteFirestore: $deleteFirestore")

        myNode = proxy!!.nodeInfo()
        logger.info(" \uD83D\uDD0B  \uD83D\uDD0B current node: ${myNode!!.addresses[0]}  \uD83D\uDD0B ")
        if (myNode!!.legalIdentities[0].name.organisation.contains("Notary")) {
            throw Exception("Cannot add demo data to Notary")
        }
        if (myNode!!.legalIdentities[0].name.organisation.contains("Regulator")) {
            throw Exception("Cannot add demo data to Regulator")
        }
        suppliers = ArrayList()
        customers = ArrayList()
        investors = ArrayList()
        //delete Firestore data
        logger.info("\n\n👽 👽 👽 👽 deleteFirestore: $deleteFirestore\n\n")
        if (deleteFirestore) {
            try {
                deleteUsers()
                deleteCollections()
                logger.info(" 👽 👽 👽 👽 deleteFirestore: $deleteFirestore 🧩🧩 Firebase cleanUp complete")
            } catch (e: Exception) {
                e.printStackTrace()
                logger.warn("Firebase shit bombed")
                throw e
            }
        } else {
            logger.warn("🧩🧩🧩🧩🧩🧩🧩🧩🧩 deleteFirestore is 🧩 FALSE 🧩🧩🧩🧩🧩 ")
        }
        //
        logger.info(" 👽 👽 👽 👽 start data generation:  numberOfAccounts $numberOfAccounts 👽 👽 👽 👽  ")
        generateAccounts(numberOfAccounts)
        //
        val list = getNodeAccounts(proxy!!)
        var cnt = 0
        logger.info(" \uD83C\uDF4E  \uD83C\uDF4E Total Number of Accounts on Node after sharing:" +
                " \uD83C\uDF4E  \uD83C\uDF4E " + list.size)
        val userRecords = FirebaseUtil.getUsers()
        for (userRecord in userRecords) {
            cnt++
            logger.info("🔵 🔵 userRecord 😡 #" + cnt + " - " + userRecord.displayName + " 😡 " + userRecord.email)
        }
        demoSummary.numberOfAccounts = list.size
        return demoSummary
    }

    private var nodes: List<NodeInfoDTO>? = null

    fun generateOffers(proxy: CordaRPCOps, maxRecords: Int = 3000): String {
        DemoUtil.proxy = proxy

        logger.info("\uD83D\uDD35 max records to generate: \uD83D\uDCA6 $maxRecords \uD83D\uDCA6");
        val acctList = getNodeAccounts(proxy)
        val mList = WorkerBee.findInvoicesForNode(proxy)
        logger.info("Accounts on Node:  \uD83D\uDE21 \uD83D\uDE21 ️ ${acctList.size} ♻️")
        logger.info("Invoices on Node:  \uD83D\uDE21 \uD83D\uDE21 ️ ${mList.size} ♻️")

        var cnt = 0
        val shuffledInvoices = mList.shuffled()
        val shuffledAccts = acctList.shuffled()
        shuffledInvoices.forEach() { invoice ->
            if (invoice.supplier!!.host.toString() == proxy.nodeInfo().legalIdentities.first().toString()) {
                shuffledAccts.forEach() {
                    val account = it
                    if (invoice.supplier!!.name == account.name) {
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
                            registerInvoiceOffer(
                                    supplier = invoice.supplier!!,
                                    investor = account,
                                    invoice = invoice,
                                    discount = discount)
                            logger.info("\uD83D\uDE21 registered InvoiceOffer for supplier: \uD83C\uDF4F " +
                                    "${invoice.supplier!!.name} ${invoice.supplier!!.host} " +
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
                summary = GSON.fromJson(response.toString(), DashboardData::class.java)
                logger.info("\uD83E\uDD1F \uD83E\uDD1F \uD83E\uDD1F " +
                        "Response from Regulator: \uD83E\uDD1F SUMMARY:: " + node.addresses!![0] + " \uD83E\uDD1F "
                        + GSON.toJson(summary) + "\n\n")
                return summary
            }
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
            summary = GSON.fromJson(response.toString(), DemoSummary::class.java)
            logger.info("\uD83E\uDD1F \uD83E\uDD1F \uD83E\uDD1F " +
                    "Response from Demo: \uD83E\uDD1F SUMMARY: NODE: " + node.addresses!![0] + " \uD83E\uDD1F "
                    + GSON.toJson(summary) + "\n\n")
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
    private fun generateAccounts(count: Int = 9) {
        logger.info("\n\n\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 generateAccounts started ...  " +
                "\uD83D\uDD06 \uD83D\uDD06 count: $count")
        for (x in 0..count) {
            val phone = phone
            val prefix = myNode!!.legalIdentities[0].name.organisation
            try {
                startAccountRegistrationFlow(proxy!!,
                        randomName,
                        "$prefix$phone@gmail.com",
                        "pass123",
                        phone)
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
    @Throws(Exception::class)
    fun generateInvoices(proxy: CordaRPCOps, count: Int = 1): String {
        DemoUtil.proxy = proxy
        val accounts = getNodeAccounts(DemoUtil.proxy!!).shuffled()
        logger.info("\uD83D\uDC9C \uD83D\uDC9C \uD83D\uDC9C accounts to have invoices generated: $count")
        if (count == 1) {
            repeatCount = 0
            val invoice = buildInvoice(accounts, accounts, accounts.first())
            if (invoice != null) {
                val result = startInvoiceRegistrationFlow(DemoUtil.proxy!!, invoice)
                val msg = "\uD83D\uDC9C \uD83D\uDC9C \uD83D\uDC9C invoice generated, result: ${result.invoiceId}"
                logger.info(msg)
                return msg
            }
        }
        var invoiceCnt = 0
        for (i in 1..count) {
            repeatCount = 0
            val invoice = buildInvoice(accounts, accounts, accounts[random.nextInt(accounts.size - 1)])
            if (invoice != null) {
                val result = startInvoiceRegistrationFlow(DemoUtil.proxy!!, invoice)
                invoiceCnt++
                logger.info("\uD83D\uDC9C \uD83D\uDC9C \uD83D\uDC9C invoice #$invoiceCnt generated, result: ${result.invoiceId}")
            }
        }

        val invoiceStates = WorkerBee.findInvoicesForNode(DemoUtil.proxy!!)
        logger.info("from WorkerBee.findInvoicesForNode: \uD83C\uDF4A \uD83C\uDF4A " + invoiceStates.size + " InvoiceStates on node ...  \uD83C\uDF4A ")
        demoSummary.numberOfInvoices = invoiceStates.size
        return "\uD83D\uDC9A Invoices on Node: ${invoiceStates.size} \uD83D\uDC9C"
    }

    @Throws(Exception::class)
    fun generateCrossNodeInvoices(proxy: CordaRPCOps, count: Int = 1): String {
        DemoUtil.proxy = proxy
        val accounts = getNetworkAccounts(proxy).shuffled()
        val suppliers = getNodeAccounts(proxy)
        var cnt = 0;
        logger.info("\uD83D\uDC9C \uD83D\uDC9C \uD83D\uDC9C accounts to have invoices generated: ${accounts.size}")
        if (count == 1) {
            repeatCount = 0
            val invoice = buildInvoice(accounts, suppliers, accounts.first())
            if (invoice != null) {
                val result = startInvoiceRegistrationFlow(DemoUtil.proxy!!, invoice)
                return "\uD83D\uDC9A CrossNode Invoice Generated: ${GSON.toJson(result)} \uD83D\uDC9C"
            } else {
                generateCrossNodeInvoices(proxy, count)
            }
        }
        accounts.forEach() {
            repeatCount = 0
            val invoice = buildInvoice(accounts, suppliers, it)
            if (invoice != null) {
                val result = startInvoiceRegistrationFlow(DemoUtil.proxy!!, invoice)
                cnt++
                logger.info("\uD83D\uDC9C \uD83D\uDC9C \uD83D\uDC9C invoice generated:  ${GSON.toJson(result)} ")
            }
            if (cnt > count) {
                return "\uD83D\uDC9A CrossNode Invoices Generated: ${cnt - 1}  \uD83D\uDC9C"
            }

        }

        val invoiceStates = WorkerBee.findInvoicesForNode(DemoUtil.proxy!!)
        logger.info(" \uD83C\uDF4A  \uD83C\uDF4A " + invoiceStates.size + " InvoiceStates on node ...  \uD83C\uDF4A ")
        demoSummary.numberOfInvoices = invoiceStates.size
        return "\uD83D\uDC9A Invoices Generated: ${invoiceStates.size} \uD83D\uDC9C"
    }

    var repeatCount = 0
    private fun buildInvoice(accounts: List<AccountInfoDTO>, suppliers: List<AccountInfoDTO>, it: AccountInfoDTO): InvoiceDTO? {
        val index = random.nextInt(suppliers.size - 1)
        val supplier = suppliers[index]
        val index2 = random.nextInt(accounts.size - 1)
        val customer = accounts[index2]
        var invoice: InvoiceDTO? = null
        if (supplier.name != it.name
                && customer.name != it.name
                && supplier.name != customer.name) {
            invoice = InvoiceDTO()
            invoice.invoiceNumber = "INV_" + System.currentTimeMillis()
            invoice.supplier = supplier
            invoice.customer = customer
            var num = random.nextInt(500)
            if (num == 0) num = 92
            invoice.amount = num * 1000.0
            invoice.valueAddedTax = 15.0
            invoice.totalAmount = num * 1.15
            invoice.description = "Demo Invoice at " + Date().toString()
            invoice.dateRegistered = Date()
        }
        if (invoice == null) {
            logger.info("Invoice is null, repeating build .... repeatCount: $repeatCount")
            if (repeatCount < 6) {
                repeatCount++
                buildInvoice(accounts, suppliers, it)
            } else {
                return null
            }
        }

        return invoice


    }

    private val nodeInvoiceOffers: MutableList<InvoiceOfferDTO> = ArrayList()
    @Throws(Exception::class)
    private fun registerInvoiceOffer(invoice: InvoiceDTO, supplier: AccountInfoDTO,
                                     investor: AccountInfoDTO, discount: Double) {

        val invoiceOffer = InvoiceOfferDTO()
        invoiceOffer.invoiceId = invoice.invoiceId
        invoiceOffer.supplier = supplier
        invoiceOffer.owner = supplier
        invoiceOffer.investor = investor
        invoiceOffer.offerDate = Date()
        invoiceOffer.discount = discount
        if (invoiceOffer.discount == 0.0) {
            invoiceOffer.discount = 3.5
        }
        val percentageOfAmount = 100.0 - invoiceOffer.discount!!
        invoiceOffer.offerAmount = (percentageOfAmount / 100) * invoice.totalAmount!!
        invoiceOffer.originalAmount = invoice.totalAmount
        try {
            val offer = startInvoiceOfferFlow(proxy!!, invoiceOffer)
            nodeInvoiceOffers.add(offer)
        } catch (e: Exception) {
            logger.warn("Unable to add offer: ${e.message}")
        }
    }

    var names: MutableList<String> = ArrayList()
    var map = HashMap<String, String?>()

    @JvmStatic
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
