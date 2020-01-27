package com.bfn.client.dto

import com.bfn.contractstates.states.TradeMatrix
import net.corda.core.identity.Party
import java.math.BigDecimal
import java.util.*

data class AnchorDTO(
        val issuedBy: String,
        val accountId: String,
        val minimumInvoiceAmount: BigDecimal,
        val maximumInvoiceAmount: BigDecimal,
        val maximumInvestment: BigDecimal,
        val tradeFrequencyInMinutes: Int,
        val defaultOfferDiscount: Double,
        val tradeMatrices: MutableList<TradeMatrix>,
        val date: Date,
        val name: String,
        val email: String,
        val cellphone: String,
        val password: String
) {
}
