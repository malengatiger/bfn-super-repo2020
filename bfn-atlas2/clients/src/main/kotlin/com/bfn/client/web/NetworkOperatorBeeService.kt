package com.bfn.client.web

import com.bfn.client.data.*
import com.bfn.contractstates.states.NetworkOperatorState
import com.bfn.contractstates.states.TradeMatrixItem
import com.bfn.flows.operator.*
import com.bfn.flows.queries.AccountInfoQueryFlow
import com.google.gson.GsonBuilder
import com.r3.corda.lib.accounts.contracts.states.AccountInfo
import net.corda.core.messaging.CordaRPCOps
import net.corda.core.node.services.Vault
import net.corda.core.node.services.vault.PageSpecification
import net.corda.core.node.services.vault.QueryCriteria
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.*
import javax.annotation.PostConstruct

@Service
class NetworkOperatorBeeService {
    private val logger = LoggerFactory.getLogger(NetworkOperatorBeeService::class.java)
    private val gson = GsonBuilder().setPrettyPrinting().create()

    @Autowired
    private lateinit var firebaseService: FirebaseService

    @Autowired
    private lateinit var workerBeeService: WorkerBeeService

    @Autowired
    private lateinit var stellarAccountService: StellarAccountService

    @PostConstruct
    fun init() {
        logger.info("\uD83C\uDFC0 \uD83C\uDFC0 NetworkOperatorBeeService initialized")
    }

    @Throws(Exception::class)
    fun getNetworkOperator(proxy: CordaRPCOps, identifier: String): NetworkOperatorDTO {
        logger.info("\uD83C\uDFC0 \uD83C\uDFC0 Starting to getAnchor ... $identifier")

        val netOperator = proxy.vaultQuery(NetworkOperatorState::class.java).states.singleOrNull()
                ?: throw Exception("Missing anchor")
        if (netOperator.state.data.account.identifier.id.toString() != identifier) {
            throw Exception("Invalid anchor identifier")
        }
        val dto = DTOUtil.getDTO(netOperator.state.data)
        logger.info("\uD83D\uDC4C \uD83D\uDC4C \uD83D\uDC4C " +
                "Anchor: ${gson.toJson(dto)} \uD83D\uDC4C ")
        return dto
    }

    @Throws(Exception::class)
    fun makeSinglePayment(proxy: CordaRPCOps, invoiceId: String): SupplierPaymentDTO {
        logger.info("\uD83C\uDFC0 \uD83C\uDFC0 Starting to makeSinglePayment ... ")

        val cordaFuture = proxy.startFlowDynamic(
                NetworkOperatorMakeSinglePaymentFlow::class.java, invoiceId).returnValue
        val result = cordaFuture.get()
        logger.info("\uD83D\uDC4C \uD83D\uDC4C \uD83D\uDC4C " +
                "Bank: ${result.supplierProfile.bank} \uD83D\uDC4C amount: ${result.acceptedOffer.offerAmount} payment state made")
        return DTOUtil.getDTO(result)
    }

    @Throws(Exception::class)
    fun makeMultiplePayments(proxy: CordaRPCOps, delayMinutesUntilNextPaymentFlow: Long): List<SupplierPaymentDTO> {
        logger.info("\uD83C\uDFC0 \uD83C\uDFC0 Starting to makeMultiplePayments ... ")

        val cordaFuture = proxy.startFlowDynamic(
                NetworkOperatorMakeMultiplePaymentsFlow::class.java, delayMinutesUntilNextPaymentFlow).returnValue
        val result = cordaFuture.get()
        val mList: MutableList<SupplierPaymentDTO> = mutableListOf()
        result.forEach() {
            mList.add(DTOUtil.getDTO(it))
        }
        logger.info("\uD83D\uDC4C \uD83D\uDC4C \uD83D\uDC4C ${mList.size} payment states made")
        return mList
    }


    @Throws(Exception::class)
    fun updateNetworkOperator(proxy: CordaRPCOps,
                              networkOperator: NetworkOperatorDTO): NetworkOperatorDTO {
        logger.info("\uD83C\uDFC0 \uD83C\uDFC0 Starting to update Anchor ... ")
        var oldState: NetworkOperatorState? = null
        val states = proxy.vaultQueryByWithPagingSpec(
                criteria = QueryCriteria.VaultQueryCriteria(status = Vault.StateStatus.UNCONSUMED),
                paging = PageSpecification(1, 20),
                contractStateType = NetworkOperatorState::class.java
        ).states
        logger.info("\uD83C\uDF15 \uD83C\uDF15 Anchor states found: ${states.size}")
        states.forEach() {
            if (it.state.data.name == networkOperator.name) {
                oldState = it.state.data
            }
        }
        if (oldState == null) {
            throw Exception("\uD83D\uDC7F Anchor does not exist on the Corda node")
        }
        val cordaFuture = proxy.startFlowDynamic(
                NetworkOperatorUpdateFlow::class.java, oldState!!).returnValue
        val result = cordaFuture.get()
        val dto = DTOUtil.getDTO(result)
        logger.info("\uD83C\uDF53 createAnchor: Anchor updated: \uD83C\uDF53 ${dto.name}")
        return dto
    }

    @Throws(Exception::class)
    public fun makeOffers(proxy: CordaRPCOps): List<InvoiceOfferDTO> {
        logger.info("\uD83C\uDFC0 \uD83C\uDFC0 .............. " +
                "\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 Starting to make Offers for Anchor ... ")

        val cordaFuture = proxy.startFlowDynamic(
                NetworkOperatorMakeOffersFlow::class.java).returnValue
        val result = cordaFuture.get()
        val mList: MutableList<InvoiceOfferDTO> = mutableListOf()
        result.forEach() {
            val dto = DTOUtil.getDTO(it)
            mList.add(dto)
        }

        mList.forEach() {
            logger.info("$xx OFFER: ${gson.toJson(it)}  $xx")
        }
        logger.info("$xx makeOffers: Number of Anchor offers made OK: " +
                "\uD83C\uDF53 ${mList.size} \uD83C\uDF53 ")
        return mList
    }

    private val xx = "\uD83C\uDF53 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35"
    private val xx1 = "\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 "

    @Throws(Exception::class)
    fun createNetworkOperator(proxy: CordaRPCOps,
                              networkOperator: NetworkOperatorDTO): NetworkOperatorDTO? {
        logger.info("\n\n\n$xx Starting to create NetworkOperator: BFN Head Honcho to " +
                "\uD83C\uDF88 Firebase auth, \uD83C\uDF88 Corda and \uD83C\uDF88 Firestore, " +
                "check networkOperator.tradeFrequencyInMinutes  : ${gson.toJson(networkOperator)}\n\n")
        if (networkOperator.tradeFrequencyInMinutes <= 0) {
            throw Exception("Bad tradeFrequencyInMinutes ${networkOperator.tradeFrequencyInMinutes}")
        }
        val res = proxy.vaultQuery(NetworkOperatorState::class.java).states.singleOrNull()
        if (res != null) {
            val msg = "\uD83D\uDE21 NetworkOperator exists; there should only be one, Bro! \uD83D\uDE21 \uD83D\uDE21"
            logger.info(msg)
            throw Exception("\uD83D\uDC7F \uD83D\uDC7F $msg")
        }
        logger.info("$xx1 We cool up to now; going ahead and creating NetworkOperator ... ")
        //todo - improve this query ...
        var account: AccountInfo? = null
        val accounts = proxy.vaultQuery(AccountInfo::class.java).states
        accounts.forEach {
            logger.info("\uD83D\uDD35 Compare it.state.data.name: ${it.state.data.name} networkOperator.name ${networkOperator.name}")
            if (it.state.data.name == networkOperator.name) {
                account = it.state.data
            }
        }

        var accountInfoDTO: AccountInfoDTO? = null
        try {
            if (account == null) {
                logger.info("\n\n$xx1 ..... " +
                        "Creating BRAND NEW NetworkOperator BFN Corda account ................ ")
                val user = workerBeeService.startAccountRegistrationFlow(
                        proxy,
                        networkOperator.name,
                        networkOperator.email,
                        networkOperator.cellphone,
                        networkOperator.password)

                accountInfoDTO = user.accountInfo
                if (accountInfoDTO.identifier != null) {
                    account = getAccountInfo(proxy = proxy,
                            identifier = accountInfoDTO.identifier)
                    logger.info("\uD83D\uDD35 \uD83D\uDD35 ACCOUNT INFO: ${gson.toJson(accountInfoDTO)}")
                } else {
                    val msg = "\uD83D\uDE21 \uD83D\uDE21 Account creation failed"
                    logger.info(msg)
                    throw Exception(msg)
                }

            } else {
                logger.info("\uD83D\uDD35 \uD83D\uDD35  No need to create a NetworkOperator BFN account, exists:")
            }
            // ## startNetworkOperatorCreationFlow
            if (account == null) {
                val msg = "\uD83D\uDC7F \uD83D\uDC7F NetworkOperator creation failed: AccountInfo is NULL!! "
                logger.info(msg)
                throw Exception(msg)
            }
            val mOperatorCreated = startNetworkOperatorCreationFlow(
                    proxy = proxy, mAccount = account!!, networkOperator = networkOperator)
            logger.info("\n\n\uD83E\uDD6C\uD83E\uDD6C\uD83E\uDD6C\uD83E\uDD6C Yebo! \uD83D\uDD06 " +
                    "The Big Kahuna has been created! Long live the Network Operator !!! \uD83D\uDD06 \uD83D\uDD06")
            logger.info("\uD83C\uDFC0 \uD83C\uDFC0 \uD83C\uDFC0 NETWORK OPERATOR: " +
                    "\uD83C\uDFC0 ${gson.toJson(mOperatorCreated)} \uD83C\uDFC0\n\n")
            return mOperatorCreated

        } catch (e: Exception) {
            logger.error("\uD83D\uDE21 \uD83D\uDC7F \uD83D\uDC7F NetworkOperatorState creation failed", e)
            throw e
        }

    }

    private fun getAccountInfo(proxy: CordaRPCOps, identifier: String): AccountInfo? {
        val fut2 = proxy.startTrackedFlowDynamic(
                AccountInfoQueryFlow::class.java, identifier).returnValue
        if (fut2 != null) {
            return fut2.get()
        } else {
            logger.info("First off, we have a fucking Corda based problem. Boss!")
            throw Exception("Account Query Failed")
        }
    }

    private fun startNetworkOperatorCreationFlow(proxy: CordaRPCOps, mAccount: AccountInfo,
                                                 networkOperator: NetworkOperatorDTO): NetworkOperatorDTO {
        logger.info("\n\n\n\uD83C\uDF53 \uD83C\uDF53 startNetworkOperatorCreationFlow: \uD83C\uDF3A " +
                "about to add BFN Network Operator to Corda and Firestore .... " +
                "\uD83C\uDF3A host: ${mAccount.host.name} identifier: ${mAccount.identifier.id} \n\n")
        val anc = NetworkOperatorState(
                account = mAccount,
                minimumInvoiceAmount = networkOperator.minimumInvoiceAmount,
                maximumInvoiceAmount = networkOperator.maximumInvoiceAmount,
                maximumInvestment = networkOperator.maximumInvestment,
                defaultOfferDiscount = networkOperator.defaultOfferDiscount,
                tradeFrequencyInMinutes = networkOperator.tradeFrequencyInMinutes,
                tradeMatrixItems = getItems(networkOperator.tradeMatrixItems),
                name = networkOperator.name,
                email = networkOperator.email,
                cellphone = networkOperator.cellphone,
                date = Date(),
                stellarAccountId = networkOperator.stellarAccountId,
                rippleAccountId = networkOperator.rippleAccountId)

        val fut = proxy.startTrackedFlowDynamic(
                NetworkOperatorCreationFlow::class.java, anc).returnValue
        val tx = fut.get()

        logger.info("\uD83C\uDF53 startNetworkOperatorCreationFlow: \uD83C\uDF3A " +
                "about to add BFN Network Operator to Firestore .... ")

        firebaseService.addNetworkOperator(DTOUtil.getDTO(anc))

        val msg = "\n\n$em4 ....... NetworkOperatorState set up, added to Firestore. DONE!: " +
                "${networkOperator.name} - ${networkOperator.email} \uD83C\uDF3A " +
                "txId: ${tx.id} \n\n"
        logger.info(msg)
        return DTOUtil.getDTO(anc);

    }
    private val em4 = " \uD83C\uDF50 \uD83C\uDF50 \uD83C\uDF50 \uD83C\uDF50 \uD83C\uDF50 "

    private fun getItems(list: MutableList<TradeMatrixItemDTO>): MutableList<TradeMatrixItem> {
        val mList: MutableList<TradeMatrixItem> = mutableListOf()
        for (dto in list) {
            mList.add(TradeMatrixItem(
                    startInvoiceAmount = dto.startInvoiceAmount,
                    endInvoiceAmount = dto.endInvoiceAmount,
                    offerDiscount = dto.offerDiscount,
                    date = dto.date
            ))
        }
        return mList;
    }

}
