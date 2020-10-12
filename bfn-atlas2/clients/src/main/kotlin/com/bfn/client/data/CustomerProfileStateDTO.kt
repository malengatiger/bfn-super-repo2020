package com.bfn.client.data

import java.util.*

data class CustomerProfileStateDTO (
        var account: AccountInfoDTO? = null,
        var minimumInvoiceAmount: String = "",
        var maximumInvoiceAmount: String = "",
        var dateRegistered: String = "",
        var email: String = "",
        var stellarAccountId: String = "",
        var rippleAccountId: String = "",
        var cellphone: String = "")