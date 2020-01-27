package com.bfn.client.web

import com.bfn.client.dto.*
import com.google.firebase.cloud.FirestoreClient
import com.google.gson.GsonBuilder

import com.bfn.client.web.FirebaseUtil.createUser
import com.bfn.contractstates.states.*
import com.bfn.flows.AnchorCreationFlow
import com.bfn.flows.CreateAccountFlow
import net.corda.core.messaging.CordaRPCOps
import org.slf4j.LoggerFactory
import java.util.*

object AnchorBee {
    private val logger = LoggerFactory.getLogger(AnchorBee::class.java)
    private val GSON = GsonBuilder().setPrettyPrinting().create()
    val db = FirestoreClient.getFirestore()


    @JvmStatic
    @Throws(Exception::class)
    fun createAnchor(proxy: CordaRPCOps,
                     anchor: AnchorDTO): AnchorDTO? {

        val res = proxy.vaultQuery(AnchorState::class.java).states.singleOrNull()
        if (res != null) {
            throw Exception("Anchor already exists")
        }

        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 Creating node anchor account ")

        try {
            val fut0 = proxy.startFlowDynamic(CreateAccountFlow::class.java,anchor.name).returnValue
            val acct = fut0.get()
            val anc = AnchorState(
                    issuedBy = proxy.nodeInfo().legalIdentities.first(),
                    account = acct,
                    minimumInvoiceAmount = anchor.minimumInvoiceAmount,
                    maximumInvoiceAmount = anchor.maximumInvoiceAmount,
                    maximumInvestment = anchor.maximumInvestment,
                    defaultOfferDiscount = anchor.defaultOfferDiscount,
                    tradeFrequencyInMinutes = anchor.tradeFrequencyInMinutes,
                    tradeMatrices = anchor.tradeMatrices,
                    name = anchor.name, email = anchor.email,
                    cellphone = anchor.cellphone, date = Date())
            val fut = proxy.startTrackedFlowDynamic(
                    AnchorCreationFlow::class.java, anc).returnValue
            val tx = fut.get()
            val userRecord = createUser(
                    name = anchor.name,
                    email = anchor.email,
                    cellphone = anchor.cellphone,
                    password = anchor.password,
                    uid = acct.identifier.id.toString()
            )
            db.collection("anchors").add(getDTO(anc))
            val msg = "\uD83C\uDF3A createAnchor set up, DONE!: " +
                    "${userRecord.displayName} - ${userRecord.email} \uD83C\uDF3A " +
                    "txId: ${tx.id}"
            logger.info(msg)
            return getDTO(anc)
        } catch (e: Exception) {
            logger.error(" \uD83D\uDE21 Anchor creation failed", e)
            throw e;
        }

    }

    private fun getDTO(a:AnchorState): AnchorDTO {
        return AnchorDTO(
               issuedBy = a.issuedBy.toString(),
                accountId = a.account.identifier.id.toString(),
                minimumInvoiceAmount = a.minimumInvoiceAmount,
                maximumInvoiceAmount = a.maximumInvoiceAmount,
                maximumInvestment = a.maximumInvestment,
                defaultOfferDiscount = a.defaultOfferDiscount,
                tradeFrequencyInMinutes = a.tradeFrequencyInMinutes,
                tradeMatrices = a.tradeMatrices,
                date = a.date,
                name = a.name,
                email = a.email,
                cellphone = a.cellphone, password = ""
        )
    }

}
