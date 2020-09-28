package com.bfn.flows.investor

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.contracts.SupplierPaymentContract
import com.bfn.contractstates.states.InvoiceOfferState
import com.bfn.contractstates.states.PaymentRequestState
import com.bfn.contractstates.states.SupplierPaymentState
import com.bfn.flows.operator.StellarPaymentFlow
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


@InitiatingFlow
@StartableByRPC
class SinglePaymentFlow(private val offerId: String,
                        private val stellarAnchorUrl: String,
                        private val delayMinutesUntilNextPaymentFlow: Long) : FlowLogic<SupplierPaymentState>() {

    @Suspendable
    override fun call(): SupplierPaymentState {
        Companion.logger.info("$pp SinglePaymentFlow started ... $pp")

        val service = serviceHub.cordaService(InvoiceOfferFinderService::class.java)
        val acceptedOffer = service.findInvoiceOffer(offerId) ?:
            throw IllegalArgumentException("Accepted offer not found")
        if (!acceptedOffer.state.data.accepted) {
            throw IllegalArgumentException("Offer not accepted by Supplier")
        }
        //todo -  🍊 🍊 🍊 fix this query - find a way!!  🍊 🍊 🍊
        val payments = serviceHub.cordaService(PaymentFinderService::class.java).getAllPaymentStateAndRefs()

        payments.forEach() {
            if (it.state.data.acceptedOffer.offerId == offerId) {
                throw IllegalArgumentException("Payment already exists for this invoice: $offerId")
            }
        }
        val command = SupplierPaymentContract.Pay()
        val txBuilder = TransactionBuilder(serviceHub.networkMapCache.notaryIdentities.first())

        val supplierParty =  acceptedOffer.state.data.supplier
        val customerParty =  acceptedOffer.state.data.customer
        val investorParty =  acceptedOffer.state.data.investor

        val supplierProfile = serviceHub.cordaService(ProfileFinderService::class.java)
                .findSupplierProfile(acceptedOffer.state.data.supplier.identifier.id.toString())
                ?: throw java.lang.IllegalArgumentException("Supplier profile not found")

        val payment = SupplierPaymentState(
                supplierPaymentId = UUID.randomUUID().toString(),
                acceptedOffer = acceptedOffer.state.data,
                supplierProfile = supplierProfile.state.data,
                date = todaysDate(), paid = false,
                delayMinutesUntilNextPaymentFlow = delayMinutesUntilNextPaymentFlow,
                stellarAnchorUrl = stellarAnchorUrl,
                paymentRequest = PaymentRequestState(
                        paymentRequestId = UUID.randomUUID().toString(),
                        amount = acceptedOffer.state.data.offerAmount,
                        assetCode = supplierProfile.state.data.assetCode,
                        customerInfo = acceptedOffer.state.data.customer,
                        supplierInfo = acceptedOffer.state.data.supplier,
                        investorInfo = acceptedOffer.state.data.investor,
                        date = todaysDate()
                )

        )
        //todo - make EFT payment to supplier ... OR do this externally; kicked off in api?
        logger.info("SinglePaymentFlow: make Stellar Anchor payment to supplier ...")
        val result = subFlow(StellarPaymentFlow(
                supplierPayment = payment,
                stellarAnchorUrl = stellarAnchorUrl))
        if (result.statusCode == 200) {
            return processOKPayment(investorParty, supplierParty,
                    customerParty, txBuilder, command, acceptedOffer, payment)
        } else {
            throw Exception("Payment failed, statusCode: ${result.statusCode} text: ${result.text}")
        }
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
                                 acceptedOffer: StateAndRef<InvoiceOfferState>,
                                 payment: SupplierPaymentState): SupplierPaymentState {
        logger.info("SinglePaymentFlow: processOKPayment:  Stellar Anchor payment to supplier is OK ...")

        val keys: MutableList<PublicKey> = mutableListOf(
                investor.host.owningKey,
                supplier.host.owningKey,
                customer.host.owningKey
        )

        //todo - 🌸 🌸 🌸 check that any offers for this invoice are consumed 🌸

        txBuilder.addCommand(command, keys)
        txBuilder.addInputState(acceptedOffer)
        txBuilder.addOutputState(payment)

        val tx = serviceHub.signInitialTransaction(txBuilder)
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
        if (sessions.isNotEmpty()) {
            val signedTransaction = subFlow(CollectSignaturesFlow(
                    partiallySignedTx = tx, sessionsToCollectFrom = sessions))
            subFlow(FinalityFlow(signedTransaction, sessions))
            logger.info("$pp Transaction finalized with Supplier/customer on ${sessions.size} remote nodes")
        } else {
            subFlow(FinalityFlow(tx, listOf()))
            logger.info("$pp Transaction finalized with Supplier/customer on same node")
        }
        logger.info("$pp Payment state created OK $pp")
        shareState(acceptedOffer.state.data.supplier.host, payment.supplierPaymentId)
        shareState(acceptedOffer.state.data.customer.host, payment.supplierPaymentId)
        shareState(acceptedOffer.state.data.investor.host, payment.supplierPaymentId)
        return payment
    }


    private val pp = "\uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95";

    companion object {
        private val logger = LoggerFactory.getLogger(SinglePaymentFlow::class.java)
    }

}
