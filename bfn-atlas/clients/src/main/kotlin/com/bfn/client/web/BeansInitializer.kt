package com.bfn.client.web
import org.slf4j.LoggerFactory
import org.springframework.context.ApplicationContextInitializer
import org.springframework.context.support.GenericApplicationContext
import org.springframework.stereotype.Component

@Component
class BeansInitializer : ApplicationContextInitializer<GenericApplicationContext> {
    private val logger = LoggerFactory.getLogger(BeansInitializer::class.java)
    override fun initialize(context: GenericApplicationContext)  {
        logger.info(" \uD83C\uDF4E  \uD83C\uDF4E BeansInitializer starting to initialize  \uD83E\uDDE9 Beans")
        beans().initialize(context)
        logger.info(" \uD83C\uDF4E  \uD83C\uDF4E BeansInitializer done initializing  " +
                "\uD83E\uDDE9 context is active:: ${context.isActive}  ")
    }


}

