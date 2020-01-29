package com.bfn.client.web

import net.corda.core.utilities.loggerFor
import org.slf4j.LoggerFactory
import org.springframework.context.annotation.Profile
import org.springframework.stereotype.Component
import javax.annotation.PostConstruct

@Profile("prod")
@Component
class ProdComponent {
    private val logger = LoggerFactory.getLogger(ProdComponent::class.java)
    @PostConstruct
    fun init() {
        logger.info("\uD83C\uDF00 \uD83C\uDF00 \uD83C\uDF00 \uD83C\uDF00 Will only run in \uD83C\uDF00 PRODUCTION mode \uD83C\uDF00 \uD83C\uDF00")
    }
}
