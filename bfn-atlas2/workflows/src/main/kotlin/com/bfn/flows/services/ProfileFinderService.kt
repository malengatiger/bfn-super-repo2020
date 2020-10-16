package com.bfn.flows.services

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.states.CustomerProfileState
import com.bfn.contractstates.states.SupplierProfileState
import com.bfn.contractstates.states.InvestorProfileState
import com.r3.corda.lib.accounts.workflows.services.KeyManagementBackedAccountService
import net.corda.core.contracts.StateAndRef
import net.corda.core.node.AppServiceHub
import net.corda.core.node.services.CordaService
import net.corda.core.node.services.Vault
import net.corda.core.node.services.queryBy
import net.corda.core.node.services.vault.DEFAULT_PAGE_NUM
import net.corda.core.node.services.vault.DEFAULT_PAGE_SIZE
import net.corda.core.node.services.vault.PageSpecification
import net.corda.core.node.services.vault.QueryCriteria
import net.corda.core.serialization.SingletonSerializeAsToken
import org.slf4j.LoggerFactory

@CordaService
class ProfileFinderService(private val serviceHub: AppServiceHub) : SingletonSerializeAsToken() {

    @Suspendable
    fun findCustomerProfile(customerId: String): StateAndRef<CustomerProfileState>? {
        var pageNumber = DEFAULT_PAGE_NUM
        val states = mutableListOf<StateAndRef<CustomerProfileState>>()
        do {
            val pageSpec = PageSpecification(pageNumber = pageNumber, pageSize = DEFAULT_PAGE_SIZE)
            val results = serviceHub.vaultService.queryBy(
                    contractStateType = CustomerProfileState::class.java,
                    criteria = QueryCriteria.VaultQueryCriteria(status = Vault.StateStatus.UNCONSUMED),
                    paging = pageSpec
            )
            states.addAll(results.states)
            pageNumber++
        } while ((pageSpec.pageSize * (pageNumber - 1)) <= results.totalStatesAvailable)

        logger.info("\uD83D\uDD35\uD83D\uDD35 There are ${states.size} customerProfiles on the ledger \uD83D\uDD35")
        states.forEach() {
            logger.info("\uD83D\uDD35 CustomerProfile: customerId: $customerId " +
                    "will compare to ${it.state.data.account.identifier.id}")
            if (it.state.data.account.identifier.id.toString() == customerId) {
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
            val results = serviceHub.vaultService.queryBy(
                    contractStateType = InvestorProfileState::class.java,
                    criteria = QueryCriteria.VaultQueryCriteria(status = Vault.StateStatus.UNCONSUMED),
                    paging = pageSpec
            )
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
            val results = serviceHub.vaultService.queryBy(
                    contractStateType = SupplierProfileState::class.java,
                    criteria = QueryCriteria.VaultQueryCriteria(status = Vault.StateStatus.UNCONSUMED),
                    paging = pageSpec
            )
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
