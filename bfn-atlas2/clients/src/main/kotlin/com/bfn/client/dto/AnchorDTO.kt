package com.bfn.client.dto

import com.bfn.contractstates.states.TradeMatrix
import java.util.*

data class AnchorDTO(
        var issuedBy: String? = null,
        var accountId: String? = null,
        var minimumInvoiceAmount: Double? = null,
        var maximumInvoiceAmount: Double? = null,
        var maximumInvestment: Double? = null,
        var tradeFrequencyInMinutes: Int? = null,
        var defaultOfferDiscount: Double? = null,
        var tradeMatrices: MutableList<TradeMatrix>? = null,
        var date: String? = null,
        var name: String? = null,
        var email: String? = null,
        var cellphone: String? = null,
        var password: String? = null,
        var uid: String? = null
) {
}
