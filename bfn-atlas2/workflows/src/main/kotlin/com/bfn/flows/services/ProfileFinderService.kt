package com.bfn.flows.services

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.states.CustomerProfileState
import com.bfn.contractstates.states.SupplierProfileState
import com.bfn.contractstates.states.InvestorProfileState
import com.bfn.contractstates.states.InvoiceOfferState
import com.r3.corda.lib.accounts.workflows.services.KeyManagementBackedAccountService
import net.corda.core.contracts.StateAndRef
import net.corda.core.node.AppServiceHub
import net.corda.core.node.services.CordaService
import net.corda.core.node.services.Vault
import net.corda.core.node.services.queryBy
import net.corda.core.node.services.vault.DEFAULT_PAGE_NUM
import net.corda.core.node.services.vault.PageSpecification
import net.corda.core.node.services.vault.QueryCriteria
import net.corda.core.serialization.SingletonSerializeAsToken
import org.slf4j.LoggerFactory

@CordaService
class ProfileFinderService(private val serviceHub: AppServiceHub) : SingletonSerializeAsToken() {
    private val accountService: KeyManagementBackedAccountService =
            serviceHub.cordaService(KeyManagementBackedAccountService::class.java)


    @Suspendable
    fun findCustomerProfile(customerAccountId: String): StateAndRef<CustomerProfileState>? {
        var pageNumber = DEFAULT_PAGE_NUM
        val states = mutableListOf<StateAndRef<CustomerProfileState>>()
        do {
            val pageSpec = PageSpecification(pageNumber = pageNumber, pageSize = pageSize)
            val results = serviceHub.vaultService
                    .queryBy<CustomerProfileState>(QueryCriteria.VaultQueryCriteria(
                            status = Vault.StateStatus.UNCONSUMED
                    ), pageSpec)
            states.addAll(results.states)
            pageNumber++
        } while ((pageSpec.pageSize * (pageNumber - 1)) <= results.totalStatesAvailable)

        states.forEach() {
            if (it.state.data.account.identifier.id.toString() == customerAccountId) {
                return it
            }
        }

        return null
    }
    @Suspendable
    fun findInvestorProfile(investorAccountId: String): StateAndRef<InvestorProfileState>? {
        var pageNumber = DEFAULT_PAGE_NUM
        val states = mutableListOf<StateAndRef<InvestorProfileState>>()
        do {
            val pageSpec = PageSpecification(pageNumber = pageNumber, pageSize = pageSize)
            val results = serviceHub.vaultService
                    .queryBy<InvestorProfileState>(QueryCriteria.VaultQueryCriteria(
                            status = Vault.StateStatus.UNCONSUMED
                    ), pageSpec)
            states.addAll(results.states)
            pageNumber++
        } while ((pageSpec.pageSize * (pageNumber - 1)) <= results.totalStatesAvailable)

        states.forEach() {
            if (it.state.data.account.identifier.id.toString() == investorAccountId) {
                return it
            }
        }

        return null
    }
    val pageSize = 200
    @Suspendable
    fun findSupplierProfile(supplierAccountId: String): StateAndRef<SupplierProfileState>? {
        var pageNumber = DEFAULT_PAGE_NUM
        val states = mutableListOf<StateAndRef<SupplierProfileState>>()
        do {
            val pageSpec = PageSpecification(pageNumber = pageNumber, pageSize = pageSize)
            val results = serviceHub.vaultService
                    .queryBy<SupplierProfileState>(QueryCriteria.VaultQueryCriteria(
                            status = Vault.StateStatus.UNCONSUMED
                    ), pageSpec)
            states.addAll(results.states)
            pageNumber++
        } while ((pageSpec.pageSize * (pageNumber - 1)) <= results.totalStatesAvailable)

        states.forEach() {
            if (it.state.data.account.identifier.id.toString() == supplierAccountId) {
                return it
            }
        }

        return null
    }

    companion object {
        private val logger = LoggerFactory.getLogger(ProfileFinderService::class.java)
    }

}
