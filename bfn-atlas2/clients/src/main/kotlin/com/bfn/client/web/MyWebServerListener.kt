package com.bfn.client.web

import org.slf4j.LoggerFactory
import org.springframework.boot.context.event.ApplicationStartedEvent
import org.springframework.boot.web.context.WebServerInitializedEvent
import org.springframework.context.ApplicationListener
import org.springframework.stereotype.Component

@Component
class MyWebServerInitializedListener : ApplicationListener<WebServerInitializedEvent> {
    private val logger = LoggerFactory.getLogger(MyWebServerInitializedListener::class.java)
    override fun onApplicationEvent(event: WebServerInitializedEvent) {
        logger.info("\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E onApplicationEvent: WebServerInitializedEvent: " +
                "⚽️  ⚽️  \uD83C\uDF4E port: ${event.webServer.port} - ${event.applicationContext.serverNamespace} \uD83C\uDF4E ⚽️  ⚽️ doin nuthin ... ")

    }
}

@Component
class MyWebServerStartedListener : ApplicationListener<ApplicationStartedEvent> {
    private val logger = LoggerFactory.getLogger(MyWebServerStartedListener::class.java)
    override fun onApplicationEvent(event: ApplicationStartedEvent) {
        logger.info("\uD83D\uDE21 \uD83D\uDE21 \uD83D\uDE21  ApplicationStartedEvent: " +
                "⚽️  ⚽️  \uD83C\uDF4E beanDefinitionCount: ${event.applicationContext.beanDefinitionCount} \uD83C\uDF4E " +
                "Do us a ping, huh? ..." )
//        val bean = event.applicationContext.getBean(AdminController::class.java)
//        bean.ping()
    }

}
