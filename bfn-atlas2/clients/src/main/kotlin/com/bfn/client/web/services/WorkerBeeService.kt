package com.bfn.client.web.services

import com.bfn.client.Emo
import com.bfn.client.data.*
import com.bfn.client.web.DTOUtil
import com.bfn.contractstates.states.*
import com.bfn.flows.CreateAccountFlow
import com.bfn.flows.CreateUserFlow
import com.bfn.flows.customer.CustomerProfileFlow
import com.bfn.flows.customer.InvestorPaymentFlow
import com.bfn.flows.customer.PurchaseOrderFlow
import com.bfn.flows.investor.InvestorProfileFlow
import com.bfn.flows.invoices.InvoiceOfferFlow
import com.bfn.flows.investor.MultiInvoiceOfferFlow
import com.bfn.flows.investor.SupplierPaymentFlow
import com.bfn.flows.invoices.InvoiceRegistrationFlow
import com.bfn.flows.queries.*
import com.bfn.flows.scheduled.CreateInvoiceOffersFlow
import com.bfn.flows.services.InvoiceFinderService
import com.bfn.flows.services.ProfileFinderService
import com.bfn.flows.supplier.AcceptBestOfferForInvoiceFlow
import com.bfn.flows.supplier.SupplierProfileFlow
import com.bfn.flows.todaysDate
import com.google.gson.GsonBuilder
import com.r3.corda.lib.accounts.contracts.states.AccountInfo
import net.corda.core.contracts.ContractState
import net.corda.core.contracts.StateAndRef
import net.corda.core.messaging.CordaRPCOps
import net.corda.core.node.services.Vault
import net.corda.core.node.services.Vault.StateStatus
import net.corda.core.node.services.queryBy
import net.corda.core.node.services.vault.DEFAULT_PAGE_NUM
import net.corda.core.node.services.vault.DEFAULT_PAGE_SIZE
import net.corda.core.node.services.vault.PageSpecification
import net.corda.core.node.services.vault.QueryCriteria
import net.corda.core.node.services.vault.QueryCriteria.VaultQueryCriteria
import net.corda.core.utilities.getOrThrow
import org.joda.time.DateTime
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.math.BigDecimal
import java.util.*
import javax.annotation.PostConstruct

@Service
class WorkerBeeService {
    private val logger = LoggerFactory.getLogger(WorkerBeeService::class.java)
    private val gson = GsonBuilder().setPrettyPrinting().create()

    @Autowired
    private lateinit var firebaseService: FirebaseService

    @Autowired
    private lateinit var stellarAnchorService: StellarAnchorService

    @Value("\${stellarAnchorUrl}")
    private lateinit var stellarAnchorUrl: String

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

        val list: MutableList<AccountInfoDTO> = mutableListOf()
        for ((state) in accounts) {
            val acct = state.data
            if (acct.host.name.toString() == proxy.nodeInfo().legalIdentities[0].name.toString()) {
                val dto = AccountInfoDTO(acct.identifier.id.toString(),
                        acct.host.toString(), acct.name)
                list.add(dto)
            }

        }

        logger.info("\uD83C\uDF50 \uD83C\uDF50 " +
                "Node Accounts found: ${list.size} \uD83C\uDF50")

        return list
    }

    fun getAllNodeAccountDTOs(proxy: CordaRPCOps): List<AccountInfoDTO> {
        val list: MutableList<AccountInfoDTO> = mutableListOf()
        var pageNumber = DEFAULT_PAGE_NUM
        val states = mutableListOf<StateAndRef<AccountInfo>>()
        do {
            val pageSpec = PageSpecification(pageNumber = pageNumber, pageSize = 200)
            val results = proxy.vaultQueryByWithPagingSpec(
                    contractStateType = AccountInfo::class.java,
                    paging = pageSpec,
                    criteria = VaultQueryCriteria(status = StateStatus.UNCONSUMED)
            )

            states.addAll(results.states)
            pageNumber++
        } while ((pageSpec.pageSize * (pageNumber - 1)) <= results.totalStatesAvailable)

        for (state in states) {
            val acct = state.state.data
            val dto = AccountInfoDTO(acct.identifier.id.toString(),
                    acct.host.toString(), acct.name)
            list.add(dto)
        }

        val sorted = list.sortedBy { it.name }
        logger.info("\uD83E\uDDE9 Accounts found on node:  \uD83C\uDF00 ${sorted.size} " )
        list.forEach {
            logger.info("${Emo.PEACH}${Emo.PEACH} ACCOUNT on Node: ${gson.toJson(it)}")
        }
        return sorted
    }
    fun getAllNodeAccounts(proxy: CordaRPCOps): List<AccountInfo> {

        val mList: MutableList<AccountInfo> = mutableListOf()
        var pageNumber = DEFAULT_PAGE_NUM
        val states = mutableListOf<StateAndRef<AccountInfo>>()
        do {
            val pageSpec = PageSpecification(pageNumber = pageNumber, pageSize = 200)
            val results = proxy.vaultQueryByWithPagingSpec(
                    contractStateType = AccountInfo::class.java,
                    paging = pageSpec,
                    criteria = VaultQueryCriteria(status = StateStatus.UNCONSUMED)
            )

            states.addAll(results.states)
            pageNumber++
        } while ((pageSpec.pageSize * (pageNumber - 1)) <= results.totalStatesAvailable)

        logger.info("\uD83E\uDDE9 Accounts found on node:  \uD83C\uDF00 ${states.size} " )
        states.forEach {

            mList.add(it.state.data)
        }
        val sorted = mList.sortedBy { it.name }
        sorted.forEach {
            logger.info("${Emo.PEACH}${Emo.PEACH} ACCOUNT on Node: ${it.name} ${Emo.PEAR} ${it.host}")
        }
        return sorted
    }

    fun getNodeAccount(proxy: CordaRPCOps, identifier: String): AccountInfo? {
        val accounts = proxy.vaultQuery(AccountInfo::class.java).states

        var account: AccountInfo? = null

        for ((state) in accounts) {
            val acct = state.data
            if (acct.identifier.id.toString() == identifier) {
                account = acct
            }
        }

        return account
    }

    fun getNetworkAccounts(proxy: CordaRPCOps): List<AccountInfoDTO> {
        val accounts = proxy.vaultQuery(AccountInfo::class.java).states
        var cnt = 0
        val list: MutableList<AccountInfoDTO> = ArrayList()
        for ((state) in accounts) {
            cnt++
            val (name, host, identifier) = state.data
            val dto = AccountInfoDTO(identifier.id.toString(),
                    host.toString(), name)
            list.add(dto)
        }

        return list
    }


    @Throws(Exception::class)
    fun getAccount(proxy: CordaRPCOps, accountId: String?): AccountInfoDTO {
        val list = getNodeAccounts(proxy)
        var dto: AccountInfoDTO? = null

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
    fun getSupplierProfileState(proxy: CordaRPCOps, accountId: String?): SupplierProfileState? {
        val list: List<StateAndRef<SupplierProfileState>> = proxy.vaultQueryByWithPagingSpec(
                criteria = VaultQueryCriteria(status = StateStatus.UNCONSUMED),
                paging = PageSpecification(1, 4000),
                contractStateType = SupplierProfileState::class.java
        ).states
        var supplierProfileState: SupplierProfileState? = null
        for (profile in list) {
            if (profile.state.data.account.identifier.id.toString() == accountId) {
                supplierProfileState = profile.state.data
                break
            }
        }
        val msg = if (supplierProfileState == null) {
            "\uD83C\uDF3A \uD83C\uDF3A SupplierProfile not found:  \uD83C\uDF3A "
        } else {
            "\uD83C\uDF3A \uD83C\uDF3A found SupplierProfile:  \uD83C\uDF3A "
        }
        logger.info(msg)
        return supplierProfileState
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
            if (profile.state.data.account.identifier.id.toString() == accountId) {
                dto = DTOUtil.getDTO(profile.state.data)
                break
            }
        }

        return dto
    }

    @Throws(Exception::class)
    fun getInvestorProfile(proxy: CordaRPCOps, accountId: String): InvestorProfileStateDTO? {
        val list: List<StateAndRef<InvestorProfileState>> = proxy.vaultQueryByWithPagingSpec(
                criteria = VaultQueryCriteria(status = StateStatus.UNCONSUMED),
                paging = PageSpecification(1, 4000),
                contractStateType = InvestorProfileState::class.java
        ).states
        var dto: InvestorProfileStateDTO? = null
        for (profile in list) {
            if (profile.state.data.account.identifier.id.toString() == accountId) {
                dto = DTOUtil.getDTO(profile.state.data)
                break
            }
        }

        return dto
    }

    @Throws(Exception::class)
    fun getInvestorProfileState(proxy: CordaRPCOps, accountId: String?): InvestorProfileState? {
        val list: List<StateAndRef<InvestorProfileState>> = proxy.vaultQueryByWithPagingSpec(
                criteria = VaultQueryCriteria(status = StateStatus.UNCONSUMED),
                paging = PageSpecification(1, 4000),
                contractStateType = InvestorProfileState::class.java
        ).states
        var investorProfileState: InvestorProfileState? = null
        for (profile in list) {
            if (profile.state.data.account.identifier.id.toString() == accountId) {
                investorProfileState = profile.state.data
                break
            }
        }
        val msg = if (investorProfileState == null) {
            "\uD83C\uDF3A \uD83C\uDF3A InvestorProfile not found:  \uD83C\uDF3A "
        } else {
            "\uD83C\uDF3A \uD83C\uDF3A found profile:  \uD83C\uDF3A " + gson.toJson(investorProfileState)
        }
        logger.info(msg)
        return investorProfileState
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
    fun findPurchaseOrdersForNode(proxy: CordaRPCOps): List<PurchaseOrderDTO> {
        val fut = proxy.startTrackedFlowDynamic(
                PurchaseOrderQueryFlow::class.java, null,
                PurchaseOrderQueryFlow.FIND_FOR_NODE).returnValue
        val purchaseOrders = fut.get()
        val dtos: MutableList<PurchaseOrderDTO> = mutableListOf()
        purchaseOrders.forEach() {
                dtos.add(DTOUtil.getDTO(it))
        }
        val m = "\uD83C\uDF3A done listing PurchaseOrders:  \uD83C\uDF3A " + purchaseOrders.size
        logger.info(m)
        return dtos
    }

    @Throws(Exception::class)
    fun findSupplierPaymentsForNode(proxy: CordaRPCOps): List<SupplierPaymentDTO> {
        val fut = proxy.startFlowDynamic(
                SupplierPaymentQueryFlow::class.java, null,
                SupplierPaymentQueryFlow.FIND_FOR_NODE).returnValue
        val payments = fut.get()
        val dtos: MutableList<SupplierPaymentDTO> = mutableListOf()
        payments.forEach() {
            dtos.add(DTOUtil.getDTO(it))
        }
        val m = "\uD83C\uDF3A done listing SupplierPayments:  \uD83C\uDF3A " + payments.size
        logger.info(m)
        return dtos
    }
    @Throws(Exception::class)
    fun findInvestorPaymentsForNode(proxy: CordaRPCOps): List<InvestorPaymentDTO> {
        val fut = proxy.startFlowDynamic(
                InvestorPaymentQueryFlow::class.java, null,
                InvestorPaymentQueryFlow.FIND_FOR_NODE).returnValue
        val payments = fut.get()
        val dtos: MutableList<InvestorPaymentDTO> = mutableListOf()
        payments.forEach() {
            dtos.add(DTOUtil.getDTO(it))
        }
        val m = "${Emo.CORN} done listing InvestorPayments:  ${Emo.CORN} " + payments.size
        logger.info(m)
        return dtos
    }
    @Throws(Exception::class)
    fun findSupplierPaymentsForInvestor(proxy: CordaRPCOps, investorId: String): List<SupplierPaymentDTO> {
        val fut = proxy.startFlowDynamic(
                SupplierPaymentQueryFlow::class.java, investorId,
                SupplierPaymentQueryFlow.FIND_FOR_INVESTOR).returnValue
        val payments = fut.get()
        val dtos: MutableList<SupplierPaymentDTO> = mutableListOf()
        payments.forEach() {
            dtos.add(DTOUtil.getDTO(it))
        }
        val m = "\uD83C\uDF3A done listing SupplierPayments:  \uD83C\uDF3A " + payments.size
        logger.info(m)
        return dtos
    }
    @Throws(Exception::class)
    fun findInvestorPaymentsForInvestor(proxy: CordaRPCOps, investorId: String): List<InvestorPaymentDTO> {
        val fut = proxy.startFlowDynamic(
                InvestorPaymentQueryFlow::class.java, investorId,
                InvestorPaymentQueryFlow.FIND_FOR_INVESTOR).returnValue
        val payments = fut.get()
        val dtos: MutableList<InvestorPaymentDTO> = mutableListOf()
        payments.forEach() {
            dtos.add(DTOUtil.getDTO(it))
        }
        val m = "\uD83C\uDF3A done listing InvestorPayments:  \uD83C\uDF3A " + payments.size
        logger.info(m)
        return dtos
    }
    @Throws(Exception::class)
    fun findInvestorPaymentStatesForInvestor(proxy: CordaRPCOps, investorId: String): List<InvestorPaymentState> {
        val fut = proxy.startFlowDynamic(
                InvestorPaymentQueryFlow::class.java, investorId,
                InvestorPaymentQueryFlow.FIND_FOR_INVESTOR).returnValue
        val payments = fut.get()
        val m = "\uD83C\uDF3A done listing InvestorPayments:  \uD83C\uDF3A " + payments.size
        logger.info(m)
        return payments
    }
    @Throws(Exception::class)
    fun findSupplierPaymentStatesForInvestor(proxy: CordaRPCOps, investorId: String): List<SupplierPaymentState> {
        val fut = proxy.startFlowDynamic(
                SupplierPaymentQueryFlow::class.java, investorId,
                SupplierPaymentQueryFlow.FIND_FOR_INVESTOR).returnValue
        val payments = fut.get()
        val m = "\uD83C\uDF3A done listing SupplierPayments:  \uD83C\uDF3A " + payments.size
        logger.info(m)
        return payments
    }
    @Throws(Exception::class)
    fun findInvestorPaymentsForCustomer(proxy: CordaRPCOps, customerId: String): List<InvestorPaymentDTO> {
        val fut = proxy.startFlowDynamic(
                InvestorPaymentQueryFlow::class.java, customerId,
                InvestorPaymentQueryFlow.FIND_FOR_CUSTOMER).returnValue
        val payments = fut.get()
        val dtos: MutableList<InvestorPaymentDTO> = mutableListOf()
        payments.forEach() {
            dtos.add(DTOUtil.getDTO(it))
        }
        val m = "\uD83C\uDF3A done listing InvestorPayments:  \uD83C\uDF3A " + payments.size
        logger.info(m)
        return dtos
    }
    @Throws(Exception::class)
    fun findSupplierPaymentsForCustomer(proxy: CordaRPCOps, customerId: String): List<SupplierPaymentDTO> {
        val fut = proxy.startFlowDynamic(
                SupplierPaymentQueryFlow::class.java, customerId,
                SupplierPaymentQueryFlow.FIND_FOR_CUSTOMER).returnValue
        val payments = fut.get()
        val dtos: MutableList<SupplierPaymentDTO> = mutableListOf()
        payments.forEach() {
            dtos.add(DTOUtil.getDTO(it))
        }
        val m = "\uD83C\uDF3A done listing SupplierPayments:  \uD83C\uDF3A " + payments.size
        logger.info(m)
        return dtos
    }
    @Throws(Exception::class)
    fun findSupplierPaymentsForSupplier(proxy: CordaRPCOps, supplierId: String): List<SupplierPaymentDTO> {
        val fut = proxy.startFlowDynamic(
                SupplierPaymentQueryFlow::class.java, supplierId,
                SupplierPaymentQueryFlow.FIND_FOR_SUPPLIER).returnValue
        val payments = fut.get()
        val dtos: MutableList<SupplierPaymentDTO> = mutableListOf()
        payments.forEach() {
            dtos.add(DTOUtil.getDTO(it))
        }
        val m = "\uD83C\uDF3A done listing SupplierPayments:  \uD83C\uDF3A " + payments.size
        logger.info(m)
        return dtos
    }


    @Throws(Exception::class)
    fun createInvestorProfile(proxy: CordaRPCOps,
                              profile: InvestorProfileStateDTO,
                              account: AccountInfo): String {

        val matrixItems: MutableList<TradeMatrixItem> = mutableListOf()
        for (item in profile.tradeMatrixItems) {
            matrixItems.add(TradeMatrixItem(
                    startInvoiceAmount = item.startInvoiceAmount,
                    endInvoiceAmount = item.endInvoiceAmount,
                    dateRegistered = item.date,
                    offerDiscount = item.offerDiscount))
        }
        val state = InvestorProfileState(
                account = account,
                defaultDiscount = profile.defaultDiscount,
                maximumInvoiceAmount = profile.maximumInvoiceAmount,
                totalInvestment = profile.totalInvestment,
                bank = profile.bank, bankAccount = profile.bankAccount,
                minimumInvoiceAmount = profile.minimumInvoiceAmount,
                date = DateTime().toDateTimeISO().toString(),
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
    fun createSupplierProfile(proxy: CordaRPCOps,
                              profile: SupplierProfileStateDTO,
                              account: AccountInfo): String {

        val state = SupplierProfileState(
                account = account,
                maximumDiscount = profile.maximumDiscount,
                bank = profile.bank,
                bankAccount = profile.bankAccount,
                dateRegistered = DateTime().toDateTimeISO().toString(),
                stellarAccountId = profile.stellarAccountId,
                rippleAccountId = profile.rippleAccountId,
                assetCode = profile.assetCode
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
                              password: String, token: String): CustomerProfileStateDTO {
        logger.info("\n\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E " +
                "Creating Customer ${customerProfile.account?.name} .............")

        try {
            val acctInfo1 = startAccountRegistrationFlow(proxy = proxy,
                    accountName = customerProfile.account!!.name,
                    email = customerProfile.email,
                    password = password, cellphone = customerProfile.cellphone,
                    token = token
            )

            if (acctInfo1 != null) {
                customerProfile.account = acctInfo1.accountInfo
                val user = firebaseService.getBFNUserByAccountName(acctInfo1.accountInfo.name)
                if (user != null) {
                    customerProfile.stellarAccountId = user.stellarAccountId
                }
            }


            val txId = startCustomerProfileFlow(proxy, profile = customerProfile)
            firebaseService.addCustomerProfile(customerProfile)
            logger.info("\n\n\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E " +
                    "WorkerBee: CustomerProfile has been created: " +
                    "${customerProfile.account?.name} \uD83C\uDF4F txId: $txId \n\n")
            return customerProfile
        } catch (e: Exception) {
            logger.info("\uD83D\uDD25 \uD83D\uDD25 \uD83D\uDD25 Customer creation failed ")
            e.printStackTrace()
            throw Exception("Customer creation failed")
        }
    }

    fun createPurchaseOrder(proxy: CordaRPCOps,
                            purchaseOrder: PurchaseOrderDTO): String {
        try {
            //start purchase order flow
            return startPurchaseOrderFlow(proxy, purchaseOrder = purchaseOrder)
        } catch (e: Exception) {
            logger.info("\uD83D\uDD25 \uD83D\uDD25 \uD83D\uDD25 createPurchaseOrder failed ")
            e.printStackTrace()
            throw Exception("createPurchaseOrder failed")
        }
    }

    @Throws(Exception::class)
    fun makeOffersOnInvoicesForInvestor(proxy: CordaRPCOps, investorId: String): List<InvoiceOfferDTO> {
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
            logger.info("Investor  \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 ${it.investor?.name} " +
                    ":: \uD83C\uDF4E Offer made: ${it.supplier?.name} " +
                    "offered: ${it.offerAmount} \uD83D\uDD35 \uD83D\uDD35 originalAmt: ${it.originalAmount} " +
                    " discount: ${it.discount}  \uD83C\uDF40 ")
        }
        logger.info(m)
        return offers
    }

    @Throws(Exception::class)
    fun findAcceptedOffersForInvestor(proxy: CordaRPCOps, investorId: String): List<AcceptedOfferDTO> {
        val fut = proxy.startFlowDynamic(
                AcceptedOfferQueryFlow::class.java, investorId,
                AcceptedOfferQueryFlow.FIND_FOR_INVESTOR).returnValue
        val offers = fut.get()
        val dtos: MutableList<AcceptedOfferDTO> = mutableListOf()
        offers.forEach() {
            dtos.add(DTOUtil.getDTO(it))
        }
        val m = "\uD83D\uDCA6 done listing AcceptedOffers:  \uD83C\uDF3A " + offers.size
        logger.info(m)
        return dtos
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
    @Throws(Exception::class)
    fun findCustomerProfiles(proxy: CordaRPCOps): List<CustomerProfileStateDTO> {
        var pageNumber = DEFAULT_PAGE_NUM
        val states = mutableListOf<StateAndRef<CustomerProfileState>>()
        do {
            val pageSpec = PageSpecification(pageNumber = pageNumber, pageSize = DEFAULT_PAGE_SIZE)
            val results = proxy.vaultQueryByWithPagingSpec(CustomerProfileState::class.java,
                    criteria = VaultQueryCriteria(
                            status = StateStatus.UNCONSUMED
                    ), paging = pageSpec)

            logger.info("\uD83D\uDD35\uD83D\uDD35 There are ${results.states.size} " +
                    "customerProfiles just read from the ledger \uD83D\uDD35")
            states.addAll(results.states)
            pageNumber++
        } while ((pageSpec.pageSize * (pageNumber - 1)) <= results.totalStatesAvailable)

        logger.info("\uD83D\uDD35\uD83D\uDD35 There are ${states.size} customerProfiles on the ledger \uD83D\uDD35")
        val list = mutableListOf<CustomerProfileStateDTO>()
        states.forEach() {
           list.add(DTOUtil.getDTO(it.state.data))
        }
        val m = "\uD83D\uDCA6  done listing CustomerProfiles:  \uD83C\uDF3A " + list.size
        logger.info(m)
        return list
    }
    @Throws(Exception::class)
    fun findInvestorProfiles(proxy: CordaRPCOps): List<InvestorProfileStateDTO> {
        var pageNumber = DEFAULT_PAGE_NUM
        val states = mutableListOf<StateAndRef<InvestorProfileState>>()
        do {
            val pageSpec = PageSpecification(pageNumber = pageNumber, pageSize = DEFAULT_PAGE_SIZE)
            val results = proxy.vaultQueryByWithPagingSpec(InvestorProfileState::class.java,
                    criteria = VaultQueryCriteria(
                            status = StateStatus.UNCONSUMED
                    ), paging = pageSpec)

            states.addAll(results.states)
            pageNumber++
        } while ((pageSpec.pageSize * (pageNumber - 1)) <= results.totalStatesAvailable)

        logger.info("\uD83D\uDD35\uD83D\uDD35 There are ${states.size} customerProfiles on the ledger \uD83D\uDD35")
        val list = mutableListOf<InvestorProfileStateDTO>()
        states.forEach() {
            list.add(DTOUtil.getDTO(it.state.data))
        }
        val m = "\uD83D\uDCA6  done listing InvestorProfileStates:  \uD83C\uDF3A " + list.size
        logger.info(m)
        return list
    }
    @Throws(Exception::class)
    fun findSupplierProfiles(proxy: CordaRPCOps): List<SupplierProfileStateDTO> {
        var pageNumber = DEFAULT_PAGE_NUM
        val states = mutableListOf<StateAndRef<SupplierProfileState>>()
        do {
            val pageSpec = PageSpecification(pageNumber = pageNumber, pageSize = DEFAULT_PAGE_SIZE)
            val results = proxy.vaultQueryByWithPagingSpec(SupplierProfileState::class.java,
                    criteria = VaultQueryCriteria(
                            status = StateStatus.UNCONSUMED
                    ), paging = pageSpec)

            states.addAll(results.states)
            pageNumber++
        } while ((pageSpec.pageSize * (pageNumber - 1)) <= results.totalStatesAvailable)

        logger.info("\uD83D\uDD35\uD83D\uDD35 There are ${states.size} customerProfiles on the ledger \uD83D\uDD35")
        val list = mutableListOf<SupplierProfileStateDTO>()
        states.forEach() {
            list.add(DTOUtil.getDTO(it.state.data))
        }
        val m = "\uD83D\uDCA6  done listing SupplierProfiles:  \uD83C\uDF3A " + list.size
        logger.info(m)
        return list
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
    fun validateInvoiceAgainstProfile(invoice: InvoiceDTO,
                                      investorProfile: InvestorProfileStateDTO): Boolean {

        if (invoice.supplier!!.identifier == investorProfile.account.identifier) {
            logger.info("${Emo.RED_APPLE} supplier cannot be the investor: " +
                    "${Emo.ERROR} id check failed")
            return false;
        }
        if (invoice.customer!!.identifier == investorProfile.account.identifier) {
            logger.info("${Emo.RED_APPLE} customer cannot be the investor:  " +
                    "${Emo.ERROR} id check failed")
            return false;
        }

        val invoiceAmount = BigDecimal(invoice.amount)
        for (item in investorProfile.tradeMatrixItems) {
            val startInvoiceAmount = BigDecimal(item.startInvoiceAmount)
            val endInvoiceAmount = BigDecimal(item.endInvoiceAmount)
            if (invoiceAmount in startInvoiceAmount..endInvoiceAmount) {
                return true
            }
        }
        if (investorProfile.tradeMatrixItems.isEmpty()) {
            val minimum = BigDecimal(investorProfile.minimumInvoiceAmount)
            val maximum = BigDecimal(investorProfile.maximumInvoiceAmount)
            if (invoiceAmount < minimum) {
                return false
            }
            if (invoiceAmount > maximum) {
                return false
            }
        }
        //todo - 🍎 🍎 🍎 🍎  add validation against industry, specific blackList, whiteList etc. 🍎 🍎 🍎 🍎
        logger.info("${Emo.NOT_OK} invoice failed trade matrix check ${Emo.ERROR}")
        return false
    }

    fun getDiscountForAmount(investorProfile: InvestorProfileStateDTO, amount: String): String {
        val invoiceAmount = BigDecimal(amount)
        for (item in investorProfile.tradeMatrixItems) {
            val startInvoiceAmount = BigDecimal(item.startInvoiceAmount)
            val endInvoiceAmount = BigDecimal(item.endInvoiceAmount)
            if (invoiceAmount in startInvoiceAmount..endInvoiceAmount) {
                return item.offerDiscount
            }
        }
        return investorProfile.defaultDiscount
    }

    @Throws(Exception::class)
    fun startInvoiceRegistrationFlow(proxy: CordaRPCOps, invoice: InvoiceDTO): InvoiceDTO {
        logger.info("\uD83E\uDD66 \uD83E\uDD66 \uD83E\uDD66 \uD83E\uDD66 \uD83E\uDD66 " +
                ".... starting startInvoiceRegistrationFlow ........ \uD83D\uDC9C \uD83D\uDC9C \uD83D\uDC9C " +
                " \n\n")
        if (invoice.customer!!.host == null) {
            throw Exception("\uD83D\uDE21 Customer object is missing data; invalid")
        }
        if (invoice.supplier!!.host == null) {
            throw Exception("\uD83D\uDE21 Supplier object is missing data; invalid")
        }
        return try {
            val accounts = getAllNodeAccounts(proxy)
            var supplierInfo: AccountInfo? = null
            var customerInfo: AccountInfo? = null
            for (account in accounts) {
                if (account .identifier.id.toString().equals(invoice.customer!!.identifier, ignoreCase = true)) {
                    customerInfo = account
                }
                if (account.identifier.id.toString().equals(invoice.supplier!!.identifier, ignoreCase = true)) {
                    supplierInfo = account
                }
            }
            if (supplierInfo == null) {
                throw Exception("\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 Supplier is fucking missing")
            }
            if (customerInfo == null) {
                throw Exception("\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 Customer is bloody missing")
            }
            val tax = BigDecimal(invoice.valueAddedTax)
            val taxPercentage = tax.divide(BigDecimal("100.00"))
            val totalTaxAmt = BigDecimal(invoice.amount).multiply(taxPercentage)
            val totalAmount = BigDecimal(invoice.amount).add(totalTaxAmt)
            invoice.totalAmount = "$totalAmount"

            var mDate = invoice.dateRegistered
            if (profile == "prod") {
                mDate = DateTime().toDateTimeISO().toString()
            }
            var poState: PurchaseOrderState? = null
            if (invoice.purchaseOrder != null) {
                poState = PurchaseOrderState(
                        purchaseOrderId = invoice.purchaseOrder!!.purchaseOrderId,
                        supplier = supplierInfo,
                        customer = customerInfo,
                        purchaseOrderNumber = invoice.purchaseOrder!!.purchaseOrderNumber,
                        amount = invoice.purchaseOrder!!.amount,
                        dateRegistered = invoice.purchaseOrder!!.dateRegistered,
                        description = invoice.purchaseOrder!!.description)

            }
            val invoiceState = InvoiceState(
                    purchaseOrder = poState,
                    invoiceNumber = invoice.invoiceNumber,
                    description = invoice.description,
                    amount = invoice.amount,
                    valueAddedTax = invoice.valueAddedTax,
                    totalAmount = invoice.totalAmount,
                    supplierInfo = supplierInfo,
                    customerInfo = customerInfo,
                    externalId = invoice.externalId,
                    dateRegistered = mDate,
                    invoiceId = UUID.randomUUID()
            )

            proxy.startTrackedFlowDynamic(
                    InvoiceRegistrationFlow::class.java, invoiceState).returnValue.getOrThrow()

            logger.info("\uD83C\uDF4F \uD83D\uDCA6 \uD83D\uDCA6 \uD83D\uDCA6 " +
                    "InvoiceRegistrationFlow flow completed \uD83C\uDF51 ...")

            val dto = invoiceState.let { DTOUtil.getDTO(it) }
            try {
                firebaseService.sendInvoiceMessage(dto)
                firebaseService.addInvoice(dto)
                if (invoice.purchaseOrder != null) {
                    firebaseService.updatePurchaseOrderInvoiceCreated(
                            invoice.purchaseOrder!!.purchaseOrderId)
                }

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

    @Throws(Exception::class)
    fun startInvestorPaymentFlow(proxy: CordaRPCOps, supplierPaymentId: String): InvestorPaymentDTO {

        return try {
            val investorPaymentState = proxy.startTrackedFlowDynamic(
                    InvestorPaymentFlow::class.java, supplierPaymentId).returnValue.getOrThrow()

            logger.info("\uD83C\uDF4F \uD83D\uDCA6 \uD83D\uDCA6 \uD83D\uDCA6 " +
                    "InvestorPaymentFlow flow completed \uD83C\uDF51 ...")

            val dto = DTOUtil.getDTO(investorPaymentState)
            try {
                firebaseService.addInvestorPayment(dto)
            } catch (e: Exception) {
                //todo -  🍎  🍎 send email to support about this .... firebase shit failed but ledger is OK
                e.printStackTrace()
                logger.error(e.message)
            }
            dto
        } catch (e: Exception) {
            e.printStackTrace()
            if (e.message != null) {
                throw Exception("Failed InvestorPaymentFlow. " + e.message)
            } else {
                throw Exception("Failed InvestorPaymentFlow. Unknown bloody cause!!")
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
                                     password: String, token: String): UserDTO? {
        try {
            val criteria: QueryCriteria = VaultQueryCriteria(StateStatus.UNCONSUMED)
            val page = proxy.vaultQueryByWithPagingSpec(
                    AccountInfo::class.java, criteria,
                    PageSpecification(1, 2000))
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
                    val stellarResponse = stellarAnchorService.createStellarAccount(token = token)
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
                if (user != null) {
                    val userState = UserState(accountInfo = acctInfo,
                            email = email, cellphone = cellphone,
                            stellarAccountId = mStellarId, rippleAccountId = mRippleId,
                            uid = user.uid, dateRegistered = todaysDate())
                    val future = proxy.startFlowDynamic(CreateUserFlow::class.java, userState).returnValue
                    logger.info("\uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D " +
                            "CreateUserFlow completed ${future.get()} \uD83D\uDE21" +
                            "User added on  Corda ledger: ${gson.toJson(user)}")
                }
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
    fun startPurchaseOrderFlow(proxy: CordaRPCOps,
                               purchaseOrder: PurchaseOrderDTO): String {
        val tranxId: String
        try {
            logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 " +
                    "Starting the PurchaseOrderFlow ...................... " +
                    "purchaseOrderId: ${purchaseOrder.purchaseOrderId} " +
                    "customer: ${purchaseOrder.customer?.name} " +
                    "supplier: ${purchaseOrder.supplier?.name} " +
                    "amount: ${purchaseOrder.amount} " +
                    "\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35\n\n")

            val customerAccount = getNodeAccount(proxy, purchaseOrder.customer!!.identifier)
            val supplierAccount = getNodeAccount(proxy, purchaseOrder.supplier!!.identifier)
            var mDate = purchaseOrder.dateRegistered
            if (profile == "prod") {
                mDate = todaysDate()
            }
            if (customerAccount != null && supplierAccount != null) {
                val po = PurchaseOrderState(
                        purchaseOrderId = UUID.randomUUID().toString(),
                        purchaseOrderNumber = purchaseOrder.purchaseOrderNumber,
                        customer = customerAccount,
                        supplier = supplierAccount,
                        amount = purchaseOrder.amount,
                        dateRegistered = mDate,
                        description = purchaseOrder.description)

                val profileCordaFuture = proxy.startFlowDynamic(
                        PurchaseOrderFlow::class.java, po).returnValue

                tranxId = profileCordaFuture.get().toString()
                firebaseService.addPurchaseOrder(DTOUtil.getDTO(po))
                logger.info("${Emo.FLOWER_RED} " +
                        " PurchaseOrderFlow completed ... " +
                        "; ${Emo.FERNS} PurchaseOrder created for " +
                        "customer: ${purchaseOrder.customer!!.name} supplier: ${purchaseOrder.supplier!!.name}  ${Emo.FERNS}")
                return tranxId
            } else {
                throw Exception("${Emo.ERROR} startPurchaseOrderFlow failed; customer or supplier not found")
            }

        } catch (e: Exception) {
            logger.error(
                    "\uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D" +
                            " \uD83D\uDC7D \uD83D\uDC7D " +
                            "Houston, we fucked, like royally, Boss! PurchaseOrderFlow failed:  ${e.message}")
            logger.error(e.message)
            throw e
        }

    }

    @Throws(Exception::class)
    fun acceptBestOfferForInvoice(proxy: CordaRPCOps,
                                  invoiceId: String,
                                  supplierAccountId: String): AcceptedOfferDTO? {
        val offerCordaFuture = proxy.startFlowDynamic(
                AcceptBestOfferForInvoiceFlow::class.java,
                supplierAccountId, invoiceId).returnValue
        val acceptedOffer = offerCordaFuture.get()
        if (acceptedOffer != null) {
            val mOffer = DTOUtil.getDTO(acceptedOffer)
            logger.info("${Emo.DICE} ${Emo.DICE} ${Emo.DICE} ${Emo.DICE} " +
                    "Accepted Offer is : Investor: ${mOffer.investor?.account?.name} " +
                    "Supplier:  ${mOffer.supplier?.account?.name} " +
                    "${Emo.DICE}Discount: ${mOffer.discount}% " +
                    "OfferAmount: ${mOffer.offerAmount} ${Emo.DICE}" +
                    "Original Amount: ${mOffer.originalAmount}  \uD83C\uDF40 \n\n")
            firebaseService.addAcceptedOffer(mOffer)
            return mOffer
        }

        return null
    }

    @Throws(Exception::class)
    fun findOffersForInvoice(
            proxy: CordaRPCOps,
            invoiceId: String): List<InvoiceOfferDTO> {
        val offerCordaFuture = proxy.startFlowDynamic(
                InvoiceOfferQueryFlow::class.java,
                invoiceId, InvoiceOfferQueryFlow.FIND_FOR_INVOICE).returnValue
        val offers = offerCordaFuture.get()
        logger.info("\uD83C\uDF4E Offers found for invoice $invoiceId: ${offers.size} \uD83C\uDF4E")
        val mList: MutableList<InvoiceOfferDTO> = mutableListOf()
        for (offer in offers) {
            mList.add(DTOUtil.getDTO(offer))
        }
        return mList
    }

    @Throws(Exception::class)
    fun startCustomerProfileFlow(proxy: CordaRPCOps,
                                 profile: CustomerProfileStateDTO): String {
        var tranxId = "tbd"
        try {
            val account = getAccount(proxy, accountId = profile.account?.identifier)
            logger.info("\n\n................. \uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 " +
                    "Starting the CustomerProfileFlow ...................... " +
                    "\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35\n\n")
            val mAccount = getNodeAccount(proxy, profile.account!!.identifier)
            if (mAccount != null) {
                val profileState = CustomerProfileState(
                        account = mAccount,
                        cellphone = profile.cellphone,
                        dateRegistered = DateTime().toDateTimeISO().toString(),
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
                rippleAccountId,
                DateTime().toDateTimeISO().toString()

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
    fun startInvoiceOfferFlow(proxy: CordaRPCOps,
                              invoiceOffer: InvoiceOfferDTO,
                              invoice:InvoiceDTO): InvoiceOfferDTO? {
        return try {
            val future = proxy.startFlowDynamic(FindInvoiceFlow::class.java,
                    invoiceOffer.invoiceId).returnValue
            val invoiceState = future.get()

            if (invoiceState == null) {
                logger.warn("Corda InvoiceState for offer not found, \uD83D\uDC7F  probably, maybe, who knows? ")
                throw Exception("Invoice not found")
            }
            val investorProfile = firebaseService.getInvestorProfile(invoiceOffer.investor!!.identifier)
                    ?: throw Exception("Missing InvestorProfile, offers cannot be generated")
            val ok = validateInvoiceAgainstProfile(
                    investorProfile = investorProfile, invoice = invoice)
            if (!ok) {
                logger.info("Offer does not fit profile ${Emo.NOT_OK}")
                return null
            }
            invoiceOffer.discount = getDiscountForAmount(investorProfile, invoiceOffer.originalAmount)

            val future2 = proxy.startFlowDynamic(AccountInfoQueryFlow::class.java,
                    invoiceOffer.investor?.identifier)
                    .returnValue
            val investorInfo = future2.get() ?: throw Exception("Investor not found")

            val nPercentage = BigDecimal("100.00").minus(BigDecimal(invoiceOffer.discount))
                    .divide(BigDecimal("100"))
            invoiceOffer.offerAmount = (BigDecimal(invoiceOffer.originalAmount)
                    .multiply(nPercentage)).toString()
            processInvoiceOffer(proxy, invoiceOffer, invoiceState, investorInfo)
        } catch (e: Exception) {
            if (e.message != null) {
                throw Exception("\uD83E\uDD80  \uD83E\uDD80 Failed to register invoiceOffer.  \uD83D\uDC7F ${e.message}")
            } else {
                throw Exception("\uD83E\uDD80  \uD83E\uDD80 Failed to register invoiceOffer. Unknown cause")
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
                originalAmount = invoiceState.totalAmount,
                acceptanceDate = invoiceOffer.acceptanceDate,
                offerId = invoiceOffer.offerId,
                externalId = invoiceState.externalId,
                dateRegistered = DateTime().toDateTimeISO().toString()
        )
        val signedTransactionCordaFuture = proxy.startTrackedFlowDynamic(
                InvoiceOfferFlow::class.java, invoiceOfferState)
                .returnValue
        val txId = signedTransactionCordaFuture.get()
        logger.info("\uD83C\uDF4F \uD83C\uDF4F .... InvoiceOfferFlow completed on ledger ... " +
                "\uD83D\uDC4C \uD83D\uDC4C \uD83D\uDC4C  txId: $txId ")
        val offer = DTOUtil.getDTO(invoiceOfferState)
        try {
            firebaseService.addInvoiceOffer(offer)
//            firebaseService.sendInvoiceOfferMessage(offer)
        } catch (e: Exception) {
            logger.error("\uD83D\uDC7F \uD83D\uDC7F \uD83D\uDC7F\uD83D\uDC7F " +
                    "Failed to add invoiceOffer to Firestore", e)
            throw e

        }

        return offer
    }

    @Throws(Exception::class)
    fun makeInvestorOffers(proxy: CordaRPCOps, investorId: String): List<InvoiceOfferDTO> {
        logger.info("\uD83C\uDFC0 \uD83C\uDFC0 .............. " +
                " Starting to make Offers for Investor: $investorId ... ")

        val cordaFuture = proxy.startFlowDynamic(
                MultiInvoiceOfferFlow::class.java, investorId).returnValue
        val result = cordaFuture.get()
        val mList: MutableList<InvoiceOfferDTO> = mutableListOf()
        result.forEach() {
            val dto = DTOUtil.getDTO(it)
            mList.add(dto)
        }

        mList.forEach() {
            logger.info("$xx OFFER: ${gson.toJson(it)}  $xx")
            firebaseService.addInvoiceOffer(it)
        }
        logger.info("$xx makeOffers: Number of Anchor offers made OK: " +
                "\uD83C\uDF53 ${mList.size} \uD83C\uDF53 ")
        return mList
    }

    private val xx = "\uD83C\uDF53 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35"
    private val xx1 = "\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 "

    fun getSupplierPayment(proxy: CordaRPCOps, offerId: String): SupplierPaymentDTO? {

        val future = proxy.startFlowDynamic(SupplierPaymentQueryFlow::class.java, offerId,
                SupplierPaymentQueryFlow.FIND_FOR_OFFER).returnValue
        val payments = future.get()
        return if (payments.isNotEmpty()) {
            val p = DTOUtil.getDTO(payments.first())
            logger.info("${Emo.HEART_PURPLE} SupplierPayment found ${p.acceptedOffer?.offerAmount}")
            p
        } else {
            null
        }
    }

}

