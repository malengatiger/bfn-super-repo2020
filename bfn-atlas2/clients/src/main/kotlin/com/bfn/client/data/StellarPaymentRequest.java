package com.bfn.client.data;

public  class StellarPaymentRequest {
    private String paymentRequestId, seed,
            assetCode,
            amount,
            date, anchorId,
            destinationAccount, sourceAccount, loanId, agentId, clientId;
    private Long ledger;

    public StellarPaymentRequest() {
    }

    public StellarPaymentRequest(final String paymentRequestId, final String seed, final String assetCode, final String amount,
                                 final String date, final String anchorId, final String destinationAccount, final String sourceAccount,
                                 final String agentId, final String clientId) {
        this.paymentRequestId = paymentRequestId;
        this.seed = seed;
        this.assetCode = assetCode;
        this.amount = amount;
        this.date = date;
        this.anchorId = anchorId;
        this.destinationAccount = destinationAccount;
        this.sourceAccount = sourceAccount;
        this.agentId = agentId;
        this.clientId = clientId;
    }

    public String getAgentId() {
        return agentId;
    }

    public void setAgentId(final String agentId) {
        this.agentId = agentId;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(final String clientId) {
        this.clientId = clientId;
    }

    public String getLoanId() {
        return loanId;
    }

    public void setLoanId(final String loanId) {
        this.loanId = loanId;
    }

    public String getPaymentRequestId() {
        return paymentRequestId;
    }

    public void setPaymentRequestId(final String paymentRequestId) {
        this.paymentRequestId = paymentRequestId;
    }

    public String getSourceAccount() {
        return sourceAccount;
    }

    public void setSourceAccount(final String sourceAccount) {
        this.sourceAccount = sourceAccount;
    }

    public String getAnchorId() {
        return anchorId;
    }

    public void setAnchorId(final String anchorId) {
        this.anchorId = anchorId;
    }

    public String getDate() {
        return date;
    }

    public void setDate(final String date) {
        this.date = date;
    }

    public Long getLedger() {
        return ledger;
    }

    public void setLedger(final Long ledger) {
        this.ledger = ledger;
    }

    public String getSeed() {
        return seed;
    }

    public void setSeed(final String seed) {
        this.seed = seed;
    }

    public String getAssetCode() {
        return assetCode;
    }

    public void setAssetCode(final String assetCode) {
        this.assetCode = assetCode;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(final String amount) {
        this.amount = amount;
    }

    public String getDestinationAccount() {
        return destinationAccount;
    }

    public void setDestinationAccount(final String destinationAccount) {
        this.destinationAccount = destinationAccount;
    }
}
