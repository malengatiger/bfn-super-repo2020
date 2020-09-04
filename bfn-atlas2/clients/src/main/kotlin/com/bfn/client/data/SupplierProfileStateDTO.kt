package com.bfn.client.data

import java.util.*

data class SupplierProfileStateDTO (val issuedBy: String?,
                                    val account: AccountInfoDTO,
                                    val bank: String,
                                    val bankAccount: String,
                                    val maximumDiscount: Double,
                                    val date: String = Date().toString())
