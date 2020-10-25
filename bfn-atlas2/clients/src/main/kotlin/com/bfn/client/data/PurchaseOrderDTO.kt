package com.bfn.client.data

import com.r3.corda.lib.accounts.contracts.states.AccountInfo
import java.util.*

class PurchaseOrderDTO (
        var purchaseOrderId: String = "",
        var purchaseOrderNumber: String = "",
        var customer: AccountInfoDTO? = null,
        var supplier: AccountInfoDTO? = null,
        var amount: String  = "",
        var dateRegistered: String = "",
        var description: String = "",
        var invoiceCreatedDate: String? = null
) {
}