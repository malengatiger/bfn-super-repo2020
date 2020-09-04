package com.bfn.client.data

data class UserDTO (
    var name: String,
    var email: String,
    var password: String? = null,
    var cellphone: String? = null,
    var uid: String? = null

)
