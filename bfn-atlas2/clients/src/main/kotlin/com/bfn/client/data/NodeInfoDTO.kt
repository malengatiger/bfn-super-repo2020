package com.bfn.client.data

data class NodeInfoDTO (
        var addresses: List<String>? = null,
        var platformVersion: Long = 0,
        var serial: Long = 0,
        var webServerAddress: String? = null,
        var host: String? = null,
        var port: Long? = null,
        var springBootProfile: String? = null,
        var webServerPort: Int? = null,
        var username: String? = null,
        var password: String? = null,
        var firebaseProjectId: String? = null,
        var firebaseUrl: String? = null,
        var date: Long? = null


)
