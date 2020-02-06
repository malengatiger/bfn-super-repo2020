package com.bfn.flows.services

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.states.AnchorState
import com.bfn.contractstates.states.InvoiceOfferState
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
class InvoiceOfferFinderService(private val serviceHub: AppServiceHub) : SingletonSerializeAsToken() {
    private val accountService: KeyManagementBackedAccountService =
            serviceHub.cordaService(KeyManagementBackedAccountService::class.java)

    @Suspendable
    fun getOffersOnNode(): List<StateAndRef<InvoiceOfferState>> {
        val list:  MutableList<StateAndRef<InvoiceOfferState>> = mutableListOf()
        val allOffers = getAllOffers()
        allOffers.forEach() {
            list.add(it)
        }
        return list
    }
    @Suspendable
    fun getOffersForSupplier(supplierId: String): List<InvoiceOfferState> {
        val list:  MutableList<InvoiceOfferState> = mutableListOf()
        val allOffers = getOffersOnNode()
        allOffers.forEach() {
            if (it.state.data.supplier.identifier.id.toString() == supplierId) {
                list.add(it.state.data)
            }
        }
        return list
    }
    @Suspendable
    fun getOffersForInvestor(investorId: String): List<InvoiceOfferState> {
        val list:  MutableList<InvoiceOfferState> = mutableListOf()
        val allOffers = getOffersOnNode()
        allOffers.forEach() {
            if (it.state.data.investor.identifier.id.toString() == investorId) {
                list.add(it.state.data)
            }
        }
        return list
    }
    @Suspendable
    @Throws(Exception::class)
    fun findAnchorOffer(invoiceId: String): StateAndRef<InvoiceOfferState>? {
        logger.info(" \uD83D\uDC2C \uD83D\uDC2C findAnchorOffer: ... " +
                "\uD83D\uDC2C \uD83D\uDC2C \uD83D\uDC2C \uD83D\uDC2C")
        val existingAnchor = serviceHub.vaultService.queryBy(AnchorState::class.java).states.singleOrNull()
                ?: throw IllegalArgumentException("Anchor does not exist")

        val allOffers = getOffersOnNode()
        allOffers.forEach() {
            if (it.state.data.invoiceId.toString() == invoiceId
                    && it.state.data.investor.identifier.id.toString() ==
                    existingAnchor.state.data.account.identifier.id.toString()) {
                return it
            }
        }

        return null
    }
    @Suspendable
    @Throws(Exception::class)
    fun findRegularOffer(invoiceId: String): StateAndRef<InvoiceOfferState>? {
        logger.info(" \uD83D\uDC2C \uD83D\uDC2C findRegularOffer: ... " +
                "\uD83D\uDC2C \uD83D\uDC2C \uD83D\uDC2C \uD83D\uDC2C")

        val allOffers = getOffersOnNode()
        allOffers.forEach() {
            if (it.state.data.invoiceId.toString() == invoiceId) {
                return it
            }
        }

        return null
    }
    @Suspendable
    @Throws(Exception::class)
    fun findBestOffer(supplierId: String,
                      invoiceId: String): InvoiceOfferState {
        logger.info(" \uD83D\uDC2C \uD83D\uDC2C BestOfferFinderService:selectBestOffer ... " +
                "\uD83D\uDC2C \uD83D\uDC2C \uD83D\uDC2C \uD83D\uDC2C")

        val allOffers = getOffersOnNode()
        val list: MutableList<InvoiceOfferState> = mutableListOf()
        allOffers.forEach() {
            if (it.state.data.supplier.identifier.id.toString() == supplierId
                    && it.state.data.invoiceId.toString() == invoiceId) {
                list.add(it.state.data)
            }
        }
        var bestOffer: InvoiceOfferState?
        //
        val profile = findProfile(supplierId)
        if (profile == null) {
            return list.last()
        } else {
            logger.info("\uD83C\uDF4A \uD83C\uDF4A Profile used to select best Offer $profile")
            bestOffer = selectOffer()
        }
        //todo - use profile to filter offers
        //todo - if ties found - take random offer

        return bestOffer
    }
    @Suspendable
    private fun selectOffer(): InvoiceOfferState{
        var bestOffer: InvoiceOfferState? = null

        return bestOffer!!
    }
    private val pageSize:Int = 1000

    @Suspendable
    fun findProfile(investorId: String): InvestorProfileState? {
        val criteria = QueryCriteria.VaultQueryCriteria(
                status = Vault.StateStatus.UNCONSUMED)

        val page = serviceHub.vaultService.queryBy(
                contractStateType = InvestorProfileState::class.java,
                paging = PageSpecification(pageNumber = 1, pageSize = 2000),
                criteria = criteria)
        var investorProfile: InvestorProfileState? = null
        page.states.forEach() {
            if (it.state.data.accountId == investorId) {
                investorProfile = it.state.data
            }
        }
        return investorProfile
    }
    @Suspendable
    private fun queryOffers(pageNumber: Int): Vault.Page<InvoiceOfferState> {
        val criteria = QueryCriteria.VaultQueryCriteria(
                status = Vault.StateStatus.UNCONSUMED)

        return serviceHub.vaultService.queryBy(
                contractStateType = InvoiceOfferState::class.java,
                paging = PageSpecification(pageNumber = pageNumber, pageSize = pageSize),
                criteria = criteria)
    }
    @Suspendable
    private fun getAllOffers(): List<StateAndRef<InvoiceOfferState>> {
        val list: MutableList<StateAndRef<InvoiceOfferState>> = ArrayList()
        //get first page
        var pageNumber = 1
        val page: Vault.Page<InvoiceOfferState> = queryOffers(pageNumber)
        addToList(page = page, list = list)

        val remainder: Int = (page.totalStatesAvailable % pageSize).toInt()
        var pageCnt: Int = (page.totalStatesAvailable / pageSize).toInt()
        if (remainder > 0) pageCnt++

        if (pageCnt > 1)  {
            while (pageNumber < pageCnt) {
                pageNumber++
                val pageX = queryOffers(pageNumber)
                addToList(pageX, list)
            }
        }
        val sorted = list.sortedBy { it.state.data.offerAmount }
        logger.info("\uD83E\uDDE9 InvoiceOffers found:  \uD83C\uDF00 ${sorted.size} " )

        return sorted
    }

    @Suspendable
    private fun addToList(page: Vault.Page<InvoiceOfferState>,
                                  list: MutableList<StateAndRef<InvoiceOfferState>>) {
        page.states.forEach() {
           list.add(it)
        }
    }

    companion object {
        private val logger = LoggerFactory.getLogger(InvoiceOfferFinderService::class.java)
    }

    init {
        logger.info("\uD83E\uDDE9 \uD83E\uDDE9 \uD83E\uDDE9  InvoiceOfferFinderService: " +
                "\uD83D\uDCA6 Supplier finds best Offer  \uD83D\uDE21")

    }
}
