package com.bfn.client.dto

data class NodeInfoDTO (
    var addresses: List<String>? = null,
    var platformVersion: Long = 0,
    var serial: Long = 0,
    var webAPIUrl: String? = null,
    var host: String? = null,
    var port: Long? = null


)
