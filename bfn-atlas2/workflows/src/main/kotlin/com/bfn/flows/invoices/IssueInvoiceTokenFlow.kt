package com.bfn.flows.invoices


import co.paralleluniverse.fibers.Suspendable
import com.r3.corda.lib.accounts.workflows.flows.RequestKeyForAccount
import com.r3.corda.lib.accounts.workflows.internal.accountService
import com.r3.corda.lib.accounts.workflows.ourIdentity
import com.r3.corda.lib.tokens.contracts.states.FungibleToken
import com.r3.corda.lib.tokens.contracts.types.IssuedTokenType
import com.r3.corda.lib.tokens.contracts.types.TokenType
import com.r3.corda.lib.tokens.contracts.utilities.heldBy
import com.r3.corda.lib.tokens.contracts.utilities.issuedBy
import com.r3.corda.lib.tokens.contracts.utilities.of
import com.r3.corda.lib.tokens.workflows.flows.issue.IssueTokensFlow
import com.r3.corda.lib.tokens.workflows.flows.rpc.MoveFungibleTokens
import com.r3.corda.lib.tokens.workflows.types.PartyAndAmount
import com.r3.corda.lib.tokens.workflows.utilities.tokenAmountWithIssuerCriteria
import net.corda.core.flows.FlowLogic
import net.corda.core.flows.InitiatingFlow
import net.corda.core.flows.StartableByRPC
import net.corda.core.identity.CordaX500Name
import net.corda.core.identity.Party
import net.corda.core.transactions.SignedTransaction
import net.corda.core.utilities.ProgressTracker
import java.util.*

@StartableByRPC
@InitiatingFlow
class IssueInvoiceTokenFlow(
        private val amount: Double,
        private val accountId: String
) : FlowLogic<SignedTransaction>() {
    override val progressTracker = ProgressTracker()
    @Suspendable
    override fun call(): SignedTransaction {
        logger.info(" \uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E IssueInvoiceTokenFlow: call started")

        val stateAndRef = serviceHub.accountService.accountInfo(UUID.fromString(accountId))
        val account = stateAndRef!!.state.data

        val issuer: Party = serviceHub.ourIdentity
        val zarTokenType = TokenType("ZAR", 2)
        val myIssuedTokenType: IssuedTokenType = zarTokenType issuedBy issuer

        val fungibleToken: FungibleToken =  amount of myIssuedTokenType heldBy account.host
        logger.info("\uD83E\uDDE9 \uD83E\uDDE9 " +
                "Token: ${fungibleToken.issuedTokenType.tokenType.tokenIdentifier} " +
                "created for \uD83C\uDF3F  $account")

        val holderSession = initiateFlow(account.host)
        val tx = subFlow(IssueTokensFlow(fungibleToken, listOf(holderSession)))
        //
        logger.info(" \uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E " +
                "Tokens issued to ${account.name}, token: \uD83C\uDF4A $fungibleToken ")
        return tx
    }
}

@StartableByRPC
@InitiatingFlow
class MoveInvoiceTokenFlow(
        private val amount: Double,
        private val accountId: String
) : FlowLogic<SignedTransaction>() {
    override val progressTracker = ProgressTracker()
    @Suspendable
    override fun call(): SignedTransaction {
        logger.info(" \uD83C\uDF4E \uD83C\uDF4E IssueInvoiceTokenFlow: call started")
        val stateAndRef = serviceHub.accountService.accountInfo(accountId).single()
        val account = stateAndRef.state.data

        val issuer: Party = serviceHub.ourIdentity
        val myTokenType = TokenType("ZAR", 2)
        val regulator = serviceHub.networkMapCache.getNodeByLegalName(
                CordaX500Name(organisation = "Regulator", locality = "London", country = "GB"))

        val result = MoveFungibleTokens(
                partyAndAmount = PartyAndAmount(account.host, amount of myTokenType),
                observers = listOf(regulator!!.legalIdentities.first()),
                queryCriteria = tokenAmountWithIssuerCriteria(myTokenType, issuer)
        )
        logger.info(" \uD83C\uDF4E \uD83C\uDF4E Tokens moved to ${account}: result: $result ")
        return result.call()

    }
}


