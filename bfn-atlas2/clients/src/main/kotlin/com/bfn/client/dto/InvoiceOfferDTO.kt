package com.bfn.client.dto

import java.util.*

class InvoiceOfferDTO {
    var invoiceId: String? = null
    var invoiceNumber: String? = null
    var offerAmount: Double? = null
    var discount: Double? = null
    var originalAmount: Double? = null
    var supplier: AccountInfoDTO? = null
    var investor: AccountInfoDTO? = null
    var owner: AccountInfoDTO? = null
    var customer: AccountInfoDTO? = null
    var offerDate: Date? = null
    var investorDate: Date? = null
    var supplierPublicKey: String? = null
    var investorPublicKey: String? = null
    var accepted: Boolean? = false
    var externalId: String? = null

    constructor(invoiceId: String?, invoiceNumber: String?,
                offerAmount: Double, discount: Double,
                originalAmount: Double,
                supplier: AccountInfoDTO?, investor: AccountInfoDTO?,
                owner: AccountInfoDTO?, offerDate: Date?, investorDate: Date?,
                supplierPublicKey: String?, investorPublicKey: String?, customer: AccountInfoDTO?) {
        this.invoiceId = invoiceId
        this.offerAmount = offerAmount
        this.discount = discount
        this.originalAmount = originalAmount
        this.supplier = supplier
        this.investor = investor
        this.owner = owner
        this.offerDate = offerDate
        this.investorDate = investorDate
        this.supplierPublicKey = supplierPublicKey
        this.investorPublicKey = investorPublicKey
        this.invoiceNumber = invoiceNumber
        this.customer = customer
    }

    constructor() {}

}
