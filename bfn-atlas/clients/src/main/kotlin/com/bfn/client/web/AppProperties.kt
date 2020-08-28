package com.bfn.client.web

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration

@Configuration
@ConfigurationProperties(prefix = "myconfig")
open class AppProperties {
    lateinit var firebasePath: String
    lateinit var partyA: String
    lateinit var partyB: String
    lateinit var partyC: String
    lateinit var regulator: String
    lateinit var intervalPartyA: String
    lateinit var intervalPartyB: String
    lateinit var intervalPartyC: String
    lateinit var message: String
}
