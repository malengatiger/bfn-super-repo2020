package com.bfn.client.web

import com.bfn.client.dto.NodeInfoDTO
import com.google.gson.GsonBuilder
import com.google.gson.reflect.TypeToken
import net.corda.client.rpc.CordaRPCClient
import net.corda.client.rpc.CordaRPCConnection
import net.corda.core.messaging.CordaRPCOps
import net.corda.core.utilities.NetworkHostAndPort
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.core.io.Resource
import org.springframework.stereotype.Component
import org.springframework.util.ResourceUtils
import java.io.File
import java.nio.file.Files
import java.util.stream.Collectors
import java.util.stream.Stream
import javax.annotation.PostConstruct
import javax.annotation.PreDestroy


private const val CORDA_NODE_INDEX = "node.index"
private const val PROFILE = "spring.profiles.active"

/**
 * Wraps an RPC connection to a Corda node.
 *
 * The RPC connection is configured using command line arguments.
 *
 * @param stringIndex The host of the node we are connecting to.
 * @param rpcPort The RPC port of the node we are connecting to.
 * @param username The username for logging into the RPC client.
 * @param password The password for logging into the RPC client.
 * @property proxy The RPC proxy.
 */
@Component
open class NodeRPCConnection(
        @Value("\${$CORDA_NODE_INDEX}")
        private var stringIndex: String,
        @Value("\${$PROFILE}")
        private var springBootProfile: String
        ) : AutoCloseable {

    private lateinit var rpcConnection: CordaRPCConnection
    lateinit var proxy: CordaRPCOps
        private set
    private val logger = LoggerFactory.getLogger(NodeRPCConnection::class.java)
    private val gson = GsonBuilder().setPrettyPrinting().create()
    @Value("classpath:dev-nodes.json")
    private val resDev: Resource? = null
    @Value("classpath:prod-nodes.json")
    private val resProd: Resource? = null


    @PostConstruct
    fun initialiseNodeRPCConnection() {
        logger.info("\n\uD83D\uDD37\uD83D\uDD37\uD83D\uDD37\uD83D\uDD37 initialiseNodeRPCConnection: Node Access Properties: " +
                "\uD83D\uDD37 node index: $stringIndex :  \uD83C\uDF4E - to get node from json file by this index")

        val file: File = if (springBootProfile == "dev") {
           resDev!!.file
        } else {
            resProd!!.file
        }
        logger.info("\uD83D\uDD37 \uD83D\uDD37 Filename is: \uD83D\uDD37 $file")
//        val file = ResourceUtils.getFile(fileName)
        logger.info("\uD83E\uDD6C \uD83E\uDD6C \uD83E\uDD6C Nodes JSON File Found :  " +
                "\uD83D\uDE21 \uD83D\uDE21 \uD83D\uDE21  " + file.exists())
        if (!file.exists()) {
            throw Exception("JSON properties file: $file does not exist")
        }
        val content = String(Files.readAllBytes(file.toPath()))
        logger.info("\uD83D\uDE21 \uD83D\uDE21 \uD83D\uDE21 Content from JSON file: $content")
        // List
        val nodeType = object : TypeToken<List<NodeInfoDTO>>() {}.type
        val nodes: List<NodeInfoDTO> = gson.fromJson(content, nodeType)
        val node = nodes[stringIndex.toInt()]

        val rpcAddress = NetworkHostAndPort(node.host!!, node.port!!.toInt())
        val rpcClient = CordaRPCClient(rpcAddress)
        val rpcConnection = rpcClient.start(node.username!!, node.password!!)
        proxy = rpcConnection.proxy

        logger.info("\uD83D\uDD35 \uD83D\uDD35 initialiseNodeRPCConnection  \uD83C\uDF4E completed \uD83D\uDD35 \uD83D\uDD35")
    }

    @PreDestroy
    override fun close() {
        logger.info("\uD83D\uDD35 \uD83D\uDD35 PreDestroy close: closing CordaRPCClient ... ")
        rpcConnection.notifyServerAndClose()
    }
}
