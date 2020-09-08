package com.bfn.client.data

data class TradeMatrixItemDTO(
        val startInvoiceAmount: Double,
        val endInvoiceAmount: Double,
        val offerDiscount: Double,
        val date: String
) {

}