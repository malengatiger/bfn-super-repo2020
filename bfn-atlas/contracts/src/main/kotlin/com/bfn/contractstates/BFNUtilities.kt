package com.bfn

import com.r3.corda.lib.tokens.contracts.types.TokenType
import com.r3.corda.lib.tokens.money.FiatCurrency
import net.corda.core.contracts.Amount

// South African Rand - ZAR
val ZAR = FiatCurrency.getInstance("ZAR")

fun ZAR(amount: Int): Amount<TokenType> = com.r3.corda.lib.tokens.contracts.utilities.amount(amount, ZAR)
fun ZAR(amount: Long): Amount<TokenType> = com.r3.corda.lib.tokens.contracts.utilities.amount(amount, ZAR)
fun ZAR(amount: Double): Amount<TokenType> = com.r3.corda.lib.tokens.contracts.utilities.amount(amount, ZAR)

val Int.ZAR: Amount<TokenType> get() = ZAR(this)
val Long.ZAR: Amount<TokenType> get() = ZAR(this)
val Double.ZAR: Amount<TokenType> get() = ZAR(this)
