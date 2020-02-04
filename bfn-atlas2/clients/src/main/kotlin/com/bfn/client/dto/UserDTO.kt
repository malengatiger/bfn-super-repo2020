package com.bfn.client.dto

data class UserDTO (
    var name: String,
    var email: String,
    var password: String? = null,
    var cellphone: String? = null,
    var uid: String? = null

)
