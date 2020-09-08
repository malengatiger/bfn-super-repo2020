package com.bfn.client.data

data class SupplierPaymentDTO(
         val acceptedOffer: InvoiceOfferDTO,
         val supplierProfile: SupplierProfileStateDTO,
         val paid: Boolean = false,
         val date: String,
         var paymentRequest: PaymentRequestDTO?
) {
}
