package com.bfn.client.web.services

import com.bfn.client.Emo
import com.bfn.client.data.InvestorPaymentDTO
import com.bfn.client.data.SupplierPaymentDTO
import com.bfn.client.web.DTOUtil
import com.bfn.contractstates.states.InvestorPaymentState
import com.bfn.contractstates.states.NetworkInvestorRoyaltyState
import com.bfn.contractstates.states.NetworkSupplierRoyaltyState
import com.bfn.contractstates.states.SupplierPaymentState
import com.bfn.flows.PAYMENT_ROYALTY
import com.bfn.flows.StellarPaymentDTO
import com.bfn.flows.customer.InvestorPaymentFlow
import com.bfn.flows.investor.SupplierPaymentFlow
import com.bfn.flows.operator.NetworkInvestorRoyaltyFlow
import com.bfn.flows.operator.NetworkSupplierRoyaltyFlow
import com.bfn.flows.todaysDate
import com.google.gson.GsonBuilder
import net.corda.core.messaging.CordaRPCOps
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.math.BigDecimal
import java.util.*

@Service
class NetworkRoyaltyService {
    private val logger = LoggerFactory.getLogger(WorkerBeeService::class.java)
    private val gson = GsonBuilder().setPrettyPrinting().create()
    @Autowired
    private lateinit var workerBeeService: WorkerBeeService

    @Autowired
    private lateinit var firebaseService: FirebaseService

    @Autowired
    private lateinit var stellarAnchorService: StellarAnchorService


    fun processSupplierRoyalty(proxy: CordaRPCOps,
                               stellarPayment: StellarPaymentDTO,
                               supplierPayment: SupplierPaymentDTO) {
        logger.info("${Emo.HEART_BLUE}${Emo.HEART_BLUE}${Emo.HEART_BLUE}" +
                "Processing settlement of supplier royalty payments to NetworkOperator ${Emo.RED_APPLE}")

        val operator = firebaseService.getNetworkOperator()
        val networkOperatorProfile = workerBeeService.getInvestorProfile(
                proxy,operator!!.account!!.identifier)

        val royaltyPerc = operator.supplierRoyaltyPercentage.toBigDecimal()
        val payment = stellarPayment.amount.toBigDecimal()

        val amount = royaltyPerc.divide(BigDecimal("100")).multiply(payment)
        if (networkOperatorProfile!!.stellarAccountId == stellarPayment.destinationAccount) {
            logger.info("${Emo.CLOVER}${Emo.CLOVER}${Emo.CLOVER}" +
                    "Source and destination accounts are the same, no need for supplier royalty payment")
            return
        }
        val royaltyPayment = StellarPaymentDTO(
                paymentRequestId = UUID.randomUUID().toString(),
                amount = amount.toString(),
                date = todaysDate(),
                destinationAccount = networkOperatorProfile.stellarAccountId,
                sourceAccount = stellarPayment.destinationAccount,
                paymentType = PAYMENT_ROYALTY,
                assetCode = stellarPayment.assetCode
        )
        val statusCode = stellarAnchorService.sendPayment(royaltyPayment)
        if (statusCode == 200) {
            //tell the ledger
            logger.info("${Emo.HEART_BLUE}${Emo.HEART_BLUE} " +
                    "NetworkSupplierRoyaltyFlow starting ...")

            val operatorAccount = workerBeeService.getNodeAccount(
                    proxy, identifier = operator.account!!.identifier)
            if (operatorAccount != null) {
                val payments = workerBeeService.findSupplierPaymentStatesForInvestor(
                        proxy,supplierPayment.acceptedOffer!!.investor?.account!!.identifier)
                var mPayment: SupplierPaymentState? = null
                payments.forEach {
                    if (it.acceptedOffer.offerId ==
                            supplierPayment.acceptedOffer?.offerId ) {
                        mPayment = it
                    }
                }
                if (mPayment != null) {
                    val state = NetworkSupplierRoyaltyState(
                            networkRoyaltyId = UUID.randomUUID(),
                            amount = amount.toString(),
                            royaltyPercentage = royaltyPerc.toString(),
                            dateRegistered = todaysDate(),
                            networkOperator = operatorAccount.host,
                            supplierPayment = mPayment!!
                    )
                    proxy.startFlowDynamic(NetworkSupplierRoyaltyFlow::class.java,
                            state)
                    firebaseService.addSupplierRoyalty(DTOUtil.getDTO(state))
                    logger.info("${Emo.HEART_ORANGE}${Emo.HEART_ORANGE}${Emo.HEART_ORANGE}" +
                            "Supplier Royalty payment to NetworkOperator succeeded " +
                            "${gson.toJson(royaltyPayment)}${Emo.RED_APPLE}")
                } else {
                    throw Exception("SupplierPayment not found on ledger ${Emo.NOT_OK}")
                }
            }
        } else {
            throw Exception("${Emo.ERROR} NetworkRoyaltyService.processSupplierRoyalty failed;" +
                    " statusCode: $statusCode ${Emo.NOT_OK}")
        }
    }
    fun processInvestorRoyalty(proxy: CordaRPCOps,
                               stellarPayment: StellarPaymentDTO,
                               investorPayment: InvestorPaymentDTO) {
        logger.info("${Emo.HEART_ORANGE}${Emo.HEART_ORANGE}${Emo.HEART_ORANGE}" +
                "Processing settlement of investor royalty payments to NetworkOperator ${Emo.RED_APPLE}")

        val operator = firebaseService.getNetworkOperator()
        val networkOperatorProfile = workerBeeService.getInvestorProfile(proxy,operator!!.account!!.identifier)

        val royaltyPerc = operator.investorRoyaltyPercentage.toBigDecimal()
        val payment = stellarPayment.amount.toBigDecimal()

        val amount = royaltyPerc.divide(BigDecimal("100")).multiply(payment)
        if (networkOperatorProfile!!.stellarAccountId == stellarPayment.destinationAccount) {
            logger.info("${Emo.CLOVER}${Emo.CLOVER}${Emo.CLOVER}" +
                    "Source and destination accounts are the same, no need for investor royalty payment")
            return
        }
        val royaltyPayment = StellarPaymentDTO(
                paymentRequestId = UUID.randomUUID().toString(),
                amount = amount.toString(),
                date = todaysDate(),
                destinationAccount = networkOperatorProfile.stellarAccountId,
                sourceAccount = stellarPayment.destinationAccount,
                paymentType = PAYMENT_ROYALTY,
                assetCode = stellarPayment.assetCode
        )
        val statusCode = stellarAnchorService.sendPayment(royaltyPayment)
        if (statusCode == 200) {
            //tell the ledger
            logger.info("${Emo.HEART_ORANGE}${Emo.HEART_ORANGE} " +
                    "NetworkInvestorRoyaltyFlow starting ...")
            val operatorAccount = workerBeeService.getNodeAccount(
                    proxy, identifier = operator.account!!.identifier)
            if (operatorAccount != null) {
                val payments = workerBeeService.findInvestorPaymentStatesForInvestor(
                        proxy,investorPayment.investorProfile!!.account.identifier)
                var mPayment: InvestorPaymentState? = null
                payments.forEach {
                    if (it.supplierPayment.acceptedOffer.offerId ==
                            investorPayment.supplierPayment?.acceptedOffer?.offerId ) {
                        mPayment = it
                    }
                }
                if (mPayment != null) {
                    val state = NetworkInvestorRoyaltyState(
                            networkRoyaltyId = UUID.randomUUID(),
                            amount = amount.toString(),
                            royaltyPercentage = royaltyPerc.toString(),
                            dateRegistered = todaysDate(),
                            networkOperator = operatorAccount.host,
                            investorPayment = mPayment!!
                    )
                    proxy.startFlowDynamic(NetworkInvestorRoyaltyFlow::class.java,
                            state)
                    firebaseService.addInvestorRoyalty(DTOUtil.getDTO(state))
                    logger.info("${Emo.HEART_ORANGE}${Emo.HEART_ORANGE}${Emo.HEART_ORANGE}" +
                            "Investor Royalty payment to NetworkOperator succeeded " +
                            "${gson.toJson(royaltyPayment)}${Emo.RED_APPLE}")
                } else {
                    throw Exception("InvestorPayment not found on ledger")
                }
            }
        } else {
            throw Exception("${Emo.ERROR} ${Emo.ERROR} " +
                    "NetworkRoyaltyService.processInvestorRoyalty failed; " +
                    "statusCode: $statusCode ${Emo.NOT_OK}")
        }

    }
     fun startSupplierPaymentFlow(offerId: String, proxy: CordaRPCOps): SupplierPaymentDTO {
        logger.info("${Emo.GLOBE}${Emo.GLOBE}${Emo.GLOBE} startSupplierPaymentFlow: " +
                "... Talking to Corda SupplierPaymentFlow ... ${Emo.GLOBE} ")

        val future = proxy.startFlowDynamic(SupplierPaymentFlow::class.java,
                offerId).returnValue
        val supplierPaymentState = future.get()
        if (supplierPaymentState != null) {
            logger.info("${Emo.GLOBE}${Emo.GLOBE}${Emo.GLOBE}  " +
                    "${Emo.LEAF} supplierPayment recorded on Corda Ledger ${Emo.LEAF}")
            val dto = DTOUtil.getDTO(supplierPaymentState)
            firebaseService.addSupplierPayment(dto)
            logger.info("${Emo.GLOBE}${Emo.GLOBE}${Emo.GLOBE} SupplierPayment made on ledger: " +
                    "${dto.acceptedOffer?.offerAmount} " +
                    "${Emo.SOCCER_BALL}${Emo.SOCCER_BALL}${Emo.SOCCER_BALL} \n\n\n")
            return dto
        } else {
            throw Exception("Unable to save successful supplierPayment on Corda Ledger ${Emo.NOT_OK}")
        }
    }
     fun startInvestorPaymentFlow(supplierPaymentId: String, proxy: CordaRPCOps): InvestorPaymentDTO {

        logger.info("${Emo.GLOBE}${Emo.GLOBE}${Emo.GLOBE} startInvestorPaymentFlow: " +
                "... Talking to Corda InvestorPaymentFlow ... ${Emo.GLOBE} ")

        val future = proxy.startFlowDynamic(InvestorPaymentFlow::class.java,
                supplierPaymentId).returnValue
        val investorPaymentState = future.get()
        if (investorPaymentState != null) {
            logger.info("${Emo.GLOBE}${Emo.GLOBE}${Emo.GLOBE}  " +
                    "${Emo.LEAF} InvestorPayment recorded on Corda Ledger ${Emo.LEAF}")
            val dto = DTOUtil.getDTO(investorPaymentState)
            firebaseService.addInvestorPayment(dto)
            logger.info("${Emo.GLOBE}${Emo.GLOBE}${Emo.GLOBE} InvestorPayment made on ledger: " +
                    "${dto.supplierPayment?.acceptedOffer?.offerAmount} " +
                    "${Emo.SOCCER_BALL}${Emo.SOCCER_BALL}${Emo.SOCCER_BALL} \n\n\n")
            return dto
        } else {
            throw Exception("Unable to save successful InvestorPayment on Corda Ledger ${Emo.NOT_OK}")
        }
    }

}