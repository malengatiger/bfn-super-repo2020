package com.bfn.client.data

import java.util.*

data class SupplierProfileStateDTO (
                                    val account: AccountInfoDTO,
                                    val bank: String,
                                    val bankAccount: String,
                                    val maximumDiscount: Double,
                                    val stellarAccountId: String,
                                    val rippleAccountId: String,
                                    val date: String = Date().toString())
