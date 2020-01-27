package com.bfn.client.dto

import java.util.*

data class SupplierPaymentDTO(
        private val acceptedOffer: InvoiceOfferDTO,
        private val supplierProfile: SupplierProfileStateDTO,
        private val datePaid: Date?,
        private val date: Date
) {
}
