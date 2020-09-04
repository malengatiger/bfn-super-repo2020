package com.bfn.client.utils

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
import org.slf4j.LoggerFactory
import org.springframework.core.io.ResourceLoader
import org.springframework.util.Assert
import org.springframework.util.FileCopyUtils
import java.io.File
import java.io.InputStream
import java.nio.charset.StandardCharsets
import java.nio.file.Files

fun buildFirebase(nodePropertiesFile: File, nodeIndex: Int): List<NodeInfoDTO> {
    val logger = LoggerFactory.getLogger(ResponseTimer::class.java)
    val gson = GsonBuilder().setPrettyPrinting().create()
    val content = String(Files.readAllBytes(nodePropertiesFile.toPath()))
    val nodeType = object : TypeToken<List<NodeInfoDTO>>() {}.type
    val nodes: List<NodeInfoDTO> = gson.fromJson(content, nodeType)

    logger.info("\uD83D\uDD35 \uD83D\uDD35 Using index $nodeIndex to pick node from json file")
    val node = nodes[nodeIndex]
    logger.info("\uD83D\uDD35 \uD83D\uDD35 Selected node:  \uD83D\uDD35 " +
            "\uD83D\uDD35 ${gson.toJson(node)}  \uD83D\uDD35 \uD83D\uDD35 ")

    val options = FirebaseOptions.Builder()
            .setCredentials(GoogleCredentials.getApplicationDefault())
            .setProjectId(node.firebaseProjectId)
            .setDatabaseUrl(node.firebaseUrl).build()
    val app = FirebaseApp.initializeApp(options)

    logger.info("\uD83E\uDDE9\uD83E\uDDE9\uD83E\uDDE9  \uD83E\uDDE9\uD83E\uDDE9\uD83E\uDDE9 "
            + "Firebase Admin SDK Setup OK:  \uD83E\uDDE9\uD83E\uDDE9\uD83E\uDDE9 app: "
            + app.toString())
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
