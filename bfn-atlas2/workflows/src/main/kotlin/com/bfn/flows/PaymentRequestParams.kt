package com.bfn.flows

import net.corda.core.serialization.CordaSerializable

@CordaSerializable
data class PaymentRequestParams ( val offerId: String,
                             val investorId: String,
                             val stellarAnchorUrl: String,
                             val delayMinutesUntilNextPaymentFlow: Long){
}