package com.bfn.client.data

import com.bfn.contractstates.states.TradeMatrixItem

data class NetworkOperatorDTO(

        var account: AccountInfoDTO,
        var minimumInvoiceAmount: Double,
        var maximumInvoiceAmount: Double,
        var maximumInvestment: Double,
        var tradeFrequencyInMinutes: Int,
        var defaultOfferDiscount: Double,
        var tradeMatrixItems: MutableList<TradeMatrixItemDTO>,
        var stellarAccountId: String,
        var rippleAccountId: String,
        var date: String,
        var name: String,
        var email: String,
        var cellphone: String,
        var password: String,
        var uid: String? = null
) {
}
