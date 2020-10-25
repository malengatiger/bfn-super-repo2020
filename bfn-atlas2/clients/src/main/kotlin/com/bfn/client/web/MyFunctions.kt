package com.bfn.client.web

import com.bfn.client.Emo
import com.bfn.client.data.NodeInfoDTO
import com.bfn.client.web.ResponseTimer
import com.google.auth.oauth2.GoogleCredentials
import com.google.firebase.FirebaseApp
import com.google.firebase.FirebaseOptions
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.google.gson.reflect.TypeToken
import org.json.JSONArray
import org.json.JSONObject
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.core.io.ResourceLoader
import org.springframework.util.Assert
import org.springframework.util.FileCopyUtils
import java.io.File
import java.io.InputStream
import java.lang.Exception
import java.nio.charset.StandardCharsets
import java.nio.file.Files

val logger: Logger = LoggerFactory.getLogger(ResponseTimer::class.java)

fun buildFirebase(nodePropertiesFile: File, nodeIndex: Int): List<NodeInfoDTO> {
    logger.info("\uD83D\uDD35 \uD83D\uDD35\uD83D\uDD35 \uD83D\uDD35\uD83D\uDD35 \uD83D\uDD35 "
            + "Setting up Firebase Admin SDK ....  \uD83E\uDDE9\uD83E\uDDE9\uD83E\uDDE9 ")

    val gson = GsonBuilder().setPrettyPrinting().create()
    val content = String(Files.readAllBytes(nodePropertiesFile.toPath()))
    val nodeType = object : TypeToken<List<NodeInfoDTO>>() {}.type
    val nodes: List<NodeInfoDTO> = gson.fromJson(content, nodeType)

    logger.info("\uD83D\uDD35 \uD83D\uDD35 Using index $nodeIndex to pick node from json file")
    val node = nodes[nodeIndex]
    logger.info("\uD83D\uDD35 \uD83D\uDD35 Selected node:  \uD83D\uDD35 " +
            "\uD83D\uDD35 ${gson.toJson(node)}  \uD83D\uDD35 \uD83D\uDD35 ")

    try {
        val options = FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.getApplicationDefault())
                .setProjectId(node.firebaseProjectId)
                .setDatabaseUrl(node.firebaseUrl).build()
        val app = FirebaseApp.initializeApp(options)

        logger.info("\uD83E\uDDE9\uD83E\uDDE9\uD83E\uDDE9  \uD83E\uDDE9\uD83E\uDDE9\uD83E\uDDE9 "
                + "Firebase Admin SDK Setup OK:  \uD83E\uDDE9\uD83E\uDDE9\uD83E\uDDE9 app: "
                + app.toString())
    } catch (e: Exception) {
        logger.warn("FirebaseApp already initialized ${Emo.FROG} ${e.message}")
    }
    return nodes
}

fun getThisNode(resourceLoader: ResourceLoader, springBootProfile: String, nodeIndex: Int): Pair<NodeInfoDTO, File> {
    val inputStream: InputStream?
    val logger = LoggerFactory.getLogger(ResponseTimer::class.java)
    val nodeList: MutableList<NodeInfoDTO> = mutableListOf()
    val file = File.createTempFile("bfn", "tmp")

    val resourceProd = resourceLoader.getResource("classpath:/prod-nodes.json")
    val resourceDev = resourceLoader.getResource("classpath:/dev-nodes.json")
    inputStream = if (springBootProfile == "dev") {
        resourceDev.inputStream
    } else {
        resourceProd.inputStream
    }
    Assert.notNull(inputStream, "Could not load template resource!")
    var propsJSON: String?
    inputStream.use { stream ->
        val byteArray: ByteArray = FileCopyUtils.copyToByteArray(stream)

        file.writeBytes(byteArray)
        propsJSON = String(byteArray, StandardCharsets.UTF_8)
        logger.info("\uD83D\uDD37 \uD83D\uDD37 \uD83D\uDD37 \uD83D\uDD37 \uD83D\uDD37 \uD83D\uDD37 " +
                "JSON node properties via Stream: $propsJSON \uD83D\uDD37 \uD83D\uDD37 ")
        val gson = Gson()
        val jsonArray = JSONArray(propsJSON)

        jsonArray.forEach {
            val obj = it as JSONObject
            val node: NodeInfoDTO = gson.fromJson(obj.toString(), NodeInfoDTO::class.java)
            logger.info("\uD83C\uDF4A Hey, we in business:  \uD83C\uDF4E  \uD83C\uDF4E  \uD83C\uDF4E  \uD83C\uDF4E  ${gson.toJson(node)}")
            nodeList.add(node)
        }
    }

    logger.info("................... \uD83D\uDD37 \uD83D\uDD37 Nodes from stream: ${nodeList.size}")
    return Pair(first = nodeList[nodeIndex], second = file)


}

const val BFN_USERS:String = "bfnUsers"
const val ANCHORS:String = "anchors"
const val NETWORK_OPERATOR:String = "networkOperator"
const val BFN_CUSTOMER_PROFILES:String = "bfnCustomerProfiles"
const val BFN_SUPPLIER_PROFILES:String = "bfnSupplierProfiles"
const val BFN_INVESTOR_PROFILES:String = "bfnInvestorProfiles"
const val BFN_INVESTOR_PAYMENTS:String = "bfnInvestorPayments"
const val BFN_NODES:String = "bfnNodes"
const val BFN_INVOICES:String = "bfnInvoices"
const val BFN_SUPPLIER_PAYMENTS:String = "bfnSupplierPayments"
const val BFN_INVOICE_OFFERS:String = "bfnInvoiceOffers"
const val BFN_ACCEPTED_OFFERS:String = "bfnAcceptedOffers"
const val BFN_TOKENS:String = "bfnTokens"
const val BFN_WEBSERVER_STARTS:String = "bfnWebServerStarts"
const val BFN_RESPONSE_TIMES:String = "bfnResponseTimes"
const val BFN_PURCHASE_ORDERS:String = "bfnPurchaseOrders"
const val PAYMENT_REQUESTS:String = "paymentRequests"
const val BFN_SUPPLIER_ROYALTIES:String = "supplierRoyalties"
const val BFN_INVESTOR_ROYALTIES:String = "investorRoyalties"
