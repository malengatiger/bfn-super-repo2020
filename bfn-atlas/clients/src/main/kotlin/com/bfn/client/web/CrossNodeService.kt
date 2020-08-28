package com.bfn.client.web

import com.google.gson.GsonBuilder
import com.bfn.client.dto.InvoiceDTO
import com.bfn.client.dto.NodeInfoDTO
import khttp.get
import net.corda.core.messaging.CordaRPCOps
import org.json.JSONArray
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component

@Component
class CrossNodeService {
    private val logger = LoggerFactory.getLogger(CrossNodeService::class.java)
    private val GSON = GsonBuilder().setPrettyPrinting().create()
    private var nodes: List<NodeInfoDTO> = mutableListOf()
    private var invoices: MutableList<InvoiceDTO> = mutableListOf()
    private var proxies: MutableList<CordaRPCOps> = mutableListOf()

    private fun getNodes() {
        nodes = FirebaseUtil.getCordaNodes();
        nodes.forEach() {
            logger.info("\uD83C\uDF30 \uD83C\uDF30 NodeInfo: ${GSON.toJson(it)}  \uD83C\uDF51 ")

        }
        logger.info("\uD83D\uDD25 \uD83D\uDD25 Proxies created for Corda Nodes in Network: " +
                "\uD83E\uDDE9 ${proxies.size}")
    }
    fun getInvoicesAcrossNodes() : List<InvoiceDTO> {
        getNodes()
        nodes.forEach() {
            if (it.addresses!!.first().contains("Notary")
                    || it.addresses!!.first().contains("Regulator") ) {
                logger.warn("\uD83D\uDD90\uD83C\uDFFD \uD83D\uDD90\uD83C\uDFFD " +
                        "Ignoring ${it.addresses?.first()}")
            } else {
                addNodeInvoices(it)
            }
        }

        return invoices
    }

    private fun addNodeInvoices(it: NodeInfoDTO) {
        logger.info("\n\uD83C\uDF30 Getting invoices from Node: \uD83E\uDDE9 ${it.addresses?.first()}  " +
                "\uD83C\uDF30 ${it.webAPIUrl}")
        val response2 = get(
                timeout = 990000000.0,
                url = "${it.host!!}:${it.port!!.toInt()}/admin/findInvoicesForNode")

        logger.info("\uD83C\uDF4E RESPONSE: statusCode: ${response2.statusCode}  ")
        if (response2.statusCode == 200) {
            val jsonArray = JSONArray(response2.text)
            logger.info("\uD83C\uDF51 \uD83C\uDF51 NodeInvoices: ${jsonArray.length()}")
            jsonArray.forEach() {
                val d = GSON.fromJson(it.toString(), InvoiceDTO::class.java)
                logger.info("\uD83E\uDDE9 \uD83E\uDDE9 ${GSON.toJson(d)} \uD83E\uDD66 \uD83E\uDD66 ️ ")
                invoices.add(d)
            }

        } else {
            logger.error("We fucked up! : ${response2.text}")
        }

        logger.info("\uD83C\uDF51 \uD83C\uDF51 Total Network Invoices: ${invoices.size}")
    }

}
