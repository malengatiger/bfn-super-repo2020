package com.bfn.flows.services

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.states.NetworkOperatorState
import com.bfn.contractstates.states.SupplierPaymentState
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
import java.security.PublicKey
import java.util.*

/**
 * Service to query for SupplierPayments
 */
@CordaService
class SupplierPaymentFinderService(private val serviceHub: AppServiceHub) : SingletonSerializeAsToken() {
    private val accountService: KeyManagementBackedAccountService =
            serviceHub.cordaService(KeyManagementBackedAccountService::class.java)

    @Suspendable
     fun findPaymentForInvoice(invoiceId: String): StateAndRef<SupplierPaymentState>? {

        var paymentState: StateAndRef<SupplierPaymentState>? = null
        var pageNumber = DEFAULT_PAGE_NUM
        val states = mutableListOf<StateAndRef<SupplierPaymentState>>()
        do {
            val pageSpec = PageSpecification(pageNumber = pageNumber, pageSize = pageSize)
            val results = serviceHub.vaultService
                    .queryBy<SupplierPaymentState>(QueryCriteria.VaultQueryCriteria(
                            status = Vault.StateStatus.ALL
                    ), pageSpec)
            states.addAll(results.states)
            pageNumber++
        } while ((pageSpec.pageSize * (pageNumber - 1)) <= results.totalStatesAvailable)


        states.forEach() {
            if (invoiceId == it.state.data.acceptedOffer.invoiceId.toString()) {
                paymentState = it
            }
        }

        if (paymentState == null) {
            logger.warn("findPaymentForInvoice :  " +
                    "\uD83D\uDE3C \uD83D\uDE3C  \uD83D\uDE3C unconsumed SupplierPayment NOT FOUND: " +
                    "\uD83C\uDF4E $invoiceId \uD83C\uDF4E")
        } else {
            logger.warn("findPaymentForInvoice :  " +
                    "\uD83D\uDE3C " +
                    "unconsumed SupplierPayment FOUND: \uD83C\uDF4E $invoiceId \uD83C\uDF4E")
        }

        return paymentState
    }

    @Suspendable
    fun findPaymentById(supplierPaymentId: String): StateAndRef<SupplierPaymentState>? {
        //todo - 🍎 🍎 🍎 refactor this query : this is NOT scalable, check other similar queries 🍎 🍎 🍎
        var pageNumber = DEFAULT_PAGE_NUM
        val states = mutableListOf<StateAndRef<SupplierPaymentState>>()
        do {
            val pageSpec = PageSpecification(pageNumber = pageNumber, pageSize = pageSize)
            val results = serviceHub.vaultService
                    .queryBy<SupplierPaymentState>(QueryCriteria.VaultQueryCriteria(
                            status = Vault.StateStatus.ALL
                    ), pageSpec)
            states.addAll(results.states)
            pageNumber++
        } while ((pageSpec.pageSize * (pageNumber - 1)) <= results.totalStatesAvailable)

        states.forEach() {
            if (it.state.data.supplierPaymentId == supplierPaymentId) {
               return it
            }
        }

        return null
    }
    @Suspendable
    @Throws(Exception::class)
    fun findPaymentsForInvestor(investorId: String): List<SupplierPaymentState> {

        accountService.accountInfo(UUID.fromString(investorId)) ?:
        throw IllegalArgumentException("Account does not exist")
        val payments = getAllPaymentStateAndRefs()
        val investorPayments: MutableList<SupplierPaymentState> = mutableListOf()

        payments.forEach(){
            if (it.state.data.acceptedOffer.investor.account.identifier.id.toString() == investorId) {
                investorPayments.add(it.state.data)
            }
        }
        return investorPayments
    }
    @Suspendable
    fun findPaymentsForSupplier(supplierId: String): List<SupplierPaymentState> {

        accountService.accountInfo(UUID.fromString(supplierId)) ?:
        throw IllegalArgumentException("Account does not exist")
        val payments = getAllPaymentStateAndRefs()
        val supplierPayments: MutableList<SupplierPaymentState> = mutableListOf()

        payments.forEach(){
            if (it.state.data.acceptedOffer.supplier.account.identifier.id.toString() == supplierId) {
                supplierPayments.add(it.state.data)
            }
        }
        return supplierPayments
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
    fun findPaymentsForCustomer(customerId: String): List<SupplierPaymentState> {

        accountService.accountInfo(UUID.fromString(customerId)) ?:
            throw IllegalArgumentException("Account does not exist")
        val payments = getAllPaymentStateAndRefs()
        val customerInvoices: MutableList<SupplierPaymentState> = mutableListOf()

        payments.forEach(){
            if (it.state.data.acceptedOffer.customer.account.identifier.id.toString() == customerId) {
                customerInvoices.add(it.state.data)
            }
        }
        return customerInvoices
    }

    private val pageSize:Int = 500

    @Suspendable
    private fun queryPaymentStateAndRef(pageNumber: Int): Pair<List<StateAndRef<SupplierPaymentState>>, Long> {
        val criteria = QueryCriteria.VaultQueryCriteria(
                status = Vault.StateStatus.UNCONSUMED)

        val page = serviceHub.vaultService.queryBy(
                contractStateType = SupplierPaymentState::class.java,
                paging = PageSpecification(pageNumber = pageNumber, pageSize = pageSize),
                criteria = criteria)
        return Pair(page.states, page.totalStatesAvailable )
    }

    @Suspendable
    fun getAllPaymentStateAndRefs(): List<StateAndRef<SupplierPaymentState>> {

        var pageNumber = DEFAULT_PAGE_NUM
        val states = mutableListOf<StateAndRef<SupplierPaymentState>>()
        do {
            val pageSpec = PageSpecification(pageNumber = pageNumber, pageSize = pageSize)
            val results = serviceHub.vaultService
                    .queryBy<SupplierPaymentState>(QueryCriteria.VaultQueryCriteria(
                            status = Vault.StateStatus.UNCONSUMED
                    ), pageSpec)
            states.addAll(results.states)
            pageNumber++
        } while ((pageSpec.pageSize * (pageNumber - 1)) <= results.totalStatesAvailable)

        logger.info("\uD83E\uDDE9 SupplierPayments found on node: \uD83C\uDF00 ${states.size} " )
        return states
    }

    companion object {
        private val logger = LoggerFactory.getLogger(SupplierPaymentFinderService::class.java)
    }

    init {
        logger.info("\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E PaymentFinderService initialized " )

    }
}
