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
        val criteria = QueryCriteria.VaultQueryCriteria(
                status = Vault.StateStatus.UNCONSUMED)
        val page = serviceHub.vaultService.queryBy(
                contractStateType = CustomerProfileState::class.java,
                paging = PageSpecification(pageNumber = 1, pageSize = 5000),
                criteria = criteria)
        var investorProfile: StateAndRef<CustomerProfileState>? = null
        page.states.forEach() {
            if (it.state.data.account.identifier.toString() == customerAccountId) {
                investorProfile = it
            }
        }
        if (investorProfile != null) {
            logger.info("\uD83D\uDD35 Found investor profile ...: ${investorProfile!!.state.data.account.identifier}")
        } else {
            logger.info("\uD83C\uDF61 \uD83C\uDF61 \uD83C\uDF61 \uD83C\uDF61 " +
                    "investor profile NOT FOUND: $customerAccountId \uD83C\uDFB2 returning null ...")
        }
        return investorProfile
    }
    @Suspendable
    fun findInvestorProfile(investorAccountId: String): StateAndRef<InvestorProfileState>? {
        val criteria = QueryCriteria.VaultQueryCriteria(
                status = Vault.StateStatus.UNCONSUMED)
        val page = serviceHub.vaultService.queryBy(
                contractStateType = InvestorProfileState::class.java,
                paging = PageSpecification(pageNumber = 1, pageSize = 5000),
                criteria = criteria)
        var investorProfile: StateAndRef<InvestorProfileState>? = null
        page.states.forEach() {
            if (it.state.data.account.identifier.toString() == investorAccountId) {
                investorProfile = it
            }
        }
        if (investorProfile != null) {
            logger.info("\uD83D\uDD35 Found investor profile ...: ${investorProfile!!.state.data.account.identifier}")
        } else {
            logger.info("\uD83C\uDF61 \uD83C\uDF61 \uD83C\uDF61 \uD83C\uDF61 " +
                    "investor profile NOT FOUND: $investorAccountId \uD83C\uDFB2 returning null ...")
        }
        return investorProfile
    }
    @Suspendable
    fun findSupplierProfile(supplierAccountId: String): StateAndRef<SupplierProfileState>? {
        val criteria = QueryCriteria.VaultQueryCriteria(
                status = Vault.StateStatus.UNCONSUMED)
        val page = serviceHub.vaultService.queryBy(
                contractStateType = SupplierProfileState::class.java,
                paging = PageSpecification(pageNumber = 1, pageSize = 5000),
                criteria = criteria)
        var profile: StateAndRef<SupplierProfileState>? = null
        page.states.forEach() {
            if (it.state.data.account.identifier.toString() == supplierAccountId) {
                profile = it
            }
        }
        if (profile != null) {
            logger.info("\uD83D\uDD35 Found supplier profile ...: ${profile!!.state.data.account.identifier}")
        } else {
            logger.info("\uD83C\uDF61 \uD83C\uDF61 \uD83C\uDF61 \uD83C\uDF61 supplier profile NOT FOUND: $supplierAccountId \uD83C\uDFB2 returning null ...")
        }

        return profile
    }

    companion object {
        private val logger = LoggerFactory.getLogger(ProfileFinderService::class.java)
    }

}
