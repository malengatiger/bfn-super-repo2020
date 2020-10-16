package com.bfn.flows.services

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.states.InvestorPaymentState
import com.bfn.contractstates.states.NetworkOperatorState
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
class InvestorPaymentFinderService(private val serviceHub: AppServiceHub) : SingletonSerializeAsToken() {
    private val accountService: KeyManagementBackedAccountService =
            serviceHub.cordaService(KeyManagementBackedAccountService::class.java)

    @Suspendable
     fun findPaymentForInvoice(invoiceId: String): StateAndRef<InvestorPaymentState>? {

        var paymentState: StateAndRef<InvestorPaymentState>? = null
        var pageNumber = DEFAULT_PAGE_NUM
        val states = mutableListOf<StateAndRef<InvestorPaymentState>>()
        do {
            val pageSpec = PageSpecification(pageNumber = pageNumber, pageSize = pageSize)
            val results = serviceHub.vaultService
                    .queryBy<InvestorPaymentState>(QueryCriteria.VaultQueryCriteria(
                            status = Vault.StateStatus.ALL
                    ), pageSpec)
            states.addAll(results.states)
            pageNumber++
        } while ((pageSpec.pageSize * (pageNumber - 1)) <= results.totalStatesAvailable)


        states.forEach() {
            if (invoiceId == it.state.data.supplierPayment.acceptedOffer.invoiceId.toString()) {
                paymentState = it
            }
        }

        if (paymentState == null) {
            logger.warn("findPaymentForInvoice :  " +
                    "\uD83D\uDE3C \uD83D\uDE3C  \uD83D\uDE3C unconsumed InvestorPayment NOT FOUND: " +
                    "\uD83C\uDF4E $invoiceId \uD83C\uDF4E")
        } else {
            logger.warn("findPaymentForInvoice :  " +
                    "\uD83D\uDE3C " +
                    "unconsumed SupplierPayment FOUND: \uD83C\uDF4E $invoiceId \uD83C\uDF4E")
        }

        return paymentState
    }
    @Suspendable
    fun findPaymentById(investorPaymentId: String): StateAndRef<InvestorPaymentState>? {
        //todo - 🍎 🍎 🍎 refactor this query : this is NOT scalable, check other similar queries 🍎 🍎 🍎
        var pageNumber = DEFAULT_PAGE_NUM
        val states = mutableListOf<StateAndRef<InvestorPaymentState>>()
        do {
            val pageSpec = PageSpecification(pageNumber = pageNumber, pageSize = pageSize)
            val results = serviceHub.vaultService
                    .queryBy<InvestorPaymentState>(QueryCriteria.VaultQueryCriteria(
                            status = Vault.StateStatus.ALL
                    ), pageSpec)
            states.addAll(results.states)
            pageNumber++
        } while ((pageSpec.pageSize * (pageNumber - 1)) <= results.totalStatesAvailable)

        states.forEach() {
            if (it.state.data.investorPaymentId == investorPaymentId) {
               return it
            }
        }

        return null
    }
    @Suspendable
    @Throws(Exception::class)
    fun findPaymentsForInvestor(investorId: String): List<InvestorPaymentState> {

        accountService.accountInfo(UUID.fromString(investorId)) ?:
        throw IllegalArgumentException("Account does not exist")
        val payments = getAllPaymentStateAndRefs()
        val investorPayments: MutableList<InvestorPaymentState> = mutableListOf()

        payments.forEach(){
            if (it.state.data.supplierPayment.acceptedOffer.investor.account.identifier.id.toString() == investorId) {
                investorPayments.add(it.state.data)
            }
        }
        return investorPayments
    }
    @Suspendable
    fun findPaymentsForSupplier(supplierId: String): List<InvestorPaymentState> {

        accountService.accountInfo(UUID.fromString(supplierId)) ?:
        throw IllegalArgumentException("Account does not exist")
        val payments = getAllPaymentStateAndRefs()
        val supplierPayments: MutableList<InvestorPaymentState> = mutableListOf()

        payments.forEach(){
            if (it.state.data.supplierPayment.acceptedOffer.supplier.account.identifier.id.toString() == supplierId) {
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
    fun findPaymentsForCustomer(customerId: String): List<InvestorPaymentState> {

        accountService.accountInfo(UUID.fromString(customerId)) ?:
            throw IllegalArgumentException("Account does not exist")
        val payments = getAllPaymentStateAndRefs()
        val customerInvoices: MutableList<InvestorPaymentState> = mutableListOf()

        payments.forEach(){
            if (it.state.data.supplierPayment.acceptedOffer.customer.account.identifier.id.toString() == customerId) {
                customerInvoices.add(it.state.data)
            }
        }
        return customerInvoices
    }

    private val pageSize:Int = 200

    @Suspendable
    private fun queryPaymentStateAndRef(pageNumber: Int): Pair<List<StateAndRef<InvestorPaymentState>>, Long> {
        val criteria = QueryCriteria.VaultQueryCriteria(
                status = Vault.StateStatus.UNCONSUMED)

        val page = serviceHub.vaultService.queryBy(
                contractStateType = InvestorPaymentState::class.java,
                paging = PageSpecification(pageNumber = pageNumber, pageSize = pageSize),
                criteria = criteria)
        return Pair(page.states, page.totalStatesAvailable )
    }

    @Suspendable
    fun getAllPaymentStateAndRefs(): List<StateAndRef<InvestorPaymentState>> {

        var pageNumber = DEFAULT_PAGE_NUM
        val states = mutableListOf<StateAndRef<InvestorPaymentState>>()
        do {
            val pageSpec = PageSpecification(pageNumber = pageNumber, pageSize = pageSize)
            val results = serviceHub.vaultService
                    .queryBy<InvestorPaymentState>(QueryCriteria.VaultQueryCriteria(
                            status = Vault.StateStatus.UNCONSUMED
                    ), pageSpec)
            states.addAll(results.states)
            pageNumber++
        } while ((pageSpec.pageSize * (pageNumber - 1)) <= results.totalStatesAvailable)

        logger.info("\uD83E\uDDE9 SupplierPayments found on node: \uD83C\uDF00 ${states.size} " )
        return states
    }

    companion object {
        private val logger = LoggerFactory.getLogger(InvestorPaymentFinderService::class.java)
    }

    init {
        logger.info("\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E PaymentFinderService initialized " )

    }
}
