package com.bfn.client.data


data class NetworkInvestorRoyaltyDTO (
        var networkRoyaltyId: String = "",
        var amount: String = "",
        var royaltyPercentage: String = "",
        var networkOperator: AccountInfoDTO? = null,
        var investorPayment: InvestorPaymentDTO,
        var dateRegistered: String = ""
) {
}