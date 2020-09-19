package com.bfn.contractstates.contracts

import com.bfn.contractstates.states.UserState
import net.corda.core.contracts.CommandData
import net.corda.core.contracts.Contract
import net.corda.core.transactions.LedgerTransaction
import org.slf4j.LoggerFactory

class UserContract : Contract {
    @Throws(IllegalArgumentException::class)
    override fun verify(tx: LedgerTransaction) {
        logger.info(
                "\uD83D\uDD06 UserContract: verify starting ..... \uD83E\uDD6C \uD83E\uDD6C ")

        val cmd = tx.commands.first()
        if (cmd.value is Register) {
            if (tx.outputStates.isEmpty()) {
                throw IllegalArgumentException("There should be an output state of UserState")
            }
            if (tx.inputStates.isNotEmpty()) {
                throw IllegalArgumentException("There should be no input states")
            }
//            val invoiceState = tx.outputStates.first() as UserState

        }
        if (cmd.value is Deactivate) {
            if (tx.inputStates.isEmpty()) {
                throw IllegalArgumentException("There should be an input state of UserState")
            }
            if (tx.outputStates.isNotEmpty()) {
                throw IllegalArgumentException("There should be no output states")
            }
        }

        logger.info(" \uD83D\uDD06 \uD83D\uDD06 InvoiceContract: " +
                "\uD83C\uDF4E verification done OK! .....\uD83E\uDD1F \uD83E\uDD1F ")
    }

    class Register : CommandData
    class Deactivate : CommandData
    companion object {
        val ID: String = UserContract::class.java.name
        private val logger = LoggerFactory.getLogger(UserContract::class.java)
    }
}
