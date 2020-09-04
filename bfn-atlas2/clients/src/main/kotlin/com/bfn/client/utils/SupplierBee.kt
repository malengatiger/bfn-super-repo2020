package com.bfn.client.utils

import com.bfn.client.data.*
import com.google.firebase.cloud.FirestoreClient
import com.google.gson.GsonBuilder

import com.bfn.contractstates.states.*
import com.bfn.flows.investor.InvestorMakeMultiplePaymentsFlow
import com.bfn.flows.supplier.FindBestOfferForInvoiceFlow
import com.bfn.flows.supplier.InvestorOfferAcceptanceBySupplierFlow
import com.google.cloud.firestore.Firestore
import net.corda.core.contracts.StateAndRef
import net.corda.core.messaging.CordaRPCOps
import org.slf4j.LoggerFactory

object SupplierBee {
    private val logger = LoggerFactory.getLogger(SupplierBee::class.java)
    private val GSON = GsonBuilder().setPrettyPrinting().create()
    private val db: Firestore = FirestoreClient.getFirestore()

    @JvmStatic
    @Throws(Exception::class)
    fun selectBestOffer(proxy: CordaRPCOps, accountId: String,
                        invoiceId: String): InvoiceOfferDTO? {

        val cordaFuture = proxy.startTrackedFlowDynamic(
                FindBestOfferForInvoiceFlow::class.java, accountId, invoiceId)
                .returnValue
        val offer: StateAndRef<InvoiceOfferState> = cordaFuture.get() ?: return null
        val dto = WorkerBee.getDTO(offer.state.data)
        logger.info("✅ ✅ ✅ ✅ \uD83C\uDF4E Best offer selected: " +
                "\uD83C\uDF88 ${GSON.toJson(dto)} \uD83C\uDF88")
        return dto
    }
    @JvmStatic
    @Throws(Exception::class)
    fun acceptOffer(proxy: CordaRPCOps, offerId: String): Int {

        val cordaFuture = proxy.startTrackedFlowDynamic(
                InvestorOfferAcceptanceBySupplierFlow::class.java,  offerId)
                .returnValue
        val tx: Int = cordaFuture.get()
        logger.info("\uD83E\uDD6C \uD83E\uDD6C \uD83E\uDD6C Offer accepted if result == 0 :" +
                " \uD83C\uDF4E result: \uD83E\uDD6C $tx")
        return tx
    }
    @JvmStatic
    @Throws(Exception::class)
    fun createPayments(proxy: CordaRPCOps, investorId: String, delayMinutesUntilNextPaymentFlow: Long): List<SupplierPaymentDTO> {

        val cordaFuture = proxy.startTrackedFlowDynamic(
                InvestorMakeMultiplePaymentsFlow::class.java,  investorId, delayMinutesUntilNextPaymentFlow)
                .returnValue
        val tx: List<SupplierPaymentState>? = cordaFuture.get()
        if (tx != null) {
            logger.info("\uD83E\uDD6C \uD83E\uDD6C \uD83E\uDD6C createPayment" +
                    " \uD83C\uDF4E result: \uD83E\uDD6C ${tx.size}")
        }
        val mList:MutableList<SupplierPaymentDTO> = mutableListOf()
        tx?.forEach() {
            mList.add(WorkerBee.getDTO(it))
        }
        logger.info("\uD83E\uDD6C \uD83E\uDD6C \uD83E\uDD6C createPayment" +
                " \uD83C\uDF4E payments created: \uD83E\uDD6C ${mList.size}")
        return mList
    }

}
