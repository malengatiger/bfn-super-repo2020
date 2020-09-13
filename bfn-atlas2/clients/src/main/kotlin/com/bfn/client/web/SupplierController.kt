package com.bfn.client.web

import com.bfn.client.data.InvoiceDTO
import com.bfn.client.data.InvoiceOfferDTO
import com.bfn.client.data.SupplierPaymentDTO
import com.bfn.client.data.SupplierProfileStateDTO
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
    init {
        logger.info("\uD83D\uDD35 \uD83D\uDD35 SupplierController: Vladimir is getting his shit done")
    }

    @Autowired
    private val env: Environment? = null

    @Autowired
    private lateinit var  supplierBeeService: SupplierBeeService
    @Autowired
    private lateinit var  workerBeeService: WorkerBeeService
    @Autowired
    private lateinit var firebaseService: FirebaseService

    @GetMapping(value = ["/selectBestOffer"], produces = ["application/json"])
    @Throws(Exception::class)
    private fun selectBestOffer(@RequestParam accountId: String,
                                @RequestParam invoiceId: String): InvoiceOfferDTO? {

        val offer = supplierBeeService.selectBestOffer(proxy = proxy,
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
    private fun acceptOffer(@RequestParam offerId: String): Int? {

        val tx = supplierBeeService.acceptOffer(proxy = proxy, offerId = offerId)
        logger.info("\uD83C\uDF0E \uD83C\uDF0E Offer accepted, txId: \uD83C\uDF0E $tx")

        return tx
    }

    @GetMapping(value = ["findInvoicesForSupplier"])
    @Throws(Exception::class)
    fun findInvoicesForSupplier(
            @RequestParam(value = "accountId", required = true) accountId: String): List<InvoiceDTO>? {
        return workerBeeService.findInvoicesForSupplier(proxy, accountId)
    }

    @GetMapping(value = ["findOffersForSupplier"])
    @Throws(Exception::class)
    fun findOffersForSupplier(
            @RequestParam(value = "accountId", required = true) accountId: String): List<InvoiceOfferDTO>? {
        return workerBeeService.findOffersForSupplier(proxy, accountId)
    }

    @GetMapping(value = ["createPayments"])
    @Throws(Exception::class)
    fun createPayments(
            @RequestParam(value = "investorId", required = true) investorId: String,
            @RequestParam(value = "delayMinutesUntilNextPaymentFlow", required = true) delayMinutesUntilNextPaymentFlow: Long): List<SupplierPaymentDTO>? {
        return supplierBeeService.createPayments(proxy,
                investorId = investorId,
                delayMinutesUntilNextPaymentFlow = delayMinutesUntilNextPaymentFlow)
    }


    @GetMapping(value = ["getSupplierProfile"])
    @Throws(Exception::class)
    fun getSupplierProfile(@RequestParam(value = "accountId") accountId: String?): SupplierProfileStateDTO? {
        return workerBeeService.getSupplierProfile(proxy, accountId)
    }

    @PostMapping(value = ["createSupplierProfile"])
    @Throws(Exception::class)
    fun createSupplierProfile(@RequestBody profile: SupplierProfileStateDTO): String? {
        val acct = workerBeeService.getNodeAccount(proxy, identifier = profile.account.identifier)
        return acct.let { workerBeeService.createSupplierProfile(proxy, profile, it!!) }
    }

    @GetMapping(value = ["/ping"], produces = ["application/json"])
    fun ping(): String {
        val msg = ("\uD83E\uDDE1 \uD83D\uDC9B \uD83D\uDC9A SupplierController:BFN Web API pinged: " + Date().toString()
                + " \uD83E\uDDE1 \uD83D\uDC9B \uD83D\uDC9A")
        logger.info(msg)
        val accounts = workerBeeService.getNodeAccounts(proxy)
        val users = firebaseService.getBFNUsers()
        accounts.forEach {
            logger.info("ping  \uD83D\uDC9A  Node Account: ${it.host} ${it.name} ${it.identifier}")
        }
        users.forEach {
            logger.info("ping  \uD83D\uDC9A  Auth User: ${it.accountInfo.name} ${it.email}")
        }
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
