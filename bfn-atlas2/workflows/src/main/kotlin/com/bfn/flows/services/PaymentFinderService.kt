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
class PaymentFinderService(private val serviceHub: AppServiceHub) : SingletonSerializeAsToken() {
    private val accountService: KeyManagementBackedAccountService =
            serviceHub.cordaService(KeyManagementBackedAccountService::class.java)

    @Suspendable
     fun findPaymentForInvoice(invoiceId: String): StateAndRef<SupplierPaymentState>? {

        var paymentState: StateAndRef<SupplierPaymentState>? = null
        val list = getAllPaymentStateAndRefs()
        list.forEach() {
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

        var paymentState: StateAndRef<SupplierPaymentState>? = null
//        val list = getAllPaymentStateAndRefs()
//        list.forEach() {
//            if (invoiceId == it.state.data.acceptedOffer.invoiceId.toString()) {
//                paymentState = it
//            }
//        }
//
//        if (paymentState == null) {
//            logger.warn("findPaymentForInvoice :  " +
//                    "\uD83D\uDE3C \uD83D\uDE3C  \uD83D\uDE3C unconsumed SupplierPayment NOT FOUND: " +
//                    "\uD83C\uDF4E $invoiceId \uD83C\uDF4E")
//        } else {
//            logger.warn("findPaymentForInvoice :  " +
//                    "\uD83D\uDE3C " +
//                    "unconsumed SupplierPayment FOUND: \uD83C\uDF4E $invoiceId \uD83C\uDF4E")
//        }

        return paymentState
    }
    @Suspendable
    @Throws(Exception::class)
    fun findPaymentsForInvestor(investorId: String): List<SupplierPaymentState> {

        accountService.accountInfo(UUID.fromString(investorId)) ?:
        throw IllegalArgumentException("Account does not exist")
        val payments = getAllPaymentStateAndRefs()
        val investorPayments: MutableList<SupplierPaymentState> = mutableListOf()

        payments.forEach(){
            if (it.state.data.acceptedOffer.investor.identifier.id.toString() == investorId) {
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
            if (it.state.data.acceptedOffer.supplier.identifier.id.toString() == supplierId) {
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
            if (it.state.data.acceptedOffer.customer.identifier.id.toString() == customerId) {
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
        val list: MutableList<StateAndRef<SupplierPaymentState>> = mutableListOf()
        //get first page
        var pageNumber = 1
        val pair = queryPaymentStateAndRef(pageNumber)
        pair.first.forEach() {
            list.add(it)
        }

        val remainder: Int = (pair.second % pageSize).toInt()
        var pageCnt: Int = (pair.second/ pageSize).toInt()
        if (remainder > 0) pageCnt++

        if (pageCnt > 1)  {
            while (pageNumber < pageCnt) {
                pageNumber++
                val pageX = queryPaymentStateAndRef(pageNumber)
                pageX.first.forEach() {
                    list.add(it)
                }
            }
        }

        logger.info("\uD83E\uDDE9 SupplierPayments found on node: \uD83C\uDF00 ${list.size} " )
        return list
    }
    @Suspendable
    fun getAnchorPaymentStateAndRefs(): List<StateAndRef<SupplierPaymentState>> {
        val existingAnchor = serviceHub.vaultService.queryBy( NetworkOperatorState::class.java).states.singleOrNull()
                ?: throw IllegalArgumentException("Anchor does not exist")
        val list: MutableList<StateAndRef<SupplierPaymentState>> = mutableListOf()
        //get first page
        var pageNumber = 1
        val pair = queryPaymentStateAndRef(pageNumber)
        pair.first.forEach() {
            if (existingAnchor.state.data.account.name == it.state.data.acceptedOffer.investor.name) {
                list.add(it)
            }
        }

        val remainder: Int = (pair.second % pageSize).toInt()
        var pageCnt: Int = (pair.second/ pageSize).toInt()
        if (remainder > 0) pageCnt++

        if (pageCnt > 1)  {
            while (pageNumber < pageCnt) {
                pageNumber++
                val pageX = queryPaymentStateAndRef(pageNumber)
                pageX.first.forEach() {
                    if (existingAnchor.state.data.account.name == it.state.data.acceptedOffer.investor.name) {
                        list.add(it)
                    }
                }
            }
        }

        logger.info("\uD83E\uDDE9 SupplierPayments found on node: \uD83C\uDF00 ${list.size} " )
        return list
    }

    companion object {
        private val logger = LoggerFactory.getLogger(PaymentFinderService::class.java)
    }

    init {
        logger.info("\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E PaymentFinderService initialized " )

    }
}
