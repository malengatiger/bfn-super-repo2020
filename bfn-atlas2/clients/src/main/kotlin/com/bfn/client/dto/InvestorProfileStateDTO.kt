package com.bfn.client.dto

import java.util.*

data class InvestorProfileStateDTO (val issuedBy: String?,
                                    val accountId: String,
                                    val minimumInvoiceAmount: Double,
                                    val maximumInvoiceAmount: Double,
                                    val totalInvestment: Double,
                                    val defaultDiscount: Double,
                                    val date: String)
