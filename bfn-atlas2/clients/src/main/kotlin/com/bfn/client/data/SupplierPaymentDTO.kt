package com.bfn.client.data

data class SupplierPaymentDTO(
        val supplierPaymentId: String,
        val acceptedOffer: InvoiceOfferDTO,
        val supplierProfile: SupplierProfileStateDTO,
        val date: String
) {
}
