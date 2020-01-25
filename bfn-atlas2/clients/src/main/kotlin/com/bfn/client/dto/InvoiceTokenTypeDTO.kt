package com.bfn.client.dto

//import com.bfn.states.InvoiceOfferState
import net.corda.core.identity.Party
import java.security.PublicKey

class InvoiceTokenTypeDTO {
    private val investor: Party? = null
    private val customer: Party? = null
    private val supplier: Party? = null
    private val investorKey: PublicKey? = null
    private val customerKey: PublicKey? = null
    private val supplierKey: PublicKey? = null
    private val holderKey: PublicKey? = null
//    private val invoiceOfferState: InvoiceOfferState? = null
}
