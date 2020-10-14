package com.bfn.client.data

data class SupplierPaymentDTO(
        var supplierPaymentId: String = "",
        var acceptedOffer: AcceptedOfferDTO? = null,
        var supplierProfile: SupplierProfileStateDTO? = null,
        var dateRegistered: String = ""
) {
}
