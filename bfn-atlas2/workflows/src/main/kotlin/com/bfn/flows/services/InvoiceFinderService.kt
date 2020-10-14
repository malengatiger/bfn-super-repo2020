package com.bfn.flows.services

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.states.InvoiceOfferState
import com.bfn.contractstates.states.InvoiceState
import com.r3.corda.lib.accounts.workflows.services.KeyManagementBackedAccountService
import net.corda.core.contracts.StateAndRef
import net.corda.core.identity.Party
import net.corda.core.node.AppServiceHub
import net.corda.core.node.services.CordaService
import net.corda.core.node.services.Vault
import net.corda.core.node.services.queryBy
import net.corda.core.node.services.vault.DEFAULT_PAGE_NUM
import net.corda.core.node.services.vault.PageSpecification
import net.corda.core.node.services.vault.QueryCriteria
import net.corda.core.serialization.SingletonSerializeAsToken
import org.slf4j.LoggerFactory
import java.math.BigDecimal
import java.security.PublicKey
import java.util.*

@CordaService
class InvoiceFinderService(private val serviceHub: AppServiceHub) : SingletonSerializeAsToken() {
    private val accountService: KeyManagementBackedAccountService =
            serviceHub.cordaService(KeyManagementBackedAccountService::class.java)

    @Suspendable
     fun findInvoiceStateAndRef(invoiceId: String): StateAndRef<InvoiceState>? {

        var invoiceState: StateAndRef<InvoiceState>? = null
        val list = getAllInvoiceStateAndRefs()
        list.forEach() {
            if (invoiceId == it.state.data.invoiceId.toString()) {
                invoiceState = it
            }
        }
        if (invoiceState == null) {
            logger.warn("findInvoiceStateAndRef :  " +
                    "\uD83D\uDE3C \uD83D\uDE3C  \uD83D\uDE3C unconsumed Invoice NOT FOUND: " +
                    "\uD83C\uDF4E $invoiceId \uD83C\uDF4E")
        } else {
            logger.warn("findInvoiceStateAndRef :  " +
                    "\uD83D\uDE3C " +
                    "unconsumed Invoice FOUND: \uD83C\uDF4E $invoiceId \uD83C\uDF4E")
        }

        return invoiceState
    }
    @Suspendable
    @Throws(Exception::class)
    fun findInvoicesForInvestor(investorId: String): List<InvoiceState> {

        val account = accountService.accountInfo(UUID.fromString(investorId)) ?: return listOf()
        logger.info("\uD83D\uDCA6 Finding invoices for investor: \uD83D\uDC7D \uD83D\uDC7D " +
                " ${account.state.data.name} - ${account.state.data.host}")
        val sortedInvoices = getAllInvoices()
        val bestInvoices: MutableList<InvoiceState>? = mutableListOf()
        val profile = serviceHub.cordaService(ProfileFinderService::class.java)
                .findInvestorProfile(investorId)
        if (profile == null) {
            logger.info("\uD83C\uDF36 No profile available, \uD83C\uDF36 " +
                    "returning all ${sortedInvoices.size} invoices found")
            return sortedInvoices
        }

        sortedInvoices.forEach(){

            val invoiceAmount = BigDecimal(it.totalAmount)
            for (item in profile.state.data.tradeMatrixItems) {
                val startInvoiceAmount = BigDecimal(item.startInvoiceAmount)
                val endInvoiceAmount = BigDecimal(item.endInvoiceAmount)
                if (invoiceAmount in startInvoiceAmount..endInvoiceAmount) {
                    bestInvoices!!.add(it)
                }
            }
        }
        return bestInvoices!!
    }
    @Suspendable
    fun findInvoicesForSupplier(supplierId: String): List<InvoiceState> {

        val account = accountService.accountInfo(UUID.fromString(supplierId)) ?: return listOf()

        logger.info("\uD83D\uDCA6 Finding invoices for supplier: \uD83D\uDC7D \uD83D\uDC7D " +
                " ${account.state.data.name} - ${account.state.data.host}")
        val sortedInvoices = getAllInvoices()
        val supplierInvoices: MutableList<InvoiceState> = mutableListOf()

        sortedInvoices.forEach(){
            if (it.supplierInfo.name == account.state.data.name) {
                supplierInvoices.add(it)
            }
        }
        return supplierInvoices
    }
    @Suspendable
    fun getAllNodes(): List<Party> {
        val map: MutableMap<String, Party> = mutableMapOf()
        val nodes = serviceHub.networkMapCache.allNodes
        val keys: MutableList<PublicKey> = mutableListOf()
        nodes.forEach() {
            if (it.legalIdentities.first().toString().contains("Notary")) {
                logger.info(" ☕️  Notary ignored for consuming invoice")
            } else {
                map[it.legalIdentities.first().toString()] = it.legalIdentities.first()
            }
        }
        map.forEach() {
            keys.add(it.value.owningKey)
        }
        return map.values.toList()
    }
    @Suspendable
    fun findInvoicesForCustomer(customerId: String): List<InvoiceState> {

        val account = accountService.accountInfo(UUID.fromString(customerId)) ?: return listOf()
        val sortedInvoices = getAllInvoices()
        val supplierInvoices: MutableList<InvoiceState>? = mutableListOf()

        sortedInvoices.forEach(){
            if (it.customerInfo.name == account.state.data.name) {
                supplierInvoices!!.add(it)
            }
        }
        return supplierInvoices!!
    }

    private val pageSize:Int = 5000

    @Suspendable
    fun queryInvoices(pageNumber: Int): Vault.Page<InvoiceState> {
        val criteria = QueryCriteria.VaultQueryCriteria(
                status = Vault.StateStatus.UNCONSUMED)

        val page = serviceHub.vaultService.queryBy(
                contractStateType = InvoiceState::class.java,
                paging = PageSpecification(pageNumber = pageNumber, pageSize = pageSize),
                criteria = criteria)
        return page
    }

    @Suspendable
    fun findInvoice(invoiceId: String): InvoiceState? {
        var pageNumber = DEFAULT_PAGE_NUM
        val states = mutableListOf<StateAndRef<InvoiceState>>()
        do {
            val pageSpec = PageSpecification(pageNumber = pageNumber, pageSize = pageSize)
            val results = serviceHub.vaultService
                    .queryBy<InvoiceState>(QueryCriteria.VaultQueryCriteria(), pageSpec)
            states.addAll(results.states)
            pageNumber++
        } while ((pageSpec.pageSize * (pageNumber - 1)) <= results.totalStatesAvailable)
        var invoice: InvoiceState? = null
        for (state in states) {
            if (state.state.data.invoiceId.toString() == invoiceId) {
                invoice = state.state.data
            }
        }

        return invoice
    }
    @Suspendable
    private fun queryInvoiceStateAndRef(pageNumber: Int): Pair<List<StateAndRef<InvoiceState>>, Long> {
        val criteria = QueryCriteria.VaultQueryCriteria(
                status = Vault.StateStatus.UNCONSUMED)

        val page = serviceHub.vaultService.queryBy(
                contractStateType = InvoiceState::class.java,
                paging = PageSpecification(pageNumber = pageNumber, pageSize = pageSize),
                criteria = criteria)
        return Pair(page.states, page.totalStatesAvailable )
    }
    @Suspendable
    private fun getAllInvoices(): List<InvoiceState> {
        val list: MutableList<InvoiceState> = mutableListOf()
        var pageNumber = DEFAULT_PAGE_NUM
        val states = mutableListOf<StateAndRef<InvoiceState>>()
        do {
            val pageSpec = PageSpecification(pageNumber = pageNumber, pageSize = pageSize)
            val results = serviceHub.vaultService
                    .queryBy<InvoiceState>(QueryCriteria.VaultQueryCriteria(), pageSpec)
            states.addAll(results.states)
            pageNumber++
        } while ((pageSpec.pageSize * (pageNumber - 1)) <= results.totalStatesAvailable)

        for (state in states) {
           list.add(state.state.data)
        }

        val sorted = list.sortedBy { it.dateRegistered }
        logger.info("\uD83E\uDDE9 Invoices found on node:  \uD83C\uDF00 ${sorted.size} " )
        return sorted
    }
    @Suspendable
    fun getAllInvoiceStateAndRefs(): List<StateAndRef<InvoiceState>> {

        var pageNumber = DEFAULT_PAGE_NUM
        val states = mutableListOf<StateAndRef<InvoiceState>>()
        do {
            val pageSpec = PageSpecification(pageNumber = pageNumber, pageSize = pageSize)
            val results = serviceHub.vaultService
                    .queryBy<InvoiceState>(QueryCriteria.VaultQueryCriteria(
                            status = Vault.StateStatus.UNCONSUMED
                    ), pageSpec)
            states.addAll(results.states)
            pageNumber++
        } while ((pageSpec.pageSize * (pageNumber - 1)) <= results.totalStatesAvailable)

        val sorted = states.sortedBy { it.state.data.dateRegistered }
        logger.info("\uD83E\uDDE9 Invoices found on node:  \uD83C\uDF00 ${sorted.size} " )
        return sorted
    }

    @Suspendable
    private fun addToList(page: Vault.Page<InvoiceState>, list: MutableList<InvoiceState>) {
        page.states.forEach() {
            list.add(it.state.data)
        }
    }

    companion object {
        private val logger = LoggerFactory.getLogger(InvoiceFinderService::class.java)
    }

    init {
        logger.info("\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E InvoiceFinderService: " +
                "Investor finds invoices according to Profile. \uD83C\uDF4E \uD83C\uDF4E ")

    }
}
