package com.bfn.client.web

import org.springframework.context.annotation.Profile
import org.springframework.stereotype.Component

@Profile("prod")
@Component
class ProdConfig : Config {
    override fun setup() { //setup some configuration here
        println("............ Production configuration setup")
    }
}
