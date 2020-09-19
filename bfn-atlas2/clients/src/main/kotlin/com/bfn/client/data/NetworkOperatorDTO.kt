package com.bfn.client.data

import com.bfn.contractstates.states.TradeMatrixItem

data class NetworkOperatorDTO(

        var account: AccountInfoDTO,
        var date: String,
        var email: String,
        var cellphone: String,
        var password: String
) {
}
