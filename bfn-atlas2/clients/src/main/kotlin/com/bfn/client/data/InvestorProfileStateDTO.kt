package com.bfn.client.data

data class InvestorProfileStateDTO (
                                    val account: AccountInfoDTO,
                                    val minimumInvoiceAmount: Double,
                                    val maximumInvoiceAmount: Double,
                                    val totalInvestment: Double,
                                    val defaultDiscount: Double,
                                    val bank: String,
                                    val bankAccount: String,
                                    val stellarAccountId: String,
                                    val rippleAccountId: String,
                                    val date: String)
