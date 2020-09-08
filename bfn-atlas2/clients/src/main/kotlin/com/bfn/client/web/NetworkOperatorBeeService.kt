package com.bfn.client.web

import com.bfn.client.data.*
import com.google.gson.GsonBuilder

import com.bfn.contractstates.states.*
import com.bfn.flows.operator.*
import com.bfn.flows.queries.AccountInfoQueryFlow
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

    @PostConstruct
    fun init() {
        logger.info("\uD83C\uDFC0 \uD83C\uDFC0 NetworkOperatorBeeService initialized")
    }
    
    @Throws(Exception::class)
    fun getNetworkOperator(proxy: CordaRPCOps, identifier: String) : NetworkOperatorDTO {
        logger.info("\uD83C\uDFC0 \uD83C\uDFC0 Starting to getAnchor ... $identifier")

        val netOperator = proxy.vaultQuery(NetworkOperatorState::class.java).states.singleOrNull() ?: throw Exception("Missing anchor")
        if (netOperator.state.data.account.identifier.id.toString() != identifier) {
            throw Exception("Invalid anchor identifier")
        }
        val dto = DTOUtil.getDTO(netOperator.state.data)
        logger.info("\uD83D\uDC4C \uD83D\uDC4C \uD83D\uDC4C " +
                "Anchor: ${gson.toJson(dto)} \uD83D\uDC4C ")
        return dto
    }
    
    @Throws(Exception::class)
    fun makeSinglePayment(proxy: CordaRPCOps, invoiceId: String) : SupplierPaymentDTO {
        logger.info("\uD83C\uDFC0 \uD83C\uDFC0 Starting to makeSinglePayment ... ")

        val cordaFuture = proxy.startFlowDynamic(
                NetworkOperatorMakeSinglePaymentFlow::class.java, invoiceId).returnValue
        val result = cordaFuture.get()
        logger.info("\uD83D\uDC4C \uD83D\uDC4C \uD83D\uDC4C " +
                "Bank: ${result.supplierProfile.bank} \uD83D\uDC4C amount: ${result.acceptedOffer.offerAmount} payment state made")
        return DTOUtil.getDTO(result)
    }
    
    @Throws(Exception::class)
    fun makeMultiplePayments(proxy: CordaRPCOps, delayMinutesUntilNextPaymentFlow: Long) : List<SupplierPaymentDTO> {
        logger.info("\uD83C\uDFC0 \uD83C\uDFC0 Starting to makeMultiplePayments ... ")

        val cordaFuture = proxy.startFlowDynamic(
                NetworkOperatorMakeMultiplePaymentsFlow::class.java, delayMinutesUntilNextPaymentFlow).returnValue
        val result = cordaFuture.get()
        val mList:MutableList<SupplierPaymentDTO> = mutableListOf()
        result.forEach() {
            mList.add(DTOUtil.getDTO(it))
        }
        logger.info("\uD83D\uDC4C \uD83D\uDC4C \uD83D\uDC4C ${mList.size} payment states made")
        return mList
    }

    
    @Throws(Exception::class)
    fun updateNetworkOperator(proxy: CordaRPCOps,
                              networkOperator: NetworkOperatorDTO) : NetworkOperatorDTO {
        logger.info("\uD83C\uDFC0 \uD83C\uDFC0 Starting to update Anchor ... " )
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
                NetworkOperatorUpdateFlow::class.java,oldState!!).returnValue
        val result = cordaFuture.get()
        val dto = DTOUtil.getDTO(result)
        logger.info("\uD83C\uDF53 createAnchor: Anchor updated: \uD83C\uDF53 ${dto.name}")
        return dto
    }
    
    @Throws(Exception::class)
    public fun makeOffers(proxy: CordaRPCOps) : List<InvoiceOfferDTO> {
        logger.info("\uD83C\uDFC0 \uD83C\uDFC0 .............. " +
                "\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 Starting to make Offers for Anchor ... " )

        val cordaFuture = proxy.startFlowDynamic(
                NetworkOperatorMakeOffersFlow::class.java).returnValue
        val result = cordaFuture.get()
        val mList:MutableList<InvoiceOfferDTO> = mutableListOf()
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

    private  val xx = "\uD83C\uDF53 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35"


    @Throws(Exception::class)
    fun createNetworkOperator(proxy: CordaRPCOps,
                              networkOperator: NetworkOperatorDTO): NetworkOperatorDTO? {
        logger.info("\uD83C\uDFC0 \uD83C\uDFC0 Starting to create NetworkOperator: BFN Head Honcho to " +
                "\uD83C\uDF88 Firebase auth, \uD83C\uDF88 Corda and \uD83C\uDF88 Firestore, check networkOperator.tradeFrequencyInMinutes  : ${gson.toJson(networkOperator)}")
        if (networkOperator.tradeFrequencyInMinutes <= 0) {
            throw Exception("Bad tradeFrequencyInMinutes ${networkOperator.tradeFrequencyInMinutes}")
        }
        val res = proxy.vaultQuery(NetworkOperatorState::class.java).states.singleOrNull()
        if (res != null) {
            logger.info("\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 " +
                    "We are not so cool up to now; vault query returned networkOperator: ${res.state.data}")
            throw Exception("\uD83D\uDC7F \uD83D\uDC7F " +
                    "NetworkOperator exists; there should only be one, Bro!")
        } else {
            logger.info("\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 " +
                    "We cool up to now; going ahead and creating NetworkOperator ... ")
        }

        //todo - improve this query ...
        var account: AccountInfo? = null
        val accounts = proxy.vaultQuery(AccountInfo::class.java).states
        accounts.forEach {
            if (it.state.data.name == networkOperator.name) {
                account = it.state.data
            }
        }


        var accountInfoDTO:AccountInfoDTO? = null
        try {
            if (account == null) {
                logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 Creating NetworkOperator BFN account ................ ")
                 accountInfoDTO = workerBeeService.startAccountRegistrationFlow(proxy, networkOperator.name, networkOperator.email, networkOperator.password)

            } else {
                logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 No need to create a NetworkOperator BFN account ......${gson.toJson(accountInfoDTO)} ")
            }
            if (accountInfoDTO == null) {
                throw Exception("\uD83D\uDD35 \uD83D\uDD35 Expected BFN Corda account was NOT created or found in states")
            }
            val fut2 = proxy.startTrackedFlowDynamic(
                    AccountInfoQueryFlow::class.java, accountInfoDTO.identifier).returnValue
            val mAccount = fut2.get()
            val anc = NetworkOperatorState(
                    issuedBy = proxy.nodeInfo().legalIdentities.first(),
                    account = mAccount!!,
                    minimumInvoiceAmount = networkOperator.minimumInvoiceAmount,
                    maximumInvoiceAmount = networkOperator.maximumInvoiceAmount,
                    maximumInvestment = networkOperator.maximumInvestment,
                    defaultOfferDiscount = networkOperator.defaultOfferDiscount,
                    tradeFrequencyInMinutes = networkOperator.tradeFrequencyInMinutes,
                    tradeMatrixItems = networkOperator.tradeMatrixItems,
                    name = networkOperator.name,
                    email = networkOperator.email,
                    cellphone = networkOperator.cellphone,
                    date = Date())

            val fut = proxy.startTrackedFlowDynamic(
                    NetworkOperatorCreationFlow::class.java, anc).returnValue
            val tx = fut.get()

            logger.info("\uD83C\uDF53 createNetworkOperator: \uD83C\uDF3A about to add BFN Network Operator to Firestore .... ")

            firebaseService.addNetworkOperator(DTOUtil.getDTO(anc))
            firebaseService.createBFNAccount(accountInfo = AccountInfoDTO(
                    mAccount.identifier.toString(),
                    host = mAccount.host.name.organisation,
                    name = mAccount.name, status = "active"))

            val msg = "\uD83C\uDF3A ....... NetworkOperatorState set up, added to Firestore. DONE!: " +
                    "${networkOperator.name} - ${networkOperator.email} \uD83C\uDF3A " +
                    "txId: ${tx.id}"
            logger.info(msg)
            return networkOperator
        } catch (e: Exception) {
            logger.error("\uD83D\uDE21 NetworkOperatorState creation failed", e)
            throw e
        }

    }

}
