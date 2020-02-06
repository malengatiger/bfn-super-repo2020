package com.bfn.contractstates.states

import net.corda.core.serialization.CordaSerializable
import java.util.*

@CordaSerializable
data class TradeMatrix (
        val startInvoiceAmount: Double,
        val endInvoiceAmount: Double,
        val offerDiscount: Double,
        val date: String

) {
}
