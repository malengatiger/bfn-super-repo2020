package com.bfn.client.dto

import java.util.*

data class SupplierProfileStateDTO (val issuedBy: String?,
                                    val accountId: String,
                                    val maximumDiscount: Double,
                                    val date: Date = Date())
