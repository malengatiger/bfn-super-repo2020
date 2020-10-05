package com.bfn.client.data

import java.util.*

data class CustomerProfileStateDTO (
        var account: AccountInfoDTO,
        val minimumInvoiceAmount: String,
        val maximumInvoiceAmount: String,
        val dateRegistered: String,
        val email: String,
        var stellarAccountId: String,
        val rippleAccountId: String,
        val cellphone: String)