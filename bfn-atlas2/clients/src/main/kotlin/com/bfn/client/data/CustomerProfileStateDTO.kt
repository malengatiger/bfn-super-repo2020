package com.bfn.client.data

import java.util.*

data class CustomerProfileStateDTO (
        var account: AccountInfoDTO,
        val minimumInvoiceAmount: Double,
        val maximumInvoiceAmount: Double,
        val dateRegistered: Date,
        val email: String,
        var stellarAccountId: String,
        val rippleAccountId: String,
        val cellphone: String)