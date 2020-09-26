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
            if (customerState.maximumInvoiceAmount <= "0.00") {
                throw IllegalArgumentException("Maximum Invoice Amount must be greater than zero")
            }
            if (customerState.minimumInvoiceAmount <= "0.00") {
                throw IllegalArgumentException("Minimum Invoice Amount must be greater than zero")
            }
        }

        logger.info(" $em CustomerProfileContract: verification done! \uD83D\uDC7A " +
                ".....\uD83E\uDD1F \uD83E\uDD1F ")
        //todo - ☘️ ☘️ ☘️ refactor all contracts to use less verbose syntax for verify methods
        /*
        requireThat(require -> {
        require.using("No inputs should be consumed when issuing an X.",  tx.getInputs().isEmpty());
        require.using("Only one output state should be created.", tx.getOutputs().size() == 1);
        final XState out = (XState) tx.getOutputs().get(0);
        require.using("The sender and the recipient cannot be the same entity.", out.getSender() != out.getRecipient());
        require.using("All of the participants must be signers.", command.getSigners().containsAll(out.getParticipants()));
        require.using("The X's value must be non-negative.", out.getX().getValue() > 0);
        return null;
        });
        👽 👽 👽 👽 👽 👽 👽 👽 👽 👽 👽 👽
         */
    }

    class Create : CommandData
    class Update : CommandData

    companion object {
        val ID: String = CustomerProfileContract::class.java.name
        private val logger = LoggerFactory.getLogger(CustomerProfileContract::class.java)
        private const val em = "\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06"
    }
}
