package com.bfn.client.web

import com.google.auth.oauth2.GoogleCredentials
import com.google.firebase.FirebaseApp
import com.google.firebase.FirebaseOptions
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.ApplicationContext
import org.springframework.stereotype.Component
import java.io.FileInputStream
import javax.annotation.PostConstruct

@Component
class FirebaseScaffold {
    private val logger = LoggerFactory.getLogger(FirebaseScaffold::class.java)
    @Autowired
    private lateinit var appProperties: AppProperties
    @Autowired
    private lateinit var context: ApplicationContext

    @PostConstruct
    fun init() {
        logger.info("\uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D \uD83D\uDC7D " +
                "PostConstruct: \uD83C\uDF3F Alexa and AI are coming for you! $context")

        logger.info("\uD83D\uDC4C\uD83C\uDFFE \uD83D\uDC4C\uD83C\uDFFE YEBO! appProperties are cool. " +
                "\uD83C\uDF4F \uD83C\uDF4F \uD83C\uDF4F this shit is hanging in there ..." )

        logger.info("\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06  BFNWebApi: setting up Firebase service account ...."
                + " \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06")
        try {
            val options = FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.getApplicationDefault())
                    .setProjectId("bfn-mobile-backend")
                    .setDatabaseUrl("https://bfn-mobile-backend.firebaseio.com").build()
            val app = FirebaseApp.initializeApp(options)
            logger.info("\uD83E\uDDE9\uD83E\uDDE9\uD83E\uDDE9  \uD83E\uDDE9\uD83E\uDDE9\uD83E\uDDE9 "
                    + "Firebase Admin SDK Setup OK:  \uD83E\uDDE9\uD83E\uDDE9\uD83E\uDDE9 app: "
                    + app.toString())
            //
            listAccountsFromFirebase()
            logger.info("\uD83D\uDD06  \uD83D\uDD06  \uD83D\uDD06  Getting bean to start refreshing nodes on Firestore  \uD83D\uDD06 ")
            try {
                val adminController = context.getBean(AdminController::class.java)
                adminController.writeNodesToFirestore(appProperties)
            } catch (e: Exception) {
                logger.error(e.message)
            }

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
