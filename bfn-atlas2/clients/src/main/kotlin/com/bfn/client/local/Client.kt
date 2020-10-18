package com.bfn.client.local


import com.bfn.client.Emo
import com.bfn.client.data.*
import com.bfn.client.web.DTOUtil.getDTO
import com.bfn.contractstates.states.*
import com.bfn.flows.PAYMENT_FUNDING
import com.bfn.flows.StellarPaymentDTO
import com.bfn.flows.todaysDate
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.r3.corda.lib.accounts.contracts.states.AccountInfo
import com.r3.corda.lib.tokens.contracts.states.FungibleToken
import net.corda.client.rpc.CordaRPCClient
import net.corda.core.contracts.ContractState
import net.corda.core.messaging.CordaRPCOps
import net.corda.core.node.services.Vault
import net.corda.core.node.services.vault.PageSpecification
import net.corda.core.node.services.vault.QueryCriteria
import net.corda.core.utilities.NetworkHostAndPort
import net.corda.core.utilities.loggerFor
import org.joda.time.DateTime
import org.springframework.http.MediaType
import java.io.StringReader
import java.util.*
import kotlin.collections.set
import khttp.get as httpGet
import khttp.post as httpPost


/**
 * Connects to a Corda node via RPC and performs RPC operations on the node.
 *
 * The RPC connection is configured using command line arguments.
 */
fun main(args: Array<String>) = Client().main(args)


public class Client {
    companion object {
        val logger = loggerFor<Client>()
        private val GSON = GsonBuilder().setPrettyPrinting().create()

    }


    lateinit var proxyNetworkAnchorNode: CordaRPCOps
    lateinit var proxyCustomerNode1: CordaRPCOps
    lateinit var proxyNotary: CordaRPCOps
    lateinit var proxyRegulator: CordaRPCOps
    private val mGson = Gson()

    fun main(args: Array<String>) {
        startTheWork("http://localhost:10050",
                "http://localhost:10053");
    }

    private val fundingSeed = ""
    private fun startTheWork(networkOperatorUrl: String, customerUrl: String) {
        logger.info("\n\n\n  \uD83D\uDD35 \uD83D\uDD35  \uD83D\uDD35 \uD83D\uDD35 " +
                "Starting the Demo Data Generation for the BFN Network .....  \uD83D\uDD35 \uD83D\uDD35")
        val headers = mapOf("Content-Type" to MediaType.TEXT_PLAIN_VALUE)

        logger.info("\n\n\n\uD83D\uDE21\uD83D\uDE21\uD83D\uDE21  " +
                "Have you refreshed the Stellar funding seed? Do this on Stellar Laboratory before you start this." +
                " \uD83D\uDE21\uD83D\uDE21\uD83D\uDE21 \n\n\n")
        logger.info("  🍎   🍎   🍎  START DANCING! ...............  🍎  🍎  🍎 ")

        val start = DateTime()

//        generateStellarAnchor(anchorName = "BFN Network Operator Ltd", fundingSeed = fundingSeed);

//        generateAnchorNodeData(networkOperatorUrl, 3, headers)
//
//        generateCustomerNodeData(customerUrl, headers = headers, numberOfMonths = 2)
//
//        fundPlayers(networkOperatorUrl)
//
//        generateInvoiceOffers(networkOperatorUrl, headers) //investors make offers
////
//        generateOfferAcceptances(networkOperatorUrl) //suppliers accept, or do not accept offers
////
//        generateSupplierPayments(networkOperatorUrl) //investors pay for their accepted offers

        generateInvestorPayments(networkOperatorUrl) //customers pay investors for each supplierPayment

        logger.info("\n\n${Emo.ANGRIES}${Emo.ANGRIES}${Emo.ANGRIES} " +
                "Check results of demo data generation ...........\n\n")

        getUnconsumedPurchaseOrders(customerUrl, headers)

        getUnconsumedInvoices(networkOperatorUrl, headers)

        getUnconsumedInvoiceOffers(customerUrl, headers)
//
        checkAcceptedOffers(networkOperatorUrl)

        checkSupplierPayments(networkOperatorUrl)

        checkInvestorPayments(networkOperatorUrl)

        val end = DateTime()
        val elapsedMinutes = (end.toDate().time - start.toDate().time) / 1000 / 60

        logger.info("\n\n\n\uD83D\uDD35 \uD83D\uDD35  \uD83D\uDD35 \uD83D\uDD35" +
                " Client.kt: Demo Data Generation is COMPLETE !!! ${Emo.BLUE_DOT} " +
                "$elapsedMinutes minutes elapsed \uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E ");

        logger.info("  🍎   🍎   🍎  DONE DANCING!  🍎  🍎  🍎 \n\n")
    }

    private fun fundPlayers(networkOperatorUrl: String) {
        val anchor = getAnchor(networkOperatorUrl) ?: throw Exception("Stellar Anchor not found")

        fundCustomersWithZAR(networkOperatorUrl, anchor)

        fundInvestorsWithZAR(networkOperatorUrl, anchor)
    }

    private fun fundCustomersWithZAR(networkOperatorUrl: String, anchor: Anchor) {
        logger.info("\n\n\n${Emo.RAIN_DROPS} fundCustomersWithZAR started .... at " +
                "$networkOperatorUrl ${Emo.RAIN_DROPS}")
        val headers = mapOf("Content-Type" to MediaType.APPLICATION_JSON_VALUE)
        val suffix = "/bfn/admin/getCustomerProfiles"
        val url = "$networkOperatorUrl$suffix"
        logger.info("${Emo.FROG} ${Emo.FROG}Searching for customers using $url")
        val resp1 = httpGet(url = url,
                timeout = timeOut, headers = headers)
        logger.info("${Emo.RAIN_DROPS} RESPONSE: \uD83C\uDF4E statusCode: ${resp1.statusCode}  \uD83C\uDF4E ${resp1.text}")
        val stringReader = StringReader(resp1.text)
        val mCustomerProfiles: MutableList<CustomerProfileStateDTO> = gson.fromJson(
                stringReader, Array<CustomerProfileStateDTO>::class.java).toMutableList()

        logger.info(" \uD83D\uDD35 fundCustomersWithZAR: " +
                "Result list from JSON string has ${mCustomerProfiles.size} CustomerProfileStates")

        //fund customers and network operator
        mCustomerProfiles.forEach {
            fundCustomer(networkOperatorUrl, anchor, it)
        }

        logger.info("\n\n\n${Emo.RAIN_DROPS} fundCustomersWithZAR completed " +
                " ${Emo.RAIN_DROPS}\n\n\n")
    }

    private fun fundInvestorsWithZAR(networkOperatorUrl: String, anchor: Anchor) {
        logger.info("\n\n\n${Emo.RAIN_DROPS} fundInvestorsWithZAR started .... at " +
                "$networkOperatorUrl ${Emo.RAIN_DROPS}")
        val headers = mapOf("Content-Type" to MediaType.APPLICATION_JSON_VALUE)
        val suffix = "/bfn/admin/getInvestorProfiles"
        val url = "$networkOperatorUrl$suffix"
        logger.info("${Emo.FROG} ${Emo.FROG}Searching for investors using $url")
        val resp1 = httpGet(url = url,
                timeout = timeOut, headers = headers)
        logger.info("${Emo.RAIN_DROPS} RESPONSE: \uD83C\uDF4E statusCode: ${resp1.statusCode}  \uD83C\uDF4E ${resp1.text}")
        val stringReader = StringReader(resp1.text)
        val mInvestorProfiles: MutableList<InvestorProfileStateDTO> = gson.fromJson(
                stringReader, Array<InvestorProfileStateDTO>::class.java).toMutableList()

        logger.info(" \uD83D\uDD35 fundInvestorsWithZAR: " +
                "Result list from JSON string has ${mInvestorProfiles.size} InvestorProfileStates")

        mInvestorProfiles.forEach {
            fundInvestor(networkOperatorUrl, anchor, it)
        }
        logger.info("\n\n\n${Emo.RAIN_DROPS} fundInvestorsWithZAR completed " +
                " ${Emo.RAIN_DROPS}\n\n\n")

    }

    private fun getAnchor(networkOperatorUrl: String): Anchor? {
        logger.info("\n\n\n${Emo.RAIN_DROPS} fundCustomersWithZAR started .... at " +
                "$networkOperatorUrl ${Emo.RAIN_DROPS}")
        val headers = mapOf("Content-Type" to MediaType.APPLICATION_JSON_VALUE)
        val suffix = "/bfn/admin/getAnchor"
        val url = "$networkOperatorUrl$suffix"
        logger.info("${Emo.FROG} ${Emo.FROG}Searching for stellar anchor using $url")
        val resp1 = httpGet(url = url,
                timeout = timeOut, headers = headers)
        logger.info("${Emo.RAIN_DROPS} RESPONSE: \uD83C\uDF4E statusCode: ${resp1.statusCode}  \uD83C\uDF4E ${resp1.text}")
        val anchor = gson.fromJson(resp1.text, Anchor::class.java)

        logger.info("${Emo.ANGRIES} getAnchor: " + gson.toJson(anchor) + Emo.RED_APPLE)

        return anchor

    }

    private fun fundCustomer(networkOperatorUrl: String, anchor: Anchor,
                             customerProfile: CustomerProfileStateDTO) {

        val request = StellarPaymentDTO(
                sourceAccount = anchor.distributionAccount!!.accountId,
                destinationAccount = customerProfile.stellarAccountId,
                paymentRequestId = UUID.randomUUID().toString(),
                assetCode = "ZAR",
                amount = "100000000",
                date = todaysDate(),
                paymentType = PAYMENT_FUNDING
        )

        logger.info("\n\n\n${Emo.RAIN_DROPS} fundCustomer started .... at " +
                "$networkOperatorUrl ${Emo.RAIN_DROPS}")
        val headers = mapOf("Content-Type" to MediaType.APPLICATION_JSON_VALUE)
        val suffix = "/bfn/admin/sendPayment"
        val url = "$networkOperatorUrl$suffix"
        logger.info("${Emo.FROG}${Emo.FROG}${Emo.FROG} Sending customer payment using $url")
        val resp1 = httpPost(url = url, data = gson.toJson(request),
                timeout = timeOut, headers = headers)

        logger.info("${Emo.RAIN_DROPS}${Emo.RAIN_DROPS} RESPONSE: \uD83C\uDF4E " +
                "statusCode: ${resp1.statusCode}  \uD83C\uDF4E ${resp1.text}")
    }

    private fun fundInvestor(networkOperatorUrl: String, anchor: Anchor,
                             investorProfile: InvestorProfileStateDTO) {
        val request = StellarPaymentDTO(
                sourceAccount = anchor.distributionAccount!!.accountId,
                destinationAccount = investorProfile.stellarAccountId,
                paymentRequestId = UUID.randomUUID().toString(),
                assetCode = "ZAR",
                amount = "100000000",
                date = todaysDate(),
                paymentType = PAYMENT_FUNDING
        )

        logger.info("\n\n\n${Emo.RAIN_DROPS} fundInvestor started .... at " +
                "$networkOperatorUrl ${Emo.RAIN_DROPS}")
        val headers = mapOf("Content-Type" to MediaType.APPLICATION_JSON_VALUE)
        val suffix = "/bfn/admin/sendPayment"
        val url = "$networkOperatorUrl$suffix"
        logger.info("${Emo.FROG}${Emo.FROG}${Emo.FROG}Sending investor payment using  $url")
        val resp1 = httpPost(url = url, data = gson.toJson(request),
                timeout = timeOut, headers = headers)

        logger.info("${Emo.RAIN_DROPS}${Emo.RAIN_DROPS} RESPONSE: \uD83C\uDF4E " +
                "statusCode: ${resp1.statusCode}  \uD83C\uDF4E ${resp1.text}")

    }

    private fun checkAcceptedOffers(networkOperatorUrl: String) {
        val headers = mapOf("Content-Type" to MediaType.APPLICATION_JSON_VALUE)
        val suffix = "/bfn/admin/checkAcceptedInvoiceOffers"
        val url = "$networkOperatorUrl$suffix"
        logger.info("\n\n\n${Emo.YELLOW_BIRD}${Emo.YELLOW_BIRD}${Emo.YELLOW_BIRD}checkAcceptedInvoiceOffers using $url")
        val resp1 = httpGet(url = url,
                timeout = timeOut, headers = headers)
        val stringReader = StringReader(resp1.text)
        val mList: MutableList<AcceptedOfferDTO> = gson.fromJson(
                stringReader, Array<AcceptedOfferDTO>::class.java).toMutableList()

        logger.info(" \uD83D\uDD35 checkAcceptedOffers: " +
                "Result list from JSON string has ${mList.size} AcceptedOffers")
        val map: MutableMap<String, AcceptedOfferDTO> = mutableMapOf()

        var cnt = 0
        mList.forEach {
            if (map.containsKey(it.invoiceId)) {
                logger.info("We have an extra acceptedOffer: ${it.invoiceId} ${it.invoiceNumber}")
                logger.info("${Emo.ERRORS} DUPLICATE AcceptedOffer: ${gson.toJson(it)}")
                val original = map[it.invoiceId]
                logger.info("${Emo.FERNS} ORIGINAL AcceptedOffer: ${gson.toJson(original)}")
                cnt++
            } else {
                map[it.invoiceId] = it
            }
        }

        logger.info("${Emo.RED_APPLES} ... number of DUPLICATES found: $cnt}")
        logger.info("${Emo.RAIN_DROPS} RESPONSE: \uD83C\uDF4E statusCode: ${resp1.statusCode}  \uD83C\uDF4E ")
        logger.info("${Emo.BLUE_DOT}${Emo.BLUE_DOT}${Emo.BLUE_DOT}${Emo.BLUE_DOT}${Emo.BLUE_DOT}" +
                "checkAcceptedOffers completed! ${Emo.RED_APPLES}\n\n\n")

    }

    private fun checkSupplierPayments(networkOperatorUrl: String) {
        val headers = mapOf("Content-Type" to MediaType.APPLICATION_JSON_VALUE)
        val suffix = "/bfn/admin/findSupplierPaymentsForNode"
        val url = "$networkOperatorUrl$suffix"
        logger.info("\n\n\n${Emo.YELLOW_BIRD}${Emo.YELLOW_BIRD}${Emo.YELLOW_BIRD}checkSupplierPayments using $url")
        val resp1 = httpGet(url = url,
                timeout = timeOut, headers = headers)
        val stringReader = StringReader(resp1.text)
        val mList: MutableList<SupplierPaymentDTO> = gson.fromJson(
                stringReader, Array<SupplierPaymentDTO>::class.java).toMutableList()

        logger.info(" \uD83D\uDD35 checkSupplierPayments: " +
                "Result list from JSON string has ${mList.size} SupplierPayments")

        logger.info("${Emo.RAIN_DROPS} RESPONSE: \uD83C\uDF4E statusCode: ${resp1.statusCode}  \uD83C\uDF4E ")
        logger.info("${Emo.BLUE_DOT}${Emo.BLUE_DOT}${Emo.BLUE_DOT}${Emo.BLUE_DOT}${Emo.BLUE_DOT}" +
                "checkSupplierPayments completed! ${Emo.RED_APPLES}\n\n\n")
    }

    private fun checkInvestorPayments(networkOperatorUrl: String) {
        val headers = mapOf("Content-Type" to MediaType.APPLICATION_JSON_VALUE)
        val suffix = "/bfn/admin/findInvestorPaymentsForNode"
        val url = "$networkOperatorUrl$suffix"
        logger.info("\n\n\n${Emo.YELLOW_BIRD}${Emo.YELLOW_BIRD}${Emo.YELLOW_BIRD}checkInvestorPayments using $url")
        val resp1 = httpGet(url = url,
                timeout = timeOut, headers = headers)
        val stringReader = StringReader(resp1.text)
        val mList: MutableList<InvestorPaymentDTO> = gson.fromJson(
                stringReader, Array<InvestorPaymentDTO>::class.java).toMutableList()

        logger.info(" \uD83D\uDD35 checkInvestorPayments: " +
                "Result list from JSON string has ${mList.size} InvestorPayments")

        logger.info("${Emo.RAIN_DROPS} RESPONSE: \uD83C\uDF4E statusCode: ${resp1.statusCode}  \uD83C\uDF4E ")
        logger.info("${Emo.BLUE_DOT}${Emo.BLUE_DOT}${Emo.BLUE_DOT}${Emo.BLUE_DOT}${Emo.BLUE_DOT}" +
                "checkInvestorPayments completed! ${Emo.RED_APPLES}\n\n\n")
    }

    /*
    localhost:8084/anchor/data/generateAnchor
    public Anchor generateAnchor(@RequestParam String anchorName, @RequestParam String fundingSeed) throws Exception {

     */
    private val stellarUrl = "http://localhost:8084/anchor/"
    private fun generateStellarAnchor(anchorName: String, fundingSeed: String) {
        val headers = mapOf("Content-Type" to MediaType.APPLICATION_JSON_VALUE)
        val suffix = "data/generateAnchor?anchorName=$anchorName&fundingSeed=$fundingSeed"
        val url = "$stellarUrl$suffix"
        logger.info("\n\n\n${Emo.YELLOW_BIRD}${Emo.YELLOW_BIRD}${Emo.YELLOW_BIRD}generateStellarAnchor using $url")
        val resp1 = httpGet(url = url,
                timeout = timeOut, headers = headers)

        logger.info("${Emo.RAIN_DROPS} RESPONSE: \uD83C\uDF4E statusCode: ${resp1.statusCode}  \uD83C\uDF4E ${resp1.text}")
        logger.info("${Emo.BLUE_DOT}${Emo.BLUE_DOT}${Emo.BLUE_DOT}${Emo.BLUE_DOT}${Emo.BLUE_DOT}" +
                "Stellar Anchor Generated ${Emo.RED_APPLES}\n\n\n")

    }

    private val gson = GsonBuilder().setPrettyPrinting().create()

    private fun generateInvestorPayments(networkOperatorUrl: String) {
        logger.info("\n\n\n${Emo.RAIN_DROPS} generateInvestorPayments started .... at " +
                "$networkOperatorUrl ${Emo.RAIN_DROPS}")
        val headers = mapOf("Content-Type" to MediaType.APPLICATION_JSON_VALUE)
        val suffix = "/bfn/demo/generateInvestorPayments"
        val url = "$networkOperatorUrl$suffix"
        logger.info("${Emo.FROG} ${Emo.FROG}Searching for invoices using $url")
        val resp1 = httpGet(url = url,
                timeout = timeOut, headers = headers)
        logger.info("${Emo.RAIN_DROPS} RESPONSE: \uD83C\uDF4E statusCode: ${resp1.statusCode}  \uD83C\uDF4E ")

        val stringReader = StringReader(resp1.text)
        val mList: MutableList<InvestorPaymentDTO> = gson.fromJson(
                stringReader, Array<InvestorPaymentDTO>::class.java).toMutableList()

        logger.info(" \uD83D\uDD35 generateInvestorPayments: " +
                "Result list from JSON string has ${mList.size} invoices")

        for (payment in mList) {
            logger.info("${Emo.LEAF}${Emo.LEAF}${Emo.LEAF} " +
                    "InvestorPayment: ${gson.toJson(payment)}")
        }
        logger.info("${Emo.LEAF}${Emo.LEAF}${Emo.LEAF} " +
                "Total payments made: ${Emo.RED_APPLE}${mList.size}  ${Emo.RED_APPLE}")
    }

    private fun generateSupplierPayments(networkOperatorUrl: String) {
        logger.info("\n\n\n${Emo.DICE} ${Emo.DICE} ...... generateSupplierPayments starting ....: " +
                "${Emo.YELLOW_BIRD} ${Emo.YELLOW_BIRD} ${Emo.YELLOW_BIRD} ")
        var totalPayments = 0
        val investors = findInvestors(networkOperatorUrl)
        logger.info("${Emo.DICE} ${Emo.DICE} ......about to make supplier payments " +
                "for ${investors.size} investors")
        investors.forEach {
            logger.info("${Emo.DICE} ${Emo.DICE}  ${Emo.DICE}  ${Emo.DICE} " +
                    "......about to make supplier payments " +
                    "for investor: ${Emo.YELLOW_BIRD} ${it.name} ${Emo.YELLOW_BIRD}")
            val cnt = makeSupplierPayments(networkOperatorUrl, it.identifier)
            totalPayments += cnt
        }
        logger.info("\n\n\n${Emo.PEACH}${Emo.PEACH}${Emo.PEACH} " +
                "generateSupplierPayments completed: TOTAL PAYMENTS: $totalPayments" +
                " ${Emo.PEACH} \n\n")
    }

    private fun generateOfferAcceptances(networkOperatorUrl: String) {
        logger.info("\n\n\n${Emo.RAIN_DROPS} generateOfferAcceptances started .... at " +
                "$networkOperatorUrl ${Emo.RAIN_DROPS}")
        val headers = mapOf("Content-Type" to MediaType.APPLICATION_JSON_VALUE)
        val suffix = "/bfn/admin/findInvoicesForNode"
        val url = "$networkOperatorUrl$suffix"
        logger.info("${Emo.FROG} ${Emo.FROG}Searching for invoices using $url")
        val resp1 = httpGet(url = url,
                timeout = timeOut, headers = headers)
        logger.info("${Emo.RAIN_DROPS} RESPONSE: \uD83C\uDF4E statusCode: ${resp1.statusCode}  \uD83C\uDF4E ${resp1.text}")

        val stringReader = StringReader(resp1.text)
        val mList: MutableList<InvoiceDTO> = gson.fromJson(
                stringReader, Array<InvoiceDTO>::class.java).toMutableList()

        logger.info(" \uD83D\uDD35 generateOfferAcceptances: " +
                "Result list from JSON string has ${mList.size} invoices")

        for (invoice in mList) {
            logger.info("\n\n\n${Emo.FLOWER_PINK} finding BestOfferForInvoice: " +
                    "customer: ${invoice.customer?.name} " +
                    "supplier: ${invoice.supplier?.name} ${Emo.FLOWER_RED} amount: ${invoice.totalAmount}")
            acceptBestOfferForInvoice(
                    networkOperatorUrl = networkOperatorUrl,
                    supplierAccountId = invoice.supplier!!.identifier,
                    invoiceId = invoice.invoiceId)
        }
    }

    private fun acceptBestOfferForInvoice(networkOperatorUrl: String,
                                          supplierAccountId: String,
                                          invoiceId: String) {

        val headers = mapOf("Content-Type" to MediaType.TEXT_PLAIN_VALUE)
        val resp1 = httpGet(url = "$networkOperatorUrl/bfn/admin/acceptBestOfferForInvoice?" +
                "supplierAccountId=$supplierAccountId" +
                "&invoiceId=$invoiceId",
                timeout = timeOut, headers = headers)

        logger.info("acceptBestOfferForInvoice: ${Emo.BLUE_BIRD} ${Emo.BLUE_BIRD} ${Emo.BLUE_BIRD}" +
                " RESPONSE: \uD83C\uDF4E statusCode: ${resp1.statusCode} \uD83C\uDF4E")
        val acceptedOffer = gson.fromJson(resp1.text, AcceptedOfferDTO::class.java)
        logger.info("${Emo.RED_APPLES} findBestOfferForInvoice: " +
                "Accepted Offer is ${gson.toJson(acceptedOffer)} ${Emo.RED_APPLES} \n\n\n")

    }

    private fun findAcceptedOffersForInvestor(networkOperatorUrl: String,
                                              investorId: String): List<AcceptedOfferDTO> {
        val suffix = "/bfn/admin/findAcceptedOffersForInvestor?investorId=$investorId"
        val url = "$networkOperatorUrl$suffix"
        logger.info("${Emo.FROG}${Emo.FROG}${Emo.FROG}Searching for investor accepted offers using $url")
        val resp1 = httpGet(url = url,
                timeout = timeOut, headers = headers)

        val stringReader = StringReader(resp1.text)
        val mList: MutableList<AcceptedOfferDTO> = gson.fromJson(
                stringReader, Array<AcceptedOfferDTO>::class.java).toMutableList()

        logger.info("${Emo.PEACH}${Emo.PEACH}${Emo.PEACH} findAcceptedOffersForInvestor: " +
                "FOUND: ${Emo.PEACH}${mList.size} offers for the investor")
        return mList
    }

    private fun findInvestors(networkOperatorUrl: String): List<AccountInfoDTO> {
        logger.info("${Emo.RAIN_DROPS} findInvestors started .... at $networkOperatorUrl ${Emo.RAIN_DROPS}")
        val headers = mapOf("Content-Type" to MediaType.APPLICATION_JSON_VALUE)
        val suffix = "/bfn/admin/getAccounts"
        val url = "$networkOperatorUrl$suffix"
        logger.info("${Emo.FROG} ${Emo.FROG}Searching for investors using $url")
        val resp1 = httpGet(url = url,
                timeout = timeOut, headers = headers)
        logger.info("${Emo.RAIN_DROPS} RESPONSE: \uD83C\uDF4E statusCode: ${resp1.statusCode}  \uD83C\uDF4E ${resp1.text}")

        val stringReader = StringReader(resp1.text)
        val mList: MutableList<AccountInfoDTO> = gson.fromJson(
                stringReader, Array<AccountInfoDTO>::class.java).toMutableList()

        logger.info(" \uD83D\uDD35 findInvestors: " +
                "Result list from JSON string has ${mList.size} possible investors")
        return mList
    }



    private fun makeSupplierPayments(networkOperatorUrl: String,
                                     investorId: String): Int {
        logger.info("\n\n${Emo.DICE} ${Emo.DICE} ......about to make supplier payments " +
                "for investorId: $investorId ${Emo.RED_APPLE}")
        val offers = findAcceptedOffersForInvestor(networkOperatorUrl, investorId)

        var count = 0

        offers.forEach {
            logger.info("${Emo.RAIN_DROPS}${Emo.PEACH}${Emo.PEACH} .... " +
                    "Calling makeSupplierPaymentForOffer for investor: " +
                    "${it.investor?.account?.name} paying supplier ${it.supplier?.account?.name} " +
                    "the amount of: ${it.offerAmount}")

            val response = httpGet(url = "$networkOperatorUrl/bfn/admin/makeSupplierPaymentForOffer?offerId=${it.offerId}",
                    timeout = timeOut, headers = headers)
            if (response.statusCode == 200) {
//                gson.fromJson(response.text, InvestorPaymentDTO::class.java)
                logger.info("${Emo.RED_APPLES} makePaymentForOffer SUCCEEDED: investorId: $investorId \n\n\n")
                count++
            } else {
                logger.warn("${Emo.NOT_OK}${Emo.NOT_OK}${Emo.NOT_OK}${Emo.NOT_OK} " +
                        "makeSupplierPaymentForOffer fucked up, Jack! ${Emo.ERROR} " +
                        "statusCode: ${response.statusCode} - ${Emo.ERROR} ${response.text}")
            }

        }
        logger.info(
                "\n\n${Emo.YELLOW_BIRD} ${Emo.YELLOW_BIRD} ${Emo.YELLOW_BIRD} ${Emo.YELLOW_BIRD} " +
                        "Completed payments for investor: $investorId : ${Emo.RED_APPLE} " +
                        "$count  investorPayments ${Emo.RED_APPLE}\n\n")
        return count
    }

    private val timeOut = 9000000000.0
    private val headers = mapOf("Content-Type" to MediaType.APPLICATION_JSON_VALUE)

    private fun getSupplierProfile(networkOperatorUrl: String, accountId: String): SupplierProfileStateDTO? {
        val suffix = "/bfn/admin/getSupplierProfile?accountId=$accountId"
        val url = "$networkOperatorUrl$suffix"
        val resp1 = httpGet(url = url,
                timeout = timeOut, headers = headers)

        return if (resp1.statusCode == 200) {
            val profile = gson.fromJson(resp1.text, SupplierProfileStateDTO::class.java)
            logger.info("${Emo.RAIN_DROPS} SupplierProfile found : ${Emo.BLUE_DOT} ${profile.account?.name}")
            profile
        } else {
            logger.info("SupplierProfile NOT found ${Emo.ERRORS}")
            null
        }
    }

    private fun getInvestorProfile(networkOperatorUrl: String, accountId: String): InvestorProfileStateDTO? {
        val suffix = "/bfn/admin/getInvestorProfile?accountId=$accountId"
        val url = "$networkOperatorUrl$suffix"
        val resp1 = httpGet(url = url,
                timeout = timeOut, headers = headers)

        return if (resp1.statusCode == 200) {
            val profile = gson.fromJson(resp1.text, InvestorProfileStateDTO::class.java)
            logger.info("${Emo.RAIN_DROPS} InvestorProfile found : ${Emo.BLUE_DOT}${profile.account.name}")
            profile
        } else {
            logger.info("InvestorProfile NOT found ${Emo.ERRORS}")
            null
        }
    }

    private fun getUnconsumedInvoices(networkOperatorUrl: String, headers: Map<String, String>) {
        val resp1 = httpGet(url = "$networkOperatorUrl/bfn/admin/findInvoicesForNode",
                timeout = timeOut, headers = headers)
        val stringReader = StringReader(resp1.text)
        val mList: MutableList<InvoiceDTO> = gson.fromJson(
                stringReader, Array<InvoiceDTO>::class.java).toMutableList()

        logger.info("${Emo.PEACH}${Emo.PEACH}${Emo.PEACH} getUnconsumedInvoices: " +
                "Result list from JSON string has ${Emo.PEACH}${mList.size} invoices")
        mList.forEach {
            logger.info("${Emo.SOCCER_BALL}${Emo.SOCCER_BALL}${Emo.SOCCER_BALL} " +
                    "Unconsumed Invoice check why not accepted: ${gson.toJson(it)} ${Emo.SOCCER_BALL}")
        }
    }

    private fun getUnconsumedPurchaseOrders(networkOperatorUrl: String, headers: Map<String, String>) {
        val resp1 = httpGet(url = "$networkOperatorUrl/bfn/admin/findPurchaseOrdersForNode",
                timeout = timeOut, headers = headers)
        val stringReader = StringReader(resp1.text)
        val mList: MutableList<PurchaseOrderDTO> = gson.fromJson(
                stringReader, Array<PurchaseOrderDTO>::class.java).toMutableList()

        logger.info("${Emo.PEAR}${Emo.PEAR}${Emo.PEACH} getUnconsumedPurchaseOrders: " +
                "Result list from JSON string has ${Emo.PEAR}${mList.size} purchaseOrders")
        mList.forEach {
            logger.info("${Emo.BLUE_DOT}${Emo.BLUE_DOT}${Emo.BLUE_BIRD} " +
                    "Unconsumed PurchaseOrder: ${gson.toJson(it)} ${Emo.HEART_BLUE}")
        }
    }

    private fun getUnconsumedInvoiceOffers(networkOperatorUrl: String, headers: Map<String, String>) {
        val resp1 = httpGet(url = "$networkOperatorUrl/bfn/admin/findOffersForNode",
                timeout = timeOut, headers = headers)
        logger.info("RESPONSE: \uD83C\uDF4E statusCode: ${resp1.statusCode}  \uD83C\uDF4E ${resp1.text}")
        val stringReader = StringReader(resp1.text)
        val mList: MutableList<InvoiceOfferDTO> = gson.fromJson(
                stringReader, Array<InvoiceOfferDTO>::class.java).toMutableList()

        logger.info("${Emo.RED_DOT}${Emo.RED_DOT}${Emo.RED_DOT} getUnconsumedInvoiceOffers: " +
                "Result list from JSON string has ${Emo.RED_DOT}${mList.size} invoiceOffers")
        mList.forEach {
            logger.info("${Emo.HEART_BLUE}${Emo.HEART_BLUE}${Emo.HEART_BLUE} " +
                    "Unconsumed InvoiceOffer: ${gson.toJson(it)} ${Emo.HEART_BLUE}")
        }
    }

    private fun generateAnchorNodeData(networkOperatorUrl: String, numberOfAccounts: Int, headers: Map<String, String>) {
        val resp1 = httpGet(url = "$networkOperatorUrl/bfn/demo/generateAnchorNodeData?numberOfAccounts=$numberOfAccounts",
                timeout = timeOut, headers = headers)
        logger.info("RESPONSE: \uD83C\uDF4E statusCode: ${resp1.statusCode}  \uD83C\uDF4E ${resp1.text}")
    }

    private fun generateCustomerNodeData(customerUrl: String, numberOfMonths: Int, headers: Map<String, String>) {
        val resp2 = httpGet(url = "$customerUrl/bfn/demo/generateCustomerNodeData?numberOfMonths=$numberOfMonths",
                timeout = timeOut, headers = headers)
        logger.info("RESPONSE: \uD83C\uDF4E statusCode: ${resp2.statusCode}  \uD83C\uDF4E ${resp2.text}")
    }

    private fun generateInvoiceOffers(networkOperatorUrl: String, headers: Map<String, String>) {
        val resp3 = httpGet(url = "$networkOperatorUrl/bfn/demo/generateInvoiceOffers",
                timeout = timeOut, headers = headers)
        logger.info("RESPONSE: \uD83C\uDF4E statusCode: ${resp3.statusCode}  \uD83C\uDF4E ${resp3.text}")
    }

    private fun generateOffersForNetworkOperator(networkOperatorUrl: String, headers: Map<String, String>) {
        val resp4 = httpGet(url = "$networkOperatorUrl/bfn/demo/generateOffersForNetworkOperator",
                timeout = timeOut, headers = headers)
        logger.info("RESPONSE: \uD83C\uDF4E statusCode: ${resp4.statusCode}  \uD83C\uDF4E ${resp4.text}")
    }


    private fun printTotals() {
        getNodeTotals(proxyNetworkAnchorNode)
        getNodeTotals(proxyCustomerNode1)
        getNodeTotals(proxyNotary)
        getNodeTotals(proxyRegulator)

        getOfferAndTokens(proxyNetworkAnchorNode)
        logger.info("\n \uD83C\uDF38  \uD83C\uDF38  \uD83C\uDF38  \uD83C\uDF38  \uD83C\uDF38 ")
        getOfferAndTokens(proxyCustomerNode1)
        logger.info("\n \uD83C\uDF38  \uD83C\uDF38  \uD83C\uDF38  \uD83C\uDF38  \uD83C\uDF38 ")
        getOfferAndTokens(proxyNotary)
        logger.info("\n \uD83C\uDF38  \uD83C\uDF38  \uD83C\uDF38  \uD83C\uDF38  \uD83C\uDF38 ")
        getOfferAndTokens(proxyRegulator)
    }

    private fun setupRemoteNodes() {
        val nodeAddressNotary = NetworkHostAndPort(host = "localhost", port = 10019)
        val nodeAddressPartyA = NetworkHostAndPort(host = "localhost", port = 10006)
        val nodeAddressPartyB = NetworkHostAndPort(host = "localhost", port = 10009)
        val nodeAddressRegulator = NetworkHostAndPort(host = "localhost", port = 10017)
        val rpcUsername = "user1"
        val rpcPassword = "test"

        val clientNotary = CordaRPCClient(nodeAddressNotary)
        proxyNotary = clientNotary.start(rpcUsername, rpcPassword).proxy
        printThisNode(proxyNotary)

        val clientA = CordaRPCClient(nodeAddressPartyA)
        proxyNetworkAnchorNode = clientA.start(rpcUsername, rpcPassword).proxy
        printThisNode(proxyNetworkAnchorNode)

        val clientB = CordaRPCClient(nodeAddressPartyB)
        proxyCustomerNode1 = clientB.start(rpcUsername, rpcPassword).proxy
        printThisNode(proxyCustomerNode1)

        val clientReg = CordaRPCClient(nodeAddressRegulator)
        proxyRegulator = clientReg.start(rpcUsername, rpcPassword).proxy

        printThisNode(proxyRegulator)
        doNodesAndAggregates(proxyNetworkAnchorNode, proxyCustomerNode1, proxyRegulator)
    }

    private fun setupLocalNodes() {
        val nodeAddressNotary = NetworkHostAndPort(host = "localhost", port = 10019)
        val nodeAddressAnchor = NetworkHostAndPort(host = "localhost", port = 10006)
        val nodeAddressCustomer = NetworkHostAndPort(host = "localhost", port = 10009)
//        val nodeAddressRegulator = NetworkHostAndPort(host = "localhost", port = 10017)
        val rpcUsername = "user1"
        val rpcPassword = "test"

        val clientNotary = CordaRPCClient(nodeAddressNotary)
        proxyNotary = clientNotary.start(rpcUsername, rpcPassword).proxy
        printThisNode(proxyNotary)

        val clientA = CordaRPCClient(nodeAddressAnchor)
        proxyNetworkAnchorNode = clientA.start(rpcUsername, rpcPassword).proxy
        printThisNode(proxyNetworkAnchorNode)

        val clientB = CordaRPCClient(nodeAddressCustomer)
        proxyCustomerNode1 = clientB.start(rpcUsername, rpcPassword).proxy
        printThisNode(proxyCustomerNode1)

//        val clientReg = CordaRPCClient(nodeAddressRegulator)
//        proxyRegulator = clientReg.start(rpcUsername, rpcPassword).proxy

//        getThisNode(proxyNetworkAnchorNode)
        //doNodesAndAggregates(proxyNetworkAnchorNode, proxyCustomerNode1, proxyRegulator)
    }

    fun getRegulatorTotals(proxy: CordaRPCOps) {
        logger.info("\n......... \uD83D\uDE21  \uD83D\uDE21  \uD83D\uDE21  \uD83D\uDE21 REGULATOR TOTAL \uD83C\uDF3A ")
        val page = proxy.vaultQuery(AccountInfo::class.java)
        logger.info("\uD83C\uDF3A Total Accounts on Regulator: ${page.states.size} \uD83C\uDF3A ")
        val page1 = proxy.vaultQuery(InvoiceState::class.java)
        logger.info("\uD83C\uDF3A Total InvoiceStates on Regulator: ${page1.states.size} \uD83C\uDF3A ")
        val page2 = proxy.vaultQuery(InvoiceOfferState::class.java)
        logger.info("\uD83C\uDF3A Total InvoiceOfferStates on Regulator: ${page2.states.size} \uD83C\uDF3A ")
        val page3 = proxy.vaultQuery(OfferAndTokenState::class.java)
        logger.info("\uD83C\uDF3A Total OfferAndTokenStates on Regulator: ${page3.states.size} \uD83C\uDF3A ")

        val page4 = proxy.vaultQuery(ContractState::class.java)
        logger.info("\uD83C\uDF3A Total States on Regulator: ${page4.states.size} \uD83C\uDF3A \n")
    }

    fun printProfiles(proxy: CordaRPCOps) {
        logger.info("\n\uD83E\uDDA0 \uD83E\uDDA0 \uD83E\uDDA0 \uD83E\uDDA0 \uD83E\uDDA0   Print profiles for ${proxy.nodeInfo().legalIdentities.first()}")
        val criteriaUnConsumed = QueryCriteria.VaultQueryCriteria(status = Vault.StateStatus.UNCONSUMED)
        val page = proxy.vaultQueryByWithPagingSpec(
                contractStateType = InvestorProfileState::class.java,
                criteria = criteriaUnConsumed,
                paging = PageSpecification(1, 5000))

        page.states.forEach() {
            logger.info("\uD83E\uDDE9\uD83E\uDDE9\uD83E\uDDE9\uD83E\uDDE9 " +
                    "${GSON.toJson(getDTO(it.state.data))} \uD83E\uDDE9\uD83E\uDDE9 \uD83E\uDDA0 ")
        }

    }

    fun printInvoices(proxy: CordaRPCOps, consumed: Boolean) {
        logger.info("️\uD83C\uDFC0️ \uD83C\uDFC0️ \uD83C\uDFC0️ \uD83C\uDFC0️ \uD83C\uDFC0 Print invoices for ${proxy.nodeInfo().legalIdentities.first()}")
        val criteriaUnConsumedx = QueryCriteria.VaultQueryCriteria(status = Vault.StateStatus.UNCONSUMED)
        val profiles = proxy.vaultQueryByWithPagingSpec(
                contractStateType = SupplierProfileState::class.java,
                criteria = criteriaUnConsumedx,
                paging = PageSpecification(1, 5000))


        val criteriaConsumed = QueryCriteria.VaultQueryCriteria(status = Vault.StateStatus.CONSUMED)
        val criteriaUnConsumed = QueryCriteria.VaultQueryCriteria(status = Vault.StateStatus.UNCONSUMED)
        val page: Vault.Page<InvoiceState>
        page = if (consumed) {
            proxy.vaultQueryByWithPagingSpec(
                    contractStateType = InvoiceState::class.java,
                    criteria = criteriaConsumed,
                    paging = PageSpecification(1, 5000))
        } else {
            proxy.vaultQueryByWithPagingSpec(
                    contractStateType = InvoiceState::class.java,
                    criteria = criteriaUnConsumed,
                    paging = PageSpecification(1, 5000))
        }
        page.states.forEach() { invoice ->
            logger.info("️\uD83C\uDFC0️ \uD83C\uDFC0 INVOICE: " +
                    "${GSON.toJson(getDTO(invoice.state.data))} \uD83C\uDFC0️ \uD83C\uDFC0")
            profiles.states.forEach() {
                if (it.state.data.account.identifier.toString() == invoice.state.data.supplierInfo.identifier.id.toString()) {
                    logger.info("\uD83E\uDD5D \uD83E\uDD5D  SUPPLIER PROFILE: " +
                            "${GSON.toJson(getDTO(it.state.data))} \uD83E\uDD5D \uD83E\uDD5D \n")
                }
            }
        }

    }

    fun printOffers(proxy: CordaRPCOps, consumed: Boolean) {
        logger.info("\uD83E\uDD6D \uD83E\uDD6D \uD83E\uDD6D \uD83E\uDD6D Print offers for ${proxy.nodeInfo().legalIdentities.first()}")
        val criteriaUnConsumedx = QueryCriteria.VaultQueryCriteria(status = Vault.StateStatus.UNCONSUMED)
        val supplierProfiles = proxy.vaultQueryByWithPagingSpec(
                contractStateType = SupplierProfileState::class.java,
                criteria = criteriaUnConsumedx,
                paging = PageSpecification(1, 5000))
        val investorProfiles = proxy.vaultQueryByWithPagingSpec(
                contractStateType = SupplierProfileState::class.java,
                criteria = criteriaUnConsumedx,
                paging = PageSpecification(1, 5000))
        val criteriaConsumed = QueryCriteria.VaultQueryCriteria(status = Vault.StateStatus.CONSUMED)
        val criteriaUnConsumed = QueryCriteria.VaultQueryCriteria(status = Vault.StateStatus.UNCONSUMED)
        val page: Vault.Page<InvoiceOfferState>
        page = if (consumed) {
            proxy.vaultQueryByWithPagingSpec(
                    contractStateType = InvoiceOfferState::class.java,
                    criteria = criteriaConsumed,
                    paging = PageSpecification(1, 5000))
        } else {
            proxy.vaultQueryByWithPagingSpec(
                    contractStateType = InvoiceOfferState::class.java,
                    criteria = criteriaUnConsumed,
                    paging = PageSpecification(1, 5000))
        }
        var cnt = 0
        page.states.forEach() { offer ->
            cnt++
            logger.info("\uD83E\uDDE9\uD83E\uDDE9\uD83E\uDDE9\uD83E\uDDE9 INVOICE OFFER: #$cnt " +
                    "${GSON.toJson(getDTO(offer.state.data))} \uD83E\uDDE9\uD83E\uDDE9")
            supplierProfiles.states.forEach() {
                if (it.state.data.account.identifier.toString() == offer.state.data.supplier.identifier.id.toString()) {
                    logger.info("\uD83D\uDC8A \uD83D\uDC8A \uD83D\uDC8A  SUPPLIER PROFILE: " +
                            "${GSON.toJson(getDTO(it.state.data))} \uD83D\uDC8A  \uD83D\uDC8A ")
                }
            }
            investorProfiles.states.forEach() {
                if (it.state.data.account.identifier.toString() == offer.state.data.investor.identifier.id.toString()) {
                    logger.info("\uD83D\uDD31 \uD83D\uDD31 \uD83D\uDD31  INVESTOR PROFILE: " +
                            "${GSON.toJson(getDTO(it.state.data))} \uD83D\uDD31 \uD83D\uDD31 \uD83D\uDD31 \n\n")
                }
            }
        }

    }


    fun getNodeTotals(proxy: CordaRPCOps) {
        val name = proxy.nodeInfo().legalIdentities.first().name.organisation
        logger.info("\n..............\uD83C\uDF3A \uD83C\uDF3A \uD83C\uDF3A \uD83C\uDF3A ${name.toUpperCase()} STATES \uD83C\uDF3A .................... ")
        val page = proxy.vaultQuery(AccountInfo::class.java)
        logger.info("\uD83D\uDC65 Total Accounts on \uD83D\uDC65 ${name.toUpperCase()}: ${page.states.size}  \uD83D\uDC65  ")
        val unConsumedInvoices = proxy.vaultQueryByWithPagingSpec(
                contractStateType = InvoiceState::class.java,
                criteria = QueryCriteria.VaultQueryCriteria(status = Vault.StateStatus.UNCONSUMED),
                paging = PageSpecification(1, 5000))
        val consumedInvoices = proxy.vaultQueryByWithPagingSpec(
                contractStateType = InvoiceState::class.java,
                criteria = QueryCriteria.VaultQueryCriteria(status = Vault.StateStatus.CONSUMED),
                paging = PageSpecification(1, 5000))
        val unConsumedOffers = proxy.vaultQueryByWithPagingSpec(
                contractStateType = InvoiceOfferState::class.java,
                criteria = QueryCriteria.VaultQueryCriteria(status = Vault.StateStatus.UNCONSUMED),
                paging = PageSpecification(1, 5000))
        val consumedOffers = proxy.vaultQueryByWithPagingSpec(
                contractStateType = InvoiceOfferState::class.java,
                criteria = QueryCriteria.VaultQueryCriteria(status = Vault.StateStatus.CONSUMED),
                paging = PageSpecification(1, 5000))
        val profiles = proxy.vaultQueryByWithPagingSpec(
                contractStateType = InvestorProfileState::class.java,
                criteria = QueryCriteria.VaultQueryCriteria(status = Vault.StateStatus.UNCONSUMED),
                paging = PageSpecification(1, 5000))

        val allInvoices = proxy.vaultQueryByWithPagingSpec(contractStateType = InvoiceState::class.java,
                criteria = QueryCriteria.VaultQueryCriteria(status = Vault.StateStatus.ALL),
                paging = PageSpecification(1, 5000))

        val allOffers = proxy.vaultQueryByWithPagingSpec(contractStateType = InvoiceOfferState::class.java,
                criteria = QueryCriteria.VaultQueryCriteria(status = Vault.StateStatus.ALL),
                paging = PageSpecification(1, 5000))

        val states = proxy.vaultQueryByWithPagingSpec(contractStateType = NetworkOperatorState::class.java,
                criteria = QueryCriteria.VaultQueryCriteria(status = Vault.StateStatus.ALL),
                paging = PageSpecification(1, 5)).states

        logger.info("\uD83D\uDC65 AnchorStates :\uD83C\uDF4E: ${states.size} ")
        logger.info("\uD83D\uDC65 Total Profiles on ${name.toUpperCase()}: ${profiles.states.size} \uD83D\uDC65\n")
        logger.info("\uD83C\uDF3A Total ConsumedInvoices on ${name.toUpperCase()}: ${consumedInvoices.states.size} \uD83C\uDF3A ")
        logger.info("\uD83C\uDF3A Total unConsumedInvoices on ${name.toUpperCase()}: ${unConsumedInvoices.states.size} \uD83C\uDF3A ")
        logger.info("\uD83C\uDF3A Total Invoices on ${name.toUpperCase()}: ${allInvoices.states.size} \uD83C\uDF3A \n")

        logger.info("\uD83C\uDF81 Total consumedOffers on ${name.toUpperCase()}: ${consumedOffers.states.size} \uD83C\uDF3A ")
        logger.info("\uD83C\uDF81 Total unConsumedOffers on ${name.toUpperCase()}: ${unConsumedOffers.states.size} \uD83C\uDF3A ")
        logger.info("\uD83C\uDF81 Total Offers on ${name.toUpperCase()}: ${allOffers.states.size} \uD83C\uDF3A \n")

        val page3 = proxy.vaultQueryByWithPagingSpec(contractStateType = OfferAndTokenState::class.java,
                criteria = QueryCriteria.VaultQueryCriteria(status = Vault.StateStatus.UNCONSUMED),
                paging = PageSpecification(1, 5000))
        logger.info("\uD83D\uDECE Total OfferAndTokenStates on ${name.toUpperCase()}: ${page3.states.size} \uD83D\uDECE \n")
    }

    fun getTokens(proxy: CordaRPCOps) {
        val criteria = QueryCriteria.VaultQueryCriteria(status = Vault.StateStatus.UNCONSUMED)
        val page =
                proxy.vaultQueryByWithPagingSpec(contractStateType = FungibleToken::class.java, criteria = criteria,
                        paging = PageSpecification(pageNumber = 1, pageSize = 200))
        logger.info("\uD83D\uDE3C \uD83E\uDDE9 \uD83E\uDDE9 Tokens on Node: \uD83E\uDDE9 \uD83E\uDDE9 " +
                "${proxy.nodeInfo().legalIdentities.first()} \uD83D\uDE3C ${page.totalStatesAvailable} \uD83D\uDE3C ")
        page.states.forEach() {
            logger.info("\uD83D\uDE3C \uD83D\uDE3C ${it.state.data}  \uD83C\uDF51 ")
        }
    }

    fun getOfferAndTokens(proxy: CordaRPCOps) {
        val criteria = QueryCriteria.VaultQueryCriteria(status = Vault.StateStatus.UNCONSUMED)
        val page =
                proxy.vaultQueryByWithPagingSpec(contractStateType = OfferAndTokenState::class.java, criteria = criteria,
                        paging = PageSpecification(pageNumber = 1, pageSize = 200))
        logger.info("\uD83D\uDE3C \uD83E\uDDE9 \uD83E\uDDE9 Tokens on Node: \uD83E\uDDE9 \uD83E\uDDE9 " +
                "${proxy.nodeInfo().legalIdentities.first()} \uD83D\uDE3C ${page.totalStatesAvailable} \uD83D\uDE3C ")

        val sorted = page.states.sortedBy { it.state.data.invoiceOffer.investor.host.toString() }
        sorted.forEach() {
            logger.info("\uD83D\uDE3CInvestor: ${it.state.data.invoiceOffer.investor.host.name.organisation} " +
                    "\uD83C\uDF51 ${it.state.data.invoiceOffer.investor.name} \uD83C\uDF51 " +
                    "supplier: ${it.state.data.invoiceOffer.supplier.host.name.organisation} \uD83D\uDD35 ${it.state.data.invoiceOffer.supplier.name}" +
                    " amt: ${it.state.data.invoiceOffer.originalAmount} :discount: ${it.state.data.invoiceOffer.discount} " +
                    " \uD83D\uDECE Token amount: ${it.state.data.token.amount} ")
        }
    }


    var customer: AccountInfoDTO? = null
    val random = Random(Date().time)

    private fun getAccounts(proxy: CordaRPCOps): List<AccountInfo> {
        val accts: MutableList<AccountInfo> = mutableListOf()
        val page = proxy.vaultQuery(AccountInfo::class.java)
        page.states.forEach() {
            if (proxy.nodeInfo().legalIdentities.first().toString() == it.state.data.host.toString()) {
                accts.add(it.state.data)
            }
        }
        return accts
    }

    private fun doNodesAndAggregates(proxyAnchor: CordaRPCOps, proxyCustomer: CordaRPCOps, proxyReg: CordaRPCOps) {
        logger.info("++++++++++++++  \uD83C\uDFC0 \uD83C\uDFC0 \uD83C\uDFC0 CORDA NODES \uD83C\uDFC0 \uD83C\uDFC0 \uD83C\uDFC0 ++++++++++++++++++++++++\n")
        getNodes(proxyAnchor)
        //
        logger.info("++++++++++++++   NetworkAnchorNode \uD83C\uDF4A ${proxyAnchor.nodeInfo().addresses.first()} " +
                " \uD83E\uDD6C ${proxyAnchor.nodeInfo().legalIdentities.first().name} \uD83C\uDFC0 \uD83C\uDFC0 \uD83C\uDFC0 ++++++++++++++++++++++++\n")
        getAggregates(proxyAnchor)
        logger.info("++++++++++++++   CustomerNode1 \uD83C\uDF4A ${proxyCustomer.nodeInfo().addresses.first()}  " +
                " \uD83E\uDD6C ${proxyCustomer.nodeInfo().legalIdentities.first().name} \uD83C\uDFC0 \uD83C\uDFC0 \uD83C\uDFC0 ++++++++++++++++++++++++\n")
        getAggregates(proxyCustomer)

        logger.info("++++++++++++++   Regulator \uD83C\uDF4A ${proxyReg.nodeInfo().addresses.first()} " +
                " \uD83E\uDD6C ${proxyReg.nodeInfo().legalIdentities.first().name} \uD83C\uDFC0 \uD83C\uDFC0 \uD83C\uDFC0 ++++++++++++++++++++++++\n")
        getAggregates(proxyReg)

    }

    private fun getFlows(proxy: CordaRPCOps) {
        logger.info("\n\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35  \uD83C\uDF81 " +
                "Registered flows for:  \uD83D\uDD06 ${proxy.nodeInfo().legalIdentities.first()}")
        var cnt = 0
        proxy.registeredFlows().forEach() {
            if (it.contains("bfn")) {
                cnt++
                logger.info(" \uD83C\uDF81 Registered flow: \uD83D\uDD06 #$cnt \uD83D\uDD06 $it")
            }
        }
    }

    private fun printThisNode(proxy: CordaRPCOps) {
        val me = proxy.nodeInfo()
        logger.info("\uD83E\uDD6C \uD83E\uDD6C I am connected to Corda node: " +
                "\uD83E\uDD6C ${me.legalIdentities.first()} " +
                "platformVersion: ${me.platformVersion}")
    }

    private fun getNodes(proxy: CordaRPCOps) {
        val nodes = proxy.networkMapSnapshot()
        nodes.forEach() {
            logger.info("\uD83D\uDC9A \uD83D\uDC99 \uD83D\uDC9C Corda Node present: " +
                    "\uD83D\uDC9A ${it.addresses.first()} \uD83C\uDF00 \uD83C\uDF00 ${it.legalIdentities.first()}")
        }
        logger.info("️\uD83D\uDD34 \uD83D\uDD34 Total Corda Nodes: ${nodes.size}")
        val notary = proxy.notaryIdentities().first()
        logger.info("\uD83D\uDD31 \uD83D\uDD31 Notary is \uD83D\uDD31 ${notary.name} " +
                "\uD83D\uDD38 public key: ${notary.owningKey}")
    }

    private fun getAggregates(proxy: CordaRPCOps) {
        val criteria = QueryCriteria.VaultQueryCriteria(status = Vault.StateStatus.UNCONSUMED)
        val page = proxy.vaultQueryByWithPagingSpec(
                criteria = criteria, contractStateType = AccountInfo::class.java,
                paging = PageSpecification(pageNumber = 1, pageSize = 1000))
        var cnt = 0
        var cnt2 = 0
        page.states.forEach() {
            if (it.state.data.host.toString() == proxy.nodeInfo().legalIdentities.first().toString()) {
                cnt++
            } else {
                cnt2++
            }
        }
        logger.info("\uD83D\uDC2C Local Accounts on Node: \uD83C\uDF4A $cnt \uD83C\uDF4A")
        logger.info("\uD83D\uDC2C Remote Accounts on Node: 🍊 $cnt2 🍊")

        val profiles = proxy.vaultQueryByWithPagingSpec(criteria = criteria,
                contractStateType = InvestorProfileState::class.java,
                paging = PageSpecification(pageNumber = 1, pageSize = 2000))

        logger.info("\uD83D\uDE0E Local Profiles on Node: 🍊 ${profiles.totalStatesAvailable} 🍊")
        //
        val pageInvoices = proxy.vaultQueryByWithPagingSpec(criteria = criteria,
                contractStateType = InvoiceState::class.java,
                paging = PageSpecification(pageNumber = 1, pageSize = 2000))
        cnt = 0
        cnt2 = 0
        pageInvoices.states.forEach() {
            if (it.state.data.supplierInfo.host.toString() == proxy.nodeInfo().legalIdentities.first().toString()) {
                cnt++
            } else {
                cnt2++
            }
        }
        logger.info("\uD83C\uDF50 Local Invoices on Node: 🍊 $cnt 🍊")
        logger.info("\uD83C\uDF50 Remote Invoices on Node: 🍊 $cnt2 🍊")

        val pageInvoiceOffers =
                proxy.vaultQueryByWithPagingSpec(
                        contractStateType = InvoiceOfferState::class.java,
                        criteria = criteria,
                        paging = PageSpecification(
                                pageNumber = 1, pageSize = 2000))

        cnt = 0
        cnt2 = 0
        pageInvoiceOffers.states.forEach() {
            if (it.state.data.investor.host.toString() == proxy.nodeInfo().legalIdentities.first().toString()) {
                cnt++
            } else {
                cnt2++
            }
        }

        logger.info("\uD83E\uDDE1 Local InvoiceOffers on Node: 🍊 $cnt 🍊")
        logger.info("\uD83E\uDDE1 Remote InvoiceOffers on Node: 🍊 $cnt2 🍊")
    }

    private fun getAccountDetails(proxy: CordaRPCOps) {
        val criteria = QueryCriteria.VaultQueryCriteria(status = Vault.StateStatus.UNCONSUMED)
        val page = proxy.vaultQueryByCriteria(criteria = criteria, contractStateType = AccountInfo::class.java)
        var cnt = 1
        val sorted = page.states.sortedBy { it.state.data.name }
        sorted.forEach {
            logger.info("\uD83E\uDDE9\uD83E\uDDE9 Account #$cnt \uD83E\uDDE9 ${it.state.data}")
            cnt++

        }
        logger.info("Accounts on Node: 🍊 ${page.states.size} 🍊")


    }

    private fun getInvoiceDetails(proxy: CordaRPCOps) {
        val criteria = QueryCriteria.VaultQueryCriteria(status = Vault.StateStatus.UNCONSUMED)
        val pageInvoices = proxy.vaultQueryByCriteria(criteria = criteria, contractStateType = InvoiceState::class.java)
        var cnt = 1
        val sortedInvoices = pageInvoices.states.sortedBy { it.state.data.supplierInfo.name }
        sortedInvoices.forEach() {
            logger.info("\uD83C\uDF4A\uD83C\uDF4A Invoice #$cnt \uD83C\uDF4A R${it.state.data.amount} - ${it.state.data.supplierInfo.name}")
            cnt++
        }
        logger.info("Invoices on Node: 🍊 ${pageInvoices.states.size} 🍊")

    }

    private fun findBestOffers(proxy: CordaRPCOps) {
        mList.clear()
        var pageNumber = 1
        val pageSize = 1200
        val page = query(proxy, pageNumber = pageNumber, pageSize = pageSize)
        addToList(page)

        val remainder: Int = (page.totalStatesAvailable % pageSize).toInt()
        var pageCnt: Int = (page.totalStatesAvailable / pageSize).toInt()
        if (remainder > 0) pageCnt++

        if (pageCnt > 1) {
            while (pageNumber < pageCnt) {
                pageNumber++
                val pageX = query(proxy, pageNumber, pageSize)
                logger.info("................... \uD83D\uDCCC .......... \uD83D\uDCCC \uD83D\uDCCC Printing page $pageNumber")
                addToList(pageX)
            }
        }

//        val sorted = mList.sortedBy { it.invoiceId.toString() }
//        var cnt = 1
//        logger.info("\n\n................... \uD83D\uDCCC \uD83D\uDCCC " +
//                "Printing offers sorted by invoiceId .... \uD83D\uDCCC \uD83D\uDCCC")
//        sorted.forEach() {
//            logger.info(" \uD83D\uDD06 #$cnt supplier: ${it.supplier.name}" +
//                    "host: ${it.supplier.host} \uD83C\uDF88 investor: ${it.investor.name} " +
//                    " \uD83E\uDDE9 host: ${it.investor.host} - \uD83E\uDDA0 offerAmt: ${it.offerAmount} " +
//                    "from ${it.originalAmount} :: discount: ${it.discount}")
//            cnt++
//        }
        logger.info("\n\nInvoiceOffers on Node: 🍊 ${page.totalStatesAvailable} 🍊")
        logger.info("InvoiceOffers gathered: 🍊 ${mList.size} 🍊")
        selectBestOffers()

    }

    private fun selectBestOffers() {
        val map: MutableMap<String, InvoiceOfferState> = mutableMapOf()
        mList.forEach() {
            map[it.invoiceId.toString()] = it
        }

        var cnt = 1
        map.forEach {
            logger.info("\uD83C\uDF88 \uD83C\uDF88 Invoice to be processed: #$cnt " +
                    "\uD83D\uDC9A supplier: ${it.value.supplier.name} ${it.value.supplier.host} " +
                    "\uD83D\uDE21 \uD83D\uDE21 customer: ${it.value.customer.name} - ${it.value.customer.host}")
            val params: MutableMap<String, String> = mutableMapOf()
            params["accountId"] = it.value.supplier.identifier.id.toString()
            params["invoiceId"] = it.key
            params["invoiceAmount"] = it.value.originalAmount.toString()

            if (it.value.supplier.host.name.toString().contains("PartyA")) {
                logger.warn("\uD83C\uDF88 \uD83C\uDF88 selectBestOffer using PARTY A, : " +
                        "\uD83D\uDC9A supplier: ${it.value.supplier.name} ${it.value.supplier.host} " +
                        "\uD83D\uDE21 \uD83D\uDE21 investor: ${it.value.investor.name} - ${it.value.investor.host}")
                val response = httpGet(
                        timeout = 990000000.0, params = params,
                        url = "http://localhost:10050/admin/selectBestOffer")
                val result = response.text
                if (result.contains("timestamp")) {
                    logger.error("\uD83D\uDC7F \uD83D\uDC7F \uD83D\uDC7F  ERROR : $result  \uD83D\uDC7F  \uD83D\uDC7F ")
                } else {
                    logger.info("\uD83C\uDF38 RESPONSE offer:  \uD83D\uDC2C #$cnt  \uD83C\uDF38 $result")
                }
            }
            if (it.value.supplier.host.name.toString().contains("PartyB")) {
                logger.warn("\uD83C\uDF88 \uD83C\uDF88 selectBestOffer using PARTY B : " +
                        "\uD83D\uDC9A supplier: ${it.value.supplier.name} ${it.value.supplier.host} " +
                        "\uD83D\uDE21 \uD83D\uDE21 investor: ${it.value.investor.name} - ${it.value.investor.host}")
                val response = httpGet(
                        timeout = 990000000.0, params = params,
                        url = "http://localhost:10053/admin/selectBestOffer")
                val result = response.text
                if (result.contains("timestamp")) {
                    logger.error("\uD83D\uDC7F \uD83D\uDC7F \uD83D\uDC7F  ERROR : $result  \uD83D\uDC7F  \uD83D\uDC7F ")
                } else {
                    logger.info("\uD83C\uDF38 RESPONSE offer:  \uD83D\uDC2C #$cnt  \uD83C\uDF38 $result")
                }
            }
            if (it.value.supplier.host.name.toString().contains("PartyC")) {
                logger.warn("\uD83C\uDF88 \uD83C\uDF88 selectBestOffer using PARTY C, : " +
                        "\uD83D\uDC9A supplier: ${it.value.supplier.name} ${it.value.supplier.host} " +
                        "\uD83D\uDE21 \uD83D\uDE21 investor: ${it.value.investor.name} - ${it.value.investor.host}")
                val response = httpGet(
                        timeout = 990000000.0, params = params,
                        url = "http://localhost:10056/admin/selectBestOffer")
                val result = response.text
                if (result.contains("timestamp")) {
                    logger.error("\uD83D\uDC7F \uD83D\uDC7F \uD83D\uDC7F  ERROR : $result  \uD83D\uDC7F  \uD83D\uDC7F ")
                } else {
                    logger.info("\uD83C\uDF38 RESPONSE offer:  \uD83D\uDC2C #$cnt  \uD83C\uDF38 $result")
                }
            }
            cnt++
        }
    }

    private val mList: MutableList<InvoiceOfferState> = mutableListOf()
    private fun addToList(page: Vault.Page<InvoiceOfferState>) {

        var cnt = 1
        page.states.forEach {
            mList.add(it.state.data)
            cnt++
        }
    }

    private fun query(proxy: CordaRPCOps, pageNumber: Int, pageSize: Int): Vault.Page<InvoiceOfferState> {
        val criteria = QueryCriteria.VaultQueryCriteria(
                status = Vault.StateStatus.UNCONSUMED)

        return proxy.vaultQueryByWithPagingSpec(
                contractStateType = InvoiceOfferState::class.java,
                paging = PageSpecification(pageNumber = pageNumber, pageSize = pageSize),
                criteria = criteria)
    }
}
