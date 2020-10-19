package com.bfn.client.web

import org.slf4j.LoggerFactory
import org.springframework.context.annotation.Profile
import org.springframework.stereotype.Component

@Profile("dev")
@Component
class DevConfig : Config {
    private val logger = LoggerFactory.getLogger(DevConfig::class.java)

    override fun setup() { //setup some configuration here
        logger.info("⛅️ ⛅️ ⛅️ ............ This is a Development configuration  ..... ⛅️ ⛅️ ⛅️")
    }
}
