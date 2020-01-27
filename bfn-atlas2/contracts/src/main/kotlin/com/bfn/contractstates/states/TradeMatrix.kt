package com.bfn.contractstates.states

import com.r3.corda.lib.accounts.contracts.states.AccountInfo
import java.math.BigDecimal
import java.util.*

data class TradeMatrix (
        val startInvoiceAmount: BigDecimal,
        val endInvoiceAmount: BigDecimal,
        val offerDiscount: Double,
        val maximumInvoiceAgeInDays: Int,
        val date: Date

) {
}
