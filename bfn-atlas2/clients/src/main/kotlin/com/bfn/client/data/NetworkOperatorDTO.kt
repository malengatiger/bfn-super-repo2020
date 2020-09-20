package com.bfn.client.data

import com.bfn.contractstates.states.TradeMatrixItem
import com.google.gson.annotations.SerializedName

data class NetworkOperatorDTO(

        var account: AccountInfoDTO = AccountInfoDTO(),
        var date: String = "",
        var email: String = "",
        var cellphone: String = "",
        var password: String = ""
) {
//    constructor(): this(email = "", account = AccountInfoDTO(), date = "", cellphone = "", password = "")
}
