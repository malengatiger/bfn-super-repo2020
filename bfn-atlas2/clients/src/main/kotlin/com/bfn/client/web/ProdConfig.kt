package com.bfn.client.web

import org.slf4j.LoggerFactory
import org.springframework.context.annotation.Profile
import org.springframework.stereotype.Component

@Profile("prod")
@Component
class ProdConfig : Config {
    private val logger = LoggerFactory.getLogger(FirebaseScaffold::class.java)
    override fun setup() { //setup some configuration here
        logger.info("\uD83C\uDF1E \uD83C\uDF1E \uD83C\uDF1E ............ Production configuration \uD83C\uDF1E \uD83C\uDF1E \uD83C\uDF1E")
    }
}
