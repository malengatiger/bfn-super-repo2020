package com.bfn.client.data;

import java.util.List;

public class InvestorProfileStateDTO {
    AccountInfoDTO account;
    String minimumInvoiceAmount;
    String maximumInvoiceAmount;
    String totalInvestment;
    String defaultDiscount;
    String bank;
    String bankAccount;
    String stellarAccountId;
    String rippleAccountId;
    List<TradeMatrixItemDTO> tradeMatrixItems;
    String dateRegistered;

    public InvestorProfileStateDTO() {
    }

    public InvestorProfileStateDTO(AccountInfoDTO account, String minimumInvoiceAmount,
                                   String maximumInvoiceAmount, String totalInvestment,
                                   String defaultDiscount, String bank, String bankAccount,
                                   String stellarAccountId, String rippleAccountId,
                                   List<TradeMatrixItemDTO> tradeMatrixItems, String dateRegistered) {
        this.account = account;
        this.minimumInvoiceAmount = minimumInvoiceAmount;
        this.maximumInvoiceAmount = maximumInvoiceAmount;
        this.totalInvestment = totalInvestment;
        this.defaultDiscount = defaultDiscount;
        this.bank = bank;
        this.bankAccount = bankAccount;
        this.stellarAccountId = stellarAccountId;
        this.rippleAccountId = rippleAccountId;
        this.tradeMatrixItems = tradeMatrixItems;
        this.dateRegistered = dateRegistered;
    }

    public AccountInfoDTO getAccount() {
        return account;
    }

    public void setAccount(AccountInfoDTO account) {
        this.account = account;
    }

    public String getMinimumInvoiceAmount() {
        return minimumInvoiceAmount;
    }

    public void setMinimumInvoiceAmount(String minimumInvoiceAmount) {
        this.minimumInvoiceAmount = minimumInvoiceAmount;
    }

    public String getMaximumInvoiceAmount() {
        return maximumInvoiceAmount;
    }

    public void setMaximumInvoiceAmount(String maximumInvoiceAmount) {
        this.maximumInvoiceAmount = maximumInvoiceAmount;
    }

    public String getTotalInvestment() {
        return totalInvestment;
    }

    public void setTotalInvestment(String totalInvestment) {
        this.totalInvestment = totalInvestment;
    }

    public String getDefaultDiscount() {
        return defaultDiscount;
    }

    public void setDefaultDiscount(String defaultDiscount) {
        this.defaultDiscount = defaultDiscount;
    }

    public String getBank() {
        return bank;
    }

    public void setBank(String bank) {
        this.bank = bank;
    }

    public String getBankAccount() {
        return bankAccount;
    }

    public void setBankAccount(String bankAccount) {
        this.bankAccount = bankAccount;
    }

    public String getStellarAccountId() {
        return stellarAccountId;
    }

    public void setStellarAccountId(String stellarAccountId) {
        this.stellarAccountId = stellarAccountId;
    }

    public String getRippleAccountId() {
        return rippleAccountId;
    }

    public void setRippleAccountId(String rippleAccountId) {
        this.rippleAccountId = rippleAccountId;
    }

    public List<TradeMatrixItemDTO> getTradeMatrixItems() {
        return tradeMatrixItems;
    }

    public void setTradeMatrixItems(List<TradeMatrixItemDTO> tradeMatrixItems) {
        this.tradeMatrixItems = tradeMatrixItems;
    }

    public String getDateRegistered() {
        return dateRegistered;
    }

    public void setDateRegistered(String dateRegistered) {
        this.dateRegistered = dateRegistered;
    }
}
