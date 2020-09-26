package com.bfn.client.data


data class InvoiceOfferDTO (
        var invoiceId: String,
        var invoiceNumber: String,
        var offerAmount: String,
        var discount: String,
        var originalAmount: String,
        var supplier: AccountInfoDTO,
        var investor: AccountInfoDTO,
        var offerDate: String,
        var investorDate: String,
        var acceptanceDate: String,
        var accepted: Boolean,
        var externalId: String,
        var offerId: String
)
