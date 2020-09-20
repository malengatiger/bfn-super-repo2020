package com.bfn.contractstates.states

import net.corda.core.serialization.CordaSerializable

@CordaSerializable
data class TradeMatrixItem (
        val startInvoiceAmount: String,
        val endInvoiceAmount: String,
        val offerDiscount: String,
        val date: String

) {
}
