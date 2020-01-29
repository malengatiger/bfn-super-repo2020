package com.bfn.client.web

//import org.springframework.cloud.config.server.EnableConfigServer


import net.corda.nodeapi.internal.config.toConfigValue
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.Banner
import org.springframework.boot.WebApplicationType
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.web.embedded.EmbeddedWebServerFactoryCustomizerAutoConfiguration
import org.springframework.boot.builder.SpringApplicationBuilder
import org.springframework.boot.context.event.ApplicationReadyEvent
import org.springframework.boot.web.context.WebServerInitializedEvent
import org.springframework.boot.web.server.WebServerFactoryCustomizer
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory
import org.springframework.context.ApplicationContext
import org.springframework.context.ApplicationListener
import org.springframework.context.annotation.Bean
import org.springframework.scheduling.annotation.EnableScheduling
import java.net.InetAddress
import java.text.SimpleDateFormat
import java.util.*
import java.util.logging.Logger


/**
 * Our Spring Boot application.
 */

fun main(args: Array<String>) {
    println("\uD83E\uDDE9 \uD83E\uDDE9 \uD83E\uDDE9 \uD83E\uDDE9 " +
            "BFN Web API (Kotlin) starting  ... Senor! ...");
            val p = SpringApplicationBuilder().sources(
                    ApiApp::class.java)
            .bannerMode(Banner.Mode.OFF)
            .web(WebApplicationType.SERVLET)
            .run(*args)

    println("\uD83E\uDDE9 \uD83E\uDDE9 \uD83E\uDDE9 \uD83E\uDDE9 " +
            "BFN Web API (Kotlin) started " +
            "\uD83E\uDDE9 \uD83E\uDDE9 \uD83E\uDDE9 \uD83E\uDDE9 \uD83C\uDF50️ " +
            "isRunning: ${p.isRunning} \uD83C\uDF50️")

}

@SpringBootApplication
@EnableScheduling

private open class ApiApp: ApplicationListener<ApplicationReadyEvent> {
    private val logger = Logger.getLogger(ApiApp::class.java.name)

    @Autowired
    private lateinit var context: ApplicationContext
    @Value("\${interval}")
    private var interval: String = "900"
    @Value("\${spring.profiles.active}")
    private var profile: String = ""

    override fun onApplicationEvent(contextRefreshedEvent: ApplicationReadyEvent) {
        logger.info("\uD83E\uDD6C \uD83E\uDD6C \uD83E\uDD6C  STARTED BFN WEB APP:  " +
                "\uD83E\uDDE9 onApplicationEvent: mainApplicationClass: " +
                "\uD83D\uDC7D ${contextRefreshedEvent.springApplication.mainApplicationClass}  \uD83D\uDC7D ")

        logger.info("\uD83D\uDE21 \uD83D\uDE21 \uD83D\uDE21 host: \uD83E\uDD6C \uD83E\uDD6C \uD83E\uDD6C \uD83D\uDE21 " +
                "${InetAddress.getLocalHost()} profile: $profile \uD83D\uDE21")
//        info()
//        setTimer()
        logger.info("\uD83D\uDE21 \uD83D\uDE21 \uD83D\uDE21 WE ARE DONE STARTING UP!!! \uD83E\uDD6C \uD83E\uDD6C \uD83E\uDD6C \uD83D\uDE21 ")

    }
//
//    private fun info() {
//
//        var cnt = 0
//        val c = AdminController::class
//        val functions = c.functions
//        val sorted = functions.sortedBy { it.name }
//        logger.info("\n..... \uD83E\uDD6C \uD83E\uDD6C \uD83E\uDD6C \uD83E\uDD6C Functions available from AdminController")
//        sorted.forEach() {
//            cnt++
//            logger.info("\uD83E\uDD6C AdminController Function: #$cnt \t\uD83C\uDF38 ${it.name} \uD83C\uDF38 ")
//        }
//        cnt = 0
//        val d = SupplierController::class
//        val functions2 = d.functions
//        val sorted3 = functions2.sortedBy { it.name }
//        logger.info("\n..... \uD83D\uDE21 \uD83D\uDE21 \uD83D\uDE21 Functions available from SupplierController")
//        sorted3.forEach() {
//            cnt++
//            logger.info(" \uD83D\uDE21 SupplierController Function: #$cnt \t\uD83D\uDE21 ${it.name}  \uD83D\uDE21 ")
//        }
//        cnt = 0
//        logger.info("\n..... \uD83E\uDDA0 \uD83E\uDDA0 \uD83E\uDDA0 \uD83E\uDDA0  Functions available from WorkerBee ...")
//        val workerBee = WorkerBee::class
//        val collection = workerBee.functions
//        val sorted2 = collection.sortedBy { it.name }
//        sorted2.forEach() {
//            cnt++
//            logger.info("\uD83C\uDF4E WorkerBee Function: #$cnt \t\uD83E\uDDA0  ${it.name} \uD83E\uDDA0 ")
//        }
//        logger.info("Pinging self, \uD83C\uDF56 \uD83C\uDF56 ... just for the hell of it! \uD83C\uDF56 \uD83C\uDF56")
//        val bean = context.getBean(AdminController::class.java)
//        bean.ping()
//        val flows = bean.getFlows()
//        cnt = 0
//        flows.forEach() {
//            if (it.contains("com.bfn")) {
//                cnt++
//                logger.info("\uD83D\uDD37 Registered Corda Flow #$cnt : \uD83D\uDD37  $it  \uD83C\uDF4F")
//            }
//        }
//    }

    private val dateFormat = SimpleDateFormat("HH:mm:ss")
    fun setTimer() {
        val bean = context.getBean(AdminController::class.java)
        val org: String = bean.getProxy().nodeInfo().legalIdentities.first().name.organisation
        logger.info("\n\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 NODE \uD83C\uDF4E $org \uD83C\uDF4E " +
                "will start a Timer to control selectBestOffers for suppliers ...  ⏰  ⏰  ⏰ ")
        logger.info("\uD83E\uDD6C\uD83E\uDD6C\uD83E\uDD6C\uD83E\uDD6C\uD83E\uDD6C interval from properties : " +
                " \uD83D\uDE21  $interval minutes \uD83D\uDE21 ")
        startTimer( org, interval.toLong(), bean)
    }
    fun startTimer(name: String, minutes: Long, bean: AdminController) {
        logger.info("\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E  startTimer:  \uD83C\uDF50 NODE: $name \uD83C\uDF50️ ⏳ Interval in Minutes: $minutes  ⏰  ⏰  ⏰ ")
        val ms: Long = minutes * 1000 * 60
        Timer().schedule(object : TimerTask() {
            override fun run() {
                logger.info("\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E Timer TRIGGERED : The time is now \uD83C\uDF4F  ${dateFormat.format(Date())}" +
                        "\uD83C\uDF36 \uD83C\uDF36 \uD83C\uDF36  selectBestOffers on $name every $minutes minutes \uD83C\uDF4F  ")
                bean.selectBestOffers()
            }
        }, ms, ms)
    }

    @Bean
    open fun webServerFactoryCustomizer(): WebServerFactoryCustomizer<ConfigurableServletWebServerFactory>? {
        logger.info("\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E ... setting context path to /bfn; " +
                "profile:  \uD83C\uDF4E $profile \uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E ")
        return WebServerFactoryCustomizer { factory: ConfigurableServletWebServerFactory -> factory.setContextPath("/bfn") };
    }


}
