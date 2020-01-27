package com.bfn.client.web

import net.corda.client.rpc.CordaRPCClient
import net.corda.client.rpc.CordaRPCConnection
import net.corda.core.messaging.CordaRPCOps
import net.corda.core.utilities.NetworkHostAndPort
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import javax.annotation.PostConstruct
import javax.annotation.PreDestroy

private const val CORDA_USER_NAME = "config.rpc.username"
private const val CORDA_USER_PASSWORD = "config.rpc.password"
private const val CORDA_NODE_HOST = "config.rpc.host"
private const val CORDA_RPC_PORT = "config.rpc.port"

/**
 * Wraps an RPC connection to a Corda node.
 *
 * The RPC connection is configured using command line arguments.
 *
 * @param host The host of the node we are connecting to.
 * @param rpcPort The RPC port of the node we are connecting to.
 * @param username The username for logging into the RPC client.
 * @param password The password for logging into the RPC client.
 * @property proxy The RPC proxy.
 */
@Component
open class NodeRPCConnection(
        @Value("\${$CORDA_NODE_HOST}")
        private var host: String,
        @Value("\${$CORDA_USER_NAME}")
        private val username: String,
        @Value("\${$CORDA_USER_PASSWORD}")
        private val password: String,
        @Value("\${$CORDA_RPC_PORT}")
        private val rpcPort: Int) : AutoCloseable {

    private lateinit var rpcConnection: CordaRPCConnection
    lateinit var proxy: CordaRPCOps
        private set
    private val logger = LoggerFactory.getLogger(NodeRPCConnection::class.java)

    @PostConstruct
    fun initialiseNodeRPCConnection() {
        logger.info("\n\uD83D\uDD37\uD83D\uDD37\uD83D\uDD37\uD83D\uDD37 initialiseNodeRPCConnection: Node Access Properties: " +
                "\uD83D\uDD37 host: $host :  \uD83C\uDF4E port: $rpcPort \uD83D\uDD37 " +
                "username: $username \uD83C\uDF4F pass: $password \uD83D\uDD37\uD83D\uDD37")

        val rpcAddress = NetworkHostAndPort(host, rpcPort)
        val rpcClient = CordaRPCClient(rpcAddress)
        val rpcConnection = rpcClient.start(username, password)
        proxy = rpcConnection.proxy

        logger.info("\uD83D\uDD35 \uD83D\uDD35 initialiseNodeRPCConnection  \uD83C\uDF4E completed \uD83D\uDD35 \uD83D\uDD35")
    }

    @PreDestroy
    override fun close() {
        logger.info("\uD83D\uDD35 \uD83D\uDD35 PreDestroy close: closing CordaRPCClient ... ")
        rpcConnection.notifyServerAndClose()
    }
}
