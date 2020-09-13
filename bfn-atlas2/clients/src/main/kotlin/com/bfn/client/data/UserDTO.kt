package com.bfn.client.data

data class UserDTO (
    var accountInfo: AccountInfoDTO,
    var email: String,
    var password: String,
    var cellphone: String,
    var uid: String,
    var stellarAccountId: String? = null,
    var rippleAccountId: String? = null

)
