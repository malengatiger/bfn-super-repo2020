package com.bfn.client.local

import com.bfn.client.dto.*
import com.bfn.client.web.WorkerBee
import com.bfn.contractstates.states.*
import com.bfn.flows.todaysDate
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.r3.corda.lib.accounts.contracts.states.AccountInfo
import com.r3.corda.lib.tokens.contracts.states.FungibleToken
import net.corda.client.rpc.CordaRPCClient
import net.corda.core.contracts.ContractState
import net.corda.core.contracts.StateAndRef
import net.corda.core.messaging.CordaRPCOps
import net.corda.core.node.services.Vault
import net.corda.core.node.services.vault.PageSpecification
import net.corda.core.node.services.vault.QueryCriteria
import net.corda.core.utilities.NetworkHostAndPort
import net.corda.core.utilities.loggerFor
import org.json.JSONArray
import org.json.JSONObject
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

private class Client {
    companion object {
        val logger = loggerFor<Client>()
        private val GSON = GsonBuilder().setPrettyPrinting().create()

    }

    lateinit var proxyAnchorInvestor: CordaRPCOps
    lateinit var proxyCustomer001: CordaRPCOps
    lateinit var proxyNotary: CordaRPCOps
    lateinit var proxyRegulator: CordaRPCOps

    private val localAnchorURL = "http://localhost:10050"
    fun main(args: Array<String>) {

        setupLocalNodes()
//        createAnchor(localAnchorURL)
//        createCustomer(localAnchorURL)
//        startSupplierAccounts(
//                numberOfAccounts = 23,
//                url = localAnchorURL);
//        letsDance()
//        logger.info("\n\n========================= \uD83C\uDF4E 2nd Set; letsDance! \uD83C\uDF4E =================================\n\n")
//        letsDance()
//
//        acceptAnchorOffers(localAnchorURL)
//        findAndAcceptBestOffers(localAnchorURL)
//        getOffers().forEach() {
//            logger.info("\uD83C\uDF00 \uD83D\uDC8A \uD83D\uDC8A InvoiceOffer: \uD83C\uDF21 \uD83C\uDF21 " +
//                    "${GSON.toJson(WorkerBee.getDTO(it.state.data))} \uD83C\uDF00 \uD83C\uDF21 \uD83C\uDF21 ")
//        }
//        makeProfilesForNode(proxyAnchorInvestor, localAnchorURL)
//        generateInvoices(localAnchorURL, 40)
//        generateCasualOffers()
//        printOffers(proxyAnchorInvestor, consumed = false)
//        printInvoices(proxyAnchorInvestor, consumed = false)
//        printOffers(proxyAnchorInvestor, consumed = false)
//        printInvoices(proxyPartyB, consumed = false)
//
//        printProfiles(proxyAnchorInvestor)
//        printProfiles(proxyPartyB)
        generateInvoices(localAnchorURL)

    }

    private fun letsDance() {
        generateInvoices(localAnchorURL)
        generateAnchorOffers(localAnchorURL)
        generateCasualOffers()
        acceptAnchorOffers(localAnchorURL)
        findAndAcceptBestOffers(localAnchorURL)
        makeMultipleAnchorPayments(localAnchorURL, delayMinutesUntilNextPaymentFlow = 120)
        makeMultipleInvestorPayments(localAnchorURL, delayMinutesUntilNextPaymentFlow = 120)
        getOffers()
        logger.info("\n\n =========  \uD83C\uDF81 DATA GENERATION COMPLETE. Bravo!!  \uD83C\uDF81 ============= \n\n")
        //doNodesAndAggregates(proxyAnchorInvestor, proxyCustomer001, proxyRegulator)
        logger.info("\n\n =========  \uD83C\uDF81 Ready to check that the whole business process happened, " +
                "\uD83C\uDF4F Senor!  \uD83C\uDF81 ============= \n\n")
    }

    private fun makeMultipleAnchorPayments(url: String, delayMinutesUntilNextPaymentFlow: Long) {
        logger.info("\uD83C\uDF4E" +
                " makeMultipleAnchorPayments started ..... delayMinutesUntilNextPaymentFlow: $delayMinutesUntilNextPaymentFlow \uD83C\uDF4E")
        val params :MutableMap<String,String> = mutableMapOf()
        params["delayMinutesUntilNextPaymentFlow"] = delayMinutesUntilNextPaymentFlow.toString()
        val response = httpGet(
                timeout = 990000000.0, params = params,
                url = "$url/bfn/admin/makeMultiplePayments")
        logger.info("\uD83C\uDF4E  makeMultipleAnchorPayments; RESPONSE: statusCode: " +
                "\uD83C\uDF0D ${response.statusCode} \uD83C\uDF0D ")
        if (response.statusCode == 200) {
            val arr = JSONArray(response.text)
            logger.info("\uD83C\uDF81 \uD83C\uDF81 payments created for AnchorInvestor: \uD83D\uDC9A ${arr.length()} \uD83D\uDC9A")
        } else {
            logger.info("\uD83D\uDC7F \uD83D\uDC7F makeMultipleAnchorPayments ERROR: " +
                    "${response.statusCode} \uD83D\uDC7F ${response.text}")
        }
        reportPaymentsAftermath()
    }

    private fun reportPaymentsAftermath() {
        val mList = proxyAnchorInvestor.vaultQueryByWithPagingSpec(
                criteria = QueryCriteria.VaultQueryCriteria(Vault.StateStatus.UNCONSUMED),
                contractStateType = SupplierPaymentState::class.java,
                paging = PageSpecification(1, 6000)
        ).states
        logger.info("\n\nSupplier Payments on node: \uD83C\uDF4E ${mList.size} \uD83C\uDF4E")
        val mList1 = proxyAnchorInvestor.vaultQueryByWithPagingSpec(
                criteria = QueryCriteria.VaultQueryCriteria(Vault.StateStatus.UNCONSUMED),
                contractStateType = InvoiceState::class.java,
                paging = PageSpecification(1, 6000)
        ).states
        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 Invoices on node: " +
                "\uD83C\uDF4E ${mList1.size} \uD83C\uDF4E these have no Anchor offers! " +
                "\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \n\n")
    }

    private fun makeMultipleInvestorPayments(url: String, delayMinutesUntilNextPaymentFlow: Long) {
        val accounts = getAccounts(proxyAnchorInvestor)
        accounts.forEach() {
            if (it.name == "AnchorInvestor" || it.name == "Customer001") {
                logger.info("Ignore anchor or customer")
            } else {
                val investorId = it.identifier.id.toString()
                val profile = getInvestorProfile(investorId)
                val params: MutableMap<String, String> = mutableMapOf()
                params["investorId"] = investorId
                params["delayMinutesUntilNextPaymentFlow"] = delayMinutesUntilNextPaymentFlow.toString()
                val response = httpGet(
                        timeout = 990000000.0, params = params,
                        url = "$url/bfn/supplier/createPayments")

                if (response.statusCode == 200) {
                    val arr = JSONArray(response.text)
                    logger.info("\uD83E\uDD50 ${arr.length()} payments created for: \uD83D\uDC9A ${it.name} " +
                            " \uD83D\uDECE  investor defaultDiscount: ${profile?.defaultDiscount} " +
                            "min: ${profile?.minimumInvoiceAmount} max: ${profile?.maximumInvoiceAmount}")
                } else {
                    logger.info("\uD83D\uDC7F makeMultipleInvestorPayments " +
                            "ERROR: ${response.statusCode} \uD83D\uDC7F ${response.text}")
                }
            }
        }

        reportPaymentsAftermath()
    }

    private fun getInvestorProfile(accountId: String): InvestorProfileStateDTO? {

        val states = proxyAnchorInvestor.vaultQueryByWithPagingSpec(
                contractStateType = InvestorProfileState::class.java,
                criteria = QueryCriteria.VaultQueryCriteria(Vault.StateStatus.UNCONSUMED),
                paging = PageSpecification(1, 2000)
        ).states
        states.forEach() {
            if (it.state.data.accountId == accountId) {
                return WorkerBee.getDTO(it.state.data)
            }
        }

        return null
    }
    private fun getSupplierProfile(accountId: String): SupplierProfileStateDTO? {

        val states = proxyAnchorInvestor.vaultQueryByWithPagingSpec(
                contractStateType = SupplierProfileState::class.java,
                criteria = QueryCriteria.VaultQueryCriteria(Vault.StateStatus.UNCONSUMED),
                paging = PageSpecification(1, 2000)
        ).states
        states.forEach() {
            if (it.state.data.accountId == accountId) {
                return WorkerBee.getDTO(it.state.data)
            }
        }

        return null
    }


    private fun findAndAcceptBestOffers(url: String) {
        logger.info("\uD83C\uDF4E .............findAndAcceptBestOffers \uD83C\uDF4E")

        val invoiceStates = proxyAnchorInvestor.vaultQueryByWithPagingSpec(
                contractStateType = InvoiceState::class.java,
                criteria = QueryCriteria.VaultQueryCriteria(Vault.StateStatus.UNCONSUMED),
                paging = PageSpecification(1, 2000)
        ).states
        logger.info("Number of invoices on node: ${invoiceStates.size}, will find best offer ...")
        invoiceStates.forEach() {
            val accountId = it.state.data.supplierInfo.identifier.id.toString()
            val invoiceId = it.state.data.invoiceId.toString()
            val prof = getInvestorProfile(accountId)
            val params: MutableMap<String, String> = mutableMapOf()
            params["accountId"] = accountId
            params["invoiceId"] = invoiceId
            val response = httpGet(
                    timeout = 990000000.0, params = params,
                    url = "$url/bfn/supplier/selectBestOffer")
            if (response.statusCode == 200) {
                takeBestOffer(response.text, url, prof)
            } else {
                logger.error("this is fucked: \uD83D\uDE21 \uD83D\uDE21 " +
                        "${response.statusCode} \uD83D\uDE21 ${response.text}")
            }

        }

    }

    private val mGson = Gson()

    private fun takeBestOffer(json: String, url: String, prof: InvestorProfileStateDTO?) {

        val obj = mGson.fromJson(json, InvoiceOfferDTO::class.java)
        if (obj != null) {
            val params1: MutableMap<String, String> = mutableMapOf()
            params1["offerId"] = obj.offerId
            val  supplierProf = getSupplierProfile(obj.supplier.identifier)
            val response2 = httpGet(
                    timeout = 990000000.0, params = params1,
                    url = "$url/bfn/supplier/acceptOffer")
            if (response2.statusCode == 200) {
                if (response2.text == "0") {
                    logger.info("\uD83E\uDD6C \uD83E\uDD6C Offer accepted for this investor: ${obj.investor.name}  \uD83D\uDD35 investor defaultDiscount: " +
                            "${prof?.defaultDiscount} \uD83E\uDD6C min: ${prof?.minimumInvoiceAmount} max: ${prof?.maximumInvoiceAmount}  " +
                            "\uD83D\uDD35 supplier max discount: ${supplierProf?.maximumDiscount}")
                } else {
                    logger.info("No offer accepted for this investor: ${obj.investor.name}  \uD83D\uDE21 " +
                            "defaultDiscount: ${prof?.defaultDiscount}  \uD83C\uDF4E min: ${prof?.minimumInvoiceAmount} max: ${prof?.maximumInvoiceAmount}" +
                            "\uD83D\uDD35 supplier max discount: ${supplierProf?.maximumDiscount}")
                }
            } else {
                logger.warn("\uD83D\uDE21 ERROR: ${response2.statusCode} ${response2.text}")
            }
        } else {
            logger.info("........ No offer accepted for this investor?  \uD83D\uDE21 " +
                    "defaultDiscount: ${prof?.defaultDiscount} \uD83C\uDF4E min: ${prof?.minimumInvoiceAmount} max: ${prof?.maximumInvoiceAmount}")
        }
    }

    private fun acceptAnchorOffers(url: String) {
        logger.info("\uD83C\uDF4E acceptAnchorOffers \uD83C\uDF4E")
        val aList = getOffers()
        var cnt = 0
        aList.forEach() {
            if (it.state.data.investor.name == "AnchorInvestor") {
                val supplierProfile = getSupplierProfile(it.state.data.supplier.identifier.id.toString())
                val params: MutableMap<String, String> = mutableMapOf()
                params["offerId"] = it.state.data.offerId
                val response = httpGet(
                        timeout = 990000000.0, params = params,
                        url = "$url/bfn/supplier/acceptOffer")
                cnt++
                if (response.statusCode == 200) {
                    if (response.text == "0") {
                        logger.info("\uD83C\uDF4E anchor offer accepted; \uD83C\uDF4F Offer #$cnt: \uD83C\uDF4F statusCode: " +
                                "\uD83C\uDF0D ${response.statusCode} \uD83C\uDF0D ${response.text}  " +
                                "\uD83D\uDD35 supplier max discount: ${supplierProfile?.maximumDiscount}")
                    } else {
                        logger.info("....... \uD83C\uDF1E acceptOffers; \uD83C\uDF4F this cookie already eaten, "+
                                "\uD83D\uDD35 supplier max discount: ${supplierProfile?.maximumDiscount}")
                    }
                } else {
                    logger.error("this is fucked: \uD83D\uDE21 \uD83D\uDE21 \uD83D\uDE21 ${response.text}")
                }
            }
        }
        val mList = getOffers()
        logger.info("\uD83C\uDF4E \uD83C\uDF4E Invoice offers left over on node : " +
                "\uD83C\uDF4E ${mList.size} \uD83C\uDF4E")
    }

    private fun generateAnchorOffers(url: String) {
        logger.info("\uD83C\uDF4E Generating Anchor Offers \uD83C\uDF4E")
        val response = httpGet(
                timeout = 990000000.0,
                url = "$url/bfn/admin/makeAnchorOffers")
        logger.info("\uD83C\uDF4E  generateAnchorOffers; RESPONSE: statusCode: " +
                "\uD83C\uDF00 ${response.statusCode} \uD83C\uDF00 ")
        if (response.statusCode > 200) {
            logger.info("\uD83D\uDC7F ERROR: \uD83D\uDC7F\n${response.text} \uD83D\uDC7F \uD83D\uDC7F")
        }

        getOffers()
    }

    private fun getOffers(): List<StateAndRef<InvoiceOfferState>> {
        val mList = proxyAnchorInvestor.vaultQueryByWithPagingSpec(
                contractStateType = InvoiceOfferState::class.java,
                criteria = QueryCriteria.VaultQueryCriteria(Vault.StateStatus.UNCONSUMED),
                paging = PageSpecification(1, 2000)
        ).states
        logger.info("\uD83D\uDC9A " +
                "\uD83C\uDF4E ${mList.size} unconsumed offers on Node \uD83C\uDF4E ")
        return mList
    }

    private fun printTotals() {
        getNodeTotals(proxyAnchorInvestor)
        getNodeTotals(proxyCustomer001)
        getNodeTotals(proxyNotary)
        getNodeTotals(proxyRegulator)

        getOfferAndTokens(proxyAnchorInvestor)
        logger.info("\n \uD83C\uDF38  \uD83C\uDF38  \uD83C\uDF38  \uD83C\uDF38  \uD83C\uDF38 ")
        getOfferAndTokens(proxyCustomer001)
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
        getThisNode(proxyNotary)

        val clientA = CordaRPCClient(nodeAddressPartyA)
        proxyAnchorInvestor = clientA.start(rpcUsername, rpcPassword).proxy
        getThisNode(proxyAnchorInvestor)

        val clientB = CordaRPCClient(nodeAddressPartyB)
        proxyCustomer001 = clientB.start(rpcUsername, rpcPassword).proxy
        getThisNode(proxyCustomer001)

        val clientReg = CordaRPCClient(nodeAddressRegulator)
        proxyRegulator = clientReg.start(rpcUsername, rpcPassword).proxy

        getThisNode(proxyRegulator)
        doNodesAndAggregates(proxyAnchorInvestor, proxyCustomer001, proxyRegulator)
    }

    private fun setupLocalNodes() {
        val nodeAddressNotary = NetworkHostAndPort(host = "localhost", port = 10019)
        val nodeAddressAnchor = NetworkHostAndPort(host = "localhost", port = 10006)
        val nodeAddressCustomer = NetworkHostAndPort(host = "localhost", port = 10009)
        val nodeAddressRegulator = NetworkHostAndPort(host = "localhost", port = 10017)
        val rpcUsername = "user1"
        val rpcPassword = "test"

        val clientNotary = CordaRPCClient(nodeAddressNotary)
        proxyNotary = clientNotary.start(rpcUsername, rpcPassword).proxy
        getThisNode(proxyNotary)

        val clientA = CordaRPCClient(nodeAddressAnchor)
        proxyAnchorInvestor = clientA.start(rpcUsername, rpcPassword).proxy
        getThisNode(proxyAnchorInvestor)

        val clientB = CordaRPCClient(nodeAddressCustomer)
        proxyCustomer001 = clientB.start(rpcUsername, rpcPassword).proxy
        getThisNode(proxyCustomer001)

        val clientReg = CordaRPCClient(nodeAddressRegulator)
        proxyRegulator = clientReg.start(rpcUsername, rpcPassword).proxy

        getThisNode(proxyRegulator)
        doNodesAndAggregates(proxyAnchorInvestor, proxyCustomer001, proxyRegulator)
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
                if (it.state.data.accountId == invoice.state.data.supplierInfo.identifier.id.toString()) {
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
                if (it.state.data.accountId == offer.state.data.supplier.identifier.id.toString()) {
                    logger.info("\uD83D\uDC8A \uD83D\uDC8A \uD83D\uDC8A  SUPPLIER PROFILE: " +
                            "${GSON.toJson(getDTO(it.state.data))} \uD83D\uDC8A  \uD83D\uDC8A ")
                }
            }
            investorProfiles.states.forEach() {
                if (it.state.data.accountId == offer.state.data.investor.identifier.id.toString()) {
                    logger.info("\uD83D\uDD31 \uD83D\uDD31 \uD83D\uDD31  INVESTOR PROFILE: " +
                            "${GSON.toJson(getDTO(it.state.data))} \uD83D\uDD31 \uD83D\uDD31 \uD83D\uDD31 \n\n")
                }
            }
        }

    }

    fun getDTO(state: InvoiceState): InvoiceDTO {

        return InvoiceDTO(
                amount = state.amount,
                customer = getDTO(state.customerInfo),
                supplier = getDTO(state.supplierInfo),
                description = state.description,
                invoiceId = state.invoiceId.toString(),
                invoiceNumber = state.invoiceNumber,
                dateRegistered = state.dateRegistered.toString(),
                valueAddedTax = state.valueAddedTax,
                totalAmount = state.totalAmount,
                externalId = state.externalId
        )
    }

    fun getDTO(state: InvoiceOfferState): InvoiceOfferDTO {
        return InvoiceOfferDTO(
                invoiceId = state.invoiceId.toString(),
                invoiceNumber = state.invoiceNumber,
                offerAmount = state.offerAmount,
                originalAmount = state.originalAmount,
                discount = state.discount,
                supplier = getDTO(state.supplier),
                investor = getDTO(state.investor),
                offerDate = state.offerDate,
                investorDate = state.acceptanceDate,
                accepted = state.accepted, externalId = state.externalId,
                acceptanceDate = state.acceptanceDate,
                offerId = state.offerId,
                isAnchor = state.isAnchor

        )
    }

    fun getDTO(a: AccountInfo): AccountInfoDTO {
        return AccountInfoDTO(
                host = a.host.toString(),
                identifier = a.identifier.id.toString(),
                name = a.name, status = "")
    }

    fun getDTO(a: InvestorProfileState): InvestorProfileStateDTO {
        return InvestorProfileStateDTO(
                issuedBy = a.issuedBy.toString(),
                accountId = a.accountId, date = a.date.toString(),
                defaultDiscount = a.defaultDiscount,
                maximumInvoiceAmount = a.maximumInvoiceAmount,
                totalInvestment = a.totalInvestment,
                minimumInvoiceAmount = a.minimumInvoiceAmount,
                bank = a.bank, bankAccount = a.bankAccount
        )
    }

    fun getDTO(a: SupplierProfileState): SupplierProfileStateDTO {
        return SupplierProfileStateDTO(
                issuedBy = a.issuedBy.toString(),
                accountId = a.accountId, date = a.date.toString(),
                maximumDiscount = a.maximumDiscount,
                bankAccount = a.bankAccount,
                bank = a.bank
        )
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

        val states = proxy.vaultQueryByWithPagingSpec(contractStateType = AnchorState::class.java,
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

    private fun startSupplierAccounts(numberOfAccounts: Int = 9, url: String) {

        logger.info(" \uD83D\uDE21 generating accounts for AnchorInvestor")
        val status = generateAccountsForNode(
                proxy = proxyAnchorInvestor,
                url = url,
                numberOfAccounts = numberOfAccounts)
        if (status == 200) {
            logger.info("\uD83E\uDD6C  Successfully generated AnchorInvestor accounts")
        } else {
            logger.info("Houston, we down, \uD83D\uDCA6 status :  $status ")
        }

    }

    private fun generateProfiles() {

        logger.info(" \uD83D\uDE21 generating profiles for Anchor")
        makeProfilesForNode(proxyAnchorInvestor, "http://localhost:10050")
        logger.info(" \uD83D\uDE21 generating profiles forCustomer001")
        makeProfilesForNode(proxyCustomer001, "http://localhost:10053")


    }

    private fun generateInvoices(url: String) {

        logger.info("\uD83D\uDE21 generateInvoices for Customer001 \uD83D\uDE21 \uD83D\uDE21 ")
        if (customer == null) {
            logger.info("\uD83D\uDD06 \uD83D\uDD06 Finding customer on Anchor Node ...")
            val page = proxyAnchorInvestor.vaultQueryByWithPagingSpec(
                    contractStateType = AccountInfo::class.java,
                    criteria = QueryCriteria.VaultQueryCriteria(Vault.StateStatus.UNCONSUMED),
                    paging = PageSpecification(1, 2000)).states
            logger.info("\uD83D\uDD35 \uD83D\uDD35 " +
                    "Accounts on Anchor node: ${page.size}")

            page.forEach() {
                if (it.state.data.name == "Customer001") {
                    customer = getDTO(it.state.data)
                }
            }

        }
        if (customer == null) {
            throw IllegalArgumentException("Customer001 not found, cannot continue, Boss!")
        }
        logger.info("CUSTOMER \uD83D\uDE0E " +
                "to be used for invoice generation: \uD83D\uDE0E " +
                "${GSON.toJson(customer!!)} \uD83D\uDE0E")
        val mGson = Gson()
        val json = mGson.toJson(customer!!)
        val obj = JSONObject(json);

        val response = httpGet(
                timeout = 990000000.0, json = obj,
                url = "$url/bfn/admin/generateInvoices")
        logger.info("\uD83C\uDF4E generateInvoices RESPONSE: \uD83D\uDD39 statusCode: ${response.statusCode}  " +
                response.text)


    }

    private fun createAnchor(url: String) {

        val mx: MutableList<TradeMatrix> = mutableListOf()
        logger.info("\uD83D\uDE21 createAnchor for Node \uD83D\uDE21 \uD83D\uDE21 ")
        logger.info("\uD83D\uDE21 deleting Firebase auth users and collections \uD83D\uDE21 \uD83D\uDE21 ")
        val response0 = httpGet(
                timeout = 990000000.0,
                url = "$url/bfn/admin/deleteFirebase")
        logger.info("\uD83C\uDF4E deleteFirebase; RESPONSE: statusCode: " +
                "${response0.statusCode} - ${response0.text}")

        val a = AnchorDTO(
                minimumInvoiceAmount = 100000.00,
                maximumInvoiceAmount = 20000000.00,
                maximumInvestment = 1000000000.00,
                defaultOfferDiscount = 8.8,
                name = "AnchorInvestor",
                email = "anchor1@bfn.com",
                cellphone = "+27710441887",
                tradeFrequencyInMinutes = 240,
                tradeMatrices = mx,
                date = todaysDate(),
                password = "bfnanchor33",
                uid = UUID.randomUUID().toString(),
                issuedBy = "TBD", accountId = "TBD"

        )

        val m2 = TradeMatrix(
                startInvoiceAmount = 2000001.00,
                endInvoiceAmount = 300000.00,
                offerDiscount = 8.3,
                date = todaysDate()
        )
        val m3 = TradeMatrix(
                startInvoiceAmount = 300001.00,
                endInvoiceAmount = 400000.00,
                offerDiscount = 7.9,
                date = todaysDate()
        )
        val m4 = TradeMatrix(
                startInvoiceAmount = 400001.00,
                endInvoiceAmount = 500000.00,
                offerDiscount = 7.4,
                date = todaysDate()
        )
        val m5 = TradeMatrix(
                startInvoiceAmount = 500001.00,
                endInvoiceAmount = 1000000.00,
                offerDiscount = 5.5,
                date = todaysDate())
        val m6 = TradeMatrix(
                startInvoiceAmount = 1000001.00,
                endInvoiceAmount = 10000000.00,
                offerDiscount = 4.2,
                date = todaysDate())
        val m7 = TradeMatrix(
                startInvoiceAmount = 10000001.00,
                endInvoiceAmount = 100000000.00,
                offerDiscount = 3.1,
                date = todaysDate())

        a.tradeMatrices = mutableListOf(m2, m3, m4, m5, m6, m7)
        val mGson = Gson()
        val json = mGson.toJson(a)
        val jsonObject = JSONObject(json)
        logger.info("\uD83C\uDF4E Anchor about to be created: ${GSON.toJson(a)} \uD83C\uDF4E")
        val response = httpPost(
                json = jsonObject,
                timeout = 990000000.0,
                url = "$url/bfn/admin/createAnchor")

        logger.info("\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E create Anchor; RESPONSE: statusCode: " +
                "🌍 ${response.statusCode} 🌍  - ${response.text}")

    }

    var customer: AccountInfoDTO? = null
    val random = Random(Date().time)

    private fun createCustomer(url: String) {
        val user = UserDTO(name = "Customer001",
                password = "customer#001$",
                cellphone = "+27710441887",
                email = "customer001@bfn.com")

        val mGson = Gson()
        val jsonObject = JSONObject(mGson.toJson(user))
        val response = httpPost(
                json = jsonObject,
                timeout = 990000000.0,
                url = "$url/bfn/admin/startAccountRegistrationFlow")

        customer = GSON.fromJson(response.text, AccountInfoDTO::class.java)
        logger.info("\uD83C\uDF4E  create Customer; RESPONSE: " +
                "statusCode: 🌍 ${response.statusCode} 🌍   " +
                response.text)
        //todo - write to Firebase auth .....
    }

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

    private fun generateCasualOffers() {
        logger.info("\uD83D\uDE21 generate Offers for non-anchor investors  \uD83D\uDE21  \uD83D\uDE21 ")
        val accts = getAccounts(proxyAnchorInvestor)
        logger.info("\uD83D\uDE3C \uD83D\uDE3C accounts from node: \uD83C\uDF3A ${accts.size}, calling makeInvoiceOffers ...")
        getOffers()
        accts.forEach() {
            if (it.name == "AnchorInvestor" || it.name == "Customer001") {
                logger.info("Ignore accounts: Anchor & Customer")
            } else {
                val supplierProfile = getSupplierProfile(it.identifier.id.toString())
                val investorProfile = getInvestorProfile(it.identifier.id.toString())
                val params: MutableMap<String, String> = mutableMapOf()
                params["investorId"] = it.identifier.id.toString()
                val response = httpGet(
                        timeout = 990000000.0, params = params,
                        url = "http://localhost:10050/bfn/admin/makeInvoiceOffers")
                if (response.statusCode == 200) {
                    val arr = JSONArray(response.text)
                    logger.info("\uD83D\uDE3C Made \uD83D\uDD39 ${arr.length()} \uD83D\uDD39 offers based on profile for: " +
                            "${it.name} \uD83C\uDF3A investor defaultDiscount: ${investorProfile?.defaultDiscount} " +
                            " \uD83C\uDF4F supplier max Discount: ${supplierProfile?.maximumDiscount}")
                } else {
                    logger.warn("\uD83C\uDF4E RESPONSE: statusCode: 🌍 ${response.statusCode} 🌍   ${response.text}")
                }
            }
        }
        getOffers()

    }

    private fun generateAccountsForNode(proxy: CordaRPCOps, url: String, numberOfAccounts: Int): Int {
        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 " +
                "\uD83D\uDD35 \uD83D\uDD35 generateAccounts: $url ")
        val params: MutableMap<String, String> = mutableMapOf()
        params["numberOfAccounts"] = numberOfAccounts.toString()
        val response = httpGet(
                timeout = 990000000.0,
                url = "$url/bfn/admin/demo",
                params = params)

        logger.info("\uD83C\uDF4E RESPONSE: statusCode: 🌍 ${response.statusCode} 🌍   " +
                "\uD83C\uDF4E ${response.text}")
        makeProfilesForNode(proxy, url)


        return response.statusCode
    }

    private fun makeProfilesForNode(proxy: CordaRPCOps, url: String) {
        val page = proxy.vaultQuery(AccountInfo::class.java)
        var cnt = 0
        page.states.forEach() {
            if (it.state.data.name == "AnchorInvestor" || it.state.data.name == "Customer001") {
                logger.info("Ignore anchor and Customer001. \uD83C\uDF3A No need to create profiles")
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
                accountId = it.state.data.identifier.id.toString(),
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
        val resp = httpPost(
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
                accountId = account.state.data.identifier.id.toString(),
                date = todaysDate(),
                bankAccount = (random.nextInt(123445) * 132647).toString(),
                bank = "BlackOx Investment Bank",
                maximumDiscount = disc,
                issuedBy = "moi"
        )
        val mGson = Gson()
        val json = mGson.toJson(prof)
        val jsonObject = JSONObject(json)
        val resp = httpPost(
                url = "$url/bfn/admin/createSupplierProfile",
                json = jsonObject,
                timeout = 8000000000.0
        )
        logger.info("\uD83E\uDD8A Create SUPPLIER profile for \uD83C\uDF3A ${account.state.data.name} " +
                "- RESPONSE: statusCode: \uD83C\uDF0D ${resp.statusCode} \uD83C\uDF0D")
    }

    private fun doNodesAndAggregates(proxyAnchor: CordaRPCOps, proxyCustomer: CordaRPCOps, proxyReg: CordaRPCOps) {
        logger.info("++++++++++++++  \uD83C\uDFC0 \uD83C\uDFC0 \uD83C\uDFC0 CORDA NODES \uD83C\uDFC0 \uD83C\uDFC0 \uD83C\uDFC0 ++++++++++++++++++++++++\n")
        getNodes(proxyAnchor)
        //
        logger.info("++++++++++++++   AnchorInvestor \uD83C\uDF4A ${proxyAnchor.nodeInfo().addresses.first()} " +
                " \uD83E\uDD6C ${proxyAnchor.nodeInfo().legalIdentities.first().name} \uD83C\uDFC0 \uD83C\uDFC0 \uD83C\uDFC0 ++++++++++++++++++++++++\n")
        getAggregates(proxyAnchor)
        logger.info("++++++++++++++   Customer001 \uD83C\uDF4A ${proxyCustomer.nodeInfo().addresses.first()}  " +
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

    private fun getThisNode(proxy: CordaRPCOps) {
        val me = proxy.nodeInfo()
        logger.info("\uD83E\uDD6C \uD83E\uDD6C I am connected to Corda node: " +
                "\uD83E\uDD6C ${me.legalIdentities.first()}")
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
