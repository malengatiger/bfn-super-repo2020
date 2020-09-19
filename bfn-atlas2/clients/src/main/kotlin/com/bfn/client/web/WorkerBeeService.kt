package com.bfn.client.web

import com.bfn.client.data.*
import com.bfn.contractstates.states.*
import com.bfn.flows.CreateAccountFlow
import com.bfn.flows.CreateUserFlow
import com.bfn.flows.customer.CustomerProfileFlow
import com.bfn.flows.investor.InvestorProfileFlow
import com.bfn.flows.invoices.InvoiceOfferFlow
import com.bfn.flows.invoices.InvoiceRegistrationFlow
import com.bfn.flows.queries.AccountInfoQueryFlow
import com.bfn.flows.queries.FindInvoiceFlow
import com.bfn.flows.queries.InvoiceOfferQueryFlow
import com.bfn.flows.queries.InvoiceQueryFlow
import com.bfn.flows.scheduled.CreateInvoiceOffersFlow
import com.bfn.flows.supplier.SupplierProfileFlow
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
import org.joda.time.DateTime
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.util.*
import javax.annotation.PostConstruct

@Service
class WorkerBeeService {
    private val logger = LoggerFactory.getLogger(WorkerBeeService::class.java)
    private val gson = GsonBuilder().setPrettyPrinting().create()

    @Autowired
    private lateinit var firebaseService: FirebaseService

    @Autowired
    private lateinit var stellarAccountService: StellarAccountService

    @PostConstruct
    fun init() {
        logger.info("\uD83C\uDF3C \uD83C\uDF3C  WorkerBee service has been constructed")
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
        val node = proxy.nodeInfo()
        logger.info("\uD83C\uDF50 \uD83C\uDF50 Current Node: ${node.legalIdentities[0].name}")
        val accounts = proxy.vaultQuery(AccountInfo::class.java).states
        logger.info("\uD83C\uDF3A \uD83C\uDF3A \uD83C\uDF3A " +
                "Total Accounts in Node (\uD83D\uDD35 \uD83D\uDD35 including accounts from other Corda node): " +
                "${accounts.size} \uD83C\uDF3A THIS Node: ${proxy.nodeInfo().legalIdentities[0].name}")
        var cnt = 0
        for (account in accounts) {
            cnt++
            logger.info("\uD83C\uDF40 Account from query:  \uD83C\uDF50" +
                    " name: ${account.state.data.host.name} \uD83C\uDF50 " +
                    "identifier: ${account.state.data.identifier.id}")
        }
        var end = Date()
        val ms1 = (end.time - start.time)
        logger.info("\uD83D\uDD37 \uD83D\uDD37 \uD83D\uDD37 vault query: " +
                "$ms1 milliseconds elapsed, ${accounts.size} accounts gotten \uD83D\uDD37 ${accounts.size} accounts ...")
        cnt = 0
        val list: MutableList<AccountInfoDTO> = mutableListOf()
        val start2 = Date()
        for ((state) in accounts) {
            cnt++
            val acct = state.data
            if (acct.host.name.toString() == proxy.nodeInfo().legalIdentities[0].name.toString()) {
                val dto = AccountInfoDTO(acct.identifier.id.toString(),
                        acct.host.toString(), acct.name)
                list.add(dto)
            }

        }
        end = Date()
        val ms = (end.time - start2.time)
        val msg = "\uD83C\uDF3A \uD83C\uDF3A done filtered listing; found accounts for node: \uD83D\uDC9A ${list.size} " +
                "\uD83D\uDC9A accounts on Node: \uD83C\uDF3A : \uD83D\uDD37 $ms milliseconds elapsed \uD83D\uDD37 " +
                proxy.nodeInfo().legalIdentities.first().name.toString()
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

        val start2 = Date()
        for ((state) in accounts) {
            cnt++
            val acct = state.data
            logger.info("\uD83C\uDF50️ \uD83C\uDF50 ️Processing account  \uD83C\uDF50️ " +
                    "#$cnt \uD83C\uDF3A ${state.data.name} \uD83C\uDF50️ ")
            if (acct.identifier.id.toString() == identifier) {
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
                    host.toString(), name)
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
            if (profile.state.data.account.identifier.id.equals(accountId)) {
                dto = DTOUtil.getDTO(profile.state.data)
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
            if (profile.state.data.account.identifier.id.equals(accountId)) {
                dto = DTOUtil.getDTO(profile.state.data)
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
            dtos.add(DTOUtil.getDTO(it))

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
            dtos.add(DTOUtil.getDTO(it))

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
            dtos.add(DTOUtil.getDTO(it))

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
                dtos.add(DTOUtil.getDTO(it))
            }
        }
        val m = "\uD83C\uDF3A done listing InvoiceStates:  \uD83C\uDF3A " + invoices.size
        logger.info(m)
        return dtos
    }


    @Throws(Exception::class)
    fun createInvestorProfile(proxy: CordaRPCOps, profile: InvestorProfileStateDTO, account: AccountInfo): String {

        val matrixItems: MutableList<TradeMatrixItem> = mutableListOf()
        for (item in profile.tradeMatrixItems) {
            matrixItems.add(TradeMatrixItem(
                    startInvoiceAmount = item.startInvoiceAmount,
                    endInvoiceAmount = item.endInvoiceAmount,
                    date = item.date,
                    offerDiscount = item.offerDiscount))
        }
        val state = InvestorProfileState(
                account = account,
                defaultDiscount = profile.defaultDiscount,
                maximumInvoiceAmount = profile.maximumInvoiceAmount,
                totalInvestment = profile.totalInvestment,
                bank = profile.bank, bankAccount = profile.bankAccount,
                minimumInvoiceAmount = profile.minimumInvoiceAmount, date = Date(),
                stellarAccountId = profile.stellarAccountId,
                rippleAccountId = profile.rippleAccountId,
                tradeMatrixItems = matrixItems
        )
        val fut = proxy.startTrackedFlowDynamic(
                InvestorProfileFlow::class.java, state).returnValue
        val tx = fut.get()
        val m = "\uD83C\uDF3A createInvestorProfile, DONE!:  \uD83C\uDF3A ${tx.id}"
        firebaseService.addInvestorProfile(DTOUtil.getDTO(state))
        logger.info(m)
        return m
    }


    @Throws(Exception::class)
    fun createSupplierProfile(proxy: CordaRPCOps, profile: SupplierProfileStateDTO, account: AccountInfo): String {

        val state = SupplierProfileState(
                account = account,
                maximumDiscount = profile.maximumDiscount,
                bank = profile.bank,
                bankAccount = profile.bankAccount,
                date = Date(),
                stellarAccountId = profile.stellarAccountId,
                rippleAccountId = profile.rippleAccountId
        )
        val fut = proxy.startTrackedFlowDynamic(
                SupplierProfileFlow::class.java, state).returnValue
        val tx = fut.get()
        val m = "\uD83C\uDF3A createSupplierProfile, DONE!:  \uD83C\uDF3A ${tx.id}"
        firebaseService.addSupplierProfile(DTOUtil.getDTO(state))
        logger.info(m)
        return m
    }

    fun createCustomerProfile(proxy: CordaRPCOps,
                              customerProfile: CustomerProfileStateDTO,
                              password: String): CustomerProfileStateDTO {
        logger.info("\n\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E " +
                "Creating Customer ${customerProfile.account.name} .............")

        try {
            val acctInfo1 = startAccountRegistrationFlow(proxy = proxy,
                    accountName = customerProfile.account.name,
                    email = customerProfile.email,
                    password = password, cellphone = customerProfile.cellphone
            )

            if (acctInfo1 != null) {
                customerProfile.account = acctInfo1.accountInfo
            }

            val txId = startCustomerProfileFlow(proxy, profile = customerProfile)
            firebaseService.addCustomerProfile(customerProfile)
            logger.info("\n\n\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E " +
                    "WorkerBee: CustomerProfile has been created: " +
                    "${customerProfile.account.name} \uD83C\uDF4F txId: $txId \n\n")
            return customerProfile
        } catch (e: Exception) {
            logger.info("\uD83D\uDD25 \uD83D\uDD25 \uD83D\uDD25 Customer creation failed ")
            e.printStackTrace()
            throw Exception("Customer creation failed")
        }
    }

    @Throws(Exception::class)
    fun makeInvoiceOffers(proxy: CordaRPCOps, investorId: String): List<InvoiceOfferDTO> {
        val fut = proxy.startTrackedFlowDynamic(
                CreateInvoiceOffersFlow::class.java, investorId).returnValue
        val offerStates = fut.get()
        val offers: MutableList<InvoiceOfferDTO> = mutableListOf()
        offerStates!!.forEach() {
            val offer = DTOUtil.getDTO(it)
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
            dtos.add(DTOUtil.getDTO(it))
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

            dtos.add(DTOUtil.getDTO(it))

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
                dtos.add(DTOUtil.getDTO(it))
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
            val pageSpec = PageSpecification(pageNumber, 1000)
            val criteria: QueryCriteria = VaultQueryCriteria(StateStatus.UNCONSUMED)
            val (newStates, _, totalStatesAvailable) = proxy.vaultQueryByWithPagingSpec(
                    ContractState::class.java, criteria, pageSpec)
            totalResults = totalStatesAvailable
            logger.info("\uD83D\uDCA6 \uD83D\uDCA6 Number of States \uD83C\uDF4E " + newStates.size)
            states.addAll(newStates)
            pageNumber++
        } while (1000 * (pageNumber - 1) <= totalResults)
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
            val pageSpec = PageSpecification(pageNumber, 1000)
            val criteria: QueryCriteria = VaultQueryCriteria(StateStatus.UNCONSUMED)
            val (newStates, _, totalStatesAvailable) = proxy.vaultQueryByWithPagingSpec(
                    ContractState::class.java, criteria, pageSpec)
            totalResults = totalStatesAvailable
            logger.info("\uD83D\uDCA6 \uD83D\uDCA6 Number of States \uD83C\uDF4E " + newStates.size)
            states.addAll(newStates)
            pageNumber++
        } while (1000 * (pageNumber - 1) <= totalResults)
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
    fun validateInvoiceAgainstProfile(proxy: CordaRPCOps,
                                      invoice: InvoiceDTO,
                                      investorProfile: InvestorProfileStateDTO): Boolean {

        logger.info("\uD83E\uDD66 validateInvoiceAgainstProfile ... invoice.amount: ${invoice.amount}")
        if (invoice.amount < investorProfile.minimumInvoiceAmount) {
            return false;
        }
        if (invoice.amount > investorProfile.maximumInvoiceAmount) {
            return false;
        }
        if (invoice.supplier.identifier == investorProfile.account.identifier) {
            return false;
        }
        if (invoice.customer.identifier == investorProfile.account.identifier) {
            return false;
        }
        //todo - 🍎 🍎 🍎 🍎  add validation against industry, specific blackList, whiteList etc. 🍎 🍎 🍎 🍎

        return true
    }

    @Throws(Exception::class)
    fun startInvoiceRegistrationFlow(proxy: CordaRPCOps, invoice: InvoiceDTO): InvoiceDTO {
        logger.info("\uD83E\uDD66 \uD83E\uDD66 \uD83E\uDD66 \uD83E\uDD66 \uD83E\uDD66 " +
                ".... starting startInvoiceRegistrationFlow ........ \uD83D\uDC9C \uD83D\uDC9C \uD83D\uDC9C " +
                " \n\n")
        if (invoice.customer.host == null) {
            throw Exception("\uD83D\uDE21 Customer object is missing data; invalid")
        }
        if (invoice.supplier.host == null) {
            throw Exception("\uD83D\uDE21 Supplier object is missing data; invalid")
        }
        return try {
            val accounts = proxy.vaultQuery(AccountInfo::class.java).states
            logger.info("\uD83D\uDD35 \uD83D\uDD35 Vault Query for Accounts returned " +
                    "${accounts.size} from the Corda ledger")
            var supplierInfo: AccountInfo? = null
            var customerInfo: AccountInfo? = null
            for ((state) in accounts) {
                if (state.data.identifier.id.toString().equals(invoice.customer.identifier, ignoreCase = true)) {
                    customerInfo = state.data
                }
                if (state.data.identifier.id.toString().equals(invoice.supplier.identifier, ignoreCase = true)) {
                    supplierInfo = state.data
                }
            }
            if (supplierInfo == null) {
                throw Exception("\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 Supplier is fucking missing")
            }
            if (customerInfo == null) {
                throw Exception("\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 Customer is bloody missing")
            }
            val taxPercentage = invoice.valueAddedTax.div(100.0)
            val totalTaxAmt = invoice.amount * taxPercentage
            invoice.totalAmount = totalTaxAmt + invoice.amount
            //
            logger.info("\uD83C\uDF51 \uD83C\uDF51 startInvoiceRegistrationFlow: " +
                    "\uD83D\uDC9C \uD83D\uDC9C \uD83D\uDC9C " +
                    "about to add InvoiceState to the Corda ledger .......}")

            var mDate = DateTime().toDateTimeISO().toString()
            if (profile == "dev") {
                mDate = invoice.dateRegistered
            }
            val invoiceState = InvoiceState(
                    invoiceId = UUID.fromString(invoice.invoiceId),
                    invoiceNumber = invoice.invoiceNumber,
                    description = invoice.description,
                    amount = invoice.amount,
                    valueAddedTax = invoice.valueAddedTax,
                    totalAmount = invoice.totalAmount,
                    supplierInfo = supplierInfo,
                    customerInfo = customerInfo,
                    externalId = invoice.externalId,
                    dateRegistered = mDate
            )

            val issueTx = proxy.startTrackedFlowDynamic(
                    InvoiceRegistrationFlow::class.java, invoiceState).returnValue.getOrThrow()

            logger.info("\uD83C\uDF4F \uD83D\uDCA6 \uD83D\uDCA6 \uD83D\uDCA6 " +
                    "InvoiceRegistrationFlow flow completed \uD83C\uDF51 ... txId: $issueTx")

            val dto = invoiceState.let { DTOUtil.getDTO(it) }
            try {
                firebaseService.sendInvoiceMessage(dto)
                firebaseService.addInvoice(dto)
                logger.info("\uD83E\uDDE9 \uD83E\uDDE9 \uD83E\uDDE9 " +
                        "Invoice has been added to Firestore; \uD83D\uDC2C seems OK ")
            } catch (e: Exception) {
                //todo - send email to support about this .... firebase shit failed but ledger is OK
                e.printStackTrace()
                logger.error(e.message)
            }
            dto
        } catch (e: Exception) {
            e.printStackTrace()
            if (e.message != null) {
                throw Exception("Failed to register invoice. " + e.message)
            } else {
                throw Exception("Failed to register invoice. Unknown bloody cause!!")
            }

        }
    }

    @Value("\${spring.profiles.active}")
    private var profile: String = "dev"

    @Throws(Exception::class)
    fun startAccountInfoQueryFlow(proxy: CordaRPCOps,
                                  identifier: String): AccountInfoDTO {
        try {
            val accountInfoCordaFuture = proxy.startTrackedFlowDynamic(
                    AccountInfoQueryFlow::class.java, identifier).returnValue
            val acctInfo = accountInfoCordaFuture.get()
            return AccountInfoDTO(identifier, acctInfo.name, acctInfo.name)

        } catch (e: Exception) {
            logger.info("\uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D " +
                    "Houston, we have fallen over a fucking query?? WTF!  \uD83D\uDD35 \uD83D\uDD35 Account query failed")
            logger.error(e.message)
            throw e
        }
    }

    private val em1 = "\uD83E\uDDA0 \uD83E\uDDA0 \uD83E\uDDA0 \uD83E\uDDA0 "
    private val em2 = "\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 "

    /**
     * Create Corda Account on the Ledger using AccountRegistrationFlow
     * Request Stellar account from Anchor Server
     */
    @Throws(Exception::class)
    fun startAccountRegistrationFlow(proxy: CordaRPCOps,
                                     accountName: String,
                                     email: String,
                                     cellphone: String,
                                     password: String): UserDTO? {
        try {
            val criteria: QueryCriteria = VaultQueryCriteria(StateStatus.UNCONSUMED)
            val page = proxy.vaultQueryByWithPagingSpec(
                    AccountInfo::class.java, criteria,
                    PageSpecification(1, 200))
            logger.info("$em1 Accounts found on network:  " +
                    "\uD83E\uDD6C " + page.states.size + " ... about to check if account exists ...")
            if (page.states.isNotEmpty()) {
                for ((state) in page.states) {
                    val info = state.data
                    if (info.name.equals(accountName, ignoreCase = true)) {
                        logger.info("Account $accountName \uD83D\uDC7F \uD83D\uDC7F already exists on the network")
                        throw Exception("Account already exists on the network")
                    }
                }
            }
            logger.info("\n\n\n$em2 .................  " +
                    "Starting the AccountRegistrationFlow ...................... " +
                    "\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35\n")

            val acctInfo: AccountInfo?
            try {
                val accountInfoCordaFuture = proxy.startTrackedFlowDynamic(
                        CreateAccountFlow::class.java, accountName).returnValue
                acctInfo = accountInfoCordaFuture.get()
                        ?: throw Exception("Account creation failed on ledger \uD83D\uDE21")
                logger.info("\n\n\n\uD83C\uDF4F \uD83C\uDF4F \uD83C\uDF4F \uD83C\uDF4F" +
                        " CreateAccountFlow completed... \uD83D\uDC4C accountInfo returned: " +
                        "\uD83E\uDD4F name: ${acctInfo.name} identifier: ${acctInfo.identifier.id}" +
                        " host: ${acctInfo.host.name} \n\n")

                //get stellar account from Anchor server
                var mStellarId = "tbd"
                val mRippleId = "tbd"
                try {
                    val stellarResponse = stellarAccountService.createStellarAccount(proxy = proxy)
                    if (stellarResponse != null) {
                        if (stellarResponse.accountId != null) {
                            logger.info("\uD83E\uDD6C\uD83E\uDD6C\uD83E\uDD6C\uD83E\uDD6C " +
                                    "Stellar account created on Anchor server. Kudos!! " +
                                    "${stellarResponse.accountId} ${stellarResponse.secretSeed}")
                            mStellarId = stellarResponse.accountId
                            logger.info("This is the stellarAccountId needed for the NetworkOperator record: $mStellarId")
                        } else {
                            logger.info("\uD83D\uDE21 \uD83D\uDE21 \uD83D\uDE21 \uD83D\uDE21 \uD83D\uDE21 " +
                                    "Stellar account NOT created on Anchor server. Error!!")
                        }
                    }

                } catch (e: Exception) {
                    logger.warn("\uD83D\uDE21 Stellar account creation failed \uD83D\uDE21", e)
                }

                val user = createBFNUser(
                        host = acctInfo.host.name.toString(),
                        identifier = acctInfo.identifier.id.toString(),
                        accountName = accountName,
                        email = email,
                        password = password,
                        cellphone = cellphone,
                        stellarAccountId = mStellarId,
                        rippleAccountId = mRippleId)

                val future = proxy.startFlowDynamic(CreateUserFlow::class.java, user).returnValue
                logger.info("\uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D " +
                        "CreateUserFlow completed ${future.get()} User added on  Corda ledger: ${gson.toJson(user)}")
                return user

            } catch (e: Exception) {
                logger.info(em3 +
                        "Houston, we are fucked! Corda Account creation failed: " +
                        " \uD83D\uDD35 \uD83D\uDD35 ${e.message}")
                logger.error(e.message)
                throw e
            }
        } catch (e: Exception) {
            logger.info(em3 +
                    "Houston, there is some shit on the floor! " +
                    " \uD83D\uDD35 \uD83D\uDD35 Account creation failed:  ${e.message}")
            logger.error(e.message)
            throw e
        }
    }

    private val em3 = "\uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D "

    @Throws(Exception::class)
    fun startCustomerProfileFlow(proxy: CordaRPCOps,
                                 profile: CustomerProfileStateDTO): String {
        var tranxId = "tbd"
        try {
            val account = getAccount(proxy, accountId = profile.account.identifier)
            logger.info("\n\n................. \uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 " +
                    "Starting the CustomerProfileFlow ...................... " +
                    "\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35\n\n")
            val mAccount = getNodeAccount(proxy, profile.account.identifier)
            if (mAccount != null) {
                val profileState = CustomerProfileState(
                        account = mAccount,
                        cellphone = profile.cellphone,
                        dateRegistered = Date(),
                        email = profile.email,
                        maximumInvoiceAmount = profile.maximumInvoiceAmount,
                        minimumInvoiceAmount = profile.minimumInvoiceAmount,
                        rippleAccountId = profile.rippleAccountId,
                        stellarAccountId = profile.stellarAccountId

                )

                val profileCordaFuture = proxy.startFlowDynamic(
                        CustomerProfileFlow::class.java, profileState).returnValue

                tranxId = profileCordaFuture.get().toString()

                logger.info("\uD83C\uDF4F \uD83C\uDF4F \uD83C\uDF4F \uD83C\uDF4F " +
                        " CustomerProfileFlow completed ... " +
                        "\uD83D\uDC4C signedTx: " + tranxId +
                        ";  \uD83D\uDD35 \uD83D\uDD35 customerProfile now connected to account: ${account.name} \n\n")
            } else {
                throw Exception("\uD83D\uDE21 \uD83D\uDE21 Corda accountInfo not found for CustomerProfile")
            }

        } catch (e: Exception) {
            logger.error(
                    "\uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D" +
                            " \uD83D\uDC7D \uD83D\uDC7D " +
                            "Houston, we fucked, like royally, Boss! CustomerProfileFlow failed:  ${e.message}")
            logger.error(e.message)
            throw e
        }
        return tranxId
    }

    private fun createBFNUser(host: String, identifier: String, accountName: String,
                              stellarAccountId: String,
                              rippleAccountId: String,
                              email: String, cellphone: String, password: String): UserDTO? {
        //create auth user record in firebase
        val bfnUser = UserDTO(
                AccountInfoDTO(
                        identifier,
                        host,
                        accountName),
                email,
                password,
                cellphone,
                "tbd",
                stellarAccountId,
                rippleAccountId

        )

        val result = firebaseService.createBFNUser(bfnUser)
        if (result != null) {
            logger.info("\uD83E\uDDE9 \uD83E\uDDE9 \uD83E\uDDE9 \uD83E\uDDE9 " +
                    "WorkerBee: Saved BFN UserDTO account on Firestore: check stellarAccountId " +
                    " \uD83C\uDF40 \uD83C\uDF40 \uD83C\uDF40 result stellarAccountId " +
                    result.stellarAccountId)
        }

        return result
    }

    @Throws(Exception::class)
    fun startInvoiceOfferFlow(proxy: CordaRPCOps, invoiceOffer: InvoiceOfferDTO): InvoiceOfferDTO {
        return try {

            val future = proxy.startFlowDynamic(FindInvoiceFlow::class.java,
                    invoiceOffer.invoiceId).returnValue
            val invoiceState = future.get()

            if (invoiceState == null) {
                logger.warn("Corda InvoiceState for offer not found, \uD83D\uDC7F  probably, maybe, who knows? ")
                throw Exception("Invoice not found")
            }
            val future2 = proxy.startFlowDynamic(AccountInfoQueryFlow::class.java,
                    invoiceOffer.investor.identifier)
                    .returnValue
            val investorInfo = future2.get() ?: throw Exception("Investor not found")

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
    private fun processInvoiceOffer(proxy: CordaRPCOps, invoiceOffer: InvoiceOfferDTO,
                                    invoiceState: InvoiceState, investorInfo: AccountInfo): InvoiceOfferDTO {
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
        val offerDTO = DTOUtil.getDTO(invoiceOfferState)
        try {
            val db = FirestoreClient.getFirestore()
            val reference = db.collection(BFN_INVOICE_OFFERS).add(offerDTO)
            logger.info("\uD83E\uDDE9 " +
                    "Firestore invoiceOffers path: " + reference.get().path)
        } catch (e: Exception) {
            logger.error(e.message)
        }
        firebaseService.sendInvoiceOfferMessage(offerDTO)
        return offerDTO
    }
}

