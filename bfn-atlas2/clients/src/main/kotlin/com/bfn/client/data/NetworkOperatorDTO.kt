package com.bfn.client.data

data class NetworkOperatorDTO(

        var account: AccountInfoDTO? = null,
        var date: String = "",
        var email: String = "",
        var cellphone: String = "",
        var password: String = "",
        var supplierRoyaltyPercentage: String = "",
        var investorRoyaltyPercentage: String = "") {
}
