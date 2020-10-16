package com.bfn.client.data

data class InvestorPaymentDTO(
        var investorPaymentId: String = "",
        var supplierPayment: SupplierPaymentDTO? = null,
        var investorProfile: InvestorProfileStateDTO? = null,
        var customerProfile: CustomerProfileStateDTO? = null,
        var dateRegistered: String = "")