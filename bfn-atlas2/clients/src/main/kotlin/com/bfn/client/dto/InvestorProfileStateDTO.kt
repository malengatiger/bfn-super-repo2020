package com.bfn.client.dto

import java.math.BigDecimal
import java.util.*

data class InvestorProfileStateDTO (val issuedBy: String?,
                                    val accountId: String,
                                    val minimumInvoiceAmount: BigDecimal,
                                    val maximumInvoiceAmount: BigDecimal,
                                    val totalInvestment: BigDecimal,
                                    val defaultDiscount: Double,
                                    var date: Date)
