package com.bfn.client.data

data class PaymentRequestDTO(
        var paymentRequestId: String,
        var supplierInfo: AccountInfoDTO,
        var customerInfo: AccountInfoDTO,
        var investorInfo: AccountInfoDTO,
        var assetCode: String,
        var amount: Double,
        var date: String

)

