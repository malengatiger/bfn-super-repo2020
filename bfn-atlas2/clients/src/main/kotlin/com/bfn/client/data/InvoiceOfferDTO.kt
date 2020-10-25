package com.bfn.client.data


data class InvoiceOfferDTO (
        var invoiceId: String = "",
        var invoiceNumber: String = "",
        var offerAmount: String = "",
        var discount: String = "",
        var originalAmount: String = "",
        var supplier: AccountInfoDTO? = null,
        var investor: AccountInfoDTO? = null,
        var investorDate: String = "",
        var acceptanceDate: String = "",
        var externalId: String = "tbd",
        var offerId: String = "tbd",
        var dateRegistered: String = "",
        var dateClosed: String? = null
)
