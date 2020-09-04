package com.bfn.client.data

class InvoiceOfferAllDTO {
    var invoiceId: String? = null
    var offerAmount = 0.0
    var discount = 0.0
    var accountId: String? = null

    constructor(invoiceId: String?, offerAmount: Double, discount: Double, accountId: String?) {
        this.invoiceId = invoiceId
        this.offerAmount = offerAmount
        this.discount = discount
        this.accountId = accountId
    }

    constructor() {}

}
