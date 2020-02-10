package com.bfn.client.dto

import java.util.*

data class InvoiceOfferDTO (
        var invoiceId: String,
        var invoiceNumber: String,
        var offerAmount: Double,
        var discount: Double,
        var originalAmount: Double,
        var supplier: AccountInfoDTO,
        var investor: AccountInfoDTO,
        var offerDate: String,
        var investorDate: String,
        var acceptanceDate: String,
        var accepted: Boolean,
        var externalId: String,
        var offerId: String,
        var isAnchor: Boolean
)
