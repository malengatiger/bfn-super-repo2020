package com.bfn.client.dto

import com.bfn.contractstates.states.TradeMatrixItem

data class AnchorDTO(
        var issuedBy: String,
        var accountId: String,
        var minimumInvoiceAmount: Double,
        var maximumInvoiceAmount: Double,
        var maximumInvestment: Double,
        var tradeFrequencyInMinutes: Int,
        var defaultOfferDiscount: Double,
        var tradeMatrixItems: MutableList<TradeMatrixItem>,
        var date: String,
        var name: String,
        var email: String,
        var cellphone: String,
        var password: String,
        var uid: String? = null
) {
}
