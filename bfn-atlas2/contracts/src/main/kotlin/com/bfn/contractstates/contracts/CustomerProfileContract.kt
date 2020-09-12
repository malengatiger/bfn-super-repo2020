package com.bfn.contractstates.contracts

import com.bfn.contractstates.states.CustomerProfileState
import net.corda.core.contracts.CommandData
import net.corda.core.contracts.Contract
import net.corda.core.transactions.LedgerTransaction
import org.slf4j.LoggerFactory


class CustomerProfileContract : Contract {
    @Throws(IllegalArgumentException::class)
    override fun verify(tx: LedgerTransaction) {
        logger.info("$em CustomerContract: verify starting" +
                " ..... \uD83E\uDD6C \uD83E\uDD6C ")
        logger.info("Number ofCommands: ${tx.commands.size}")
        if (tx.outputStates.size != 1) {
            throw IllegalArgumentException("One output state required")
        }
        val customerState = tx.outputStates.first()
        if (customerState is CustomerProfileState) {

            if (customerState.maximumInvoiceAmount <= 0.0) {
                throw IllegalArgumentException("Maximum Invoice Amount must be greater than zero")
            }
            if (customerState.minimumInvoiceAmount <= 0.0) {
                throw IllegalArgumentException("Minimum Invoice Amount must be greater than zero")
            }

        }


        logger.info(" $em CustomerContract: verification ( \uD83D\uDC7A " +
                ".....\uD83E\uDD1F \uD83E\uDD1F ")
    }

    class Create : CommandData
    class Update : CommandData

    companion object {
        val ID: String = CustomerProfileContract::class.java.name
        private val logger = LoggerFactory.getLogger(CustomerProfileContract::class.java)
        private const val em = "\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06"
    }
}
