package com.bfn.client.web

import com.bfn.client.data.NodeInfoDTO
import net.corda.client.rpc.CordaRPCClient
import net.corda.client.rpc.CordaRPCConnection
import net.corda.core.messaging.CordaRPCOps
import net.corda.core.utilities.NetworkHostAndPort
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.core.io.ResourceLoader
import org.springframework.stereotype.Component
import java.io.File
import java.io.IOException
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
    lateinit var proxy: CordaRPCOps private set
    private val logger = LoggerFactory.getLogger(NodeRPCConnection::class.java)

    @Autowired
    private val resourceLoader: ResourceLoader? = null

    @PostConstruct
    fun initialiseNodeRPCConnection() {
        logger.info("\n\uD83D\uDD37\uD83D\uDD37\uD83D\uDD37\uD83D\uDD37 initialiseNodeRPCConnection: Node Access Properties: " +
                "\uD83D\uDD37 node index: $stringIndex :  \uD83C\uDF4E - to get node from json file by this index")

        try {
            val pair: Pair<NodeInfoDTO, File> = getThisNode(resourceLoader = resourceLoader!!,
                    springBootProfile = springBootProfile, nodeIndex = stringIndex.toInt())
            val rpcAddress = NetworkHostAndPort(pair.first.host!!, pair.first.port!!.toInt())
            val rpcClient = CordaRPCClient(rpcAddress)
            val rpcConnection = rpcClient.start(pair.first.username!!, pair.first.password!!)
            proxy = rpcConnection.proxy

            logger.info("\uD83D\uDD35 \uD83D\uDD35 initialiseNodeRPCConnection  \uD83C\uDF4E completed \uD83D\uDD35 \uD83D\uDD35")

        } catch (e: IOException) {
            logger.warn("IOException", e)
        }

    }



    @PreDestroy
    override fun close() {
        logger.info("\uD83D\uDD35 \uD83D\uDD35 PreDestroy close: closing CordaRPCClient ... ")
        rpcConnection.notifyServerAndClose()
    }
}
