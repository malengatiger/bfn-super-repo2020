package com.bfn.client.dto

import java.math.BigDecimal

data class TokenDTO(var accountId: String,
                    var invoiceId: String,
                    var tokenIdentifier: String,
                    var amount: BigDecimal,
                    var invoiceAmount: BigDecimal,
                    var account: AccountInfoDTO,
                    var issuer: String,
                    var holder: String)
