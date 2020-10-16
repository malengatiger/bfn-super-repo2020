package com.bfn.client.data

import com.bfn.contractstates.states.SupplierProfileState


data class AcceptedOfferDTO (
        var invoiceId: String = "",
        var invoiceNumber: String = "",
        var offerAmount: String = "",
        var discount: String = "",
        var originalAmount: String = "",
        var supplier: SupplierProfileStateDTO? = null,
        var investor: InvestorProfileStateDTO? = null,
        var customer: CustomerProfileStateDTO? = null,
        var investorDate: String = "",
        var acceptanceDate: String = "",
        var externalId: String = "tbd",
        var offerId: String = "tbd",
        var dateRegistered: String = ""
)
