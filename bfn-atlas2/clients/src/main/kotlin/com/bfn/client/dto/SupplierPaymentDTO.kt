package com.bfn.client.dto

import java.util.*

data class SupplierPaymentDTO(
         val acceptedOffer: InvoiceOfferDTO,
         val supplierProfile: SupplierProfileStateDTO,
         val paid: Boolean = false,
         val date: String
) {
}
