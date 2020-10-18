package com.bfn.client.data


data class NetworkSupplierRoyaltyDTO (
        var networkRoyaltyId: String = "",
        var amount: String = "",
        var royaltyPercentage: String = "",
        var networkOperator:String = "",
        var supplierPayment: SupplierPaymentDTO? = null,
        var dateRegistered: String = ""
) {
}