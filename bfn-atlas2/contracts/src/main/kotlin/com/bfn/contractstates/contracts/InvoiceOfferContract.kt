package com.bfn.contractstates.contracts

import com.bfn.contractstates.states.InvoiceOfferState
import net.corda.core.contracts.CommandData
import net.corda.core.contracts.Contract
import net.corda.core.transactions.LedgerTransaction
import org.slf4j.LoggerFactory
import java.math.BigDecimal


class InvoiceOfferContract : Contract {
    @Throws(IllegalArgumentException::class)
    override fun verify(tx: LedgerTransaction) {
        logger.info("\uD83D\uDD06 InvoiceOfferContract: verify starting" +
                " ..... \uD83E\uDD6C \uD83E\uDD6C ")
        logger.info("Number ofCommands: ${tx.commands.size}")
        if (tx.outputStates.size != 1) {
            throw IllegalArgumentException("One output state required")
        }
        if (tx.commands.size > 1) {
            throw IllegalArgumentException("Only One Command required")
        }
        val invoiceOfferState = tx.outputStates.first()
        if (invoiceOfferState is InvoiceOfferState) {
            if (invoiceOfferState.supplier.name == invoiceOfferState.investor.name) {
                throw IllegalArgumentException("Investor and Supplier cannot be the same entity")
            }
            val ta =  BigDecimal(invoiceOfferState.discount)
            val tb =  BigDecimal("0.00")
            if (ta <= tb) {
                throw IllegalArgumentException("Discount Percent must be greater than zero")
            }
            if (invoiceOfferState.customer.identifier.toString() == invoiceOfferState.supplier.identifier.toString()) {
                throw IllegalArgumentException("Customer and Supplier cannot be the same entity")
            }
            if (invoiceOfferState.customer.identifier.toString() == invoiceOfferState.investor.identifier.toString()) {
                throw IllegalArgumentException("Customer and Investor cannot be the same entity")
            }
            val ta1 =  BigDecimal(invoiceOfferState.offerAmount)
            val tb1 =  BigDecimal(invoiceOfferState.originalAmount)
            if (tb1 <= ta1) {
                throw IllegalArgumentException("\uD83C\uDF4E \uD83C\uDF4E Offer amount: " +
                        "$ta1 " +
                        "must be less than original invoice amount: " +
                        "$tb1 \uD83C\uDF4E \uD83C\uDF4E ")
            }

        }
        logger.info("\uD83D\uDD06 InvoiceOfferContract: verification ( \uD83D\uDC7A  done OK! " +
                ".....\uD83E\uDD1F \uD83E\uDD1F ")
    }

    class MakeOffer : CommandData
    companion object {
        // This is used to identify our contract when building a transaction.
        val ID: String = InvoiceOfferContract::class.java.name
        private val logger = LoggerFactory.getLogger(InvoiceOfferContract::class.java)
    }
}
