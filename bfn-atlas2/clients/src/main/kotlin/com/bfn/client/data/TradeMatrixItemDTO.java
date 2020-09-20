package com.bfn.client.data;


public class TradeMatrixItemDTO {
    String startInvoiceAmount, endInvoiceAmount, offerDiscount;
    String date;

    public TradeMatrixItemDTO() {
    }

    public TradeMatrixItemDTO(String startInvoiceAmount, String endInvoiceAmount, String offerDiscount, String date) {
        this.startInvoiceAmount = startInvoiceAmount;
        this.endInvoiceAmount = endInvoiceAmount;
        this.offerDiscount = offerDiscount;
        this.date = date;
    }

    public String getStartInvoiceAmount() {
        return startInvoiceAmount;
    }

    public void setStartInvoiceAmount(String startInvoiceAmount) {
        this.startInvoiceAmount = startInvoiceAmount;
    }

    public String getEndInvoiceAmount() {
        return endInvoiceAmount;
    }

    public void setEndInvoiceAmount(String endInvoiceAmount) {
        this.endInvoiceAmount = endInvoiceAmount;
    }

    public String getOfferDiscount() {
        return offerDiscount;
    }

    public void setOfferDiscount(String offerDiscount) {
        this.offerDiscount = offerDiscount;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
