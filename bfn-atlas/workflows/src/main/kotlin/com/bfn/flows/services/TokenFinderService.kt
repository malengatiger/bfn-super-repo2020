package com.bfn.flows.services

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.states.OfferAndTokenState
import com.r3.corda.lib.accounts.workflows.services.KeyManagementBackedAccountService
import net.corda.core.node.AppServiceHub
import net.corda.core.node.services.CordaService
import net.corda.core.node.services.Vault
import net.corda.core.node.services.vault.PageSpecification
import net.corda.core.node.services.vault.QueryCriteria
import net.corda.core.serialization.SingletonSerializeAsToken
import org.slf4j.LoggerFactory
import java.util.*

@CordaService
class TokenFinderService(private val serviceHub: AppServiceHub) : SingletonSerializeAsToken() {
    private val accountService: KeyManagementBackedAccountService =
            serviceHub.cordaService(KeyManagementBackedAccountService::class.java)

    @Suspendable
    @Throws(Exception::class)
    fun findTokensForAccount(accountId: String): List<OfferAndTokenState> {
        logger.info("\uD83E\uDD66 \uD83E\uDD66 \uD83E\uDD66 \uD83E\uDD66  TokenFinderService: findInvoices ... " +
                "\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E ")

        val account = accountService.accountInfo(UUID.fromString(accountId))?.state?.data
                ?: throw IllegalArgumentException("\uD83D\uDC7F findTokensForAccount: Account not found: $accountId")
        logger.info("\uD83D\uDCA6 Finding tokens for account: \uD83D\uDC7D \uD83D\uDC7D " +
                " ${account.name} - ${account.host}")
        val sortedInvoices = getOfferAndTokens()
        val tokens: MutableList<OfferAndTokenState>? = mutableListOf()

        sortedInvoices.forEach(){
            if (it.invoiceOffer.investor.identifier.id.toString() == accountId ) {
                tokens!!.add(it)
            }
        }
        return tokens!!
    }
    @Suspendable
    @Throws(Exception::class)
    fun findTokensForNode(): List<OfferAndTokenState> {
        logger.info("\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E TokenFinderService: findInvoices ... " +
                "\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E ")

        val sortedInvoices = getOfferAndTokens()
        val tokens: MutableList<OfferAndTokenState>? = mutableListOf()

        sortedInvoices.forEach(){
            tokens!!.add(it)
        }
        return tokens!!
    }

    private val pageSize:Int = 1000


    @Suspendable
    fun queryTokens(pageNumber: Int): Vault.Page<OfferAndTokenState> {
        val criteria = QueryCriteria.VaultQueryCriteria(
                status = Vault.StateStatus.UNCONSUMED)

        return serviceHub.vaultService.queryBy(
                contractStateType = OfferAndTokenState::class.java,
                paging = PageSpecification(pageNumber = pageNumber, pageSize = pageSize),
                criteria = criteria)
    }
    @Suspendable
    private fun getOfferAndTokens(): List<OfferAndTokenState> {
        val list: MutableList<OfferAndTokenState> = mutableListOf()
        //get first page
        var pageNumber = 1
        val page: Vault.Page<OfferAndTokenState> = queryTokens(pageNumber)
        addToList(page = page, list = list)

        val remainder: Int = (page.totalStatesAvailable % pageSize).toInt()
        var pageCnt: Int = (page.totalStatesAvailable / pageSize).toInt()
        if (remainder > 0) pageCnt++

        if (pageCnt > 1)  {
            while (pageNumber < pageCnt) {
                pageNumber++
                val pageX = queryTokens(pageNumber)
                addToList(pageX, list)
            }
        }
        val sorted = list.sortedBy { it.token.holder.toString() }
        logger.info("\uD83E\uDDE9 Tokens found on node:  \uD83C\uDF00 ${sorted.size} " )
        return sorted
    }

    @Suspendable
    private fun addToList(page: Vault.Page<OfferAndTokenState>, list: MutableList<OfferAndTokenState>) {
        page.states.forEach() {
            list.add(it.state.data)
        }
    }

    companion object {
        private val logger = LoggerFactory.getLogger(TokenFinderService::class.java)
    }

    init {
        logger.info("\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E TokenFinderService: " +
                "Find tokens on Node. \uD83C\uDF4E \uD83C\uDF4E ")

    }
}
