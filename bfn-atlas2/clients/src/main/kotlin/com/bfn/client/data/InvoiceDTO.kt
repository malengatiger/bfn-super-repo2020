package com.bfn.client.data


data class InvoiceDTO (
        var invoiceId: String,
        var invoiceNumber: String,
        var externalId: String,
        var description: String,
        var amount: String,
        var totalAmount: String,
        var valueAddedTax: String,
        var dateRegistered: String,
        var supplier: AccountInfoDTO,
        var customer: AccountInfoDTO
)


