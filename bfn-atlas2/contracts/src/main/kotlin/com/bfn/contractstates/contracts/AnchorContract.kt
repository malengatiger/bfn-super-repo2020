package com.bfn.contractstates.contracts

import com.bfn.contractstates.states.AnchorState
import net.corda.core.contracts.CommandData
import net.corda.core.contracts.Contract
import net.corda.core.transactions.LedgerTransaction
import org.slf4j.LoggerFactory
import java.math.BigDecimal


class AnchorContract : Contract {
    @Throws(IllegalArgumentException::class)
    override fun verify(tx: LedgerTransaction) {
        logger.info("\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 AnchorContract: verify starting" +
                " ..... \uD83E\uDD6C \uD83E\uDD6C ")
        logger.info("Number ofCommands: ${tx.commands.size}")
        if (tx.outputStates.size != 1) {
            throw IllegalArgumentException("Missing output state")
        }
        val anchor = tx.outputStates.first()
        if (anchor is AnchorState) {
            if (anchor.maximumInvestment <= BigDecimal.ZERO) {
                throw IllegalArgumentException("Maximum Investment must be greater than zero")
            }
            if (anchor.maximumInvoiceAmount <= BigDecimal.ZERO) {
                throw IllegalArgumentException("Maximum Invoice Amount must be greater than zero")
            }
            if (anchor.minimumInvoiceAmount <= BigDecimal.ZERO) {
                throw IllegalArgumentException("Minimum Invoice Amount must be greater than zero")
            }
            if (anchor.defaultOfferDiscount <= 0) {
                throw IllegalArgumentException("Default Offer Discount must be greater than zero")
            }
            if (anchor.tradeFrequencyInMinutes <= 0) {
                throw IllegalArgumentException("Trade Frequency In Minutes must be greater than zero")
            }
        }


        logger.info(" \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 AnchorContract: verification ( \uD83D\uDC7A " +
                ".....\uD83E\uDD1F \uD83E\uDD1F ")
    }

    class Create : CommandData
    class Update : CommandData

    companion object {
        val ID: String = AnchorContract::class.java.name
        private val logger = LoggerFactory.getLogger(AnchorContract::class.java)
    }
}
