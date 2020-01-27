package com.bfn.client.dto

import java.math.BigDecimal
import java.util.*

class InvoiceDTO {
    var invoiceId: String? = null
    var invoiceNumber: String? = null
    var externalId: String? = null
    var description: String? = null
    var amount: BigDecimal? = null
    var totalAmount: BigDecimal? = null
    var valueAddedTax: Double? = null
    var dateRegistered: Date? = null
    var supplier: AccountInfoDTO? = null
    var customer: AccountInfoDTO? = null
    var supplierPublicKey: String? = null
    var customerPublicKey: String? = null

    constructor() {}
    constructor(invoiceId: String?, invoiceNumber: String?,
                description: String?, amount: BigDecimal, totalAmount: BigDecimal,
                valueAddedTax: Double, dateRegistered: Date?,
                supplier: AccountInfoDTO?, customer: AccountInfoDTO?, supplierPublicKey: String?, customerPublicKey: String?) {
        this.invoiceId = invoiceId
        this.invoiceNumber = invoiceNumber
        this.description = description
        this.amount = amount
        this.totalAmount = totalAmount
        this.valueAddedTax = valueAddedTax
        this.dateRegistered = dateRegistered
        this.supplier = supplier
        this.customer = customer
        this.supplierPublicKey = supplierPublicKey
        this.customerPublicKey = customerPublicKey
    }

}
