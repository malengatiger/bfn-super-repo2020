package com.bfn.client.web

import com.bfn.client.data.*
import com.bfn.client.utils.SupplierBee
import com.bfn.client.utils.WorkerBee
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
@CrossOrigin(maxAge = 3600)
@RequestMapping("/supplier") // The paths for HTTP requests are relative to this base path.
class SupplierController(rpc: NodeRPCConnection) {
    private val logger = LoggerFactory.getLogger(SupplierController::class.java)
    private val proxy: CordaRPCOps = rpc.proxy

    @Autowired
    private val env: Environment? = null

    @GetMapping(value = ["/selectBestOffer"], produces = ["application/json"])
    @Throws(Exception::class)
    private fun selectBestOffer(@RequestParam accountId: String,
                                @RequestParam invoiceId: String): InvoiceOfferDTO? {

        val offer = SupplierBee.selectBestOffer(proxy = proxy,
                accountId = accountId, invoiceId = invoiceId)
        if (offer == null) {
            logger.info("\uD83D\uDC80 \uD83D\uDC80 \uD83D\uDC80 \uD83D\uDC80  NO OFFER MADE: \uD83C\uDF0E ")
        } else {
            logger.info("\uD83C\uDF0E \uD83C\uDF0E Best Offer found: \uD83C\uDF0E ${GSON.toJson(offer)}")
        }

        return offer
    }

    @GetMapping(value = ["/acceptOffer"], produces = ["application/json"])
    @Throws(Exception::class)
    private fun acceptOffer(@RequestParam offerId: String): Int {

        val tx = SupplierBee.acceptOffer(proxy = proxy, offerId = offerId)
        logger.info("\uD83C\uDF0E \uD83C\uDF0E Offer accepted, txId: \uD83C\uDF0E $tx")

        return tx
    }

    @GetMapping(value = ["findInvoicesForSupplier"])
    @Throws(Exception::class)
    fun findInvoicesForSupplier(
            @RequestParam(value = "accountId", required = true) accountId: String): List<InvoiceDTO> {
        return WorkerBee.findInvoicesForSupplier(proxy, accountId)
    }

    @GetMapping(value = ["findOffersForSupplier"])
    @Throws(Exception::class)
    fun findOffersForSupplier(
            @RequestParam(value = "accountId", required = true) accountId: String): List<InvoiceOfferDTO> {
        return WorkerBee.findOffersForSupplier(proxy, accountId)
    }

    @GetMapping(value = ["createPayments"])
    @Throws(Exception::class)
    fun createPayments(
            @RequestParam(value = "investorId", required = true) investorId: String,
            @RequestParam(value = "delayMinutesUntilNextPaymentFlow", required = true) delayMinutesUntilNextPaymentFlow: Long): List<SupplierPaymentDTO> {
        return SupplierBee.createPayments(proxy,
                investorId = investorId,
                delayMinutesUntilNextPaymentFlow = delayMinutesUntilNextPaymentFlow)
    }


    @GetMapping(value = ["getSupplierProfile"])
    @Throws(Exception::class)
    fun getSupplierProfile(@RequestParam(value = "accountId") accountId: String?): SupplierProfileStateDTO? {
        return WorkerBee.getSupplierProfile(proxy, accountId)
    }

    @PostMapping(value = ["createSupplierProfile"])
    @Throws(Exception::class)
    fun createSupplierProfile(@RequestBody profile: SupplierProfileStateDTO): String? {
        val acct = WorkerBee.getNodeAccount(proxy, identifier = profile.account.identifier)
        return acct?.let { WorkerBee.createSupplierProfile(proxy, profile, it) }
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
        logger.info("\uD83C\uDF3A \uD83C\uDF3A \uD83C\uDF3A SupplierController:" +
                " NodeRPCConnection proxy has been injected: \uD83C\uDF3A "
                + proxy.nodeInfo().toString() + " \uD83C\uDF3A ")
    }
}
