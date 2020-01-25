package com.bfn.contractstates.contracts

import net.corda.core.contracts.CommandData
import net.corda.core.contracts.Contract
import net.corda.core.transactions.LedgerTransaction
import org.slf4j.LoggerFactory


class OfferAndTokenStateContract : Contract {
    @Throws(IllegalArgumentException::class)
    override fun verify(tx: LedgerTransaction) {
        logger.info("\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 OfferAndTokenStateContract: verify starting" +
                " ..... \uD83E\uDD6C \uD83E\uDD6C ")
        logger.info("Number ofCommands: ${tx.commands.size}")

        logger.info(" \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 OfferAndTokenStateContract: verification ( \uD83D\uDC7A none for now) done OK! " +
                ".....\uD83E\uDD1F \uD83E\uDD1F ")
    }

    class CreateOfferAndToken : CommandData

    companion object {
        val ID: String = OfferAndTokenStateContract::class.java.name
        private val logger = LoggerFactory.getLogger(OfferAndTokenStateContract::class.java)
    }
}
