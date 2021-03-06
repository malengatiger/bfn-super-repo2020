package com.bfn.flows.services

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.states.*
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
class AcceptedOfferFinderService(private val serviceHub: AppServiceHub) : SingletonSerializeAsToken() {
    private val accountService: KeyManagementBackedAccountService =
            serviceHub.cordaService(KeyManagementBackedAccountService::class.java)

    @Suspendable
    fun getOffersOnNode(): List<StateAndRef<AcceptedOfferState>> {
        val list:  MutableList<StateAndRef<AcceptedOfferState>> = mutableListOf()
        val allOffers = getAllOffers()
        allOffers.forEach() {
            list.add(it)
        }
        return list
    }
    @Suspendable
    fun getOffersForSupplier(supplierId: String): List<AcceptedOfferState> {
        val list:  MutableList<AcceptedOfferState> = mutableListOf()
        var pageNumber = DEFAULT_PAGE_NUM
        val states = mutableListOf<StateAndRef<AcceptedOfferState>>()
        do {
            val pageSpec = PageSpecification(pageNumber = pageNumber, pageSize = pageSize)
            val results = serviceHub.vaultService
                    .queryBy<AcceptedOfferState>(QueryCriteria.VaultQueryCriteria(
                            status = Vault.StateStatus.UNCONSUMED
                    ), pageSpec)
            states.addAll(results.states)
            pageNumber++
        } while ((pageSpec.pageSize * (pageNumber - 1)) <= results.totalStatesAvailable)

        states.forEach() {
            if (it.state.data.supplier.account.identifier.id.toString() == supplierId) {
                list.add(it.state.data)
            }
        }
        return list
    }
    @Suspendable
    fun getOffersForInvestor(investorId: String): List<AcceptedOfferState> {
        val list:  MutableList<AcceptedOfferState> = mutableListOf()
        var pageNumber = DEFAULT_PAGE_NUM
        val states = mutableListOf<StateAndRef<AcceptedOfferState>>()
        do {
            val pageSpec = PageSpecification(pageNumber = pageNumber, pageSize = pageSize)
            val results = serviceHub.vaultService
                    .queryBy<AcceptedOfferState>(QueryCriteria.VaultQueryCriteria(
                            status = Vault.StateStatus.UNCONSUMED
                    ), pageSpec)
            states.addAll(results.states)
            pageNumber++
        } while ((pageSpec.pageSize * (pageNumber - 1)) <= results.totalStatesAvailable)

        states.forEach() {
            if (it.state.data.investor.account.identifier.id.toString() == investorId) {
                list.add(it.state.data)
            }
        }

        return list
    }

    @Suspendable
    @Throws(Exception::class)
    fun findAcceptedOffer(offerId: String): StateAndRef<AcceptedOfferState>? {

        var pageNumber = DEFAULT_PAGE_NUM
        val states = mutableListOf<StateAndRef<AcceptedOfferState>>()
        do {
            val pageSpec = PageSpecification(pageNumber = pageNumber, pageSize = pageSize)
            val results = serviceHub.vaultService
                    .queryBy<AcceptedOfferState>(QueryCriteria.VaultQueryCriteria(
                            status = Vault.StateStatus.UNCONSUMED
                    ), pageSpec)
            states.addAll(results.states)
            pageNumber++
        } while ((pageSpec.pageSize * (pageNumber - 1)) <= results.totalStatesAvailable)

        states.forEach() {
            if (it.state.data.offerId == offerId) {
                return it
            }
        }

        return null
    }
    @Suspendable
    @Throws(Exception::class)
    fun findInvoiceOffer(offerId: String): StateAndRef<AcceptedOfferState>? {

        var pageNumber = DEFAULT_PAGE_NUM
        val states = mutableListOf<StateAndRef<AcceptedOfferState>>()
        do {
            val pageSpec = PageSpecification(pageNumber = pageNumber, pageSize = pageSize)
            val results = serviceHub.vaultService
                    .queryBy<AcceptedOfferState>(QueryCriteria.VaultQueryCriteria(
                            status = Vault.StateStatus.UNCONSUMED
                    ), pageSpec)
            states.addAll(results.states)
            pageNumber++
        } while ((pageSpec.pageSize * (pageNumber - 1)) <= results.totalStatesAvailable)

        states.forEach() {
            if (it.state.data.offerId == offerId) {
                return it
            }
        }

        return null
    }
    @Suspendable
    @Throws(Exception::class)
    fun getInvestorOffersAccepted(investorId: String): List<StateAndRef<AcceptedOfferState>> {

        val offers:MutableList<StateAndRef<AcceptedOfferState>> = mutableListOf()
        var pageNumber = DEFAULT_PAGE_NUM
        val states = mutableListOf<StateAndRef<AcceptedOfferState>>()
        do {
            val pageSpec = PageSpecification(pageNumber = pageNumber, pageSize = pageSize)
            val results = serviceHub.vaultService
                    .queryBy<AcceptedOfferState>(QueryCriteria.VaultQueryCriteria(
                            status = Vault.StateStatus.UNCONSUMED
                    ), pageSpec)
            states.addAll(results.states)
            pageNumber++
        } while ((pageSpec.pageSize * (pageNumber - 1)) <= results.totalStatesAvailable)

        logger.info("\uD83D\uDC2C \uD83D\uDC2C allOffers: ${states.size} " +
                "investor offers found on node ...")
        states.forEach() {
            if (it.state.data.investor.account.identifier.id.toString() == investorId) {
                    offers.add(it)
            }

        }
        logger.info("\uD83D\uDC2C \uD83D\uDC2C accepted Offers: ${offers.size} " +
                "investor offers found for $investorId ...")
        if (offers.isNotEmpty()) {
            logger.info("\uD83D\uDC2C \uD83D\uDC2C INVESTOR: ${offers.first().state.data.investor.account.name} " +
                    "has ${offers.size} offers accepted")

        }
        return offers
    }

    @Suspendable
    @Throws(Exception::class)
    fun findOffersByInvoice(invoiceId: String): List<StateAndRef<AcceptedOfferState>> {

        val allOffers = getOffersOnNode()
        val mList:MutableList<StateAndRef<AcceptedOfferState>> = mutableListOf()
        allOffers.forEach() {
            if (it.state.data.invoiceId.toString() == invoiceId) {
                mList.add(it)
            }
        }
        logger.info("\uD83C\uDF3F ${mList.size} \uD83C\uDF3F acceptedOffers found for this invoice: \uD83C\uDF3F $invoiceId")
        return mList
    }

    private val pageSize:Int = 200

    @Suspendable
    private fun getAllOffers(): List<StateAndRef<AcceptedOfferState>> {

        var pageNumber = DEFAULT_PAGE_NUM
        val states = mutableListOf<StateAndRef<AcceptedOfferState>>()
        do {
            val pageSpec = PageSpecification(pageNumber = pageNumber, pageSize = pageSize)
            val results = serviceHub.vaultService
                    .queryBy<AcceptedOfferState>(QueryCriteria.VaultQueryCriteria(
                            status = Vault.StateStatus.UNCONSUMED
                    ), pageSpec)
            states.addAll(results.states)
            pageNumber++
        } while ((pageSpec.pageSize * (pageNumber - 1)) <= results.totalStatesAvailable)

        val sorted = states.sortedBy { it.state.data.offerAmount }
        logger.info("\uD83E\uDDE9 InvoiceOffers found:  \uD83C\uDF00 ${sorted.size} " )
        return sorted
    }

    companion object {
        private val logger = LoggerFactory.getLogger(AcceptedOfferFinderService::class.java)
    }

    init {
        logger.info("\uD83E\uDDE9 \uD83E\uDDE9 \uD83E\uDDE9  InvoiceOfferFinderService: " +
                "\uD83D\uDCA6 Supplier finds best Offer  \uD83D\uDE21")

    }
}
