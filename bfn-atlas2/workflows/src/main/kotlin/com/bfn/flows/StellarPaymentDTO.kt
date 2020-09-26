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
        val sourceAccount:String
) {
}