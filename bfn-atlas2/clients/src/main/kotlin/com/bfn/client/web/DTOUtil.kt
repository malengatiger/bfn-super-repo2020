package com.bfn.client.web

import com.bfn.client.data.*
import com.bfn.contractstates.states.*
import com.r3.corda.lib.accounts.contracts.states.AccountInfo
import com.r3.corda.lib.tokens.contracts.states.FungibleToken

object DTOUtil {
    @JvmStatic
    fun getDTO(a: InvoiceState): InvoiceDTO {

        var poDTO: PurchaseOrderDTO? = null
        if (a.purchaseOrder != null) {
            poDTO = getDTO(a.purchaseOrder!!)
        }
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
                externalId = a.externalId,
                purchaseOrder = poDTO
        )
    }
    @JvmStatic
    fun getDTO(a: PurchaseOrderState): PurchaseOrderDTO {

        return PurchaseOrderDTO(
                purchaseOrderId = a.purchaseOrderId,
                purchaseOrderNumber = a.purchaseOrderNumber,
                customer = getDTO(a.customer),
                supplier = getDTO(a.supplier),
                amount = a.amount,
                dateRegistered = a.dateRegistered,
                description = a.description
        )
    }
    @JvmStatic
    fun getDTO(a: UserState): UserDTO {
        return UserDTO(
                getDTO(a.accountInfo), a.email, "",
                a.cellphone, a.uid, a.stellarAccountId, a.rippleAccountId, a.dateRegistered
        )
    }

    @JvmStatic
    fun getDTO(a: SupplierPaymentState): SupplierPaymentDTO {

        return SupplierPaymentDTO(
                supplierProfile = getDTO(a.supplierProfile),
                acceptedOffer = getDTO(a.acceptedOffer),
                dateRegistered = a.dateRegistered,
                supplierPaymentId = a.supplierPaymentId,
                customerProfile = getDTO(a.customerProfile)
        )
    }
    @JvmStatic
    fun getDTO(a: InvestorPaymentState): InvestorPaymentDTO {

        return InvestorPaymentDTO(
                investorProfile = getDTO(a.investorProfile),
                customerProfile = getDTO(a.customerProfile),
                investorPaymentId = a.investorPaymentId,
                dateRegistered = a.dateRegistered,
                supplierPayment = getDTO(a.supplierPayment)
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
                date = a.dateRegistered
        )
    }

    @JvmStatic
    fun getDTO(a: NetworkOperatorState): NetworkOperatorDTO {

        return NetworkOperatorDTO(
                account = getDTO(a.account),
                cellphone = a.cellphone,
                email = a.email,
                password = "",
                date = a.dateRegistered,
                supplierRoyaltyPercentage = a.supplierRoyaltyPercentage,
                investorRoyaltyPercentage = a.investorRoyaltyPercentage
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
                a.startInvoiceAmount,
                a.endInvoiceAmount,
                a.offerDiscount,
                a.dateRegistered

        )
    }
    @JvmStatic
    fun getDTO(a: NetworkSupplierRoyaltyState): NetworkSupplierRoyaltyDTO {
        return NetworkSupplierRoyaltyDTO(
                networkOperator = a.networkOperator.toString(),
                supplierPayment = getDTO(a.supplierPayment),
                amount = a.amount,
                royaltyPercentage = a.royaltyPercentage,
                networkRoyaltyId = a.networkRoyaltyId.toString(),
                dateRegistered = a.dateRegistered

        )
    }
    @JvmStatic
    fun getDTO(a: NetworkInvestorRoyaltyState): NetworkInvestorRoyaltyDTO {
        return NetworkInvestorRoyaltyDTO(
                networkOperator = a.networkOperator.toString(),
                investorPayment = getDTO(a.investorPayment),
                amount = a.amount,
                royaltyPercentage = a.royaltyPercentage,
                networkRoyaltyId = a.networkRoyaltyId.toString(),
                dateRegistered = a.dateRegistered

        )
    }
    @JvmStatic
    fun getDTO(a: AcceptedOfferState): AcceptedOfferDTO {
        return AcceptedOfferDTO(
                invoiceId = a.invoiceId.toString(),
                invoiceNumber = a.invoiceNumber,
                offerAmount = a.offerAmount,
                originalAmount = a.originalAmount,
                discount = a.discount,
                supplier = getDTO(a.supplier),
                investor = getDTO(a.investor),
                investorDate = a.acceptanceDate,
                externalId = a.externalId,
                acceptanceDate = a.acceptanceDate,
                offerId = a.offerId,
                dateRegistered = a.dateRegistered,
                customer = getDTO(a.customer)

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
                investorDate = a.acceptanceDate,
                externalId = a.externalId,
                acceptanceDate = a.acceptanceDate,
                offerId = a.offerId,
                dateRegistered = a.dateRegistered

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
        val m: MutableList<TradeMatrixItemDTO> = mutableListOf()
        for (item in a.tradeMatrixItems) {
            m.add(TradeMatrixItemDTO(
                    item.startInvoiceAmount,
                    item.endInvoiceAmount,
                    item.offerDiscount,
                    item.dateRegistered

            ))
        }
        val prof = InvestorProfileStateDTO();
        prof.account = getDTO(a.account)
        prof.bank = a.bank
        prof.bankAccount = a.bankAccount
        prof.dateRegistered = a.date
        prof.defaultDiscount = a.defaultDiscount
        prof.minimumInvoiceAmount = a.minimumInvoiceAmount
        prof.maximumInvoiceAmount = a.maximumInvoiceAmount
        prof.rippleAccountId = a.rippleAccountId
        prof.stellarAccountId = a.stellarAccountId
        prof.totalInvestment = a.totalInvestment
        prof.tradeMatrixItems = m
        return prof;
    }

    @JvmStatic
    fun getDTO(a: SupplierProfileState): SupplierProfileStateDTO {
        return SupplierProfileStateDTO(
                account = getDTO(a.account),
                dateRegistered = a.dateRegistered,
                maximumDiscount = a.maximumDiscount,
                bankAccount = a.bankAccount,
                bank = a.bank,
                stellarAccountId = a.stellarAccountId,
                rippleAccountId = a.rippleAccountId,
                assetCode = a.assetCode
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
               invoiceId: String, account: AccountInfo, invoiceAmount: String): TokenDTO {
        return TokenDTO(
                accountId = accountId,
                invoiceId = invoiceId,
                tokenIdentifier = token.issuedTokenType.tokenIdentifier,
                amount = token.amount.toString(),
                issuer = token.issuer.toString(),
                holder = token.holder.toString(),
                invoiceAmount = invoiceAmount,
                account = getDTO(account)

        )
    }
}