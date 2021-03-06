package com.bfn.contractstates.contracts

import com.bfn.contractstates.states.InvoiceState
import com.bfn.contractstates.states.PurchaseOrderState
import net.corda.core.contracts.CommandData
import net.corda.core.contracts.Contract
import net.corda.core.transactions.LedgerTransaction
import org.slf4j.LoggerFactory
import java.math.BigDecimal

class InvoiceContract : Contract {
    @Throws(IllegalArgumentException::class)
    override fun verify(tx: LedgerTransaction) {
        logger.info(
                "\uD83D\uDD06 InvoiceContract: verify starting ..... \uD83E\uDD6C \uD83E\uDD6C ")

        val cmd = tx.commands.first()
        if (cmd.value is Register) {
            if (tx.outputStates.isEmpty()) {
                throw IllegalArgumentException("\uD83D\uDD06 There should be an output state of InvoiceState")
            }
            if (tx.inputStates.isNotEmpty()) {
                val state = tx.inputStates[0]
                if (state !is PurchaseOrderState) {
                    throw IllegalArgumentException("\uD83D\uDD06 input state should be a PurchaseOrderState")
                }
            }
            val invoiceState = tx.outputStates.first() as InvoiceState
            if (invoiceState.supplierInfo.name == invoiceState.customerInfo.name) {
                throw IllegalArgumentException("\uD83D\uDC7F Supplier cannot be the same as Customer")
            }
            val tam =  BigDecimal(invoiceState.amount)
            val tbm =  BigDecimal("0.00")
            if (tam <= tbm) {
                throw IllegalArgumentException("\uD83D\uDC7F Amount should be > zero")
            }
            val ta =  BigDecimal(invoiceState.totalAmount)
            val tb =  BigDecimal("0.00")
            if (ta <= tb) {
                throw IllegalArgumentException("\uD83D\uDC7F TotalAmount should be > zero")
            }
        }
        if (cmd.value is Close) {
            if (tx.inputStates.isEmpty()) {
                throw IllegalArgumentException("There should be an input state of InvoiceState")
            }
            if (tx.outputStates.isNotEmpty()) {
                throw IllegalArgumentException("There should be no output states")
            }

        }

        logger.info(" \uD83D\uDD06 \uD83D\uDD06 InvoiceContract: " +
                "\uD83C\uDF4E verification done OK! .....\uD83E\uDD1F \uD83E\uDD1F ")
    }

    class Register : CommandData
    class Close : CommandData
    companion object {
        val ID: String = InvoiceContract::class.java.name
        private val logger = LoggerFactory.getLogger(InvoiceContract::class.java)
    }
}
