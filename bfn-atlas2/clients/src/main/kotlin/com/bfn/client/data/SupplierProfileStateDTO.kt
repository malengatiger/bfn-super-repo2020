package com.bfn.client.data

import java.util.*

data class SupplierProfileStateDTO (
        var account: AccountInfoDTO? = null,
        var bank: String = "",
        var bankAccount: String= "",
        var maximumDiscount: String= "",
        var stellarAccountId: String= "",
        var rippleAccountId: String= "",
        var assetCode: String= "",
        var dateRegistered: String = "")
