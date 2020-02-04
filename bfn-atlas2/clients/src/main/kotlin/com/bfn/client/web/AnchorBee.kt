package com.bfn.client.web

import com.bfn.client.dto.*
import com.google.firebase.cloud.FirestoreClient
import com.google.gson.GsonBuilder

import com.bfn.client.web.FirebaseUtil.createUser
import com.bfn.contractstates.states.*
import com.bfn.flows.AnchorCreationFlow
import com.bfn.flows.CreateAccountFlow
import com.bfn.flows.anchor.AnchorUpdateFlow
import com.r3.corda.lib.accounts.contracts.states.AccountInfo
import net.corda.core.contracts.StateAndRef
import net.corda.core.messaging.CordaRPCOps
import net.corda.core.node.services.Vault
import net.corda.core.node.services.vault.PageSpecification
import net.corda.core.node.services.vault.QueryCriteria
import net.corda.core.node.services.vault.Sort
import org.slf4j.LoggerFactory
import java.util.*

object AnchorBee {
    private val logger = LoggerFactory.getLogger(AnchorBee::class.java)
    private val GSON = GsonBuilder().setPrettyPrinting().create()
    val db = FirestoreClient.getFirestore()

    @JvmStatic
    @Throws(Exception::class)
    fun updateAnchor(proxy: CordaRPCOps,
                     anchor: AnchorDTO) : AnchorDTO {
        logger.info("\uD83C\uDFC0 \uD83C\uDFC0 Starting to update Anchor ... " )
        if (anchor.accountId == null) {
            throw Exception("Illegal call. anchor cannot be updated before it is created")
        }
        var oldState: AnchorState? = null
        val states = proxy.vaultQueryByWithPagingSpec(
                criteria = QueryCriteria.VaultQueryCriteria(status = Vault.StateStatus.UNCONSUMED),
                paging = PageSpecification(1, 20),
                contractStateType = AnchorState::class.java
        ).states
        logger.info("\uD83C\uDF15 \uD83C\uDF15 Anchor states found: ${states.size}")
        states.forEach() {
            if (it.state.data.name == anchor.name) {
                oldState = it.state.data
            }
        }
        if (oldState == null) {
            throw Exception("\uD83D\uDC7F Anchor does not exist on the Corda node")
        }
        val cordaFuture = proxy.startFlowDynamic(
                AnchorUpdateFlow::class.java,oldState!!).returnValue
        val result = cordaFuture.get()
        val dto = getDTO(result)
        logger.info("\uD83C\uDF53 createAnchor: Anchor updated: \uD83C\uDF53 ${dto.name}")
        return dto
    }

    @JvmStatic
    @Throws(Exception::class)
    fun createAnchor(proxy: CordaRPCOps,
                     anchor: AnchorDTO): AnchorDTO? {
        logger.info("\uD83C\uDFC0 \uD83C\uDFC0 Starting to add Anchor to " +
                "\uD83C\uDF88 Firebase auth, \uD83C\uDF88 Corda and \uD83C\uDF88 Firestore")
        val res = proxy.vaultQuery(AnchorState::class.java).states.singleOrNull()
        if (res != null) {
            throw Exception("\uD83D\uDC7F \uD83D\uDC7F Anchor already exists")
        }
        val mUser = FirebaseUtil.getUser(anchor.email)
        if (mUser != null) {
            throw Exception("\uD83D\uDE21 Firebase auth user already exists")
        }
        //todo - improve this query ...
        val accounts = proxy.vaultQuery(AccountInfo::class.java).states
        var account: AccountInfo? = null
        accounts.forEach {
            if (it.state.data.name == anchor.name) {
                account = it.state.data
            }
        }
        logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 Creating node anchor account ")
        try {
            if (account == null) {
                val cordaFuture = proxy.startFlowDynamic(
                        CreateAccountFlow::class.java,anchor.name).returnValue
                account = cordaFuture.get()
            }
            val anc = AnchorState(
                    issuedBy = proxy.nodeInfo().legalIdentities.first(),
                    account = account!!,
                    minimumInvoiceAmount = anchor.minimumInvoiceAmount!!,
                    maximumInvoiceAmount = anchor.maximumInvoiceAmount!!,
                    maximumInvestment = anchor.maximumInvestment!!,
                    defaultOfferDiscount = anchor.defaultOfferDiscount!!,
                    tradeFrequencyInMinutes = anchor.tradeFrequencyInMinutes!!,
                    tradeMatrices = anchor.tradeMatrices!!,
                    name = anchor.name!!, email = anchor.email!!,
                    cellphone = anchor.cellphone!!, date = Date())

            val fut = proxy.startTrackedFlowDynamic(
                    AnchorCreationFlow::class.java, anc).returnValue
            val tx = fut.get()
            anchor.accountId = account!!.identifier.id.toString()
            anchor.issuedBy = proxy.nodeInfo().legalIdentities.first().toString()
            logger.info("\uD83C\uDF53 createAnchor: Anchor response \uD83C\uDF53 ${tx.id.toString()}")
            //add user to Firebase auth
            createUser(
                    name = anchor.name,
                    email = anchor.email,
                    password = anchor.password,
                    uid = account!!.identifier.id.toString()
            )
            //add anchor to Firestore
            db.collection("anchors").add(anchor)
            val msg = "\uD83C\uDF3A createAnchor set up, added to Firestore. DONE!: " +
                    "${anchor.name} - ${anchor.email} \uD83C\uDF3A " +
                    "txId: ${tx.id}"
            logger.info(msg)
            return anchor
        } catch (e: Exception) {
            logger.error("\uD83D\uDE21 Anchor creation failed", e)
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
                date = a.date.toString(),
                name = a.name,
                email = a.email,
                cellphone = a.cellphone, password = ""
        )
    }

}
