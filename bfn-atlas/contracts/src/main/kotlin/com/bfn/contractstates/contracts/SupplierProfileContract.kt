package com.bfn.contractstates.contracts

import net.corda.core.contracts.CommandData
import net.corda.core.contracts.Contract
import net.corda.core.transactions.LedgerTransaction
import org.slf4j.LoggerFactory


class SupplierProfileContract : Contract {
    @Throws(IllegalArgumentException::class)
    override fun verify(tx: LedgerTransaction) {
        logger.info("\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 SupplierProfileContract: verify starting" +
                " ..... \uD83E\uDD6C \uD83E\uDD6C ")
//        val (value, requiredSigners) = tx.getCommand<CommandData>(0)
        logger.info("Number ofCommands: ${tx.commands.size}")
//
//        if (
//                value is CreateOfferAndToken
//                || value is InvoiceOfferContract.MakeOffer
//                || value is InvoiceOfferContract.CloseOffers
//                || value is InvoiceOfferContract.InvestorSelected
//                || value is IssueTokenCommand) {
//
//            logger.info("\uD83D\uDD06 Command is of type: \uD83D\uDD06  $value \uD83D\uDD06 ")
//        } else {
//            throw IllegalArgumentException("Bad command $value")
//        }

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
