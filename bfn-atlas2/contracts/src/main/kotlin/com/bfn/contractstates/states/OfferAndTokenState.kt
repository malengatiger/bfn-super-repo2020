package com.bfn.contractstates.states

import com.bfn.contractstates.contracts.OfferAndTokenStateContract
import com.r3.corda.lib.tokens.contracts.states.FungibleToken
import net.corda.core.contracts.*
import net.corda.core.flows.FlowLogicRefFactory
import net.corda.core.identity.AbstractParty
import net.corda.core.identity.Party
import net.corda.core.serialization.CordaSerializable
import org.slf4j.LoggerFactory

@CordaSerializable
@BelongsToContract(OfferAndTokenStateContract::class)
class OfferAndTokenState(val invoiceOffer: InvoiceOfferState,
                         val token: FungibleToken, private val issuer: Party) : ContractState, SchedulableState {

    override val participants: List<AbstractParty>
        get() = listOf(issuer)

    override fun nextScheduledActivity(thisStateRef: StateRef, flowLogicRefFactory: FlowLogicRefFactory): ScheduledActivity? {
        logger.info("OfferAndTokenState: \uD83D\uDE3C \uD83D\uDE3C \uD83D\uDE3C nextScheduledActivity: ${thisStateRef.txhash}")

        return null
    }


    private val logger = LoggerFactory.getLogger(OfferAndTokenState::class.java)
}
