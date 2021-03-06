package com.bfn.contractstates.contracts

import net.corda.core.contracts.CommandData
import net.corda.core.contracts.Contract
import net.corda.core.transactions.LedgerTransaction
import org.slf4j.LoggerFactory

class InvestorPaymentContract : Contract {
    @Throws(IllegalArgumentException::class)
    override fun verify(tx: LedgerTransaction) {
        logger.info(
                "\uD83D\uDD06 \uD83E\uDD6C \uD83E\uDD6C SupplierPaymentContract: verify starting ..... \uD83E\uDD6C \uD83E\uDD6C ")

//        val cmd = tx.commands.first()
//        if (cmd.value is Register) {
//            if (tx.outputStates.isEmpty()) {
//                throw IllegalArgumentException("There should be an output state of InvoiceState")
//            }
//            if (tx.inputStates.isNotEmpty()) {
//                throw IllegalArgumentException("There should be no input states")
//            }
//            val invoiceState = tx.outputStates.first() as InvoiceState
//            if (invoiceState.supplierInfo.name == invoiceState.customerInfo.name) {
//                throw IllegalArgumentException("\uD83D\uDC7F Supplier cannot be the same as Customer")
//            }
//            if (invoiceState.amount <= 0.0) {
//                throw IllegalArgumentException("\uD83D\uDC7F Amount should be > zero")
//            }
//            if (invoiceState.totalAmount <= 0.0) {
//                throw IllegalArgumentException("\uD83D\uDC7F TotalAmount should be > zero")
//            }
//        }
//        if (cmd.value is Close) {
//            if (tx.inputStates.isEmpty()) {
//                throw IllegalArgumentException("There should be an input state of InvoiceState")
//            }
//            if (tx.outputStates.isNotEmpty()) {
//                throw IllegalArgumentException("There should be no output states")
//            }
//
//        }

        logger.info("\uD83D\uDD06 SupplierPaymentContract: " +
                "\uD83C\uDF4E verification done OK! .....\uD83E\uDD1F \uD83E\uDD1F ")
    }

    class Pay : CommandData
    class Close : CommandData
    companion object {
        val ID: String = InvestorPaymentContract::class.java.name
        private val logger = LoggerFactory.getLogger(InvestorPaymentContract::class.java)
    }
}
