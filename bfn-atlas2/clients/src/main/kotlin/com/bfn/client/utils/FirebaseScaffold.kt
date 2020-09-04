package com.bfn.client.utils

import com.bfn.client.data.NodeInfoDTO
import com.google.cloud.firestore.Firestore
import com.google.firebase.cloud.FirestoreClient
import com.google.gson.GsonBuilder
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.ApplicationContext
import org.springframework.core.env.Environment
import org.springframework.core.io.Resource
import org.springframework.stereotype.Component
import java.io.File
import java.util.*
import javax.annotation.PostConstruct

@Component
class FirebaseScaffold {
    private val logger = LoggerFactory.getLogger(FirebaseScaffold::class.java)
    private val gson = GsonBuilder().setPrettyPrinting().create()
    @Autowired
    private lateinit var environment: Environment
    @Autowired
    private lateinit var context: ApplicationContext
    @Value("\${spring.profiles.active}")
    private var profile: String = "dev"
    @Value("\${node.index}")
    private var stringIndex: String = "0"
    @Value("classpath:dev-nodes.json")
    private val resDev: Resource? = null
    @Value("classpath:prod-nodes.json")
    private val resProd: Resource? = null


    @PostConstruct
    fun init() {
        logger.info("\uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D " +
                "PostConstruct: \uD83C\uDF3F Alexa and AI are coming for you! \uD83C\uDF1E SPRINGBOOT_PROFILE : $profile \uD83C\uDF1E")

        logger.info("\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06  BFNWebApi: setting up Firebase service account ...."
                + " \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06")
        try {
            val file: File = if (profile == "dev") {
                resDev!!.file
            } else {
                resProd!!.file
            }

            logger.info("\uD83E\uDD6C \uD83E\uDD6C \uD83E\uDD6C Nodes JSON File Found :  " +
                    "\uD83D\uDE21 \uD83D\uDE21 \uD83D\uDE21  " + file.exists())
            val nodes: List<NodeInfoDTO> = buildFirebase(file, stringIndex.toInt())
            logger.info("\uD83E\uDD6C \uD83E\uDD6C \uD83E\uDD6C Nodes from JSON File: ${nodes.size}" )
            val db: Firestore = FirestoreClient.getFirestore()
            val nodesFromFB = db.collection("nodes").whereEqualTo(
                    "springBootProfile", profile).get().get().documents
            if (nodesFromFB.isEmpty()) {
                nodes.forEach {
                    it.date = Date().time
                    db.collection("nodes").add(it)
                    logger.info("⚽ ⚽ ⚽ ⚽ ⚽ ⚽ ⚽ Node added to Firestore: \uD83D\uDD35 \uD83D\uDD35 " +
                            "${gson.toJson(it)} \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83C\uDF4E ")
                }
            } else {
                val node = nodesFromFB[0];
                if (Date().time.minus(node.data["date"] as Long) > (1000 * 60 * 5) ) {
                    FirebaseUtil.deleteNodes(profile)
                    nodes.forEach {
                        it.date = Date().time
                        db.collection("nodes").add(it)
                        logger.info("⚽ ⚽ ⚽ ⚽ ⚽ ⚽ ⚽ Node added to Firestore: \uD83D\uDD35 \uD83D\uDD35 " +
                                "${gson.toJson(it)} \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83C\uDF4E ")
                    }
                } else {
                    logger.info("Nodes on Firestore don't need to be refreshed, " +
                            "\uD83D\uDC8A \uD83D\uDC8A \uD83D\uDC8A booted within last 5 minutes")
                }
            }


            try {
                val start = WebServerStart(date = Date(), profile = profile, numberOfNodes = nodes.size)
                db.collection("webServerStarts").add(start)
                logger.info("\uD83C\uDF50 \uD83C\uDF50 \uD83C\uDF50 WebServerStart added to Firestore:  \uD83C\uDF4E \uD83C\uDF4E \uD83C\uDF4E ")
            } catch (e: Exception) {
                logger.error("\uD83D\uDE21 ResponseTime add to Firestore is fucked.", e)
            }

            listAccountsFromFirebase()
            logger.info("\uD83C\uDF4E Firebase Scaffolding is complete.  ⚽️  ⚽️  ⚽️  ⚽️  ⚽️ \n")

        } catch (e: Exception) {
            logger.error("\uD83D\uDC7F  \uD83D\uDC7F  \uD83D\uDC7F  \uD83D\uDC7F Firebase Admin SDK setup failed")
            //throw Exception(" \uD83D\uDC7F  \uD83D\uDC7F unable to set Firebase up", e)
        }

    }




    private fun listAccountsFromFirebase() {
        val users = FirebaseUtil.getUsers()
        logger.info("\n⚽️ Accounts on Firebase Auth:  \uD83D\uDC9A \uD83D\uDC99 ${users.size}")
        if (users.isEmpty()) {
            return
        }
        var cnt = 0;
        val sorted = users.sortedBy { it.displayName }
        sorted.forEach() {
            cnt++
            logger.info("⚽️ Account: #$cnt \uD83D\uDC9A \uD83D\uDC99 ${it.displayName} - \uD83D\uDD06 ${it.email}")
        }
    }
}
data class WebServerStart(
        val date: Date,
        val numberOfNodes: Int,
        val profile:String)
