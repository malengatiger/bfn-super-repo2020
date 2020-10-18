package com.bfn.client.data


data class NetworkInvestorRoyaltyDTO (
        var networkRoyaltyId: String = "",
        var amount: String = "",
        var royaltyPercentage: String = "",
        var networkOperator: String = "",
        var investorPayment: InvestorPaymentDTO,
        var dateRegistered: String = ""
) {
}