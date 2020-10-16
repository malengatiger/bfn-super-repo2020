package com.bfn.flows.investor

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.contracts.InvestorPaymentContract
import com.bfn.contractstates.states.AcceptedOfferState
import com.bfn.contractstates.states.SupplierPaymentState
import com.bfn.flows.Em
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
class SupplierPaymentFlow(
        private val offerId: String) : FlowLogic<SupplierPaymentState>() {

    @Suspendable
    override fun call(): SupplierPaymentState {
        Companion.logger.info("$pp ${Em.DICE} ${Em.DICE} " +
                "SupplierPaymentFlow started ... ${Em.DICE} $pp")

        val service = serviceHub.cordaService(AcceptedOfferFinderService::class.java)
        val acceptedOffer = service.findAcceptedOffer(offerId) ?:
            throw IllegalArgumentException(Em.NOT_OK+"SupplierPaymentFlow: " +
                    "Accepted offer not found ${Em.ERROR}")

        //todo -  🍊 🍊 🍊 fix this query - find a way!!  🍊 🍊 🍊
        val payments = serviceHub.cordaService(SupplierPaymentFinderService::class.java)
                .getAllPaymentStateAndRefs()

        payments.forEach() {
            if (it.state.data.acceptedOffer.offerId == offerId) {
                throw IllegalArgumentException(Em.NOT_OK + "SupplierPayment already exists for this offer: " +
                        offerId + " ${Em.ERROR}")
            }
        }

        val supplierInfo =  acceptedOffer.state.data.supplier.account
        val customerInfo =  acceptedOffer.state.data.customer.account
        val investorInfo =  acceptedOffer.state.data.investor.account

        //create new supplier payment
        val payment = SupplierPaymentState(
                supplierPaymentId = UUID.randomUUID().toString(),
                acceptedOffer = acceptedOffer.state.data,
                supplierProfile = acceptedOffer.state.data.supplier,
                dateRegistered = todaysDate(),
                customerProfile = acceptedOffer.state.data.customer
        )

         processTransaction(investorInfo, supplierInfo,
                customerInfo, acceptedOffer, payment)
        return payment
    }
    @Suspendable
    private fun shareState(party: Party, supplierPaymentId: String) {
        val me = serviceHub.myInfo.legalIdentities[0]
        if (party.name.toString() == me.name.toString()) {
            return
        }
        val paymentStateAndRef = serviceHub.cordaService(SupplierPaymentFinderService::class.java)
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
    private fun processTransaction(investor: AccountInfo,
                                   supplier: AccountInfo,
                                   customer: AccountInfo,
                                   acceptedOffer: StateAndRef<AcceptedOfferState>,
                                   payment: SupplierPaymentState) {

        val keys: MutableList<PublicKey> = mutableListOf(
                investor.host.owningKey,
                supplier.host.owningKey,
                customer.host.owningKey
        )
        val command = InvestorPaymentContract.Pay()
        val txBuilder = TransactionBuilder(serviceHub.networkMapCache.notaryIdentities.first())

        txBuilder.addCommand(command, keys)
        txBuilder.addInputState(acceptedOffer)
        txBuilder.addOutputState(payment)

        val tx = serviceHub.signInitialTransaction(txBuilder)
        logger.info("$pp serviceHub.signInitialTransaction executed OK")

        val sessions: MutableList<FlowSession> = mutableListOf()
        val thisParty = serviceHub.myInfo.legalIdentities[0]
        if (acceptedOffer.state.data.supplier.account.host.name.organisation !=
                thisParty.name.organisation) {
            val session = initiateFlow(acceptedOffer.state.data.supplier.account.host)
            sessions.add(session)
        }
        if (acceptedOffer.state.data.investor.account.host.name.organisation !=
                thisParty.name.organisation) {
            val session = initiateFlow(acceptedOffer.state.data.investor.account.host)
            sessions.add(session)
        }
        if (acceptedOffer.state.data.customer.account.host.name.organisation !=
                thisParty.name.organisation) {
            val session = initiateFlow(acceptedOffer.state.data.customer.account.host)
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
        shareState(acceptedOffer.state.data.supplier.account.host, payment.supplierPaymentId)
        shareState(acceptedOffer.state.data.customer.account.host, payment.supplierPaymentId)
        shareState(acceptedOffer.state.data.investor.account.host, payment.supplierPaymentId)
        logger.info("$pp Returning supplierPayment after processing .....")

    }


    private val pp = "\uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95";

    companion object {
        private val logger = LoggerFactory.getLogger(SupplierPaymentFlow::class.java)
    }

}
