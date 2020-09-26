package com.bfn.client.web.services

import com.bfn.client.data.*
import com.bfn.client.web.DTOUtil
import com.google.firebase.cloud.FirestoreClient
import com.google.gson.GsonBuilder

import com.bfn.contractstates.states.*
import com.bfn.flows.investor.MultiplePaymentsFlow
import com.bfn.flows.supplier.FindBestOfferForInvoiceFlow
import com.bfn.flows.supplier.OfferAcceptanceBySupplierFlow
import com.google.cloud.firestore.Firestore
import net.corda.core.contracts.StateAndRef
import net.corda.core.messaging.CordaRPCOps
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class SupplierBeeService {
    private val logger = LoggerFactory.getLogger(SupplierBeeService::class.java)
    private val GSON = GsonBuilder().setPrettyPrinting().create()
    private val db: Firestore = FirestoreClient.getFirestore()

    @Autowired
    private lateinit var firebaseService: FirebaseService
    @Autowired
    private lateinit var workerBeeService: WorkerBeeService

    
    @Throws(Exception::class)
    fun selectBestOffer(proxy: CordaRPCOps, accountId: String,
                        invoiceId: String, acceptBestOffer:Boolean): InvoiceOfferDTO? {

        val cordaFuture = proxy.startFlowDynamic(
                FindBestOfferForInvoiceFlow::class.java, accountId, invoiceId, acceptBestOffer)
                .returnValue
        val offer: StateAndRef<InvoiceOfferState> = cordaFuture.get() ?: return null
        val dto = DTOUtil.getDTO(offer.state.data)
        logger.info("✅ ✅ ✅ ✅ \uD83C\uDF4E Best offer selected: " +
                "\uD83C\uDF88 ${GSON.toJson(dto)} \uD83C\uDF88")
        return dto
    }
    
    @Throws(Exception::class)
    fun acceptOffer(proxy: CordaRPCOps, offerId: String): InvoiceOfferState? {

        val cordaFuture = proxy.startFlowDynamic(
                OfferAcceptanceBySupplierFlow::class.java,  offerId)
                .returnValue
        val tx: InvoiceOfferState? = cordaFuture.get()
        if (tx != null) {
            logger.info("\uD83E\uDD6C \uD83E\uDD6C \uD83E\uDD6C Offer accepted if result == InvoiceOfferState:" +
                    " \uD83C\uDF4E supplier: \uD83E\uDD6C ${tx.supplier.name}")
        }
        return tx
    }
    
    @Throws(Exception::class)
    fun createPayments(proxy: CordaRPCOps,
                       investorId: String,
                       stellarAnchorUrl:String ,
                       delayMinutesUntilNextPaymentFlow: Long): List<SupplierPaymentDTO> {

        val investor = workerBeeService.getNodeAccount(proxy = proxy, identifier = investorId)
        val cordaFuture = proxy.startTrackedFlowDynamic(
                MultiplePaymentsFlow::class.java,
                investor, stellarAnchorUrl, delayMinutesUntilNextPaymentFlow)
                .returnValue
        val supplierPayments: List<SupplierPaymentState>? = cordaFuture.get()
        if (supplierPayments != null) {
            logger.info("\uD83E\uDD6C \uD83E\uDD6C \uD83E\uDD6C createPayment" +
                    " \uD83C\uDF4E result: \uD83E\uDD6C ${supplierPayments.size}")
        }
        val mList:MutableList<SupplierPaymentDTO> = mutableListOf()
        supplierPayments?.forEach() {
            mList.add(DTOUtil.getDTO(it))
        }
        logger.info("\uD83E\uDD6C \uD83E\uDD6C \uD83E\uDD6C createPayment" +
                " \uD83C\uDF4E payments created: \uD83E\uDD6C ${mList.size}")
        return mList
    }

}
