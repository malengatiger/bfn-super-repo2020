package com.bfn.flows.regulator

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.states.InvoiceState
import com.r3.corda.lib.accounts.workflows.ourIdentity
import net.corda.core.flows.*
import net.corda.core.node.StatesToRecord
import net.corda.core.node.services.Vault
import net.corda.core.node.services.vault.PageSpecification
import net.corda.core.node.services.vault.QueryCriteria
import org.slf4j.LoggerFactory

@InitiatedBy(ReportToRegulatorFlow::class)
class ReceiveRegulatoryReportFlow(private val counterPartySession: FlowSession) : FlowLogic<Void?>() {
    @Suspendable
    @Throws(FlowException::class)
    override fun call(): Void? {
        val myself = serviceHub.ourIdentity
        val party = counterPartySession.counterparty
        logger.info("\uD83C\uDF45 \uD83C\uDF45 ReceiveRegulatoryReportFlow: This party:  \uD83C\uDF45 $myself" +
                "party from session: \uD83C\uDF45  $party")

        subFlow(ReceiveTransactionFlow(otherSideSession = counterPartySession,
                checkSufficientSignatures = false, statesToRecord = StatesToRecord.ALL_VISIBLE))
        val page = serviceHub.vaultService.queryBy(
                criteria = QueryCriteria.VaultQueryCriteria(Vault.StateStatus.ALL),
                contractStateType = InvoiceState::class.java,
                paging = PageSpecification(1,2000)
        )
        Companion.logger.info("\uD83D\uDE21 \uD83D\uDE21 \uD83D\uDE21 \uD83D\uDE21 " +
                "ReceiveRegulatoryReportFlow received state, Senor! \uD83D\uDE3C " +
                " InvoiceStates on Node: ${page.states.size}\uD83D\uDE21 \uD83D\uDE21")
        return null
    }

    companion object {
        private val logger = LoggerFactory.getLogger(ReceiveRegulatoryReportFlow::class.java)
    }

}
