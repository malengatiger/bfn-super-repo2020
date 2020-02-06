package com.bfn.client.dto

import com.bfn.contractstates.states.TradeMatrix
import java.util.*

data class AnchorDTO(
        var issuedBy: String,
        var accountId: String,
        var minimumInvoiceAmount: Double,
        var maximumInvoiceAmount: Double,
        var maximumInvestment: Double,
        var tradeFrequencyInMinutes: Int,
        var defaultOfferDiscount: Double,
        var tradeMatrices: MutableList<TradeMatrix>,
        var date: String,
        var name: String,
        var email: String,
        var cellphone: String,
        var password: String,
        var uid: String? = null
) {
}
