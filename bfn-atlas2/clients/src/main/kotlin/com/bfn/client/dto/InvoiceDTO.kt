package com.bfn.client.dto

import java.util.*

data class InvoiceDTO (
    var invoiceId: String,
    var invoiceNumber: String,
    var externalId: String,
    var description: String,
    var amount: Double,
    var totalAmount: Double,
    var valueAddedTax: Double,
    var dateRegistered: String,
    var supplier: AccountInfoDTO,
    var customer: AccountInfoDTO
)


