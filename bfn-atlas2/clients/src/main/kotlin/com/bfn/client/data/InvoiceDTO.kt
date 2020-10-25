package com.bfn.client.data

import com.bfn.contractstates.states.PurchaseOrderState


data class InvoiceDTO (
        var invoiceId: String = "",
        var invoiceNumber: String = "",
        var externalId: String = "",
        var description: String = "",
        var amount: String = "",
        var totalAmount: String = "",
        var valueAddedTax: String = "",
        var dateRegistered: String = "",
        var purchaseOrder: PurchaseOrderDTO? = null,
        var supplier: AccountInfoDTO? = null,
        var customer: AccountInfoDTO? = null,
        var investorPaymentDate: String? = null,
        var supplierPaymentDate: String? = null,
        var investorPaymentId: String? = null,
        var supplierPaymentId: String? = null
)


