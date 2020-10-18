package com.bfn.flows

/*
private String paymentRequestId, seed,
            assetCode,
            amount,
            date, anchorId,
            destinationAccount, sourceAccount, loanId, agentId, clientId;
 */
data class StellarPaymentDTO(
        val paymentRequestId:String,
        val amount:String,
        val assetCode: String,
        val date: String,
        val destinationAccount: String,
        val sourceAccount:String,
        val paymentType:Int) {
}

const val PAYMENT_SUPPLIER = 1
const val PAYMENT_INVESTOR = 2
const val PAYMENT_ROYALTY = 3
const val PAYMENT_FUNDING = 4