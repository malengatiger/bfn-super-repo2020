package com.bfn.client.web

import com.bfn.client.data.NodeInfoDTO
import com.bfn.client.web.buildFirebase
import com.bfn.client.web.getThisNode
import com.google.firebase.cloud.FirestoreClient
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.core.io.ResourceLoader
import org.springframework.stereotype.Component
import java.io.File
import java.util.*
import javax.annotation.PostConstruct

@Component
class ResponseTimer {
    @Autowired
    private val resourceLoader: ResourceLoader? = null
    @Value("\${spring.profiles.active}")
    private var profile: String = "dev"
    @Value("\${node.index}")
    private var stringIndex: String = "0"
    val logger: Logger = LoggerFactory.getLogger(ResponseTimer::class.java)

    @PostConstruct
    fun init() {
           logger.info("\n\uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E " +
                   "Setting up the ResponseTimer with Firebase ....profile: $profile index: $stringIndex \n")

        try {
            val pair: Pair<NodeInfoDTO, File> = getThisNode(
                    resourceLoader = resourceLoader!!, nodeIndex = stringIndex.toInt(),
                    springBootProfile = profile)

            buildFirebase(pair.second, stringIndex.toInt())

            logger.info("\n\uD83E\uDD6C \uD83E\uDD6C \uD83E\uDD6C \uD83E\uDD6C " +
                    "ResponseTimer set up OK with Firebase .... \uD83C\uDF4E \uD83C\uDF4E\n")

        } catch (e: Exception) {
            logger.error("\uD83C\uDF4B \uD83C\uDF4B Firebase app already set up: " +
                    "\uD83C\uDF4B ${e.message} \uD83C\uDF4B ")
        }
    }

    companion object {
        @JvmStatic
        fun writeResponse(start: Date, callName: String, profile: String) {
            val logger = LoggerFactory.getLogger(ResponseTimer::class.java)
            val elapsed = Date().time - start.time
            val resp = Response(
                    start = start.toString(), end = Date().toString(),
                    elapsedMilliseconds = elapsed, callName = callName,
                    profile = profile)
            try {
                val db = FirestoreClient.getFirestore()
                db.collection("responseTimes").add(resp)
                logger.info("Response time added to Firestore: \uD83C\uDF4E elapsed: $elapsed milliseconds " +
                        " \uD83C\uDF4E callName: $callName \uD83C\uDF4E")
            } catch (e: Exception) {
                logger.error("\uD83D\uDE21 \uD83D\uDE21 \uD83D\uDE21 \uD83D\uDE21" +
                        " ResponseTime add to Firestore is fucked. ${e.message} \uD83D\uDE21 \uD83D\uDE21")
            }
        }

    }
}

data class Response(
        val start: String,
        val end: String,
        val elapsedMilliseconds: Long,
        val callName: String,
        val profile: String
)
