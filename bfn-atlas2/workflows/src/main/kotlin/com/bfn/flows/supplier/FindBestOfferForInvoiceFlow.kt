package com.bfn.flows.supplier

import co.paralleluniverse.fibers.Suspendable
import com.bfn.ZAR
import com.bfn.contractstates.contracts.OfferAndTokenStateContract
import com.bfn.contractstates.states.InvoiceOfferState
import com.bfn.contractstates.states.OfferAndTokenState
import com.bfn.flows.regulator.ReportToRegulatorFlow
import com.bfn.flows.services.ProfileFinderService
import com.bfn.flows.services.RegulatorFinderService
import com.r3.corda.lib.accounts.workflows.flows.RequestKeyForAccount
import com.r3.corda.lib.accounts.workflows.internal.accountService
import com.r3.corda.lib.accounts.workflows.ourIdentity
import com.r3.corda.lib.accounts.workflows.services.KeyManagementBackedAccountService
import com.r3.corda.lib.tokens.contracts.commands.IssueTokenCommand
import com.r3.corda.lib.tokens.contracts.states.FungibleToken
import com.r3.corda.lib.tokens.contracts.types.IssuedTokenType
import com.r3.corda.lib.tokens.contracts.utilities.heldBy
import com.r3.corda.lib.tokens.contracts.utilities.issuedBy
import com.r3.corda.lib.tokens.contracts.utilities.of
import net.corda.core.contracts.StateAndRef
import net.corda.core.flows.*
import net.corda.core.identity.Party
import net.corda.core.node.services.Vault
import net.corda.core.node.services.Vault.StateStatus
import net.corda.core.node.services.vault.PageSpecification
import net.corda.core.node.services.vault.QueryCriteria.VaultQueryCriteria
import net.corda.core.transactions.SignedTransaction
import net.corda.core.transactions.TransactionBuilder
import org.slf4j.LoggerFactory
import java.security.PublicKey
import java.util.*
import kotlin.collections.ArrayList


@InitiatingFlow
@StartableByRPC
@SchedulableFlow
class FindBestOfferForInvoiceFlow(private val supplierAccountId: String,
                                  private val invoiceId: String) : FlowLogic<StateAndRef<InvoiceOfferState>?>() {

    @Suspendable
    @Throws(FlowException::class)
    override fun call(): StateAndRef<InvoiceOfferState>? {
        Companion.logger.info("\uD83E\uDD1F \uD83E\uDD1F \uD83E\uDD1F \uD83E\uDD1F \uD83E\uDD1F \uD83E\uDD1F \uD83E\uDD1F \uD83E\uDD1F " +
                "... \uD83D\uDE3C \uD83D\uDE3C FindBestOfferForInvoiceFlow call started ... \uD83D\uDE3C \uD83D\uDE3C ")
        val accountService = serviceHub.cordaService(KeyManagementBackedAccountService::class.java)
        val supplierAccount = accountService.accountInfo(UUID.fromString(supplierAccountId))!!.state.data
        Companion.logger.info(" \uD83C\uDF00 \uD83C\uDF00 ${supplierAccount.name} selecting best offer for invoice: \uD83D\uDE3C $invoiceId...")

        val pair = filterOffersByProfile()
        if (pair == null) {
            logger.info("\uD83D\uDC80 \uD83D\uDC80 \uD83D\uDC80 Unable to find acceptable offer. \uD83D\uDC80 Quitting, returning null ... ")
            return null
        }
        val list = pair.first
        val selected = pair.second
        if (list.isEmpty()) {
            Companion.logger.info("\uD83D\uDE21 \uD83D\uDE21 \uD83D\uDE21  " +
                    "No invoiceOffers found on node. returning null")
            return null
        }

        Companion.logger.info("\uD83C\uDF6F \uD83C\uDF6F \uD83C\uDF6F \uD83C\uDF6F " +
                "Yebo! Best Offer selected: \uD83C\uDF6F \uD83C\uDF6F ${selected.state.data.offerAmount} " +
                " supplier : ${selected.state.data.supplier.name}  ${selected.state.data.supplier.host} \uD83D\uDC4C " +
                " investor: ${selected.state.data.investor.name} ${selected.state.data.investor.host} \uD83E\uDDE9 ")

        return selected
    }

    private val pageSize: Int = 2000
    @Suspendable
    fun query(pageNumber: Int): Vault.Page<InvoiceOfferState> {
        val criteria = VaultQueryCriteria(
                status = StateStatus.UNCONSUMED)

        return serviceHub.vaultService.queryBy(
                contractStateType = InvoiceOfferState::class.java,
                paging = PageSpecification(pageNumber = pageNumber, pageSize = pageSize),
                criteria = criteria)
    }

    @Suspendable
    private fun filterOffersByProfile(): Pair<MutableList<StateAndRef<InvoiceOfferState>>, StateAndRef<InvoiceOfferState>>? {
        val list: MutableList<StateAndRef<InvoiceOfferState>> = ArrayList()

        var pageNumber = 1
        val page: Vault.Page<InvoiceOfferState> = query(pageNumber)
        addToList(page = page, list = list)

        val remainder: Int = (page.totalStatesAvailable % pageSize).toInt()
        var pageCnt: Int = (page.totalStatesAvailable / pageSize).toInt()
        if (remainder > 0) pageCnt++

        if (pageCnt > 1) {
            while (pageNumber < pageCnt) {
                pageNumber++
                val pageX = query(pageNumber)
                addToList(pageX, list)
            }
        }
        Companion.logger.info(" \uD83C\uDFC0 Offers found for the invoice:  \uD83C\uDFC0 " +
                "${list.size} offers  \uD83C\uDFC0 ")
        if (list.isEmpty()) {
            return null
        }
        val profile = serviceHub.cordaService(ProfileFinderService::class.java)
                .findSupplierProfile(supplierAccountId)

        var numberInvalid = 0
        if (profile == null) {
            logger.info("\uD83C\uDFB1 \uD83C\uDFB1 \uD83C\uDFB1  Profile is NULL. returning last of ${list.size}")
            val selected = chooseOne(list)
            log(list, selected)
            return Pair(list, selected)
        } else {
            Companion.logger.info("\uD83C\uDF21 \uD83C\uDF21 \uD83C\uDF21 \uD83C\uDF21 " +
                    "Filtering ${list.size} offers based on profile: \uD83C\uDFC0 maxDiscount: ${profile.state.data.maximumDiscount}")
            val filteredList: MutableList<StateAndRef<InvoiceOfferState>> = mutableListOf()
            list.forEach() {
                if (it.state.data.discount <= profile.state.data.maximumDiscount) {
                    filteredList.add(it)
                } else {
                    numberInvalid++
                }
            }
            return if (filteredList.isNotEmpty()) {
                val selected = chooseOne(filteredList)
                logger.info("\uD83D\uDD25\uD83D\uDD25 \uD83D\uDD25 Offers that did not make the cut:" +
                        " \uD83D\uDD25 $numberInvalid \uD83D\uDD25")
                log(filteredList, selected)
                Pair(filteredList, selected)
            } else {
                Companion.logger.info("\uD83D\uDD25\uD83D\uDD25 \uD83D\uDD25 No Offers made the cut:")
                null
            }
        }


    }

    @Suspendable
    private fun chooseOne(filteredList: List<StateAndRef<InvoiceOfferState>>) : StateAndRef<InvoiceOfferState> {
        val sorted = filteredList.sortedBy { it.state.data.discount }
        val winningDiscount = sorted.first()
        val similarDiscount = sorted.toList().takeWhile { it.state.data.discount == winningDiscount.state.data.discount }
        if (similarDiscount.size == 1) {
            return similarDiscount[0]
        }
        //todo - there are multiple investors with same offer, select by some parameter; currently random offer is selected
        val index = Random(Date().time).nextInt(similarDiscount.size - 1)
        return similarDiscount[index]
    }
    private fun log(sorted: List<StateAndRef<InvoiceOfferState>>, selected: StateAndRef<InvoiceOfferState>) {
        logger.info("\uD83E\uDDE9 InvoiceOffers found for invoice:  \uD83C\uDF00 ${sorted.size}  selected: " +
                "\uD83E\uDDE9 ${selected.state.data.offerAmount}")
        logger.info("\uD83E\uDDE9 Best InvoiceOffer found: investor: ${selected.state.data.investor.name}  " +
                "\uD83E\uDDE9 ${selected.state.data.offerAmount}")
    }

    @Suspendable
    private fun addToList(page: Vault.Page<InvoiceOfferState>, list: MutableList<StateAndRef<InvoiceOfferState>>) {
        page.states.forEach() {
            if (it.state.data.supplier.identifier.id.toString() == supplierAccountId
                    && it.state.data.invoiceId.toString() == invoiceId) {
                list.add(it)
            }
        }
    }

    companion object {
        private val logger = LoggerFactory.getLogger(FindBestOfferForInvoiceFlow::class.java)
    }

}
