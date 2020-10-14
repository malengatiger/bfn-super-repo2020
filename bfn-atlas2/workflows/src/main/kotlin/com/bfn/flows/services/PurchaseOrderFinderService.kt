package com.bfn.flows.services

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.states.PurchaseOrderState
import com.r3.corda.lib.accounts.workflows.services.KeyManagementBackedAccountService
import net.corda.core.contracts.StateAndRef
import net.corda.core.identity.Party
import net.corda.core.node.AppServiceHub
import net.corda.core.node.services.CordaService
import net.corda.core.node.services.queryBy
import net.corda.core.node.services.vault.PageSpecification
import net.corda.core.node.services.vault.QueryCriteria
import net.corda.core.serialization.SingletonSerializeAsToken
import org.slf4j.LoggerFactory
import java.security.PublicKey

@CordaService
class PurchaseOrderFinderService(private val serviceHub: AppServiceHub) : SingletonSerializeAsToken() {
    private val accountService: KeyManagementBackedAccountService =
            serviceHub.cordaService(KeyManagementBackedAccountService::class.java)

    @Suspendable
     fun findPurchaseOrderStateAndRef(purchaseOrderId: String): StateAndRef<PurchaseOrderState>? {

        var pageNumber = 1
        val states = mutableListOf<StateAndRef<PurchaseOrderState>>()
        do {
            val pageSpec = PageSpecification(pageSize = pageSize, pageNumber = pageNumber)
            val page = serviceHub.vaultService.queryBy<PurchaseOrderState>(QueryCriteria.VaultQueryCriteria(), pageSpec)
            for (po in page.states) {
                if (po.state.data.purchaseOrderId == purchaseOrderId) {
                    return po
                }
            }
            states.addAll(page.states)
            pageNumber++
        } while ((pageSpec.pageSize * (pageNumber)) <= page.totalStatesAvailable)

        logger.info("Searched ${states.size} purchaseOrders and did not find $purchaseOrderId")
        return null
    }
    @Suspendable
    fun findPurchaseOrdersForSupplier(supplierId: String): List<StateAndRef<PurchaseOrderState>> {

        var pageNumber = 1
        val states = mutableListOf<StateAndRef<PurchaseOrderState>>()
        do {
            val pageSpec = PageSpecification(pageSize = pageSize, pageNumber = pageNumber)
            val page = serviceHub.vaultService.queryBy<PurchaseOrderState>(QueryCriteria.VaultQueryCriteria(), pageSpec)
            for (po in page.states) {
                if (po.state.data.supplier.identifier.id.toString() == supplierId) {
                    states.add(po)
                }
            }
            pageNumber++
        } while ((pageSpec.pageSize * (pageNumber)) <= page.totalStatesAvailable)

        logger.info("Searched ${states.size} purchaseOrders and did not find supplierId: $supplierId")
        return states
    }
    @Suspendable
    fun findAllPurchaseOrders(): List<StateAndRef<PurchaseOrderState>> {

        var pageNumber = 1
        val states = mutableListOf<StateAndRef<PurchaseOrderState>>()
        do {
            val pageSpec = PageSpecification(pageSize = pageSize, pageNumber = pageNumber)
            val page = serviceHub.vaultService.queryBy<PurchaseOrderState>(QueryCriteria.VaultQueryCriteria(), pageSpec)
            for (po in page.states) {
                    states.add(po)
            }
            pageNumber++
        } while ((pageSpec.pageSize * (pageNumber)) <= page.totalStatesAvailable)

        return states
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
    fun findPurchaseOrdersForCustomer(customerId: String): List<StateAndRef<PurchaseOrderState>> {

        var pageNumber = 1
        val states = mutableListOf<StateAndRef<PurchaseOrderState>>()
        do {
            val pageSpec = PageSpecification(pageSize = pageSize, pageNumber = pageNumber)
            val page = serviceHub.vaultService.queryBy<PurchaseOrderState>(QueryCriteria.VaultQueryCriteria(), pageSpec)
            for (po in page.states) {
                if (po.state.data.customer.identifier.id.toString() == customerId) {
                    states.add(po)
                }
            }
            pageNumber++
        } while ((pageSpec.pageSize * (pageNumber)) <= page.totalStatesAvailable)

        logger.info("Searched ${states.size} purchaseOrders and did not find customerId: $customerId")
        return states
    }

    private val pageSize:Int = 200


    companion object {
        private val logger = LoggerFactory.getLogger(PurchaseOrderFinderService::class.java)
    }

    init {
        logger.info("\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E PurchaseOrderFinderService: " +
                "\uD83C\uDF4E \uD83C\uDF4E ")

    }
}
