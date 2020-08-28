package com.bfn.client.web

import com.bfn.client.dto.*
import com.bfn.flows.CreateAccountFlow
import com.bfn.flows.InvestorProfileFlow
import com.bfn.flows.invoices.BestOfferForInvoiceFlow
import com.bfn.flows.invoices.InvoiceOfferFlow
import com.bfn.flows.invoices.InvoiceRegistrationFlow
import com.bfn.flows.queries.InvoiceOfferQueryFlow
import com.bfn.flows.queries.InvoiceQueryFlow
import com.bfn.flows.queries.TokenQueryFlow
import com.bfn.flows.scheduled.CreateInvoiceOffersFlow
import com.bfn.flows.scheduled.RunAuctionFlow
import com.google.firebase.cloud.FirestoreClient
import com.google.gson.GsonBuilder
import com.r3.corda.lib.accounts.contracts.states.AccountInfo
import com.r3.corda.lib.tokens.contracts.states.FungibleToken

import com.bfn.client.web.FirebaseUtil.addNode
import com.bfn.client.web.FirebaseUtil.createUser
import com.bfn.client.web.FirebaseUtil.sendAccountMessage
import com.bfn.client.web.FirebaseUtil.sendInvoiceMessage
import com.bfn.client.web.FirebaseUtil.sendInvoiceOfferMessage
import com.bfn.contractstates.states.*
import com.bfn.flows.SupplierProfileFlow
import com.bfn.flows.regulator.BroadcastTransactionFlow
import net.corda.core.contracts.ContractState
import net.corda.core.contracts.StateAndRef
import net.corda.core.messaging.CordaRPCOps
import net.corda.core.node.services.Vault.StateStatus
import net.corda.core.node.services.vault.PageSpecification
import net.corda.core.node.services.vault.QueryCriteria
import net.corda.core.node.services.vault.QueryCriteria.VaultQueryCriteria
import net.corda.core.utilities.getOrThrow
import org.slf4j.LoggerFactory
import java.util.*

object WorkerBee {
    private val logger = LoggerFactory.getLogger(WorkerBee::class.java)
    private val GSON = GsonBuilder().setPrettyPrinting().create()
    val db = FirestoreClient.getFirestore()

    @Throws(Exception::class)
    fun writeNodes(proxy: CordaRPCOps) {
        val nodes = listNodes(proxy)
        for (n in nodes) {
            addNode(n)
            logger.info("writeNodes:  🍎 🍎 🍎 node written to Firestore: 👽 " + n.addresses!![0])
        }
        logger.info("writeNodes:  🍎 🍎 🍎 nodes written to Firestore: 👽 👽 👽  " + nodes.size)
    }

    @JvmStatic
    fun listNodes(proxy: CordaRPCOps): List<NodeInfoDTO> {
        val nodes = proxy.networkMapSnapshot()
        val nodeList: MutableList<NodeInfoDTO> = ArrayList()
        for (info in nodes) {
            val dto = NodeInfoDTO()
            dto.serial = info.serial
            dto.platformVersion = info.platformVersion.toLong()
            for (party in info.legalIdentities) {
                dto.addresses = ArrayList()
                (dto.addresses as ArrayList<String>).add(party.name.toString())
            }
            logger.info("\uD83C\uDF3A BFN Corda Node: \uD83C\uDF3A "
                    + info.legalIdentities[0].name.toString())
            nodeList.add(dto)
        }
        logger.info(" \uD83E\uDDE1 \uD83D\uDC9B \uD83D\uDC9A Corda NetworkNodes found: \uD83D\uDC9A "
                + nodeList.size + " \uD83D\uDC9A ")
        return nodeList
    }

    @JvmStatic
    fun getNodeAccounts(proxy: CordaRPCOps): List<AccountInfoDTO> {
        val start = Date()
        val accounts = proxy.vaultQuery(AccountInfo::class.java).states
        logger.info("\uD83C\uDF3A Total Accounts in Node: ${accounts.size} \uD83C\uDF3A ")
        var end = Date()
        val ms1 = (end.time - start.time)
        logger.info("\uD83D\uDD37 vault query: $ms1 milliseconds elapsed, ${accounts.size} accounts gotten \uD83D\uDD37 ")
        var cnt = 0
        val list: MutableList<AccountInfoDTO> = ArrayList()

        val node = proxy.nodeInfo().legalIdentities.first().toString()
        val start2 = Date()
        for ((state) in accounts) {
            cnt++
            val acct = state.data
            logger.info("\uD83C\uDF50️ \uD83C\uDF50 ️Processing account  \uD83C\uDF50️ " +
                    "#$cnt \uD83C\uDF3A ${state.data.name} \uD83C\uDF50️ ")
            val dto = AccountInfoDTO(acct.identifier.id.toString(),
                    acct.host.toString(), acct.name, null)
            if (dto.host.toString() == node) {
                list.add(dto)
            }
        }
        end = Date()
        val ms = (end.time - start2.time)
        val msg = "\uD83C\uDF3A \uD83C\uDF3A done listing \uD83D\uDC9A ${list.size} " +
                "\uD83D\uDC9A accounts on Node: \uD83C\uDF3A : \uD83D\uDD37 $ms milliseconds elapsed \uD83D\uDD37 " +
                proxy.nodeInfo().legalIdentities.first().toString()
        logger.info(msg)
        return list
    }

    @JvmStatic
    fun getNetworkAccounts(proxy: CordaRPCOps): List<AccountInfoDTO> {
        val accounts = proxy.vaultQuery(AccountInfo::class.java).states
        logger.info("\uD83C\uDF3A Total Accounts in Network: ${accounts.size} \uD83C\uDF3A ")
        var cnt = 0
        val list: MutableList<AccountInfoDTO> = ArrayList()
        for ((state) in accounts) {
            cnt++
            val (name, host, identifier) = state.data
            val dto = AccountInfoDTO(identifier.id.toString(),
                    host.toString(), name, null)
            list.add(dto)
        }
        val msg = "\uD83C\uDF3A \uD83C\uDF3A done listing  \uD83E\uDDA0 ${list.size}  " +
                "\uD83E\uDDA0 accounts on Network: \uD83C\uDF3A " +
                proxy.nodeInfo().legalIdentities.first().toString()
        logger.info(msg)
        return list
    }

    @JvmStatic
    @Throws(Exception::class)
    fun getAccount(proxy: CordaRPCOps, accountId: String?): AccountInfoDTO {
        val list = getNodeAccounts(proxy)
        var dto: AccountInfoDTO? = null
        logger.info("\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 AccountID to search for: $accountId")
        for (info in list) {
            if (info.identifier.equals(accountId, ignoreCase = true)) {
                dto = info
                break
            }
        }
        if (dto == null) {
            logger.warn("Account not found on BFN account")
            throw Exception("Account not found on BFN network")
        }
        val msg = "\uD83C\uDF3A \uD83C\uDF3A found account:  \uD83C\uDF3A " + GSON.toJson(dto)
        logger.info(msg)
        return dto
    }

    @JvmStatic
    @Throws(Exception::class)
    fun getSupplierProfile(proxy: CordaRPCOps, accountId: String?): SupplierProfileStateDTO? {
        val list: List<StateAndRef<SupplierProfileState>> = proxy.vaultQueryByWithPagingSpec(
                criteria = VaultQueryCriteria(status = StateStatus.UNCONSUMED),
                paging = PageSpecification(1, 4000),
                contractStateType = SupplierProfileState::class.java
        ).states
        var dto: SupplierProfileStateDTO? = null
        for (profile in list) {
            if (profile.state.data.accountId.equals(accountId, ignoreCase = true)) {
                dto = getDTO(profile.state.data)
                break
            }
        }
        val msg = if (dto == null) {
            "\uD83C\uDF3A \uD83C\uDF3A SupplierProfile not found:  \uD83C\uDF3A "
        } else {
            "\uD83C\uDF3A \uD83C\uDF3A found profile:  \uD83C\uDF3A " + GSON.toJson(dto)
        }
        logger.info(msg)
        return dto
    }

    @JvmStatic
    @Throws(Exception::class)
    fun getInvestorProfile(proxy: CordaRPCOps, accountId: String?): InvestorProfileStateDTO? {
        val list: List<StateAndRef<InvestorProfileState>> = proxy.vaultQueryByWithPagingSpec(
                criteria = VaultQueryCriteria(status = StateStatus.UNCONSUMED),
                paging = PageSpecification(1, 4000),
                contractStateType = InvestorProfileState::class.java
        ).states
        var dto: InvestorProfileStateDTO? = null
        for (profile in list) {
            if (profile.state.data.accountId.equals(accountId, ignoreCase = true)) {
                dto = getDTO(profile.state.data)
                break
            }
        }
        val msg = if (dto == null) {
            "\uD83C\uDF3A \uD83C\uDF3A InvestorProfile not found:  \uD83C\uDF3A "
        } else {
            "\uD83C\uDF3A \uD83C\uDF3A found profile:  \uD83C\uDF3A " + GSON.toJson(dto)
        }
        logger.info(msg)
        return dto
    }


    @JvmStatic
    @Throws(Exception::class)
    fun findInvoicesForCustomer(proxy: CordaRPCOps,
                                accountId: String): List<InvoiceDTO> {
        val fut = proxy.startTrackedFlowDynamic(
                InvoiceQueryFlow::class.java, accountId,
                InvoiceQueryFlow.FIND_FOR_CUSTOMER).returnValue
        val invoices = fut.get()
        val dtos: MutableList<InvoiceDTO> = mutableListOf()
        invoices.forEach() {
            dtos.add(getDTO(it))

        }
        val m = " \uD83C\uDF3A  \uD83C\uDF3A  \uD83C\uDF3A  done listing InvoiceStates:  \uD83C\uDF3A " + invoices.size
        logger.info(m)
        return dtos
    }

    @JvmStatic
    @Throws(Exception::class)
    fun findInvoicesForSupplier(proxy: CordaRPCOps,
                                accountId: String): List<InvoiceDTO> {
        val fut = proxy.startTrackedFlowDynamic(
                InvoiceQueryFlow::class.java, accountId,
                InvoiceQueryFlow.FIND_FOR_SUPPLIER).returnValue
        val invoices = fut.get()
        val dtos: MutableList<InvoiceDTO> = mutableListOf()
        invoices.forEach() {
            dtos.add(getDTO(it))

        }
        val m = "\uD83C\uDF3A done listing InvoiceStates:  \uD83C\uDF3A " + invoices.size
        logger.info(m)
        return dtos
    }

    @JvmStatic
    @Throws(Exception::class)
    fun findInvoicesForInvestor(proxy: CordaRPCOps,
                                accountId: String): List<InvoiceDTO> {
        val fut = proxy.startTrackedFlowDynamic(
                InvoiceQueryFlow::class.java, accountId,
                InvoiceQueryFlow.FIND_FOR_INVESTOR).returnValue
        val invoices = fut.get()
        val dtos: MutableList<InvoiceDTO> = mutableListOf()
        invoices.forEach() {
            dtos.add(getDTO(it))

        }
        val m = "\uD83C\uDF3A done listing InvoiceStates:  \uD83C\uDF3A " + invoices.size
        logger.info(m)
        return dtos
    }

    @JvmStatic
    @Throws(Exception::class)
    fun findInvoicesForNode(proxy: CordaRPCOps): List<InvoiceDTO> {
        val fut = proxy.startTrackedFlowDynamic(
                InvoiceQueryFlow::class.java, null,
                InvoiceQueryFlow.FIND_FOR_NODE).returnValue
        val invoices = fut.get()
        val dtos: MutableList<InvoiceDTO> = mutableListOf()
        invoices.forEach() {
            if (it.supplierInfo.host.toString() ==
                    proxy.nodeInfo().legalIdentities.first().toString()) {
                dtos.add(getDTO(it))
            }
        }
        val m = "\uD83C\uDF3A done listing InvoiceStates:  \uD83C\uDF3A " + invoices.size
        logger.info(m)
        return dtos
    }

    @JvmStatic
    @Throws(Exception::class)
    fun selectBestOffers(proxy: CordaRPCOps): List<OfferAndTokenDTO> {
        logger.info("\uD83C\uDF3A \uD83C\uDF3A \uD83C\uDF3A \uD83C\uDF3A " +
                "WorkerBee selectBestOffers starting ....")
        val dtos: MutableList<OfferAndTokenDTO> = mutableListOf()
        try {
            val fut = proxy.startTrackedFlowDynamic(
                    RunAuctionFlow::class.java).returnValue
            val tokens = fut.get()

            tokens!!.forEach() {
                val token = getDTO(token = it.token, account = it.invoiceOffer.investor,
                        invoiceId = it.invoiceOffer.invoiceId.toString(),
                        accountId = it.invoiceOffer.investor.identifier.id.toString(),
                        invoiceAmount = it.invoiceOffer.originalAmount)
                val oat = OfferAndTokenDTO(invoiceOffer = getDTO(it.invoiceOffer),
                        token = token)
                dtos.add(oat)

            }
            val m = "\uD83C\uDF3A done running selectBestOffers:  \uD83C\uDF3A " + dtos.size
            logger.info(m)
        } catch (e: Exception) {
            logger.error("selectBestOffers fucked up! : $e")
        }
        return dtos
    }

    @JvmStatic
    @Throws(Exception::class)
    fun createInvestorProfile(proxy: CordaRPCOps, profile: InvestorProfileStateDTO): String {

        val state = InvestorProfileState(
                issuedBy = proxy.nodeInfo().legalIdentities.first(),
                accountId = profile.accountId,
                defaultDiscount = profile.defaultDiscount,
                maximumInvoiceAmount = profile.maximumInvoiceAmount,
                totalInvestment = profile.totalInvestment,
                minimumInvoiceAmount = profile.minimumInvoiceAmount, date = Date()
        )
        val fut = proxy.startTrackedFlowDynamic(
                InvestorProfileFlow::class.java, state).returnValue
        val tx = fut.get()
        val m = "\uD83C\uDF3A createInvestorProfile, DONE!:  \uD83C\uDF3A ${tx.id}"
        logger.info(m)
        return m
    }

    @JvmStatic
    @Throws(Exception::class)
    fun createSupplierProfile(proxy: CordaRPCOps, profile: SupplierProfileStateDTO): String {

        val state = SupplierProfileState(
                issuedBy = proxy.nodeInfo().legalIdentities.first(),
                accountId = profile.accountId,
                maximumDiscount = profile.maximumDiscount,
                date = Date()
        )
        val fut = proxy.startTrackedFlowDynamic(
                SupplierProfileFlow::class.java, state).returnValue
        val tx = fut.get()
        val m = "\uD83C\uDF3A createSupplierProfile, DONE!:  \uD83C\uDF3A ${tx.id}"
        logger.info(m)
        return m
    }

    @JvmStatic
    @Throws(Exception::class)
    fun makeInvoiceOffers(proxy: CordaRPCOps, investorId: String): List<InvoiceOfferDTO> {
        val fut = proxy.startTrackedFlowDynamic(
                CreateInvoiceOffersFlow::class.java, investorId).returnValue
        val offerStates = fut.get()
        val dtos: MutableList<InvoiceOfferDTO> = mutableListOf()
        offerStates!!.forEach() {
            val offer = getDTO(it)
            dtos.add(offer)

        }
        val m = "\uD83C\uDF3A makeInvoiceOffers, DONE!:  \uD83C\uDF3A " + offerStates.size
        dtos.forEach() {
            logger.info("Investor  \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 ${it.investor!!.name} " +
                    ":: \uD83C\uDF4E Offer made: ${it.supplier!!.name} " +
                    "offered: ${it.offerAmount!!} \uD83D\uDD35 \uD83D\uDD35 originalAmt: ${it.originalAmount!!} " +
                    " discount: ${it.discount!!}  \uD83C\uDF40 delta: ${it.originalAmount!! - it.offerAmount!!} ")
        }
        logger.info(m)
        return dtos
    }

    @JvmStatic
    @Throws(Exception::class)
    fun findTokensForNode(proxy: CordaRPCOps): List<OfferAndTokenDTO> {
        val fut = proxy.startTrackedFlowDynamic(
                TokenQueryFlow::class.java, null).returnValue
        val tokens = fut.get()
        val dtos: MutableList<OfferAndTokenDTO> = mutableListOf()
        tokens.forEach() {
            val token = getDTO(token = it.token, account = it.invoiceOffer.investor,
                    invoiceId = it.invoiceOffer.invoiceId.toString(),
                    accountId = it.invoiceOffer.investor.identifier.id.toString(),
                    invoiceAmount = it.invoiceOffer.originalAmount)
            val oat = OfferAndTokenDTO(invoiceOffer = getDTO(it.invoiceOffer),
                    token = token)
            dtos.add(oat)

        }
        val m = "\uD83C\uDF3A done listing Tokens:  \uD83C\uDF3A " + tokens.size
        logger.info(m)
        return dtos
    }

    @JvmStatic
    @Throws(Exception::class)
    fun findTokensForAccount(proxy: CordaRPCOps, accountId: String): List<OfferAndTokenDTO> {
        val fut = proxy.startTrackedFlowDynamic(
                TokenQueryFlow::class.java, accountId).returnValue
        val tokens = fut.get()
        val dtos: MutableList<OfferAndTokenDTO> = mutableListOf()
        tokens.forEach() {
            val token = getDTO(token = it.token, account = it.invoiceOffer.investor,
                    invoiceId = it.invoiceOffer.invoiceId.toString(),
                    accountId = it.invoiceOffer.investor.identifier.id.toString(),
                    invoiceAmount = it.invoiceOffer.originalAmount)
            val oat = OfferAndTokenDTO(invoiceOffer = getDTO(it.invoiceOffer),
                    token = token)
            dtos.add(oat)

        }
        val m = "\uD83C\uDF3A done listing Tokens:  \uD83C\uDF3A " + tokens.size
        logger.info(m)
        return dtos
    }

    @JvmStatic
    @Throws(Exception::class)
    fun findOffersForInvestor(proxy: CordaRPCOps, accountId: String): List<InvoiceOfferDTO> {
        val fut = proxy.startTrackedFlowDynamic(
                InvoiceOfferQueryFlow::class.java, accountId,
                InvoiceOfferQueryFlow.FIND_FOR_INVESTOR).returnValue
        val offers = fut.get()
        val dtos: MutableList<InvoiceOfferDTO> = mutableListOf()
        offers.forEach() {
            dtos.add(getDTO(it))
        }
        val m = "\uD83D\uDCA6  done listing InvoiceOfferStates:  \uD83C\uDF3A " + offers.size
        logger.info(m)
        return dtos
    }

    @JvmStatic
    @Throws(Exception::class)
    fun findOffersForSupplier(proxy: CordaRPCOps, accountId: String): List<InvoiceOfferDTO> {
        val fut = proxy.startTrackedFlowDynamic(
                InvoiceOfferQueryFlow::class.java, accountId,
                InvoiceOfferQueryFlow.FIND_FOR_SUPPLIER).returnValue
        val offers = fut.get()
        val dtos: MutableList<InvoiceOfferDTO> = mutableListOf()
        offers.forEach() {

            dtos.add(getDTO(it))

        }
        val m = "\uD83D\uDCA6  done listing InvoiceOfferStates:  \uD83C\uDF3A " + offers.size
        logger.info(m)
        return dtos
    }

    @JvmStatic
    @Throws(Exception::class)
    fun findOffersForNode(proxy: CordaRPCOps): List<InvoiceOfferDTO> {
        val fut = proxy.startTrackedFlowDynamic(
                InvoiceOfferQueryFlow::class.java, null,
                InvoiceOfferQueryFlow.FIND_FOR_NODE).returnValue
        val offers = fut.get()
        val dtos: MutableList<InvoiceOfferDTO> = mutableListOf()
        offers.forEach() {
            if (proxy.nodeInfo().legalIdentities.first().toString()
                    == it.investor.host.toString()) {
                dtos.add(getDTO(it))
            }
        }
        val m = "\uD83D\uDCA6  done listing InvoiceOfferStates:  \uD83C\uDF3A " + offers.size
        logger.info(m)
        return dtos
    }

    //todo extend paging query where appropriate
    private const val PAGE_SIZE = 200

    @JvmStatic
    fun getDashboardData(proxy: CordaRPCOps): DashboardData {
        var pageNumber = 1
        val states: MutableList<StateAndRef<ContractState>> = ArrayList()
        val data = DashboardData()
        var totalResults: Long
        do {
            logger.info("\uD83E\uDDE9 \uD83E\uDDE9 \uD83E\uDDE9 \uD83E\uDDE9 \uD83E\uDDE9 " +
                    "processing page " + pageNumber)
            val pageSpec = PageSpecification(pageNumber, PAGE_SIZE)
            val criteria: QueryCriteria = VaultQueryCriteria(StateStatus.UNCONSUMED)
            val (newStates, _, totalStatesAvailable) = proxy.vaultQueryByWithPagingSpec(
                    ContractState::class.java, criteria, pageSpec)
            totalResults = totalStatesAvailable
            logger.info("\uD83D\uDCA6 \uD83D\uDCA6 Number of States \uD83C\uDF4E " + newStates.size)
            states.addAll(newStates)
            pageNumber++
        } while (PAGE_SIZE * (pageNumber - 1) <= totalResults)
        var accts = 0
        var invoices = 0
        var offers = 0
        var acctsp = 0
        var invoicesp = 0
        var offersp = 0
        val mList: MutableList<String> = ArrayList()
        for ((state1) in states) {
            val state = state1.data
            val m = "\uD83E\uDDE9 \uD83E\uDDE9 " + "State class: " + state.javaClass.name + " participants: " + state.participants.size
            if (m.contains("AccountInfo")) {
                accts++
                acctsp = state.participants.size
            }
            if (m.contains("InvoiceState")) {
                invoices++
                invoicesp = state.participants.size
            }
            if (m.contains("InvoiceOfferState ")) {
                offers++
                offersp = state.participants.size
            }
        }
        val info = proxy.nodeInfo()
        data.node = info.legalIdentities[0].name.toString()
        data.accounts = accts
        data.invoices = invoices
        data.offers = offers
        val t1 = "\n\n\uD83E\uDDE9 \uD83E\uDDE9 List of States on " + info.legalIdentities[0].name.toString()
        val a1 = "\uD83E\uDDE9 \uD83E\uDDE9 AccountInfo found on node: \uD83C\uDF4E $accts \uD83C\uDF4E partcipants:  \uD83E\uDDE1 $acctsp"
        val a2 = "\uD83E\uDDE9 \uD83E\uDDE9 InvoiceStates found on node: \uD83C\uDF4E $invoices \uD83C\uDF4E  partcipants:  \uD83E\uDDE1 $invoicesp"
        val a3 = "\uD83E\uDDE9 \uD83E\uDDE9 InvoiceOfferStates found on node: \uD83C\uDF4E $offers \uD83C\uDF4E  partcipants:  \uD83E\uDDE1 $offersp"
        mList.add(t1)
        mList.add(a1)
        mList.add(a2)
        mList.add(a3)
        mList.add("\uD83E\uDDE9 \uD83E\uDDE9 Total states found:  \uD83E\uDDE1 " + (accts + invoices + offers) + "  \uD83E\uDDE1 \n\n")
        for (m in mList) {
            logger.info(m)
        }
        return data
    }

    @JvmStatic
    fun getStates(proxy: CordaRPCOps): List<String> {
        var pageNumber = 1
        val states: MutableList<StateAndRef<ContractState>> = ArrayList()
        var totalResults: Long
        do {
            logger.info("\uD83E\uDDE9 \uD83E\uDDE9 \uD83E\uDDE9 \uD83E\uDDE9 \uD83E\uDDE9 " +
                    "processing page " + pageNumber)
            val pageSpec = PageSpecification(pageNumber, PAGE_SIZE)
            val criteria: QueryCriteria = VaultQueryCriteria(StateStatus.UNCONSUMED)
            val (newStates, _, totalStatesAvailable) = proxy.vaultQueryByWithPagingSpec(
                    ContractState::class.java, criteria, pageSpec)
            totalResults = totalStatesAvailable
            logger.info("\uD83D\uDCA6 \uD83D\uDCA6 Number of States \uD83C\uDF4E " + newStates.size)
            states.addAll(newStates)
            pageNumber++
        } while (PAGE_SIZE * (pageNumber - 1) <= totalResults)
        var accts = 0
        var invoices = 0
        var offers = 0
        var acctsp = 0
        var invoicesp = 0
        var offersp = 0
        val mList: MutableList<String> = ArrayList()
        for ((state1) in states) {
            val state = state1.data
            val m = "\uD83E\uDDE9 \uD83E\uDDE9 " + "State class: " + state.javaClass.name + " participants: " + state.participants.size
            if (m.contains("AccountInfo")) {
                accts++
                acctsp = state.participants.size
            }
            if (m.contains("InvoiceState")) {
                invoices++
                invoicesp = state.participants.size
            }
            if (m.contains("InvoiceOfferState ")) {
                offers++
                offersp = state.participants.size
            }
        }
        val info = proxy.nodeInfo()
        val t1 = "\n\n\uD83E\uDDE9 \uD83E\uDDE9 List of States on " + info.legalIdentities[0].name.toString()
        val a1 = "\uD83E\uDDE9 \uD83E\uDDE9 AccountInfo found on node: \uD83C\uDF4E $accts \uD83C\uDF4E participants:  \uD83E\uDDE1 $acctsp"
        val a2 = "\uD83E\uDDE9 \uD83E\uDDE9 InvoiceStates found on node: \uD83C\uDF4E $invoices \uD83C\uDF4E  participants:  \uD83E\uDDE1 $invoicesp"
        val a3 = "\uD83E\uDDE9 \uD83E\uDDE9 InvoiceOfferStates found on node: \uD83C\uDF4E $offers \uD83C\uDF4E  participants:  \uD83E\uDDE1 $offersp"
        mList.add(t1)
        mList.add(a1)
        mList.add(a2)
        mList.add(a3)
        mList.add("\uD83E\uDDE9 \uD83E\uDDE9 Total states found:  \uD83E\uDDE1 " + (accts + invoices + offers) + "  \uD83E\uDDE1 \n\n")
        for (m in mList) {
            logger.info(m)
        }
        return mList
    }

    @JvmStatic
    fun listFlows(proxy: CordaRPCOps): List<String> {
        val flows = proxy.registeredFlows()
        logger.info("🥬 🥬 🥬 🥬 Total Registered Flows  \uD83C\uDF4E  ${flows.size}  \uD83C\uDF4E \uD83E\uDD6C ")
        return flows
    }

    @JvmStatic
    fun listNotaries(proxy: CordaRPCOps): List<String> {
        val notaryIdentities = proxy.notaryIdentities()
        val list: MutableList<String> = ArrayList()
        for (info in notaryIdentities) {
            logger.info(" \uD83D\uDD35  \uD83D\uDD35 BFN Corda Notary: \uD83C\uDF3A " + info.name.toString())
            list.add(info.name.toString())
        }
        return list
    }

    @JvmStatic
    @Throws(Exception::class)
    fun startInvoiceRegistrationFlow(proxy: CordaRPCOps, invoice: InvoiceDTO): InvoiceDTO {
        return try {
            val accounts = proxy.vaultQuery(AccountInfo::class.java).states
            var supplierInfo: AccountInfo? = null
            var customerInfo: AccountInfo? = null
            for ((state) in accounts) {
                if (state.data.identifier.toString().equals(invoice.customer!!.identifier, ignoreCase = true)) {
                    customerInfo = state.data
                }
                if (state.data.identifier.toString().equals(invoice.supplier!!.identifier, ignoreCase = true)) {
                    supplierInfo = state.data
                }
            }
            if (supplierInfo == null) {
                throw Exception("Supplier is fucking missing")
            }
            if (customerInfo == null) {
                throw Exception("Customer is bloody missing")
            }
            val taxPercentage = (invoice.valueAddedTax?.div(100.0) ?: 0.0)
            val totalTaxAmt = invoice.amount!! * taxPercentage
            invoice.totalAmount = totalTaxAmt + invoice.amount!!;
            //
            val invoiceState = InvoiceState(UUID.randomUUID(),
                    invoice.invoiceNumber!!,
                    invoice.description!!,
                    invoice.amount!!,
                    invoice.valueAddedTax!!,
                    invoice.totalAmount!!,
                    supplierInfo,
                    customerInfo,
                    Date())
            val issueTx = proxy.startTrackedFlowDynamic(
                    InvoiceRegistrationFlow::class.java, invoiceState).returnValue.getOrThrow()
            logger.info("\uD83C\uDF4F \uD83C\uDF4F \uD83C\uDF4F \uD83C\uDF4F flow completed... " +
                    "\uD83C\uDF4F \uD83C\uDF4F \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06  " +
                    "\uD83D\uDC4C \uD83D\uDC4C \uD83D\uDC4C  signedTransaction returned: \uD83E\uDD4F "
                    + issueTx.toString() + " \uD83E\uDD4F \uD83E\uDD4F ")
//            if (shareWithOtherNodes) {
//                try {
//                    logger.info("........  \uD83D\uDCE3 \uD83D\uDCE3 \uD83D\uDCE3 Share the new invoice with other nodes")
//                    proxy.startTrackedFlowDynamic(
//                            BroadcastTransactionFlow::class.java, issueTx).returnValue
//                } catch (e: Exception) {
//                    logger.warn("Invoice sharing failed", e)
//                }
//            }
            val dto = getDTO(invoiceState)
            //logger.info("Check amount discount total calculations: " + GSON.toJson(dto))
            try {
                sendInvoiceMessage(dto)
                val reference = db.collection("invoices").add(dto)
                logger.info("\uD83E\uDDE9\uD83E\uDDE9\uD83E\uDDE9\uD83E\uDDE9\uD83E\uDDE9\uD83E\uDDE9 " +
                        "Firestore path: " + reference.get().path)
            } catch (e: Exception) {
                logger.error(e.message)
            }
            dto
        } catch (e: Exception) {
            if (e.message != null) {
                throw Exception("Failed to register invoice. " + e.message)
            } else {
                throw Exception("Failed to register invoice. Unknown cause")
            }
        }
    }

    @JvmStatic
    @Throws(Exception::class)
    fun startAccountRegistrationFlow(proxy: CordaRPCOps,
                                     accountName: String, email: String?, password: String?,
                                     cellphone: String?): AccountInfoDTO {
        return try {
            val criteria: QueryCriteria = VaultQueryCriteria(StateStatus.UNCONSUMED)
            val (states) = proxy.vaultQueryByWithPagingSpec(
                    AccountInfo::class.java, criteria,
                    PageSpecification(1, 200))
            logger.info(" \uD83E\uDDA0 \uD83E\uDDA0 Accounts found on network:  \uD83E\uDD6C " + states.size)
            for ((state) in states) {
                val info = state.data
                if (info.name.equals(accountName, ignoreCase = true)) {
                    logger.info("Account $accountName \uD83D\uDC7F \uD83D\uDC7F already exists on the network")
                    throw Exception("Account already exists on the network")
                }
            }
            val accountInfoCordaFuture = proxy.startTrackedFlowDynamic(
                    CreateAccountFlow::class.java, accountName).returnValue
            val (name, host, identifier) = accountInfoCordaFuture.get()
            logger.info("\uD83C\uDF4F \uD83C\uDF4F \uD83C\uDF4F \uD83C\uDF4F Flow completed... " +
                    " \uD83D\uDC4C \uD83D\uDC4C " +
                    "\uD83D\uDC4C accountInfo returned: \uD83E\uDD4F " + name + " \uD83E\uDD4F \uD83E\uDD4F ")
            //create user record in firebase
            try {
                createUser(accountName, email, password,
                        cellphone, identifier.id.toString())

            } catch (e: Exception) {
                logger.error(e.message)
                logger.error("Firebase fucked up ......")
                throw e
            }
            val dto = AccountInfoDTO()
            dto.host = host.toString()
            dto.identifier = identifier.id.toString()
            dto.name = name
            try {
                sendAccountMessage(dto)
                val reference = db.collection("accounts").add(dto)
                logger.info("\uD83E\uDDE9\uD83E\uDDE9\uD83E\uDDE9\uD83E\uDDE9\uD83E\uDDE9\uD83E\uDDE9 " +
                        "Firestore path: " + reference.get().path)
            } catch (e: Exception) {
                logger.error(e.message)
            }
            dto
        } catch (e: Exception) {
            logger.info("\uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D " +
                    "Houston, we have fallen over! Account creation failed")
            logger.error(e.message)
            throw e
        }
    }

    @JvmStatic
    @Throws(Exception::class)
    fun startInvoiceOfferFlow(proxy: CordaRPCOps, invoiceOffer: InvoiceOfferDTO): InvoiceOfferDTO {
        return try {
            //todo - refactor to proper query ...
            val criteria: QueryCriteria = VaultQueryCriteria(StateStatus.UNCONSUMED)
            val (states) = proxy.vaultQueryByWithPagingSpec(
                    InvoiceState::class.java, criteria,
                    PageSpecification(1, 200))
            var invoiceState: InvoiceState? = null
            for (state in states) {
                if (state.state.data.invoiceId.toString().equals(invoiceOffer.invoiceId, ignoreCase = true)) {
                    invoiceState = state.state.data
                    break
                }
            }
            if (invoiceState == null) {
                logger.warn("InvoiceState not found, \uD83D\uDC7F offer probably made on foreign node")
                throw Exception("Invoice not found")
            }
            var investorInfo: AccountInfo? = null
            val (states1) = proxy.vaultQueryByWithPagingSpec(
                    AccountInfo::class.java, criteria,
                    PageSpecification(1, 200))
            for ((state) in states1) {
                if (state.data.identifier.toString().equals(invoiceOffer.investor!!.identifier, ignoreCase = true)) {
                    investorInfo = state.data
                }
            }
            if (investorInfo == null) {
                throw Exception("Investor not found")
            }
            if (invoiceOffer.discount == Double.MIN_VALUE) {
                throw Exception("Discount not found")
            }
            val nPercentage = 100.0 - invoiceOffer.discount!!
            invoiceOffer.offerAmount = invoiceOffer.originalAmount!! * (nPercentage / 100)
            processInvoiceOffer(proxy, invoiceOffer, invoiceState, investorInfo)
        } catch (e: Exception) {
            if (e.message != null) {
                throw Exception("Failed to register invoiceOffer.  \uD83D\uDC7F ${e.message}")
            } else {
                throw Exception("Failed to register invoiceOffer. Unknown cause")
            }
        }
    }

    @Throws(Exception::class)
    private fun processInvoiceOffer(proxy: CordaRPCOps, invoiceOffer: InvoiceOfferDTO, invoiceState: InvoiceState, investorInfo: AccountInfo): InvoiceOfferDTO {
        val invoiceOfferState = InvoiceOfferState(
                invoiceId = invoiceState.invoiceId,
                customer = invoiceState.customerInfo,
                investor = investorInfo,
                supplier = invoiceState.supplierInfo,
                discount = invoiceOffer.discount!!,
                invoiceNumber = invoiceState.invoiceNumber,
                offerAmount = invoiceOffer.offerAmount!!,
                offerDate = Date(),
                originalAmount = invoiceState.totalAmount,
                ownerDate = Date()
        )
        val signedTransactionCordaFuture = proxy.startTrackedFlowDynamic(
                InvoiceOfferFlow::class.java, invoiceOfferState)
                .returnValue
        signedTransactionCordaFuture.get()
        logger.info("\uD83C\uDF4F \uD83C\uDF4F processInvoiceOffer completed... " +
                "\uD83D\uDC4C \uD83D\uDC4C \uD83D\uDC4C   ")
        val offerDTO = getDTO(invoiceOfferState)
        try {
            val reference = db.collection("invoiceOffers").add(offerDTO)
            logger.info("\uD83E\uDDE9 " +
                    "Firestore invoiceOffers path: " + reference.get().path)
        } catch (e: Exception) {
            logger.error(e.message)
        }
        sendInvoiceOfferMessage(offerDTO)
        return offerDTO
    }

    fun selectBestOffer(proxy: CordaRPCOps, accountId: String,
                        invoiceId: String): OfferAndTokenDTO? {

        val cordaFuture = proxy.startTrackedFlowDynamic(
                BestOfferForInvoiceFlow::class.java, accountId, invoiceId)
                .returnValue
        val offerAndToken: OfferAndTokenState = cordaFuture.get() ?: return null
        //todo - refactor query -
        val criteria = VaultQueryCriteria(status = StateStatus.UNCONSUMED)
        val page =
                proxy.vaultQueryByWithPagingSpec(
                        contractStateType = AccountInfo::class.java,
                        criteria = criteria,
                        paging = PageSpecification(
                                pageNumber = 1, pageSize = 400))
        var account: AccountInfo? = null
        page.states.forEach() {
            if (it.state.data.identifier.id.toString() == accountId) {
                account = it.state.data
            }
        }
        if (account == null) {
            throw java.lang.Exception("Account not found")
        }

        val tokenDTO = getDTO(offerAndToken.token, accountId,
                invoiceId, account!!, offerAndToken.invoiceOffer.originalAmount)
        FirebaseUtil.addToken(tokenDTO)
        logger.info("\uD83C\uDF4F \uD83C\uDF4F selectBestOffer completed... token issued " +
                "\uD83D\uDC4C \uD83D\uDC4C \uD83D\uDC4C   ${GSON.toJson(tokenDTO)}")
        return OfferAndTokenDTO(invoiceOffer = getDTO(offerAndToken.invoiceOffer),
                token = tokenDTO)
    }

    @JvmStatic
    fun getDTO(token: FungibleToken, accountId: String,
               invoiceId: String, account: AccountInfo, invoiceAmount: Double): TokenDTO {
        return TokenDTO(
                accountId = accountId,
                invoiceId = invoiceId,
                tokenIdentifier = token.issuedTokenType.tokenIdentifier,
                amount = token.amount.toDecimal().toDouble(),
                issuer = token.issuer.toString(),
                holder = token.holder.toString(),
                invoiceAmount = invoiceAmount,
                account = getDTO(account)

        )
    }

    @JvmStatic
    @Throws(Exception::class)
    fun getDTO(state: InvoiceState): InvoiceDTO {
        val invoice = InvoiceDTO()
        invoice.amount = state.amount
        invoice.customer = getDTO(state.customerInfo)
        invoice.supplier = getDTO(state.supplierInfo)
        invoice.description = state.description
        invoice.invoiceId = state.invoiceId.toString()
        invoice.invoiceNumber = state.invoiceNumber
        invoice.dateRegistered = state.dateRegistered
        invoice.valueAddedTax = state.valueAddedTax
        invoice.totalAmount = state.totalAmount
        return invoice
    }

    @JvmStatic
    @Throws(Exception::class)
    fun getDTO(state: InvoiceOfferState): InvoiceOfferDTO {
        val o = InvoiceOfferDTO()
        o.invoiceId = state.invoiceId.toString()
        o.invoiceNumber = state.invoiceNumber
        o.offerAmount = state.offerAmount
        o.originalAmount = state.originalAmount
        o.discount = state.discount
        o.supplier = getDTO(state.supplier)
        o.investor = getDTO(state.investor)
        o.customer = getDTO(state.customer)

        o.offerDate = state.offerDate
        o.investorDate = state.ownerDate
        return o
    }

    @JvmStatic
    fun getDTO(a: AccountInfo): AccountInfoDTO {
        val info = AccountInfoDTO()
        info.host = a.host.toString()
        info.identifier = a.identifier.id.toString()
        info.name = a.name
        return info
    }

    @JvmStatic
    fun getDTO(a: InvestorProfileState): InvestorProfileStateDTO {
        return InvestorProfileStateDTO(
                issuedBy = a.issuedBy.toString(),
                accountId = a.accountId, date = a.date,
                defaultDiscount = a.defaultDiscount,
                maximumInvoiceAmount = a.maximumInvoiceAmount,
                totalInvestment = a.totalInvestment,
                minimumInvoiceAmount = a.minimumInvoiceAmount
        )
    }

    @JvmStatic
    fun getDTO(a: SupplierProfileState): SupplierProfileStateDTO {
        return SupplierProfileStateDTO(
                issuedBy = a.issuedBy.toString(),
                accountId = a.accountId, date = a.date,
                maximumDiscount = a.maximumDiscount
        )
    }
}
