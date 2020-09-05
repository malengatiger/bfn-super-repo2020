package com.bfn.client.web

import com.bfn.client.data.*
import com.bfn.client.web.FirebaseService

import com.bfn.contractstates.states.*
import com.bfn.flows.CreateAccountFlow
import com.bfn.flows.InvestorProfileFlow
import com.bfn.flows.SupplierProfileFlow
import com.bfn.flows.invoices.InvoiceOfferFlow
import com.bfn.flows.invoices.InvoiceRegistrationFlow
import com.bfn.flows.queries.InvoiceOfferQueryFlow
import com.bfn.flows.queries.InvoiceQueryFlow
import com.bfn.flows.scheduled.CreateInvoiceOffersFlow
import com.bfn.flows.todaysDate
import com.google.firebase.cloud.FirestoreClient
import com.google.gson.GsonBuilder
import com.r3.corda.lib.accounts.contracts.states.AccountInfo
import net.corda.core.contracts.ContractState
import net.corda.core.contracts.StateAndRef
import net.corda.core.messaging.CordaRPCOps
import net.corda.core.node.services.Vault.StateStatus
import net.corda.core.node.services.vault.PageSpecification
import net.corda.core.node.services.vault.QueryCriteria
import net.corda.core.node.services.vault.QueryCriteria.VaultQueryCriteria
import net.corda.core.utilities.getOrThrow
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.*
import javax.annotation.PostConstruct

@Service
class WorkerBeeService {
    private val logger = LoggerFactory.getLogger(WorkerBeeService::class.java)
    private val gson = GsonBuilder().setPrettyPrinting().create()
    @Autowired
    private lateinit var firebaseService: FirebaseService

    @PostConstruct
    fun init() {
        logger.info("\uD83C\uDF3C \uD83C\uDF3C \uD83C\uDF3C WorkerBee service has been constructed")
    }

    
    fun listNodes(proxy: CordaRPCOps): List<NodeInfoDTO> {
        val nodes = proxy.networkMapSnapshot()
        val nodeList: MutableList<NodeInfoDTO> = ArrayList()
        for (info in nodes) {
            val dto = NodeInfoDTO()
            dto.serial = info.serial
            dto.platformVersion = info.platformVersion.toLong()
            dto.host = info.addresses[0].host
            dto.port = info.addresses[0].port.toLong()
            for (party in info.legalIdentities) {
                dto.addresses = ArrayList()
                (dto.addresses as ArrayList<String>).add(party.toString())
            }
            logger.info("\uD83C\uDF3A BFN Corda Node: \uD83C\uDF3A ${info.legalIdentities[0]} addresses: ${info.addresses}")
            nodeList.add(dto)
        }
        logger.info("\uD83E\uDDE1 \uD83D\uDC9B \uD83D\uDC9A Corda NetworkNodes found: \uD83D\uDC9A "
                + nodeList.size + " \uD83D\uDC9A ")
        return nodeList
    }

    
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
                    acct.host.toString(), acct.name, "")
            if (dto.host == node) {
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
    
    fun getNodeAccount(proxy: CordaRPCOps, identifier: String): AccountInfo? {
        val start = Date()
        val accounts = proxy.vaultQuery(AccountInfo::class.java).states
        logger.info("\uD83C\uDF3A Total Accounts in Node: ${accounts.size} \uD83C\uDF3A ")
        var end = Date()
        val ms1 = (end.time - start.time)
        logger.info("\uD83D\uDD37 vault query: $ms1 milliseconds elapsed, ${accounts.size} accounts gotten \uD83D\uDD37 ")
        var cnt = 0
        var account: AccountInfo? = null

        val node = proxy.nodeInfo().legalIdentities.first().toString()
        val start2 = Date()
        for ((state) in accounts) {
            cnt++
            val acct = state.data
            logger.info("\uD83C\uDF50️ \uD83C\uDF50 ️Processing account  \uD83C\uDF50️ " +
                    "#$cnt \uD83C\uDF3A ${state.data.name} \uD83C\uDF50️ ")
            if (acct.identifier.toString() == identifier) {
                account = acct
            }
        }
        end = Date()
        val ms = (end.time - start2.time)
        val msg = "\uD83C\uDF3A \uD83C\uDF3A done  \uD83D\uDC9A " +
                "\uD83D\uDC9A account on Node: \uD83C\uDF3A : \uD83D\uDD37 $ms milliseconds elapsed \uD83D\uDD37 " +
                proxy.nodeInfo().legalIdentities.first().toString()
        logger.info(msg)
        return account
    }

    
    fun getNetworkAccounts(proxy: CordaRPCOps): List<AccountInfoDTO> {
        val accounts = proxy.vaultQuery(AccountInfo::class.java).states
        logger.info("\uD83C\uDF3A Total Accounts in Network: ${accounts.size} \uD83C\uDF3A ")
        var cnt = 0
        val list: MutableList<AccountInfoDTO> = ArrayList()
        for ((state) in accounts) {
            cnt++
            val (name, host, identifier) = state.data
            val dto = AccountInfoDTO(identifier.id.toString(),
                    host.toString(), name, "")
            list.add(dto)
        }
        val msg = "\uD83C\uDF3A \uD83C\uDF3A done listing  \uD83E\uDDA0 ${list.size}  " +
                "\uD83E\uDDA0 accounts on Network: \uD83C\uDF3A " +
                proxy.nodeInfo().legalIdentities.first().toString()
        logger.info(msg)
        return list
    }

    
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
        val msg = "\uD83C\uDF3A \uD83C\uDF3A found account:  \uD83C\uDF3A " + gson.toJson(dto)
        logger.info(msg)
        return dto
    }

    
    @Throws(Exception::class)
    fun getSupplierProfile(proxy: CordaRPCOps, accountId: String?): SupplierProfileStateDTO? {
        val list: List<StateAndRef<SupplierProfileState>> = proxy.vaultQueryByWithPagingSpec(
                criteria = VaultQueryCriteria(status = StateStatus.UNCONSUMED),
                paging = PageSpecification(1, 4000),
                contractStateType = SupplierProfileState::class.java
        ).states
        var dto: SupplierProfileStateDTO? = null
        for (profile in list) {
            if (profile.state.data.account.identifier.equals(accountId)) {
                dto = getDTO(profile.state.data)
                break
            }
        }
        val msg = if (dto == null) {
            "\uD83C\uDF3A \uD83C\uDF3A SupplierProfile not found:  \uD83C\uDF3A "
        } else {
            "\uD83C\uDF3A \uD83C\uDF3A found profile:  \uD83C\uDF3A " + gson.toJson(dto)
        }
        logger.info(msg)
        return dto
    }

    
    @Throws(Exception::class)
    fun getInvestorProfile(proxy: CordaRPCOps, accountId: String?): InvestorProfileStateDTO? {
        val list: List<StateAndRef<InvestorProfileState>> = proxy.vaultQueryByWithPagingSpec(
                criteria = VaultQueryCriteria(status = StateStatus.UNCONSUMED),
                paging = PageSpecification(1, 4000),
                contractStateType = InvestorProfileState::class.java
        ).states
        var dto: InvestorProfileStateDTO? = null
        for (profile in list) {
            if (profile.state.data.account.identifier.equals(accountId)) {
                dto = getDTO(profile.state.data)
                break
            }
        }
        val msg = if (dto == null) {
            "\uD83C\uDF3A \uD83C\uDF3A InvestorProfile not found:  \uD83C\uDF3A "
        } else {
            "\uD83C\uDF3A \uD83C\uDF3A found profile:  \uD83C\uDF3A " + gson.toJson(dto)
        }
        logger.info(msg)
        return dto
    }


    
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


    
    @Throws(Exception::class)
    fun createInvestorProfile(proxy: CordaRPCOps, profile: InvestorProfileStateDTO, account: AccountInfo): String {


        val state = InvestorProfileState(
                issuedBy = proxy.nodeInfo().legalIdentities.first(),
                account = account,
                defaultDiscount = profile.defaultDiscount,
                maximumInvoiceAmount = profile.maximumInvoiceAmount,
                totalInvestment = profile.totalInvestment,
                bank = profile.bank, bankAccount = profile.bankAccount,
                minimumInvoiceAmount = profile.minimumInvoiceAmount, date = Date()
        )
        val fut = proxy.startTrackedFlowDynamic(
                InvestorProfileFlow::class.java, state).returnValue
        val tx = fut.get()
        val m = "\uD83C\uDF3A createInvestorProfile, DONE!:  \uD83C\uDF3A ${tx.id}"
        logger.info(m)
        return m
    }

    
    @Throws(Exception::class)
    fun createSupplierProfile(proxy: CordaRPCOps, profile: SupplierProfileStateDTO, account: AccountInfo): String {

        val state = SupplierProfileState(
                issuedBy = proxy.nodeInfo().legalIdentities.first(),
                account = account,
                maximumDiscount = profile.maximumDiscount,
                bank = profile.bank,
                bankAccount = profile.bankAccount,
                date = Date()
        )
        val fut = proxy.startTrackedFlowDynamic(
                SupplierProfileFlow::class.java, state).returnValue
        val tx = fut.get()
        val m = "\uD83C\uDF3A createSupplierProfile, DONE!:  \uD83C\uDF3A ${tx.id}"
        logger.info(m)
        return m
    }

    
    @Throws(Exception::class)
    fun makeInvoiceOffers(proxy: CordaRPCOps, investorId: String): List<InvoiceOfferDTO> {
        val fut = proxy.startTrackedFlowDynamic(
                CreateInvoiceOffersFlow::class.java, investorId).returnValue
        val offerStates = fut.get()
        val offers: MutableList<InvoiceOfferDTO> = mutableListOf()
        offerStates!!.forEach() {
            val offer = getDTO(it)
            offers.add(offer)

        }
        val m = "\uD83C\uDF3A makeInvoiceOffers, DONE!:  \uD83C\uDF3A " + offerStates.size
        offers.forEach() {
            logger.info("Investor  \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 ${it.investor.name} " +
                    ":: \uD83C\uDF4E Offer made: ${it.supplier.name} " +
                    "offered: ${it.offerAmount} \uD83D\uDD35 \uD83D\uDD35 originalAmt: ${it.originalAmount} " +
                    " discount: ${it.discount}  \uD83C\uDF40 delta: ${it.originalAmount - it.offerAmount} ")
        }
        logger.info(m)
        return offers
    }

    
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


    fun getDashboardData(proxy: CordaRPCOps): DashboardData {
        var pageNumber = 1
        val states: MutableList<StateAndRef<ContractState>> = ArrayList()
        val data = DashboardData()
        var totalResults: Long
        do {
            logger.info("\uD83E\uDDE9 \uD83E\uDDE9 \uD83E\uDDE9 \uD83E\uDDE9 \uD83E\uDDE9 " +
                    "processing page " + pageNumber)
            val pageSpec = PageSpecification(pageNumber, Companion.PAGE_SIZE)
            val criteria: QueryCriteria = VaultQueryCriteria(StateStatus.UNCONSUMED)
            val (newStates, _, totalStatesAvailable) = proxy.vaultQueryByWithPagingSpec(
                    ContractState::class.java, criteria, pageSpec)
            totalResults = totalStatesAvailable
            logger.info("\uD83D\uDCA6 \uD83D\uDCA6 Number of States \uD83C\uDF4E " + newStates.size)
            states.addAll(newStates)
            pageNumber++
        } while (Companion.PAGE_SIZE * (pageNumber - 1) <= totalResults)
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

    
    fun getStates(proxy: CordaRPCOps): List<String> {
        var pageNumber = 1
        val states: MutableList<StateAndRef<ContractState>> = ArrayList()
        var totalResults: Long
        do {
            logger.info("\uD83E\uDDE9 \uD83E\uDDE9 \uD83E\uDDE9 \uD83E\uDDE9 \uD83E\uDDE9 " +
                    "processing page " + pageNumber)
            val pageSpec = PageSpecification(pageNumber, Companion.PAGE_SIZE)
            val criteria: QueryCriteria = VaultQueryCriteria(StateStatus.UNCONSUMED)
            val (newStates, _, totalStatesAvailable) = proxy.vaultQueryByWithPagingSpec(
                    ContractState::class.java, criteria, pageSpec)
            totalResults = totalStatesAvailable
            logger.info("\uD83D\uDCA6 \uD83D\uDCA6 Number of States \uD83C\uDF4E " + newStates.size)
            states.addAll(newStates)
            pageNumber++
        } while (Companion.PAGE_SIZE * (pageNumber - 1) <= totalResults)
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

    
    fun listFlows(proxy: CordaRPCOps): List<String> {
        val flows = proxy.registeredFlows()
        logger.info("🥬 🥬 🥬 🥬 Total Registered Flows  \uD83C\uDF4E  ${flows.size}  \uD83C\uDF4E \uD83E\uDD6C ")
        return flows
    }

    
    fun listNotaries(proxy: CordaRPCOps): List<String> {
        val notaryIdentities = proxy.notaryIdentities()
        val list: MutableList<String> = ArrayList()
        for (info in notaryIdentities) {
            logger.info(" \uD83D\uDD35  \uD83D\uDD35 BFN Corda Notary: \uD83C\uDF3A " + info.name.toString())
            list.add(info.name.toString())
        }
        return list
    }

    
    @Throws(Exception::class)
    fun startInvoiceRegistrationFlow(proxy: CordaRPCOps, invoice: InvoiceDTO): InvoiceDTO {
        return try {
            val accounts = proxy.vaultQuery(AccountInfo::class.java).states
            var supplierInfo: AccountInfo? = null
            var customerInfo: AccountInfo? = null
            for ((state) in accounts) {
                if (state.data.identifier.toString().equals(invoice.customer.identifier, ignoreCase = true)) {
                    customerInfo = state.data
                }
                if (state.data.identifier.toString().equals(invoice.supplier.identifier, ignoreCase = true)) {
                    supplierInfo = state.data
                }
            }
            if (supplierInfo == null) {
                throw Exception("Supplier is fucking missing")
            }
            if (customerInfo == null) {
                throw Exception("Customer is bloody missing")
            }
            val taxPercentage = invoice.valueAddedTax.div(100.0)
            val totalTaxAmt = invoice.amount * taxPercentage
            invoice.totalAmount = totalTaxAmt + invoice.amount
            //

            val invoiceState = InvoiceState(
                    invoiceId = UUID.randomUUID(),
                    invoiceNumber = invoice.invoiceNumber,
                    description = invoice.description,
                    amount = invoice.amount,
                    valueAddedTax = invoice.valueAddedTax,
                    totalAmount = invoice.totalAmount,
                    supplierInfo = supplierInfo,
                    customerInfo = customerInfo,
                    externalId = invoice.externalId,
                    dateRegistered = todaysDate()
            )

            val issueTx = proxy.startTrackedFlowDynamic(
                    InvoiceRegistrationFlow::class.java, invoiceState).returnValue.getOrThrow()

            logger.info("\uD83C\uDF4F flow completed... ")

            val dto = invoiceState.let { getDTO(it) }
            //logger.info("Check amount discount total calculations: " + GSON.toJson(dto))
            try {
                firebaseService.sendInvoiceMessage(dto)
                val db = FirestoreClient.getFirestore()
                val reference = db.collection("invoices").add(dto)
                logger.info("\uD83E\uDDE9" +
                        "Firestore path: " + reference.get().path)
            } catch (e: Exception) {
                logger.error(e.message)
            }
            dto
        } catch (e: Exception) {
            if (e.message != null) {
                throw Exception("Failed to register invoice. " + e.message)
            } else {
                e.printStackTrace()
                throw Exception("Failed to register invoice. Unknown bloody cause!!")
            }
        }
    }
    

    
    @Throws(Exception::class)
    fun startAccountRegistrationFlow(proxy: CordaRPCOps,
                                     accountName: String, email: String,
                                     password: String): AccountInfoDTO {
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
            logger.info("\uD83C\uDF4F Flow completed... \uD83D\uDC4C accountInfo returned: \uD83E\uDD4F $name")
            //create user record in firebase
            try {
                firebaseService.createUser(accountName, email, password,
                        identifier.id.toString())

            } catch (e: Exception) {
                logger.error(e.message)
                logger.error("Firebase fucked up! Auth user FAIL ......")
                throw e
            }
            val dto = AccountInfoDTO(
                    host = host.toString(),
                    identifier = identifier.id.toString(),
                    name = name,
                    status = "")

            try {
                firebaseService.sendAccountMessage(dto)
                val db = FirestoreClient.getFirestore()
                val reference = db.collection("accounts").add(dto)
                logger.info("\uD83E\uDDE9 Firestore path: " + reference.get().path)
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
                if (state.data.identifier.toString().equals(invoiceOffer.investor.identifier, ignoreCase = true)) {
                    investorInfo = state.data
                }
            }
            if (investorInfo == null) {
                throw Exception("Investor not found")
            }
            if (invoiceOffer.discount == Double.MIN_VALUE) {
                throw Exception("Discount not found")
            }
            val nPercentage = 100.0 - invoiceOffer.discount
            invoiceOffer.offerAmount = invoiceOffer.originalAmount * (nPercentage / 100)
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
                discount = invoiceOffer.discount,
                invoiceNumber = invoiceState.invoiceNumber,
                offerAmount = invoiceOffer.offerAmount,
                offerDate = invoiceOffer.offerDate,
                originalAmount = invoiceState.totalAmount,
                acceptanceDate = invoiceOffer.acceptanceDate,
                accepted = false, offerId = invoiceOffer.offerId,
                externalId = invoiceState.externalId
        )
        val signedTransactionCordaFuture = proxy.startTrackedFlowDynamic(
                InvoiceOfferFlow::class.java, invoiceOfferState)
                .returnValue
        signedTransactionCordaFuture.get()
        logger.info("\uD83C\uDF4F \uD83C\uDF4F processInvoiceOffer completed... " +
                "\uD83D\uDC4C \uD83D\uDC4C \uD83D\uDC4C   ")
        val offerDTO = getDTO(invoiceOfferState)
        try {
            val db = FirestoreClient.getFirestore()
            val reference = db.collection("invoiceOffers").add(offerDTO)
            logger.info("\uD83E\uDDE9 " +
                    "Firestore invoiceOffers path: " + reference.get().path)
        } catch (e: Exception) {
            logger.error(e.message)
        }
        firebaseService.sendInvoiceOfferMessage(offerDTO)
        return offerDTO
    }

    
    @Throws(Exception::class)
    fun getDTO(state: InvoiceState): InvoiceDTO {
        return InvoiceDTO(
                amount = state.amount,
                customer = getDTO(state.customerInfo),
                supplier = getDTO(state.supplierInfo),
                description = state.description,
                invoiceId = state.invoiceId.toString(),
                invoiceNumber = state.invoiceNumber,
                dateRegistered = state.dateRegistered,
                valueAddedTax = state.valueAddedTax,
                totalAmount = state.totalAmount,
                externalId = state.externalId
        )
    }

    
    @Throws(Exception::class)
    fun getDTO(state: InvoiceOfferState): InvoiceOfferDTO {
        return InvoiceOfferDTO(
                invoiceId = state.invoiceId.toString(),
                invoiceNumber = state.invoiceNumber,
                offerAmount = state.offerAmount,
                originalAmount = state.originalAmount,
                discount = state.discount,
                supplier = getDTO(state.supplier),
                investor = getDTO(state.investor),
                offerDate = state.offerDate,
                investorDate = state.acceptanceDate,
                accepted = state.accepted, externalId = state.externalId,
                acceptanceDate = state.acceptanceDate,
                offerId = state.offerId, isAnchor = state.isAnchor

        )
    }

    
    fun getDTO(a: AccountInfo): AccountInfoDTO {
        return AccountInfoDTO(
                host = a.host.toString(),
                identifier = a.identifier.id.toString(),
                name = a.name, status = "")
    }

    
    fun getDTO(a: InvestorProfileState): InvestorProfileStateDTO {
        return InvestorProfileStateDTO(
                issuedBy = a.issuedBy.toString(),
                account = getDTO(a.account), date = a.date.toString(),
                defaultDiscount = a.defaultDiscount,
                maximumInvoiceAmount = a.maximumInvoiceAmount,
                totalInvestment = a.totalInvestment,
                minimumInvoiceAmount = a.minimumInvoiceAmount,
                bank = a.bank, bankAccount = a.bankAccount
        )
    }

    
    fun getDTO(a: SupplierPaymentState): SupplierPaymentDTO {
        return SupplierPaymentDTO(
                acceptedOffer = getDTO(a.acceptedOffer),
                supplierProfile = getDTO(a.supplierProfile),
                date = a.date,
                paid = a.paid
        )
    }
    
    fun getDTO(a: SupplierProfileState): SupplierProfileStateDTO {
        return SupplierProfileStateDTO(
                issuedBy = a.issuedBy.toString(),
                account = getDTO(a.account), date = a.date.toString(),
                maximumDiscount = a.maximumDiscount,
                bank = a.bank,
                bankAccount = a.bankAccount
        )
    }

    companion object {
        //todo extend paging query where appropriate
        private const val PAGE_SIZE = 200
    }
}
