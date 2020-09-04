package com.bfn.contractstates.contracts

import com.bfn.contractstates.states.NetworkOperatorState
import net.corda.core.contracts.CommandData
import net.corda.core.contracts.Contract
import net.corda.core.transactions.LedgerTransaction
import org.slf4j.LoggerFactory


class NetworkOperatorContract : Contract {
    @Throws(IllegalArgumentException::class)
    override fun verify(tx: LedgerTransaction) {
        logger.info("$em NetworkOperatorContract: verify starting" +
                " ..... \uD83E\uDD6C \uD83E\uDD6C ")
        logger.info("Number ofCommands: ${tx.commands.size}")
        if (tx.outputStates.size != 1) {
            throw IllegalArgumentException("One output state required")
        }
        val networkOperatorState = tx.outputStates.first()
        if (networkOperatorState is NetworkOperatorState) {
            if (networkOperatorState.maximumInvestment <= 0.0) {
                throw IllegalArgumentException("Maximum Investment must be greater than zero")
            }
            if (networkOperatorState.maximumInvoiceAmount <= 0.0) {
                throw IllegalArgumentException("Maximum Invoice Amount must be greater than zero")
            }
            if (networkOperatorState.minimumInvoiceAmount <= 0.0) {
                throw IllegalArgumentException("Minimum Invoice Amount must be greater than zero")
            }
            if (networkOperatorState.defaultOfferDiscount <= 0) {
                throw IllegalArgumentException("Default Offer Discount must be greater than zero")
            }
            if (networkOperatorState.tradeFrequencyInMinutes <= 0) {
                throw IllegalArgumentException("Trade Frequency In Minutes must be greater than zero")
            }
        }


        logger.info(" $em NetworkOperatorContract: verification ( \uD83D\uDC7A " +
                ".....\uD83E\uDD1F \uD83E\uDD1F ")
    }

    class Create : CommandData
    class Update : CommandData

    companion object {
        val ID: String = NetworkOperatorContract::class.java.name
        private val logger = LoggerFactory.getLogger(NetworkOperatorContract::class.java)
        private const val em = "\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06"
    }
}
