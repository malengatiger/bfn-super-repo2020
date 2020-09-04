package com.bfn.client.data

data class TokenDTO(var accountId: String,
                    var invoiceId: String,
                    var tokenIdentifier: String,
                    var amount: Double,
                    var invoiceAmount: Double,
                    var account: AccountInfoDTO,
                    var issuer: String,
                    var holder: String)