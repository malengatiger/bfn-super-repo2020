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

    private fun selectBestOffers() {
        logger.info("\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 runBestOffers: \uD83C\uDF6F ")
        logger.info("\uD83C\uDF4F \uD83C\uDF4F startFindingBestOffers: " +
                "\uD83C\uDF4F  The time is now \uD83C\uDF4F  ${dateFormat.format(Date())} \uD83E\uDDE9")
        logger.info("\uD83E\uDD6C \uD83E\uDD6C \uD83E\uDD6C Starting Auction (Finding Best Offers):  \uD83D\uDC7A ️${Date()} \uD83E\uDD6C")

    }
}
