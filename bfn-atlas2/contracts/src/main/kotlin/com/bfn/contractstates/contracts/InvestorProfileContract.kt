package com.bfn.contractstates.contracts

import com.bfn.contractstates.states.CustomerProfileState
import com.bfn.contractstates.states.InvestorProfileState
import net.corda.core.contracts.CommandData
import net.corda.core.contracts.Contract
import net.corda.core.transactions.LedgerTransaction
import org.slf4j.LoggerFactory
import java.math.BigDecimal


class InvestorProfileContract : Contract {
    @Throws(IllegalArgumentException::class)
    override fun verify(tx: LedgerTransaction) {
        logger.info("$em InvestorProfileContract: verify starting" +
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
                throw IllegalArgumentException("There should be an output state of InvestorProfileState")
            }
            if (tx.inputStates.isNotEmpty()) {
                throw IllegalArgumentException("There should be no input states")
            }
            val investorProfileState = tx.outputStates.first() as InvestorProfileState

            val ta =  BigDecimal(investorProfileState.maximumInvoiceAmount)
            val tb =  BigDecimal("0.00")
            if (ta <= tb) {
                throw IllegalArgumentException("\uD83D\uDC7F maximumInvoiceAmount should be > zero")
            }
            val ta1 =  BigDecimal(investorProfileState.minimumInvoiceAmount)
            val tb1 =  BigDecimal("0.00")
            if (ta1 <= tb1) {
                throw IllegalArgumentException("\uD83D\uDC7F minimumInvoiceAmount should be > zero")
            }
            val ta2 =  BigDecimal(investorProfileState.maximumInvoiceAmount)
            val tb2 =  BigDecimal("10000.00")
            if (ta2 <= tb2) {
                throw IllegalArgumentException("\uD83D\uDC7F totalInvestment should be > 10000")
            }
            val ta3 =  BigDecimal(investorProfileState.defaultDiscount)
            if (ta3 <= tb) {
                throw IllegalArgumentException("\uD83D\uDC7F defaultDiscount should be > zero")
            }


        }

        if (cmd.value is UpdateProfile) {
            throw IllegalArgumentException("UpdateProfile not available")
        }
        if (cmd.value is DeleteProfile) {
            throw IllegalArgumentException("DeleteProfile not available")
        }

        logger.info("$em InvestorProfileContract: verification ( \uD83D\uDC7A none for now) done OK! " +
                ".....\uD83E\uDD1F \uD83E\uDD1F ")
    }

    class CreateProfile : CommandData
    class UpdateProfile : CommandData
    class DeleteProfile : CommandData

    companion object {
        val ID: String = InvestorProfileContract::class.java.name
        private val logger = LoggerFactory.getLogger(InvestorProfileContract::class.java)
        private const val em = "\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06"
    }
}
