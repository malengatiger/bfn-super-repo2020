package com.bfn.client.web

import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.ApplicationContext
import org.springframework.stereotype.Component
import java.text.SimpleDateFormat
import java.util.*


@Component
class ScheduledTasks {
    private val logger = LoggerFactory.getLogger(ScheduledTasks::class.java)

    private val dateFormat = SimpleDateFormat("HH:mm:ss")
    private val hour: Long = 1000 * 60 * 60
    private val hour2 = hour * 2
    //
    @Autowired
    lateinit var context: ApplicationContext
    @Autowired
    private lateinit var appProperties: AppProperties
//
//    @Scheduled(fixedRate = 3600000, initialDelay = 3600000)
//    fun startFindingBestOffers() {
//        selectBestOffers()
//    }
//    @Scheduled(cron = "0 15 * * * *")
//    fun startFindingBestOffersEvery15() {
//        runBestOffers()
//    }
//    @Scheduled(cron = "0 30 * * * *")
//    fun startFindingBestOffersEvery3minutes() {
//        runBestOffers()
//    }
//    @Scheduled(cron = "0 45 * * * *")
//    fun startFindingBestOffersEvery45minutes() {
//        runBestOffers()
//    }

    private fun selectBestOffers() {
        logger.info("\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 runBestOffers: \uD83C\uDF6F ")
        logger.info("\uD83C\uDF4F \uD83C\uDF4F startFindingBestOffers: " +
                "\uD83C\uDF4F  The time is now \uD83C\uDF4F  ${dateFormat.format(Date())} \uD83E\uDDE9")
        logger.info("\uD83E\uDD6C \uD83E\uDD6C \uD83E\uDD6C Starting Auction (Finding Best Offers):  \uD83D\uDC7A ️${Date()} \uD83E\uDD6C")
        try {
            val admin = context.getBean(AdminController::class.java)
            val list = admin.selectBestOffers()
            logger.info("\uD83C\uDF77 \uD83C\uDF77 \uD83C\uDF77 admin.runAuction found: \uD83E\uDDE9 ${list.size} tokens \uD83E\uDDE9 using context admin")
        } catch (e: Exception) {
            logger.error("Auto Auction failed", e)
        }
    }
}
