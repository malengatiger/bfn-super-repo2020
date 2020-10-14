package com.bfn.flows.investor

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.contracts.SupplierPaymentContract
import com.bfn.contractstates.states.AcceptedOfferState
import com.bfn.contractstates.states.InvoiceOfferState
import com.bfn.contractstates.states.SupplierPaymentState
import com.bfn.flows.Em
import com.bfn.flows.PaymentRequestParams
import com.bfn.flows.services.*
import com.bfn.flows.todaysDate
import com.r3.corda.lib.accounts.contracts.states.AccountInfo
import com.r3.corda.lib.accounts.workflows.flows.ShareStateAndSyncAccounts
import net.corda.core.contracts.StateAndRef
import net.corda.core.flows.*
import net.corda.core.identity.Party
import net.corda.core.transactions.TransactionBuilder
import org.slf4j.LoggerFactory
import java.security.PublicKey
import java.util.*

/**
 * Investor pays for an accepted offer using a Stellar Anchor server
 */
@InitiatingFlow
@StartableByRPC
class SinglePaymentFlow(
        private val offerId: String,
        private val investorId: String) : FlowLogic<SupplierPaymentState>() {

    @Suspendable
    override fun call(): SupplierPaymentState {
        Companion.logger.info("$pp SinglePaymentFlow started ... $pp")

        val service = serviceHub.cordaService(InvoiceOfferFinderService::class.java)
        val acceptedOffer = service.findAcceptedOffer(offerId) ?:
            throw IllegalArgumentException(Em.NOT_OK+"Accepted offer not found")

        //todo -  🍊 🍊 🍊 fix this query - find a way!!  🍊 🍊 🍊
        val payments = serviceHub.cordaService(PaymentFinderService::class.java)
                .getAllPaymentStateAndRefs()

        payments.forEach() {
            if (it.state.data.acceptedOffer.offerId == offerId) {
                throw IllegalArgumentException(Em.NOT_OK + "Payment already exists for this offer: " +
                        offerId)
            }
        }
        val command = SupplierPaymentContract.Pay()
        val txBuilder = TransactionBuilder(serviceHub.networkMapCache.notaryIdentities.first())

        val supplierParty =  acceptedOffer.state.data.supplier
        val customerParty =  acceptedOffer.state.data.customer
        val investorParty =  acceptedOffer.state.data.investor

        val investorProfile = serviceHub.cordaService(ProfileFinderService::class.java)
                .findInvestorProfile(investorId)
                ?: throw IllegalArgumentException(Em.NOT_OK + "InvestorProfile not found for: " +
                        "$investorId ")

        val supplierProfile = serviceHub.cordaService(ProfileFinderService::class.java)
                .findSupplierProfile(acceptedOffer.state.data.supplier.identifier.id.toString())

                ?: throw java.lang.IllegalArgumentException("${Em.ERROR} Supplier profile not found")
        logger.info("Investor making payment: ${investorProfile.state.data.account.name} " +
                "to supplier: ${supplierProfile.state.data.account.name}")
        //create new supplier payment
        val payment = SupplierPaymentState(
                supplierPaymentId = UUID.randomUUID().toString(),
                acceptedOffer = acceptedOffer.state.data,
                supplierProfile = supplierProfile.state.data,
                dateRegistered = todaysDate()
        )

        return processOKPayment(investorParty, supplierParty,
                customerParty, txBuilder, command, acceptedOffer, payment)
    }
    @Suspendable
    private fun shareState(party: Party, supplierPaymentId: String) {
        val me = serviceHub.myInfo.legalIdentities[0]
        if (party.name.toString() == me.name.toString()) {
            return
        }
        val paymentStateAndRef = serviceHub.cordaService(PaymentFinderService::class.java)
                .findPaymentById(supplierPaymentId = supplierPaymentId)
        if (paymentStateAndRef != null) {
            subFlow(ShareStateAndSyncAccounts(
                    state = paymentStateAndRef,
                    partyToShareWith = party))
            logger.info("\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E " +
                    "Supplier Payment $supplierPaymentId " +
                    "has been shared with party ${party.name} \uD83E\uDDE9")
        }
    }

    @Suspendable
    private fun processOKPayment(investor: AccountInfo,
                                 supplier: AccountInfo,
                                 customer: AccountInfo,
                                 txBuilder: TransactionBuilder,
                                 command: SupplierPaymentContract.Pay,
                                 acceptedOffer: StateAndRef<AcceptedOfferState>,
                                 payment: SupplierPaymentState): SupplierPaymentState {

        logger.info("SinglePaymentFlow: ${Em.RED_APPLES} processOKPayment:  " +
                "Stellar Anchor payment to supplier is OK ...")

        val keys: MutableList<PublicKey> = mutableListOf(
                investor.host.owningKey,
                supplier.host.owningKey,
                customer.host.owningKey
        )

        logger.info("$pp adding command and states to txBuilder ...")
        txBuilder.addCommand(command, keys)
        txBuilder.addInputState(acceptedOffer)
        txBuilder.addOutputState(payment)

        val tx = serviceHub.signInitialTransaction(txBuilder)
        logger.info("$pp serviceHub.signInitialTransaction executed OK")

        val sessions: MutableList<FlowSession> = mutableListOf()
        val thisParty = serviceHub.myInfo.legalIdentities[0]
        if (acceptedOffer.state.data.supplier.host.name.organisation !=
                thisParty.name.organisation) {
            val session = initiateFlow(acceptedOffer.state.data.supplier.host)
            sessions.add(session)
        }
        if (acceptedOffer.state.data.investor.host.name.organisation !=
                thisParty.name.organisation) {
            val session = initiateFlow(acceptedOffer.state.data.investor.host)
            sessions.add(session)
        }
        if (acceptedOffer.state.data.customer.host.name.organisation !=
                thisParty.name.organisation) {
            val session = initiateFlow(acceptedOffer.state.data.customer.host)
            sessions.add(session)
        }
        logger.info("$pp FlowSessions ready to go: ${sessions.size} sessions")
        if (sessions.isNotEmpty()) {
            logger.info("$pp about to CollectSignaturesFlow ....")
            val signedTransaction = subFlow(CollectSignaturesFlow(
                    partiallySignedTx = tx, sessionsToCollectFrom = sessions))
            subFlow(FinalityFlow(signedTransaction, sessions))
            logger.info("$pp Transaction finalized with Supplier/Customer on ${sessions.size} remote nodes")
        } else {
            subFlow(FinalityFlow(tx, listOf()))
            logger.info("$pp Transaction finalized with Supplier/Customer on same node")
        }
        logger.info("$pp SupplierPayment state created OK; " +
                "${Em.YELLOW_BIRD} attempting to share state with foreign nodes ... $pp")
        shareState(acceptedOffer.state.data.supplier.host, payment.supplierPaymentId)
        shareState(acceptedOffer.state.data.customer.host, payment.supplierPaymentId)
        shareState(acceptedOffer.state.data.investor.host, payment.supplierPaymentId)
        logger.info("$pp Returning supplierPayment after processing .....")
        return payment
    }


    private val pp = "\uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95";

    companion object {
        private val logger = LoggerFactory.getLogger(SinglePaymentFlow::class.java)
    }

}
