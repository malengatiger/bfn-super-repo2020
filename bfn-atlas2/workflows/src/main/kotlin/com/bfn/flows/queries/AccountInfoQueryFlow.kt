package com.bfn.flows.queries

import com.bfn.contractstates.states.InvoiceState
import com.bfn.flows.services.InvoiceFinderService
import com.r3.corda.lib.accounts.contracts.states.AccountInfo
import com.r3.corda.lib.accounts.workflows.internal.accountService
import com.r3.corda.lib.accounts.workflows.services.AccountService
import net.corda.core.flows.FlowException
import net.corda.core.flows.FlowLogic
import net.corda.core.flows.StartableByRPC
import org.slf4j.LoggerFactory
import java.util.*

@StartableByRPC
class AccountInfoQueryFlow(
        private val identifier: String?) : FlowLogic<AccountInfo>() {

    @Throws(FlowException::class)
    override fun call(): AccountInfo {
        val service = serviceHub.accountService
        val acctRef = service.accountInfo(UUID.fromString(identifier))

        if (acctRef != null) {
            Companion.logger.info(" \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 AccountInfo found: ${acctRef.state.data}")
        }
        return acctRef!!.state.data
    }

    companion object {
        private val logger = LoggerFactory.getLogger(AccountInfoQueryFlow::class.java)

    }

}
