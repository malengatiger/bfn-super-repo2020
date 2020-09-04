package com.bfn.contractstates.contracts

import com.bfn.contractstates.states.SupplierProfileState
import net.corda.core.contracts.CommandData
import net.corda.core.contracts.Contract
import net.corda.core.transactions.LedgerTransaction
import org.slf4j.LoggerFactory


class SupplierProfileContract : Contract {
    @Throws(IllegalArgumentException::class)
    override fun verify(tx: LedgerTransaction) {
        logger.info("\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 SupplierProfileContract: verify starting" +
                " ..... \uD83E\uDD6C \uD83E\uDD6C ")
        val (value, requiredSigners) = tx.getCommand<CommandData>(0)
        logger.info("Number ofCommands: ${tx.commands.size}")
        logger.info("command: $value")
        logger.info("requiredSigners: ${requiredSigners.first()}")

        if (tx.commands.size > 1) {
            throw IllegalArgumentException("\uD83D\uDC7F maximum of one command allowed")
        }
        val cmd = tx.commands.first()
        if (cmd.value is CreateProfile) {
            if (tx.outputStates.isEmpty()) {
                throw IllegalArgumentException("There should be an output state of SupplierProfileState")
            }
            if (tx.inputStates.isNotEmpty()) {
                throw IllegalArgumentException("There should be no input states")
            }
            val supplierProfileState = tx.outputStates.first() as SupplierProfileState

            if (supplierProfileState.maximumDiscount <= 0.0) {
                throw IllegalArgumentException("\uD83D\uDC7F maximumDiscount should be > zero")
            }

        }

        if (cmd.value is UpdateProfile) {
            throw IllegalArgumentException("UpdateProfile not available")
        }
        if (cmd.value is DeleteProfile) {
            throw IllegalArgumentException("DeleteProfile not available")
        }

        logger.info(" \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 SupplierProfileContract: verification ( \uD83D\uDC7A none for now) done OK! " +
                ".....\uD83E\uDD1F \uD83E\uDD1F ")
    }

    class CreateProfile : CommandData
    class UpdateProfile : CommandData
    class DeleteProfile : CommandData

    companion object {
        val ID: String = SupplierProfileContract::class.java.name
        private val logger = LoggerFactory.getLogger(SupplierProfileContract::class.java)
    }
}
