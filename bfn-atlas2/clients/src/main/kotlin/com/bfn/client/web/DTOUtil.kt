package com.bfn.client.web

import com.bfn.client.data.*
import com.bfn.contractstates.states.*
import com.r3.corda.lib.accounts.contracts.states.AccountInfo
import com.r3.corda.lib.tokens.contracts.states.FungibleToken

object DTOUtil {
    @JvmStatic
    fun getDTO(a: InvoiceState): InvoiceDTO {

        return InvoiceDTO(
                amount = a.amount,
                customer = getDTO(a.customerInfo),
                supplier = getDTO(a.supplierInfo),
                description = a.description,
                invoiceId = a.invoiceId.toString(),
                invoiceNumber = a.invoiceNumber,
                dateRegistered = a.dateRegistered.toString(),
                valueAddedTax = a.valueAddedTax,
                totalAmount = a.totalAmount,
                externalId = a.externalId
        )
    }


    @JvmStatic
    fun getDTO(a: SupplierPaymentState): SupplierPaymentDTO {

        return SupplierPaymentDTO(
                supplierProfile = getDTO(a.supplierProfile),
                acceptedOffer = getDTO(a.acceptedOffer),
                date = a.date,
                paid = a.paid,
                paymentRequest = null
        )
    }

    @JvmStatic
    fun getDTO(a: PaymentRequestState): PaymentRequestDTO {

        return PaymentRequestDTO(
                paymentRequestId = a.paymentRequestId,
                investorInfo = getDTO(a.investorInfo),
                customerInfo = getDTO(a.customerInfo),
                supplierInfo = getDTO(a.supplierInfo),
                assetCode = a.assetCode,
                amount = a.amount,
                date = a.date
        )
    }

    @JvmStatic
    fun getDTO(a: NetworkOperatorState): NetworkOperatorDTO {

        return NetworkOperatorDTO(

                account = getDTO(a.account),
                minimumInvoiceAmount = a.minimumInvoiceAmount,
                maximumInvoiceAmount = a.maximumInvoiceAmount,
                maximumInvestment = a.maximumInvestment,
                defaultOfferDiscount = a.defaultOfferDiscount,
                tradeFrequencyInMinutes = a.tradeFrequencyInMinutes,
                name = a.name,
                cellphone = a.cellphone,
                email = a.email,
                tradeMatrixItems = getDTO(a.tradeMatrixItems),
                password = "",
                date = a.date.toString(),
                stellarAccountId = a.stellarAccountId,
                rippleAccountId = a.rippleAccountId
        )
    }
    @JvmStatic
    fun getDTO(list: List<TradeMatrixItem> ): MutableList<TradeMatrixItemDTO> {
        val mList: MutableList<TradeMatrixItemDTO> = mutableListOf()

        for (item in list) {
            mList.add(getDTO(item))
        }

        return mList
    }

    @JvmStatic
    fun getDTO(a: TradeMatrixItem): TradeMatrixItemDTO {
        return TradeMatrixItemDTO(
                startInvoiceAmount = a.startInvoiceAmount,
                endInvoiceAmount = a.endInvoiceAmount,
                offerDiscount = a.offerDiscount,
                date = a.date

        )
    }

    @JvmStatic
    fun getDTO(a: InvoiceOfferState): InvoiceOfferDTO {
        return InvoiceOfferDTO(
                invoiceId = a.invoiceId.toString(),
                invoiceNumber = a.invoiceNumber,
                offerAmount = a.offerAmount,
                originalAmount = a.originalAmount,
                discount = a.discount,
                supplier = getDTO(a.supplier),
                investor = getDTO(a.investor),
                offerDate = a.offerDate,
                investorDate = a.acceptanceDate,
                accepted = a.accepted, externalId = a.externalId,
                acceptanceDate = a.acceptanceDate,
                offerId = a.offerId,
                isAnchor = a.isAnchor

        )
    }

    @JvmStatic
    fun getDTO(a: AccountInfo): AccountInfoDTO {
        return AccountInfoDTO(
                a.identifier.id.toString(),
                a.host.toString(),
                a.name)
    }

    @JvmStatic
    fun getDTO(a: InvestorProfileState): InvestorProfileStateDTO {
        return InvestorProfileStateDTO(
                account = getDTO(a.account), date = a.date.toString(),
                defaultDiscount = a.defaultDiscount,
                maximumInvoiceAmount = a.maximumInvoiceAmount,
                totalInvestment = a.totalInvestment,
                minimumInvoiceAmount = a.minimumInvoiceAmount,
                bank = a.bank, bankAccount = a.bankAccount,
                stellarAccountId = a.stellarAccountId,
                rippleAccountId = a.rippleAccountId
        )
    }

    @JvmStatic
    fun getDTO(a: SupplierProfileState): SupplierProfileStateDTO {
        return SupplierProfileStateDTO(
                account = getDTO(a.account), date = a.date.toString(),
                maximumDiscount = a.maximumDiscount,
                bankAccount = a.bankAccount,
                bank = a.bank,
                stellarAccountId = a.stellarAccountId,
                rippleAccountId = a.rippleAccountId
        )
    }
    @JvmStatic
    fun getDTO(a: CustomerProfileState): CustomerProfileStateDTO {
        return CustomerProfileStateDTO(
                account = getDTO(a.account),
                stellarAccountId = a.stellarAccountId,
                rippleAccountId = a.rippleAccountId,
                dateRegistered = a.dateRegistered,
                minimumInvoiceAmount = a.minimumInvoiceAmount,
                maximumInvoiceAmount = a.maximumInvoiceAmount,
                email = a.email,
                cellphone = a.cellphone
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