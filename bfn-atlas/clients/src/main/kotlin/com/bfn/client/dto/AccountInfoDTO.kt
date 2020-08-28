package com.bfn.client.dto

class AccountInfoDTO {
    var identifier: String? = null
    var host: String? = null
    var name: String? = null
    var status: String? = null

    constructor(identifier: String?, host: String?, name: String?, status: String?) {
        this.identifier = identifier
        this.host = host
        this.name = name
        this.status = status
    }

    constructor() {}

}
