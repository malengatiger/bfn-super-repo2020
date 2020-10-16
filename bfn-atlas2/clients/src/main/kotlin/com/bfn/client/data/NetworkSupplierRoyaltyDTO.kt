package com.bfn.client.data


data class NetworkSupplierRoyaltyDTO (
        var networkRoyaltyId: String = "",
        var amount: String = "",
        var royaltyPercentage: String = "",
        var networkOperator: AccountInfoDTO? = null,
        var supplierPayment: SupplierPaymentDTO? = null,
        var dateRegistered: String = ""
) {
}