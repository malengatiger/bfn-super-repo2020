package com.bfn.client.web

import com.bfn.client.data.*
import com.bfn.contractstates.states.*
import com.r3.corda.lib.accounts.contracts.states.AccountInfo
import com.r3.corda.lib.tokens.contracts.states.FungibleToken

object  DTOUtil {
    @JvmStatic
    fun getDTO(state: InvoiceState): InvoiceDTO {

        return InvoiceDTO(
                amount = state.amount,
                customer = getDTO(state.customerInfo),
                supplier = getDTO(state.supplierInfo),
                description = state.description,
                invoiceId = state.invoiceId.toString(),
                invoiceNumber = state.invoiceNumber,
                dateRegistered = state.dateRegistered.toString(),
                valueAddedTax = state.valueAddedTax,
                totalAmount = state.totalAmount,
                externalId = state.externalId
        )
    }
    @JvmStatic
    fun getDTO(state: SupplierPaymentState): SupplierPaymentDTO {

        return SupplierPaymentDTO(
                supplierProfile = getDTO(state.supplierProfile),
                acceptedOffer = getDTO(state.acceptedOffer),
                date = state.date,
                paid = state.paid
        )
    }
    @JvmStatic
    fun getDTO(state: NetworkOperatorState): NetworkOperatorDTO {

        return NetworkOperatorDTO(
                issuedBy = state.issuedBy.toString(),
                accountId = state.account.identifier.toString(),
                minimumInvoiceAmount = state.minimumInvoiceAmount,
                maximumInvoiceAmount = state.maximumInvoiceAmount,
                maximumInvestment = state.maximumInvestment,
                defaultOfferDiscount = state.defaultOfferDiscount,
                tradeFrequencyInMinutes = state.tradeFrequencyInMinutes,
                name = state.name,
                cellphone = state.cellphone,
                email = state.email,
                tradeMatrixItems = state.tradeMatrixItems,
                password = "",
                date = state.date.toString()
        )
    }
    @JvmStatic
    fun getDTO(state: InvoiceOfferState): InvoiceOfferDTO {
        return InvoiceOfferDTO(
                invoiceId = state.invoiceId.toString(),
                invoiceNumber = state.invoiceNumber,
                offerAmount = state.offerAmount,
                originalAmount = state.originalAmount,
                discount = state.discount,
                supplier = getDTO(state.supplier),
                investor = getDTO(state.investor),
                offerDate = state.offerDate,
                investorDate = state.acceptanceDate,
                accepted = state.accepted, externalId = state.externalId,
                acceptanceDate = state.acceptanceDate,
                offerId = state.offerId,
                isAnchor = state.isAnchor

        )
    }
    @JvmStatic
    fun getDTO(a: AccountInfo): AccountInfoDTO {
        return AccountInfoDTO(
                host = a.host.toString(),
                identifier = a.identifier.id.toString(),
                name = a.name, status = "")
    }
    @JvmStatic
    fun getDTO(a: InvestorProfileState): InvestorProfileStateDTO {
        return InvestorProfileStateDTO(
                issuedBy = a.issuedBy.toString(),
                account = getDTO(a.account), date = a.date.toString(),
                defaultDiscount = a.defaultDiscount,
                maximumInvoiceAmount = a.maximumInvoiceAmount,
                totalInvestment = a.totalInvestment,
                minimumInvoiceAmount = a.minimumInvoiceAmount,
                bank = a.bank, bankAccount = a.bankAccount
        )
    }
    @JvmStatic
    fun getDTO(a: SupplierProfileState): SupplierProfileStateDTO {
        return SupplierProfileStateDTO(
                issuedBy = a.issuedBy.toString(),
                account = getDTO(a.account), date = a.date.toString(),
                maximumDiscount = a.maximumDiscount,
                bankAccount = a.bankAccount,
                bank = a.bank
        )
    }
    @JvmStatic
    fun getDTO(token: FungibleToken, accountId: String,
               invoiceId: String, account: AccountInfo, invoiceAmount: Double): TokenDTO {
        return TokenDTO(
                accountId = accountId,
                invoiceId = invoiceId,
                tokenIdentifier = token.issuedTokenType.tokenIdentifier,
                amount = token.amount.toDecimal().toDouble(),
                issuer = token.issuer.toString(),
                holder = token.holder.toString(),
                invoiceAmount = invoiceAmount,
                account = getDTO(account)

        )
    }
}