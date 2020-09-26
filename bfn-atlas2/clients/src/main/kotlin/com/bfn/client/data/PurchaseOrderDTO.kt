package com.bfn.client.data

import com.r3.corda.lib.accounts.contracts.states.AccountInfo
import java.util.*

class PurchaseOrderDTO (
        val purchaseOrderId: String,
        val purchaseOrderNumber: String,
        val customer: AccountInfoDTO,
        val supplier: AccountInfoDTO,
        val amount: String,
        val dateRegistered: Date,
        val description: String
) {
}