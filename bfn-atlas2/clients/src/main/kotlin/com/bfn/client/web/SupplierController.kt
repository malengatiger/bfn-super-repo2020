package com.bfn.client.web

import com.bfn.client.dto.*
import com.bfn.client.local.DemoUtil
import com.bfn.client.web.WorkerBee.getAccount
import com.bfn.client.web.WorkerBee.getDashboardData
import com.bfn.client.web.WorkerBee.getNodeAccounts
import com.bfn.client.web.WorkerBee.getStates
import com.bfn.client.web.WorkerBee.listFlows
import com.bfn.client.web.WorkerBee.listNodes
import com.bfn.client.web.WorkerBee.listNotaries
import com.bfn.client.web.WorkerBee.startAccountRegistrationFlow
import com.google.firebase.auth.UserRecord
import com.google.gson.GsonBuilder
import net.corda.core.messaging.CordaRPCOps
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.env.Environment
import org.springframework.web.bind.annotation.*
import java.util.*

/**
 * Define your API endpoints here.
 */
@RestController
@RequestMapping("/supplier") // The paths for HTTP requests are relative to this base path.
class SupplierController(rpc: NodeRPCConnection) {
    private val logger = LoggerFactory.getLogger(SupplierController::class.java)
    private val proxy: CordaRPCOps = rpc.proxy

    @Autowired
    private val env: Environment? = null

    @GetMapping(value = ["/selectBestOffer"], produces = ["application/json"])
    @Throws(Exception::class)
    private fun selectBestOffer(@RequestParam accountId: String,
                                @RequestParam invoiceId: String): OfferAndTokenDTO? {

        val offerAndTokenDTO = WorkerBee.selectBestOffer(proxy = proxy,
                accountId = accountId, invoiceId = invoiceId)
        if (offerAndTokenDTO == null) {
            logger.info("\uD83D\uDC80 \uD83D\uDC80 \uD83D\uDC80 \uD83D\uDC80  NO OFFER MADE: \uD83C\uDF0E ")
        } else {
            logger.info("\uD83C\uDF0E \uD83C\uDF0E Best Offer found, Token Issued and returned: \uD83C\uDF0E $offerAndTokenDTO")
        }

        return offerAndTokenDTO
    }

    @GetMapping(value = ["findInvoicesForSupplier"])
    @Throws(Exception::class)
    fun findInvoicesForSupplier(
            @RequestParam(value = "accountId", required = true) accountId: String): List<InvoiceDTO> {
        return WorkerBee.findInvoicesForSupplier(proxy, accountId)
    }

    @GetMapping(value = ["getSupplierProfile"])
    @Throws(Exception::class)
    fun getSupplierProfile(@RequestParam(value = "accountId") accountId: String?): SupplierProfileStateDTO? {
        return WorkerBee.getSupplierProfile(proxy,accountId)
    }

    @PostMapping(value = ["createSupplierProfile"])
    @Throws(Exception::class)
    fun createSupplierProfile(@RequestBody profile: SupplierProfileStateDTO): String {
        return WorkerBee.createSupplierProfile(proxy, profile)
    }

    @GetMapping(value = ["/ping"], produces = ["application/json"])
     fun ping(): String {
        val msg = ("\uD83E\uDDE1 \uD83D\uDC9B \uD83D\uDC9A SupplierController:BFN Web API pinged: " + Date().toString()
                + " \uD83E\uDDE1 \uD83D\uDC9B \uD83D\uDC9A")
        logger.info(msg)
        val nodeInfo = proxy.nodeInfo()
        logger.info("\uD83E\uDDA0 \uD83E\uDDA0 \uD83E\uDDA0 node pinged: "
                + nodeInfo.legalIdentities[0].name.toString()
                + proxy.networkParameters.toString() + " \uD83E\uDDA0 \uD83E\uDDA0 \uD83E\uDDA0 ")
        return "\uD83C\uDF3A \uD83C\uDF3A \uD83C\uDF3A \uD83C\uDF3A  AdminController: node pinged: " +
                nodeInfo.legalIdentities[0].name.toString() +
                " \uD83C\uDF3A \uD83C\uDF3A \uD83C\uDF3A \uD83C\uDF3A " +
                proxy.networkParameters.toString()
    }


    companion object {

        private val GSON = GsonBuilder().setPrettyPrinting().create()
    }

    init {
        logger.info("\uD83C\uDF3A \uD83C\uDF3A \uD83C\uDF3A AdminController:" +
                " NodeRPCConnection proxy has been injected: \uD83C\uDF3A "
                + proxy.nodeInfo().toString() +  " \uD83C\uDF3A ")
    }
}
