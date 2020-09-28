package com.bfn.flows.services

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.states.InvoiceState
import com.bfn.contractstates.states.UserState
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

@CordaService
class UserFinderService(private val serviceHub: AppServiceHub) : SingletonSerializeAsToken() {
   val pageSize = 200
    @Suspendable
    fun findUser(accountId: String): UserState? {
        var pageNumber = DEFAULT_PAGE_NUM
        val states = mutableListOf<StateAndRef<UserState>>()
        do {
            val pageSpec = PageSpecification(pageNumber = pageNumber, pageSize = pageSize)
            val results = serviceHub.vaultService
                    .queryBy<UserState>(QueryCriteria.VaultQueryCriteria(), pageSpec)
            states.addAll(results.states)
            pageNumber++
        } while ((pageSpec.pageSize * (pageNumber - 1)) <= results.totalStatesAvailable)
        var userState: UserState? = null
        for (state in states) {
            if (state.state.data.accountInfo.identifier.id.toString() == accountId) {
                userState = state.state.data
            }
        }

        return userState
    }
    @Suspendable
    fun findUserStateAndRef(accountId: String): StateAndRef<UserState>? {
        var pageNumber = DEFAULT_PAGE_NUM
        val states = mutableListOf<StateAndRef<UserState>>()
        do {
            val pageSpec = PageSpecification(pageNumber = pageNumber, pageSize = pageSize)
            val results = serviceHub.vaultService
                    .queryBy<UserState>(QueryCriteria.VaultQueryCriteria(), pageSpec)
            states.addAll(results.states)
            pageNumber++
        } while ((pageSpec.pageSize * (pageNumber - 1)) <= results.totalStatesAvailable)
        var userState: StateAndRef<UserState>? = null
        for (state in states) {
            if (state.state.data.accountInfo.identifier.id.toString() == accountId) {
                userState = state
            }
        }

        return userState
    }

    companion object {
        private val logger = LoggerFactory.getLogger(UserFinderService::class.java)
    }

    init {
        logger.info("\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E InvoiceFinderService: " +
                "Investor finds invoices according to Profile. \uD83C\uDF4E \uD83C\uDF4E ")

    }
}
