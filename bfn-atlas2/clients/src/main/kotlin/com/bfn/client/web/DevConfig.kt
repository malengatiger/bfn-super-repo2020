package com.bfn.client.web

import org.springframework.context.annotation.Profile
import org.springframework.stereotype.Component

@Profile("dev")
@Component
class DevConfig : Config {
    override fun setup() { //setup some configuration here
        println("............ Development configuration setup")
    }
}
