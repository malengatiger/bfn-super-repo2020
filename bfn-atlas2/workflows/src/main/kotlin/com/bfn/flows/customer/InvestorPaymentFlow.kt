package com.bfn.flows.customer

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.contracts.InvestorPaymentContract
import com.bfn.contractstates.states.InvestorPaymentState
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
 * Customer pays Investor for SupplierPayment made
 */
@InitiatingFlow
@StartableByRPC
class InvestorPaymentFlow(
       val supplierPaymentId: String) : FlowLogic<InvestorPaymentState>() {

    @Suspendable
    override fun call(): InvestorPaymentState {
        Companion.logger.info("$pp InvestorPaymentFlow started ... $pp")

        //todo -  🍊 🍊 🍊 fix this query - find a way!!  🍊 🍊 🍊
        val supplierPaymentState = serviceHub.cordaService(SupplierPaymentFinderService::class.java)
                .findPaymentById(supplierPaymentId)
                ?: throw IllegalArgumentException("SupplierPaymentState not found")

        val supplierParty =  supplierPaymentState.state.data.acceptedOffer.supplier.account
        val customerParty =  supplierPaymentState.state.data.acceptedOffer.customer.account
        val investorParty =  supplierPaymentState.state.data.acceptedOffer.investor.account

        //create new supplier payment
        val payment = InvestorPaymentState(
                investorPaymentId = UUID.randomUUID().toString(),
                dateRegistered = todaysDate(),
                investorProfile = supplierPaymentState.state.data.acceptedOffer.investor,
                supplierPayment = supplierPaymentState.state.data,
                customerProfile = supplierPaymentState.state.data.acceptedOffer.customer
        )

        return processTransaction(investorParty, supplierParty,
                customerParty, payment, supplierPaymentState)
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
                                   investorPayment: InvestorPaymentState,
                                   supplierPayment: StateAndRef<SupplierPaymentState>): InvestorPaymentState {

        val command = InvestorPaymentContract.Pay()
        val txBuilder = TransactionBuilder(serviceHub.networkMapCache.notaryIdentities.first())
        val keys: MutableList<PublicKey> = mutableListOf(
                investor.host.owningKey,
                supplier.host.owningKey,
                customer.host.owningKey
        )

        txBuilder.addCommand(command, keys)
        txBuilder.addInputState(supplierPayment)
        txBuilder.addOutputState(investorPayment)

        val tx = serviceHub.signInitialTransaction(txBuilder)

        val sessions: MutableList<FlowSession> = mutableListOf()
        val thisParty = serviceHub.myInfo.legalIdentities[0]
        if (investorPayment.supplierPayment.acceptedOffer.supplier.account.host.name.organisation !=
                thisParty.name.organisation) {
            val session = initiateFlow(investorPayment.supplierPayment.acceptedOffer.supplier.account.host)
            sessions.add(session)
        }
        if (investorPayment.supplierPayment.acceptedOffer.investor.account.host.name.organisation !=
                thisParty.name.organisation) {
            val session = initiateFlow(investorPayment.supplierPayment.acceptedOffer.investor.account.host)
            sessions.add(session)
        }
        if (investorPayment.supplierPayment.acceptedOffer.customer.account.host.name.organisation !=
                thisParty.name.organisation) {
            val session = initiateFlow(investorPayment.supplierPayment.acceptedOffer.customer.account.host)
            sessions.add(session)
        }
        if (sessions.isNotEmpty()) {
            logger.info("$pp about to CollectSignaturesFlow ....")
            val signedTransaction = subFlow(CollectSignaturesFlow(
                    partiallySignedTx = tx, sessionsToCollectFrom = sessions))
            subFlow(FinalityFlow(signedTransaction, sessions))
            logger.info("$pp Transaction finalized with Investor/Customer on ${sessions.size} remote nodes")
        } else {
            subFlow(FinalityFlow(tx, listOf()))
            logger.info("$pp Transaction finalized with Investor/Customer on same node")
        }
        logger.info("$pp SupplierPayment state created OK; " +
                "${Em.YELLOW_BIRD} attempting to share state with foreign nodes ... $pp")
        shareState(investorPayment.supplierPayment.acceptedOffer.supplier.account.host, investorPayment.investorPaymentId)
        shareState(investorPayment.supplierPayment.acceptedOffer.customer.account.host, investorPayment.investorPaymentId)
        shareState(investorPayment.supplierPayment.acceptedOffer.investor.account.host, investorPayment.investorPaymentId)
        logger.info("$pp Returning InvestorPayment after processing .....")
        return investorPayment
    }


    private val pp = "\uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95 \uD83E\uDD95";

    companion object {
        private val logger = LoggerFactory.getLogger(InvestorPaymentFlow::class.java)
    }

}
