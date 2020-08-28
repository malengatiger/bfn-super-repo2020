package com.bfn.flows.invoices

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.contracts.InvoiceContract
import com.bfn.contractstates.states.InvoiceOfferState
import com.bfn.flows.regulator.ReportToRegulatorFlow
import com.r3.corda.lib.accounts.workflows.ourIdentity
import net.corda.core.contracts.StateAndRef
import net.corda.core.flows.*
import net.corda.core.identity.Party
import net.corda.core.transactions.SignedTransaction
import net.corda.core.transactions.TransactionBuilder
import org.slf4j.LoggerFactory
import java.security.PublicKey

@InitiatingFlow
@StartableByRPC
class InvoiceOfferCloseFlow(
        private val stateAndRefs: List<StateAndRef<InvoiceOfferState>>) : FlowLogic<SignedTransaction>() {

    @Suspendable
    @Throws(FlowException::class)
    override fun call(): SignedTransaction {
        val serviceHub = serviceHub
        Companion.logger.info("\uD83E\uDD1F \uD83E\uDD1F \uD83E\uDD1F \uD83E\uDD1F InvoiceOfferCloseFlow to CONSUME " +
                "\uD83D\uDC7A ${stateAndRefs.size} \uD83D\uDC7A InvoiceOfferStates ...")
        val notary = serviceHub.networkMapCache.notaryIdentities[0]

        val command = InvoiceContract.Close()
        val keys: MutableList<PublicKey>  = mutableListOf()
        val txBuilder = TransactionBuilder(notary)
        val map: MutableMap<String, Party> = mutableMapOf()

        stateAndRefs.forEach() {
            txBuilder.addInputState(it)
            map[it.state.data.investor.host.toString()] = it.state.data.investor.host
            map[it.state.data.supplier.host.toString()] = it.state.data.supplier.host
        }
        val parties = map.values.toList()
        parties.forEach() {
            keys.add(it.owningKey)
        }
        txBuilder.addCommand(command, keys)
        Companion.logger.info("\uD83D\uDE3C \uD83D\uDE3C Verify transaction ... parties: ${parties.size} \uD83D\uDE3C ")
        txBuilder.verify(serviceHub)

        Companion.logger.info("\uD83D\uDE3C \uD83D\uDE3C signInitialTransaction ... \uD83D\uDE3C ")
        val signedTx = serviceHub.signInitialTransaction(txBuilder)

        Companion.logger.info("\uD83D\uDE3C \uD83D\uDE3C start finalizeTransaction ... \uD83D\uDE3C ")
        val finalTx = setFlowSessions(parties, signedTx )

        Companion.logger.info("\uD83E\uDD16 \uD83E\uDD16 \uD83E\uDD16 \uD83E\uDD16 \uD83E\uDD16  " +
                "\uD83E\uDD16 CONSUMED !! \uD83E\uDD16 ")
        return finalTx
    }

    @Suspendable
    private fun setFlowSessions(parties: List<Party>,
                                signedTx: SignedTransaction): SignedTransaction {

        val flowSessions: MutableList<FlowSession> = mutableListOf()
        parties.forEach() {
            if (it.toString() != serviceHub.ourIdentity.toString()) {
                flowSessions.add(initiateFlow(it))
            }
        }
        return if (flowSessions.isEmpty()) {
            subFlow(FinalityFlow(signedTx, listOf()))
        } else {
            val tx = collectSignatures(signedTx, flowSessions)
            subFlow(FinalityFlow(tx, flowSessions))
        }


    }

    @Suspendable
    @Throws(FlowException::class)
    private fun reportToRegulator(mSignedTransactionDone: SignedTransaction) {
        try {
            subFlow(ReportToRegulatorFlow(mSignedTransactionDone))
        } catch (e: Exception) {
            Companion.logger.error(" \uD83D\uDC7F  \uD83D\uDC7F  \uD83D\uDC7F Regulator fell down.  \uD83D\uDC7F IGNORED  \uD83D\uDC7F ", e)
            throw FlowException("Regulator fell down!")
        }
    }

    @Suspendable
    @Throws(FlowException::class)
    private fun collectSignatures(signedTx: SignedTransaction, sessions: List<FlowSession>): SignedTransaction {


        val signedTransaction = subFlow(CollectSignaturesFlow(
                partiallySignedTx = signedTx, sessionsToCollectFrom = sessions))
        Companion.logger.info("\uD83C\uDFBD \uD83C\uDFBD \uD83C\uDFBD \uD83C\uDFBD  " +
                "Signatures collected OK!  \uD83D\uDE21 \uD83D\uDE21 "
                + signedTransaction.id.toString())


        return signedTransaction
    }


    companion object {
        private val logger = LoggerFactory.getLogger(InvoiceOfferCloseFlow::class.java)

    }


}
