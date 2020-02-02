package com.bfn.client.local

import com.bfn.client.dto.*
import com.bfn.contractstates.states.*
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
import java.util.*
import kotlin.collections.MutableList
import kotlin.collections.MutableMap
import kotlin.collections.first
import kotlin.collections.forEach
import kotlin.collections.mutableListOf
import kotlin.collections.mutableMapOf
import kotlin.collections.set
import kotlin.collections.sortedBy
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

    lateinit var proxyPartyA: CordaRPCOps
    lateinit var proxyPartyB: CordaRPCOps
    lateinit var proxyPartyC: CordaRPCOps
    lateinit var proxyReg: CordaRPCOps

    fun main(args: Array<String>) {

        setupLocalNodes()
//        startAccounts(generateAccounts = true, deleteFirestore = true, numberOfAccounts = 10);
//        startAccounts(generateAccounts = true, deleteFirestore = false, numberOfAccounts = 20);

//        startAccounts(true, deleteFirestore = false);
//        generateCrossNodeInvoices(0, 1)
//        generateCrossNodeInvoices(1, 4)
//        generateCrossNodeInvoices(2, 5)

//        logger.info(" HOUR : ${1000 * 60 * 60}")
//        generateInvoices(0, 36)
//        generateInvoices(1, 40)
//        generateInvoices(2, 50)
//
//        generateProfiles()
//
//        generateOffers(0)
//        generateOffers(1)
//        generateOffers(2)
////
//        generateOffers(0)
//        generateOffers(1)
//        generateOffers(2)
//////.
//        printTotals()
//
//        findBestOffers(proxyPartyA)
//        findBestOffers(proxyPartyB)
//        findBestOffers(proxyPartyC)
//////
//        printTotals()
//        getRegulatorTotals(proxyReg)
//
//        printInvoices(proxyPartyA, consumed = false)
//        printInvoices(proxyPartyB, consumed = false)
//        printInvoices(proxyPartyC, consumed = false)
//
//        printProfiles(proxyPartyA)
//        printProfiles(proxyPartyB)
//        printProfiles(proxyPartyC)

    }

    private fun printTotals() {
        getNodeTotals(proxyPartyA)
        getNodeTotals(proxyPartyB)
        getNodeTotals(proxyPartyC)
        getNodeTotals(proxyReg)

        getOfferAndTokens(proxyPartyA)
        logger.info("\n \uD83C\uDF38  \uD83C\uDF38  \uD83C\uDF38  \uD83C\uDF38  \uD83C\uDF38 ")
        getOfferAndTokens(proxyPartyB)
        logger.info("\n \uD83C\uDF38  \uD83C\uDF38  \uD83C\uDF38  \uD83C\uDF38  \uD83C\uDF38 ")
        getOfferAndTokens(proxyPartyC)
        logger.info("\n \uD83C\uDF38  \uD83C\uDF38  \uD83C\uDF38  \uD83C\uDF38  \uD83C\uDF38 ")
        getOfferAndTokens(proxyReg)
    }

    private fun setupRemoteNodes() {
        val nodeAddressNotary = NetworkHostAndPort(host = "localhost", port = 10019)
        val nodeAddressPartyA = NetworkHostAndPort(host = "localhost", port = 10006)
        val nodeAddressPartyB = NetworkHostAndPort(host = "localhost", port = 10009)
        val nodeAddressRegulator = NetworkHostAndPort(host = "localhost", port = 10017)
        val rpcUsername = "user1"
        val rpcPassword = "test"

        val clientNotary = CordaRPCClient(nodeAddressNotary)
        val proxyNotary = clientNotary.start(rpcUsername, rpcPassword).proxy
        getThisNode(proxyNotary)

        val clientA = CordaRPCClient(nodeAddressPartyA)
        proxyPartyA = clientA.start(rpcUsername, rpcPassword).proxy
        getThisNode(proxyPartyA)

        val clientB = CordaRPCClient(nodeAddressPartyB)
        proxyPartyB = clientB.start(rpcUsername, rpcPassword).proxy
        getThisNode(proxyPartyB)

        val clientReg = CordaRPCClient(nodeAddressRegulator)
        proxyReg = clientReg.start(rpcUsername, rpcPassword).proxy

        getThisNode(proxyReg)
        doNodesAndAggregates(proxyPartyA, proxyPartyB, proxyPartyC, proxyReg)
    }
    private fun setupLocalNodes() {
        val nodeAddressNotary = NetworkHostAndPort(host = "localhost", port = 10019)
        val nodeAddressPartyA = NetworkHostAndPort(host = "localhost", port = 10006)
        val nodeAddressPartyB = NetworkHostAndPort(host = "localhost", port = 10009)
        val nodeAddressRegulator = NetworkHostAndPort(host = "localhost", port = 10017)
        val rpcUsername = "user1"
        val rpcPassword = "test"

        val clientNotary = CordaRPCClient(nodeAddressNotary)
        val proxyNotary = clientNotary.start(rpcUsername, rpcPassword).proxy
        getThisNode(proxyNotary)

        val clientA = CordaRPCClient(nodeAddressPartyA)
        proxyPartyA = clientA.start(rpcUsername, rpcPassword).proxy
        getThisNode(proxyPartyA)

        val clientB = CordaRPCClient(nodeAddressPartyB)
        proxyPartyB = clientB.start(rpcUsername, rpcPassword).proxy
        getThisNode(proxyPartyB)

        val clientReg = CordaRPCClient(nodeAddressRegulator)
        proxyReg = clientReg.start(rpcUsername, rpcPassword).proxy

        getThisNode(proxyReg)
        doNodesAndAggregates(proxyPartyA, proxyPartyB, proxyPartyC, proxyReg)
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
        logger.info("\uD83E\uDD6D \uD83E\uDD6D \uD83E\uDD6D \uD83E\uDD6D Print invoices for ${proxy.nodeInfo().legalIdentities.first()}")
        val criteriaConsumed = QueryCriteria.VaultQueryCriteria(status = Vault.StateStatus.CONSUMED)
        val criteriaUnConsumed = QueryCriteria.VaultQueryCriteria(status = Vault.StateStatus.UNCONSUMED)
        val page: Vault.Page<InvoiceState>
        if (consumed) {
            page = proxy.vaultQueryByWithPagingSpec(
                    contractStateType = InvoiceState::class.java,
                    criteria = criteriaConsumed,
                    paging = PageSpecification(1, 5000))
        } else {
            page = proxy.vaultQueryByWithPagingSpec(
                    contractStateType = InvoiceState::class.java,
                    criteria = criteriaUnConsumed,
                    paging = PageSpecification(1, 5000))
        }
        page.states.forEach() {
            logger.info("\uD83E\uDDE9\uD83E\uDDE9\uD83E\uDDE9\uD83E\uDDE9 " +
                    "${GSON.toJson(getDTO(it.state.data))} \uD83E\uDDE9\uD83E\uDDE9")
        }

    }

    fun getDTO(state: InvoiceState): InvoiceDTO {
        val invoice = InvoiceDTO()
        invoice.amount = state.amount
        invoice.customer = getDTO(state.customerInfo)
        invoice.supplier = getDTO(state.supplierInfo)
        invoice.description = state.description
        invoice.invoiceId = state.invoiceId.toString()
        invoice.invoiceNumber = state.invoiceNumber
        invoice.dateRegistered = state.dateRegistered
        invoice.valueAddedTax = state.valueAddedTax
        invoice.totalAmount = state.totalAmount
        return invoice
    }

    fun getDTO(state: InvoiceOfferState): InvoiceOfferDTO {
        val o = InvoiceOfferDTO()
        o.invoiceId = state.invoiceId.toString()
        o.invoiceNumber = state.invoiceNumber
        o.offerAmount = state.offerAmount
        o.originalAmount = state.originalAmount
        o.discount = state.discount
        o.supplier = getDTO(state.supplier)
        o.investor = getDTO(state.investor)
        o.customer = getDTO(state.customer)

        o.offerDate = state.offerDate
        o.investorDate = state.ownerDate
        return o
    }

    fun getDTO(a: AccountInfo): AccountInfoDTO {
        val info = AccountInfoDTO()
        info.host = a.host.toString()
        info.identifier = a.identifier.id.toString()
        info.name = a.name
        return info
    }

    fun getDTO(a: InvestorProfileState): InvestorProfileStateDTO {
        return InvestorProfileStateDTO(
                issuedBy = a.issuedBy.toString(),
                accountId = a.accountId, date = a.date,
                defaultDiscount = a.defaultDiscount,
                maximumInvoiceAmount = a.maximumInvoiceAmount,
                totalInvestment = a.totalInvestment,
                minimumInvoiceAmount = a.minimumInvoiceAmount
        )
    }

    fun getDTO(a: SupplierProfileState): SupplierProfileStateDTO {
        return SupplierProfileStateDTO(
                issuedBy = a.issuedBy.toString(),
                accountId = a.accountId, date = a.date,
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

    private fun startAccounts(generateAccounts: Boolean = false, deleteFirestore: Boolean = false, numberOfAccounts: Int = 9) {
        if (generateAccounts) {
            logger.info(" \uD83D\uDE21 generating accounts for PARTY A")
            var status = startAccountsForNode(
                    proxy = proxyPartyA,
                    url = "http://localhost:10050",
                    deleteFirestore = deleteFirestore, numberOfAccounts = numberOfAccounts)
            if (status == 200) {
                logger.info("\uD83E\uDD6C  Successfully generated Party A accounts")
            } else {
                logger.info("Houston, we down, \uD83D\uDCA6 status :  $status ")
            }

            logger.info("\uD83D\uDE21 generating accounts for PARTY B")
            status = startAccountsForNode(
                    proxy = proxyPartyB,
                    url = "http://localhost:10053",
                    deleteFirestore = false, numberOfAccounts = numberOfAccounts)
            if (status == 200) {
                logger.info("\uD83E\uDD6C Successfully generated Party B accounts")
            } else {
                logger.info("Houston, we down, \uD83D\uDCA6 status :  $status ")
            }
            logger.info("\uD83D\uDE21 generating accounts for PARTY C")
            status = startAccountsForNode(
                    proxy = proxyPartyC,
                    url = "http://localhost:10056",
                    deleteFirestore = false, numberOfAccounts = numberOfAccounts)
            if (status == 200) {
                logger.info("\uD83E\uDD6C Successfully generated Party C accounts")
            } else {
                logger.info("Houston, we down, \uD83D\uDCA6 status :  $status ")
            }
        } else {
            logger.info("Generating data .. \uD83D\uDCA6 but we are not generating accounts")
        }


    }

    private fun generateProfiles() {

        logger.info(" \uD83D\uDE21 generating profiles for PARTY A")
        makeProfilesForNode(proxyPartyA, "http://localhost:10050")
        logger.info(" \uD83D\uDE21 generating profiles for PARTY B")
        makeProfilesForNode(proxyPartyB, "http://localhost:10053")
        logger.info(" \uD83D\uDE21 generating profiles for PARTY C")
        makeProfilesForNode(proxyPartyC, "http://localhost:10056")

    }

    private fun generateInvoices(index: Int, max: Int = 1) {
        var params: MutableMap<String, String> = mutableMapOf()
        params["max"] = max.toString()
        when (index) {
            0 -> {
                logger.info("\uD83D\uDE21  generateInvoices for PARTY A  \uD83D\uDE21  \uD83D\uDE21 ")
                val response = httpGet(
                        timeout = 990000000.0, params = params,
                        url = "http://localhost:10050/admin/generateInvoices")
                logger.info("\uD83C\uDF4E  RESPONSE: statusCode: ${response.statusCode}  " +
                        response.text)
            }
            1 -> {

                logger.info("\uD83D\uDE21  generateInvoices for PARTY B  \uD83D\uDE21  \uD83D\uDE21 ")
                val response2 = httpGet(
                        timeout = 990000000.0, params = params,
                        url = "http://localhost:10053/admin/generateInvoices")
                logger.info("\uD83C\uDF4E RESPONSE: statusCode: ${response2.statusCode}  " +
                        response2.text)
            }
            2 -> {
                logger.info("\uD83D\uDE21  generateInvoices for PARTY C  \uD83D\uDE21  \uD83D\uDE21 ")
                val response3 = httpGet(
                        timeout = 990000000.0, params = params,
                        url = "http://localhost:10056/admin/generateInvoices")
                logger.info("\uD83C\uDF4E  RESPONSE: statusCode: ${response3.statusCode}  " +
                        response3.text)
            }
        }


    }

    private fun generateCrossNodeInvoices(index: Int, max: Int = 1) {
        var params: MutableMap<String, String> = mutableMapOf()
        params["max"] = max.toString()
        when (index) {
            0 -> {
                logger.info("\uD83D\uDE21  generateCrossNodeInvoices for PARTY A  \uD83D\uDE21  \uD83D\uDE21 ")
                val response = httpGet(
                        timeout = 990000000.0, params = params,
                        url = "http://localhost:10050/admin/generateCrossNodeInvoices")
                logger.info("\uD83C\uDF4E  RESPONSE: statusCode: ${response.statusCode}  " +
                        response.text)
            }
            1 -> {

                logger.info("\uD83D\uDE21  generateCrossNodeInvoices for PARTY B  \uD83D\uDE21  \uD83D\uDE21 ")
                val response2 = httpGet(
                        timeout = 990000000.0, params = params,
                        url = "http://localhost:10053/admin/generateCrossNodeInvoices")
                logger.info("\uD83C\uDF4E RESPONSE: statusCode: ${response2.statusCode}  " +
                        response2.text)
            }
            2 -> {
                logger.info("\uD83D\uDE21  generateCrossNodeInvoices for PARTY C  \uD83D\uDE21  \uD83D\uDE21 ")
                val response3 = httpGet(
                        timeout = 990000000.0, params = params,
                        url = "http://localhost:10056/admin/generateCrossNodeInvoices")
                logger.info("\uD83C\uDF4E  RESPONSE: statusCode: ${response3.statusCode}  " +
                        response3.text)
            }
        }


    }

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

    private fun makeOffers(accts: List<AccountInfo>, port: String) {
        logger.info("\uD83D\uDE3C \uD83D\uDE3C accounts from node: \uD83C\uDF3A ${accts.size}, calling makeInvoiceOffers ...")
        accts.forEach() {
            val params: MutableMap<String, String> = mutableMapOf()
            params["investorId"] = it.identifier.id.toString()
            val response = httpGet(
                    timeout = 990000000.0, params = params,
                    url = "http://localhost:$port/admin/makeInvoiceOffers")
            if (response.statusCode == 200) {
                val arr = JSONArray(response.text)
                logger.info("\uD83D\uDE3C Made \uD83D\uDD39 ${arr.length()} \uD83D\uDD39 offers based on profile for: ${it.name} \uD83C\uDF3A")
            } else {
                logger.warn("\uD83C\uDF4E RESPONSE: statusCode: ${response.statusCode}  ${response.text}")
            }
        }
    }

    private fun generateOffers(index: Int) {
        when (index) {
            0 -> {
                logger.info("\uD83D\uDE21 generateOffers for PARTY A  \uD83D\uDE21  \uD83D\uDE21 ")
                val accts = getAccounts(proxyPartyA)
                makeOffers(accts, "10050")

            }
            1 -> {
                logger.info("\uD83D\uDE21 generateOffers for PARTY B  \uD83D\uDE21  \uD83D\uDE21 ")
                val accts = getAccounts(proxyPartyB)
                makeOffers(accts, "10053")

            }
            2 -> {
                logger.info("\uD83D\uDE21 generateOffers for PARTY C  \uD83D\uDE21  \uD83D\uDE21 ")
                val accts = getAccounts(proxyPartyC)
                makeOffers(accts, "10056")
            }
        }


    }

    private fun startAccountsForNode(proxy: CordaRPCOps, url: String,
                                     deleteFirestore: Boolean, numberOfAccounts: Int): Int {
        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 " +
                "\uD83D\uDD35 \uD83D\uDD35 generateAccounts: $url deleteFirestore: $deleteFirestore")
        val params: MutableMap<String, String> = mutableMapOf()
        params["deleteFirestore"] = deleteFirestore.toString()
        params["numberOfAccounts"] = numberOfAccounts.toString()
        val response = httpGet(
                timeout = 990000000.0,
                url = "$url/admin/demo",
                params = params)

        logger.info("\uD83C\uDF4E RESPONSE: statusCode: ${response.statusCode}  " +
                "\uD83C\uDF4E ${response.text}")
        makeProfilesForNode(proxy, url)


        return response.statusCode
    }

    private fun makeProfilesForNode(proxy: CordaRPCOps, url: String) {
        val page = proxy.vaultQuery(AccountInfo::class.java)
        page.states.forEach() {
            if (it.state.data.host.toString() == proxy.nodeInfo().legalIdentities.first().toString()) {
                addInvestorProfile(it, url)
                addSupplierProfile(it, url)
            }
        }
    }

    private fun addInvestorProfile(it: StateAndRef<AccountInfo>, url: String) {
        var disc = random.nextInt(10) * 1.5
        if (disc < 3.0) {
            disc = 3.5
        }
        val investorProfile = InvestorProfileStateDTO(
                issuedBy = "thisNode", accountId = it.state.data.identifier.id.toString(),
                date = Date(),
                defaultDiscount = disc,
                minimumInvoiceAmount = random.nextInt(100) * 1000.0,
                totalInvestment = 900000000.0,
                maximumInvoiceAmount = 750000.0
        )
        val params: MutableMap<String, String> = mutableMapOf()
        params["issuedBy"] = "me"
        params["accountId"] = investorProfile.accountId
        params["date"] = "2020-01-01"
        params["defaultDiscount"] = investorProfile.defaultDiscount.toString()
        params["minimumInvoiceAmount"] = investorProfile.minimumInvoiceAmount.toString()
        params["totalInvestment"] = investorProfile.totalInvestment.toString()
        params["maximumInvoiceAmount"] = investorProfile.maximumInvoiceAmount.toString()

        val resp = httpPost(
                url = "$url/admin/createInvestorProfile",
                json = params,
                timeout = 8000000000.0
        )
        logger.info("\uD83D\uDE0E Created INVESTOR profile for \uD83C\uDF3A ${it.state.data.name} - RESPONSE: statusCode: ${resp.statusCode}  " +
                "\uD83D\uDE0E  ${resp.text}")
    }

    private fun addSupplierProfile(account: StateAndRef<AccountInfo>, url: String) {
        var disc = random.nextInt(5) * 1.5
        if (disc < 2.0) {
            disc = 5.5
        }
        val supplierProfile = SupplierProfileStateDTO(
                issuedBy = "thisNode",
                accountId = account.state.data.identifier.id.toString(),
                date = Date(),
                maximumDiscount = disc, bank = "Standard Bank", bankAccount = "12346787"
        )
        val params: MutableMap<String, String> = mutableMapOf()
        params["issuedBy"] = "me"
        params["accountId"] = supplierProfile.accountId
        params["date"] = "2020-01-01"
        params["maximumDiscount"] = supplierProfile.maximumDiscount.toString()

        val resp = httpPost(
                url = "$url/admin/createSupplierProfile",
                json = params,
                timeout = 8000000000.0
        )
        logger.info("\uD83E\uDD8A Created SUPPLIER profile for \uD83C\uDF3A ${account.state.data.name} - RESPONSE: statusCode: ${resp.statusCode}  " +
                "\uD83E\uDD8A ${resp.text}")
    }

    private fun doNodesAndAggregates(proxyPartyA: CordaRPCOps, proxyPartyB: CordaRPCOps, proxyPartyC: CordaRPCOps, proxyReg: CordaRPCOps) {
        logger.info("\n++++++++++++++   NODES \uD83C\uDFC0 \uD83C\uDFC0 \uD83C\uDFC0 ++++++++++++++++++++++++\n")
        getNodes(proxyPartyA)
        //
        logger.info("\n++++++++++++++   PARTYA \uD83C\uDF4A ${proxyPartyA.nodeInfo().addresses.first()} " +
                " \uD83E\uDD6C ${proxyPartyA.nodeInfo().legalIdentities.first().name} \uD83C\uDFC0 \uD83C\uDFC0 \uD83C\uDFC0 ++++++++++++++++++++++++\n")
        getAggregates(proxyPartyA)
        logger.info("\n++++++++++++++   PARTYB \uD83C\uDF4A ${proxyPartyB.nodeInfo().addresses.first()}  " +
                " \uD83E\uDD6C ${proxyPartyB.nodeInfo().legalIdentities.first().name} \uD83C\uDFC0 \uD83C\uDFC0 \uD83C\uDFC0 ++++++++++++++++++++++++\n")
        getAggregates(proxyPartyB)
        logger.info("\n++++++++++++++   PARTYC \uD83C\uDF4A ${proxyPartyC.nodeInfo().addresses.first()} " +
                " \uD83E\uDD6C ${proxyPartyC.nodeInfo().legalIdentities.first().name} \uD83C\uDFC0 \uD83C\uDFC0 \uD83C\uDFC0 ++++++++++++++++++++++++\n")
        getAggregates(proxyPartyC)
        logger.info("\n++++++++++++++   REGULATOR \uD83C\uDF4A ${proxyReg.nodeInfo().addresses.first()} " +
                " \uD83E\uDD6C ${proxyReg.nodeInfo().legalIdentities.first().name} \uD83C\uDFC0 \uD83C\uDFC0 \uD83C\uDFC0 ++++++++++++++++++++++++\n")
        getAggregates(proxyReg)

        //        getFlows(proxyPartyA)
        //        getFlows(proxyPartyB)
        //        getFlows(proxyPartyC)
        //        getFlows(proxyReg)
        //        getFlows(proxyNotary)
    }

    private fun getFlows(proxy: CordaRPCOps) {
        logger.info("\n\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35  \uD83C\uDF81 " +
                "Registered flows for:  \uD83D\uDD06 ${proxy.nodeInfo().legalIdentities.first()}")
        proxy.registeredFlows().forEach() {
            logger.info(" \uD83C\uDF81 Registered flow:  \uD83D\uDD06 $it")
        }
    }

    private fun getThisNode(proxy: CordaRPCOps) {
        val me = proxy.nodeInfo();
        logger.info("\uD83E\uDD6C \uD83E\uDD6C I am connected to (p2pPort): \uD83E\uDD6C ${me.addresses.first()} - \uD83C\uDF4A - ${me.legalIdentities.first()}")
    }

    private fun getNodes(proxy: CordaRPCOps) {
        val nodes = proxy.networkMapSnapshot()
        nodes.forEach() {
            logger.info("\uD83D\uDC9A \uD83D\uDC99 \uD83D\uDC9C Node found: \uD83D\uDC9A ${it.addresses.first()}  \uD83C\uDF00 \uD83C\uDF00 ${it.legalIdentities.first()}")
        }
        logger.info("\uD83C\uDD7F️ \uD83C\uDD7F️ \uD83C\uDD7F️ Nodes: ${nodes.size}")
        val notary = proxy.notaryIdentities().first();
        logger.info("\uD83D\uDD31 \uD83D\uDD31 Notary is \uD83D\uDD31 ${notary.name}")
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
        logger.info("Local Accounts on Node: ♻️ $cnt ♻️")
        logger.info("Remote Accounts on Node: ♻️ $cnt2 ♻️")

        val profiles = proxy.vaultQueryByWithPagingSpec(criteria = criteria,
                contractStateType = InvestorProfileState::class.java,
                paging = PageSpecification(pageNumber = 1, pageSize = 2000))

        logger.info("Local Profiles on Node: ♻️ ${profiles.totalStatesAvailable} ♻️")
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
        logger.info("Local Invoices on Node: ♻️ $cnt♻️")
        logger.info("Remote Invoices on Node: ♻️ $cnt2♻️")

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

        logger.info("Local InvoiceOffers on Node: ♻️ $cnt ♻️")
        logger.info("Remote InvoiceOffers on Node: ♻️ $cnt2 ♻️")
    }

    private fun getAccountDetails(proxy: CordaRPCOps) {
        val criteria = QueryCriteria.VaultQueryCriteria(status = Vault.StateStatus.UNCONSUMED)
        val page = proxy.vaultQueryByCriteria(criteria = criteria, contractStateType = AccountInfo::class.java)
        var cnt = 1
        val sorted = page.states.sortedBy { it.state.data.name }
        sorted.forEach() {
            logger.info("\uD83E\uDDE9\uD83E\uDDE9 Account #$cnt \uD83E\uDDE9 ${it.state.data}")
            cnt++

        }
        logger.info("Accounts on Node: ♻️ ${page.states.size} ♻️")


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
        logger.info("Invoices on Node: ♻️ ${pageInvoices.states.size} ♻️")

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
        logger.info("\n\nInvoiceOffers on Node: ♻️ ${page.totalStatesAvailable} ♻️")
        logger.info("InvoiceOffers gathered: ♻️ ${mList.size} ♻️")
        selectBestOffers()

    }

    private fun selectBestOffers() {
        val map: MutableMap<String, InvoiceOfferState> = mutableMapOf()
        mList.forEach() {
            map[it.invoiceId.toString()] = it
        }

        var cnt = 1
        map.forEach() {
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
        page.states.forEach() {
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
