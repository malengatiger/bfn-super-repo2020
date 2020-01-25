package com.bfn.flows.invoices

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.contracts.InvoiceContract
import com.bfn.contractstates.states.InvoiceOfferState
import com.bfn.contractstates.states.InvoiceState
import com.bfn.flows.regulator.BroadcastTransactionFlow
import com.bfn.flows.services.InvoiceFinderService
import com.r3.corda.lib.accounts.workflows.ourIdentity
import net.corda.core.contracts.StateAndRef
import net.corda.core.flows.*
import net.corda.core.identity.Party
import net.corda.core.node.services.Vault
import net.corda.core.node.services.vault.PageSpecification
import net.corda.core.node.services.vault.QueryCriteria
import net.corda.core.transactions.SignedTransaction
import net.corda.core.transactions.TransactionBuilder
import org.slf4j.LoggerFactory
import java.security.PublicKey

@InitiatingFlow
@StartableByRPC
class InvoiceCloseFlow(private val invoiceId: String) : FlowLogic<SignedTransaction>() {

    @Suspendable
    @Throws(FlowException::class)
    override fun call(): SignedTransaction {
        Companion.logger.info("\uD83E\uDD1F \uD83E\uDD1F \uD83E\uDD1F \uD83E\uDD1F  " +
                "... InvoiceCloseFlow : \uD83D\uDC8B consume this invoice across the network ... \uD83D\uDC8B ")

        val finderService = serviceHub.cordaService(InvoiceFinderService::class.java)
        val invoiceState = finderService.findInvoiceStateAndRef(invoiceId)
        if (invoiceState != null) {
            val mParties = finderService.getAllNodes()
            val keys: MutableList<PublicKey> = mutableListOf()
            mParties.forEach() {
                keys.add(it.owningKey)
            }
            Companion.logger.info("\uD83E\uDD1F \uD83E\uDD1F Number of Public Keys: ${keys.size}")
            return processTransaction(invoiceState, keys, mParties);
        }
        throw IllegalArgumentException("\uD83D\uDD8D \uD83D\uDD8D Invoice not found: $invoiceId")
    }

    @Suspendable
    private fun processTransaction(invoiceState: StateAndRef<InvoiceState>?,
                                   keys: MutableList<PublicKey>,
                                   parties: List<Party>): SignedTransaction {

        closeInvoiceOffers()
        val notary = serviceHub.networkMapCache.notaryIdentities[0]
        val command = InvoiceContract.Close()
        val txBuilder = TransactionBuilder(notary)

        txBuilder.addInputState(invoiceState!!)
        txBuilder.addCommand(command, keys)

        Companion.logger.info("\uD83D\uDD8D \uD83D\uDD8D \uD83D\uDD8D verify and sign Transaction ... ")
        txBuilder.verify(serviceHub)
        val signedTx = serviceHub.signInitialTransaction(txBuilder)

        Companion.logger.info("\uD83D\uDD8D \uD83D\uDD8D \uD83D\uDD8D start BroadcastTransactionFlow ... ")
        setFlowSessions(parties, signedTx)

        Companion.logger.info("\uD83E\uDD16 \uD83E\uDD16 \uD83E\uDD16 \uD83E\uDD16 \uD83E\uDD16  " +
                "${invoiceState.state.data.supplierInfo.name} totalAmount: ${invoiceState.state.data.totalAmount}  " +
                "\uD83E\uDD16 \uD83E\uDD16 CONSUMED !! \uD83E\uDD16 \uD83E\uDD16  ")
        return signedTx
    }
    @Suspendable
    private fun closeInvoiceOffers() {
        val page = serviceHub.vaultService.queryBy(
                contractStateType = InvoiceOfferState::class.java,
                criteria = QueryCriteria.VaultQueryCriteria(Vault.StateStatus.UNCONSUMED),
                paging = PageSpecification(1,5000)
        )
        val offers : MutableList<StateAndRef<InvoiceOfferState>> = mutableListOf()
        page.states.forEach() {
            if (invoiceId == it.state.data.invoiceId.toString()) {
                offers.add(it)
            }
        }

        Companion.logger.info("\uD83D\uDE3C \uD83D\uDE3C \uD83D\uDE3C \uD83D\uDE3C \uD83D\uDE3C " +
                "\uD83D\uDE3C Start InvoiceOfferCloseFlow .... to consume ${offers.size} offers")
        subFlow(InvoiceOfferCloseFlow(offers))

    }
            @Suspendable
    private fun setFlowSessions(
            parties: List<Party>,
            signedTx: SignedTransaction) {
        val flowSessions: MutableList<FlowSession> = mutableListOf()

        parties.forEach() {
            if (it.toString() != serviceHub.ourIdentity.toString()) {
                flowSessions.add(initiateFlow(it))
            }
        }

        if (flowSessions.isEmpty()) {
            Companion.logger.info(" \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 " +
                    "All participants are LOCAL ... \uD83D\uDD06")
            subFlow(BroadcastTransactionFlow(signedTx))
        } else {
            Companion.logger.info(" \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 " +
                    "Participants are LOCAL/REMOTE ... \uD83D\uDD06")
            signBroadcastAndFinalize(signedTx, flowSessions)

        }
    }

    @Suspendable
    @Throws(FlowException::class)
    private fun signBroadcastAndFinalize(
            signedTx: SignedTransaction, sessions: List<FlowSession>): SignedTransaction {


        val signedTransaction = subFlow(CollectSignaturesFlow(
                partiallySignedTx = signedTx, sessionsToCollectFrom = sessions))
        Companion.logger.info("\uD83C\uDFBD \uD83C\uDFBD \uD83C\uDFBD \uD83C\uDFBD  " +
                "Signatures collected OK!  \uD83D\uDE21 \uD83D\uDE21 " +
                ".... will call FinalityFlow ... \uD83C\uDF3A \uD83C\uDF3A ")
        subFlow(BroadcastTransactionFlow(signedTransaction))
        val mSignedTransactionDone = subFlow(
                FinalityFlow(signedTransaction, sessions))

        Companion.logger.info("\uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D  " +
                " \uD83D\uDC4C \uD83D\uDC4C \uD83D\uDC4C  \uD83E\uDD66 \uD83E\uDD66  " +
                "\uD83E\uDD66 \uD83E\uDD66  \uD83E\uDD66 \uD83E\uDD66 MULTIPLE NODE(S): FinalityFlow has been executed ... " +
                "\uD83E\uDD66 \uD83E\uDD66")

        return mSignedTransactionDone
    }

    companion object {
        private val logger = LoggerFactory.getLogger(InvoiceCloseFlow::class.java)

    }


}
