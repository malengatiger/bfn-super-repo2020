package com.bfn.client.web

import com.bfn.client.dto.*
import com.google.api.core.ApiFuture
import com.google.cloud.firestore.CollectionReference
import com.google.cloud.firestore.DocumentReference
import com.google.cloud.firestore.Firestore
import com.google.cloud.firestore.QuerySnapshot
import com.google.firebase.auth.ExportedUserRecord
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseAuthException
import com.google.firebase.auth.UserRecord
import com.google.firebase.auth.UserRecord.CreateRequest
import com.google.firebase.cloud.FirestoreClient
import com.google.firebase.messaging.FirebaseMessaging
import com.google.firebase.messaging.Message
import com.google.firebase.messaging.Notification
import com.google.gson.GsonBuilder
import net.corda.core.utilities.getOrThrow
import org.slf4j.LoggerFactory
import java.util.*
import java.util.concurrent.ExecutionException
import java.util.function.Consumer

object FirebaseUtil {
    private val logger = LoggerFactory.getLogger(FirebaseUtil::class.java)
    private val GSON = GsonBuilder().setPrettyPrinting().create()
    private val auth: FirebaseAuth = FirebaseAuth.getInstance()
    private val db: Firestore = FirestoreClient.getFirestore()
    private val messaging: FirebaseMessaging = FirebaseMessaging.getInstance()


    @JvmStatic
    @Throws(ExecutionException::class, InterruptedException::class)
    fun sendInvoiceOfferMessage(offer: InvoiceOfferDTO?) {
        val topic = "invoiceOffers"
        // See documentation on defining a message payload.
        val m = Notification("New Invoice Offer", offer?.offerAmount.toString())

        val message = Message.builder()
                .putData("invoiceOffer", GSON.toJson(offer))
                .setNotification(m)
                .setTopic(topic).build()
        // Send a message to the devices subscribed to the provided topic.
        val response = messaging.sendAsync(message).get()
        // Response is a message ID string.
        logger.info(("\uD83D\uDE21 \uD83D\uDE21 \uD83D\uDE21 "
                + "Successfully sent FCM INVOICE OFFER message to topic: \uD83D\uDE21 ") + topic + "; Response: \uD83E\uDD6C \uD83E\uDD6C " + response + " \uD83E\uDD6C \uD83E\uDD6C")
    }

    @JvmStatic
    @Throws(ExecutionException::class, InterruptedException::class)
    fun sendInvoiceMessage(invoice: InvoiceDTO?) {
        val topic = "invoices"
        // See documentation on defining a message payload.
        val m = Notification("New Invoice", invoice?.totalAmount.toString())
        val message = Message.builder()
                .putData("invoice", GSON.toJson(invoice))
                .setNotification(m).setTopic(topic)
                .build()
        // Send a message to the devices subscribed to the provided topic.
        val response = messaging.sendAsync(message).get()
        // Response is a message ID string.
        logger.info(("\uD83D\uDE21 \uD83D\uDE21 \uD83D\uDE21 "
                + "Successfully sent FCM INVOICE message to topic: \uD83D\uDE21 ") + topic + "; Response: \uD83E\uDD6C \uD83E\uDD6C " + response + " \uD83E\uDD6C \uD83E\uDD6C")
    }

    @JvmStatic
    @Throws(ExecutionException::class, InterruptedException::class)
    fun sendAccountMessage(account: AccountInfoDTO?) {
        val topic = "accounts"
        // See documentation on defining a message payload.
        val m = Notification("New BFN Account", GSON.toJson(account))
        val message = Message.builder().putData("account", GSON.toJson(account)).setNotification(m).setTopic(topic)
                .build()
        // Send a message to the devices subscribed to the provided topic.
        val response = messaging.sendAsync(message).get()
        // Response is a message ID string.
        logger.info(("\uD83D\uDE21 \uD83D\uDE21 \uD83D\uDE21 "
                + "Successfully sent FCM ACCOUNT message to topic: \uD83D\uDE21 ") + topic + "; Response: \uD83E\uDD6C \uD83E\uDD6C " + response + " \uD83E\uDD6C \uD83E\uDD6C")
    }

    @JvmStatic
    @Throws(ExecutionException::class, InterruptedException::class)
    fun addToken(token: TokenDTO) {
        val future: ApiFuture<DocumentReference> = db.collection("tokens").add(token);
        logger.info("\uD83D\uDE3C \uD83D\uDE3C Token added to Firestore: \uD83D\uDC9A ${future.getOrThrow().path}")
    }


    @JvmStatic
    @Throws(Exception::class)
    fun registerAnchor( name: String, email: String): AnchorDTO {
        val password = "please#CHANGE@me33"
        val anchor: AnchorDTO?
        try {
            val createRequest = CreateRequest().setEmail(email)
                    .setDisplayName("BFN Anchor: $name")
                    .setPassword(password)
            val userRecord = auth.createUser(createRequest)
            anchor = AnchorDTO(
                    name = name, email = email, uid = userRecord.uid,
                    date = Date(), password = password
            )

            db.collection("anchors").add(anchor)
            logger.info("\uD83D\uDC9B  Added ANCHOR to Firestore: ⚽ " +
                    " ${anchor.name}  \uD83C\uDF00 ${userRecord.email}")
        } catch (e: Exception) {
            logger.error("Failed to add anchor", e)
            throw e
        }
        return anchor
    }


    @JvmStatic
    @Throws(Exception::class)
    fun deleteNodes(springBootProfile: String) {
        try {
            val collectionRef = db.collection("nodes")
                    .whereEqualTo("springBootProfile", springBootProfile).get()
            logger.info("\uD83C\uDF4E Found ${collectionRef.get().documents.size} nodes to delete on Firestore")
            collectionRef.get().documents.forEach() {
                it.reference.delete()
                logger.info(".... Node deleted from Firestore: \uD83C\uDF4E ${it.data["host"]} \uD83C\uDF4E ")
            }
        } catch (e: Exception) {
            logger.error("Failed to delete nodes", e)
            throw e
        }
    }

    @JvmStatic
    @Throws(Exception::class)
    fun getCordaNodes(): List<NodeInfoDTO> {
        val mList: MutableList<NodeInfoDTO> = mutableListOf()
        try {
            val future = db.collection("nodes").get()
            val qs: QuerySnapshot = future.get()
            qs.documents.forEach() {
                mList.add(NodeInfoDTO(
                        webServerAddress = it.data["webAPIUrl"] as String?,
                        addresses = it.data["addresses"] as List<String>?,
                        platformVersion = it.data["platformVersion"] as Long,
                        serial = it.data["serial"] as Long,
                        host = it.data["host"] as String?,
                        port = it.data["port"] as Long?
                ))
            }

        } catch (e: Exception) {
            logger.error("Failed to get nodes", e)
            throw e
        }
        return mList
    }

    @JvmStatic
    @Throws(FirebaseAuthException::class)
    fun createUser(name: String?, email: String?, password: String?,
                   uid: String?): UserRecord {
        logger.info("\uD83D\uDD37 \uD83D\uDD37 createUser: writing to Firestore ... \uD83D\uDD37 ")
        val request = CreateRequest()
        request.setEmail(email)
        request.setDisplayName(name)
        request.setPassword(password)
        request.setUid(uid)
        val userRecord = auth.createUser(request)
        logger.info("\uD83D\uDC4C \uD83D\uDC4C \uD83D\uDC4C \uD83E\uDD66 \uD83E\uDD66 " +
                "User record created in Firebase:  \uD83E\uDD66 " + userRecord.email)
        return userRecord
    }

    @JvmStatic
    @Throws(FirebaseAuthException::class)
    fun deleteUsers() { // Start listing users from the beginning, 1000 at a time.
        var cnt = 0
        var page = FirebaseAuth.getInstance().listUsers(null)
        while (page != null) {
            for (user in page.values) {
                if (user.email != null && user.email.contains("aubrey")) {
                    continue
                }
                auth.deleteUser(user.uid)
                cnt++
                logger.info("\uD83C\uDF4A  User deleted: 🔵 #$cnt")
            }
            page = page.nextPage
        }
        page = auth.listUsers(null)
        for (user in page.iterateAll()) {
            if (user.email != null && user.email.contains("aubrey")) {
                continue
            }
            logger.info("\uD83C\uDF4A \uD83C\uDF4A \uD83C\uDF4A User delete .....: ")
            auth.deleteUser(user.uid)
            cnt++
            logger.info("🔆 🔆 🔆 user deleted: 🔵 #$cnt")
        }
    }

    @JvmStatic
    @Throws(FirebaseAuthException::class)
    fun getUser(email: String?): UserRecord? {
        var record: UserRecord? = null
        try {
            record = auth.getUserByEmail(email)
        } catch (e: Exception) {
        }
        return record
    }

    @JvmStatic
    @Throws(FirebaseAuthException::class)
    fun getUsers(): List<UserRecord> {
        logger.info("\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 Getting Firebase auth users ...")
        val records: MutableList<UserRecord> = ArrayList()
        try {
            val page = auth.listUsers(null)
            val m = page.values
            m.forEach(Consumer { e: ExportedUserRecord -> records.add(e) })
        } catch (e: Exception) {
            logger.error(e.message)
        }

        return records
    }

    @JvmStatic
    fun deleteCollections() {
        val m = db.listCollections()
        for (reference in m) {
            logger.info("\uD83C\uDF4A \uD83C\uDF4A Existing Firestore collection: " + reference.path)
            if (!reference.path.contains("nodes")) {
                deleteCollection(reference, 200)
            }
        }
    }

    /**
     * Delete a collection in batches to avoid out-of-memory errors.
     * Batch size may be tuned based on document size (atmost 1MB) and application requirements.
     */
    private fun deleteCollection(collection: CollectionReference, batchSize: Int) {
        try { // retrieve a small batch of documents to avoid out-of-memory errors
            val future = collection.limit(batchSize).get()
            var deleted = 0
            // future.get() blocks on document retrieval
            val documents = future.get().documents
            for (document in documents) {
                document.reference.delete()
                ++deleted
                logger.info("\uD83E\uDD4F Deleted document:  \uD83D\uDC9C " + document.reference.path)
            }
            if (deleted >= batchSize) { // retrieve and delete another batch
                deleteCollection(collection, batchSize)
                logger.info(" \uD83E\uDD4F  \uD83E\uDD4F  \uD83E\uDD4F  Deleted collection:  \uD83E\uDDE1 " + collection.path)
            }
        } catch (e: Exception) {
            logger.error("Error deleting collection : " + e.message)
        }
    }

    private const val BATCH_SIZE = 2000
    @JvmStatic
    @Throws(ExecutionException::class, InterruptedException::class)
    fun deleteCollection(collectionName: String?) { // retrieve a small batch of documents to avoid out-of-memory errors
        val collection = db.collection(collectionName!!)
        val future = collection.limit(BATCH_SIZE).get()
        var deleted = 0
        // future.get() blocks on document retrieval
        val documents = future.get().documents
        for (document in documents) {
            document.reference.delete()
            ++deleted
            logger.info(" \uD83E\uDD4F  \uD83E\uDD4F  \uD83E\uDD4F  Deleted document:  \uD83D\uDC9C " + document.reference.path)
        }
        if (deleted >= BATCH_SIZE) { // retrieve and delete another batch
            deleteCollection(collectionName)
            logger.info(" \uD83E\uDD4F  \uD83E\uDD4F  \uD83E\uDD4F  Deleted collection:  \uD83E\uDDE1 " + collection.path)
        }
    }
}
