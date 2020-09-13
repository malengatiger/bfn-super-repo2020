package com.bfn.client.web

import com.bfn.client.data.*
import com.google.api.core.ApiFuture
import com.google.cloud.firestore.CollectionReference
import com.google.cloud.firestore.DocumentReference
import com.google.cloud.firestore.Firestore
import com.google.cloud.firestore.QuerySnapshot
import com.google.firebase.FirebaseApp
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseAuthException
import com.google.firebase.auth.UserRecord
import com.google.firebase.cloud.FirestoreClient
import com.google.firebase.messaging.FirebaseMessaging
import com.google.firebase.messaging.Message
import com.google.firebase.messaging.Notification
import com.google.gson.GsonBuilder
import com.google.gson.JsonArray
import net.corda.core.utilities.getOrThrow
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import java.util.concurrent.ExecutionException
import javax.annotation.PostConstruct

@Service
class FirebaseService() {
    private lateinit var auth: FirebaseAuth
    private lateinit var db: Firestore
    private lateinit var messaging: FirebaseMessaging

    private val m = "\uD83E\uDD6C \uD83E\uDD6C ";
    private val logger = LoggerFactory.getLogger(FirebaseService::class.java)
    private val gson = GsonBuilder().setPrettyPrinting().create()
    
    @PostConstruct
    fun init() {
        
            FirebaseApp.initializeApp()
            auth = FirebaseAuth.getInstance()
            db = FirestoreClient.getFirestore()
            messaging = FirebaseMessaging.getInstance()
            logger.info("$m PostConstruct: ...... Successfully initialized Firebase ......  $m");
        
    }
    @Throws(ExecutionException::class, InterruptedException::class)
    fun sendInvoiceOfferMessage(offer: InvoiceOfferDTO?) {
        val topic = "invoiceOffers"
        // See documentation on defining a message payload.
        val m = Notification("New Invoice Offer", offer?.offerAmount.toString())

        val message = Message.builder()
                .putData("invoiceOffer", gson.toJson(offer))
                .setNotification(m)
                .setTopic(topic).build()
        // Send a message to the devices subscribed to the provided topic.
        val response = messaging.sendAsync(message)?.get()
        // Response is a message ID string.
        logger.info(("\uD83D\uDE21 \uD83D\uDE21 \uD83D\uDE21 "
                + "Successfully sent FCM INVOICE OFFER message to topic: \uD83D\uDE21 ") + topic + "; Response: \uD83E\uDD6C \uD83E\uDD6C " + response + " \uD83E\uDD6C \uD83E\uDD6C")
    }


    @Throws(ExecutionException::class, InterruptedException::class)
    fun sendInvoiceMessage(invoice: InvoiceDTO?) {
        val topic = "invoices"
        // See documentation on defining a message payload.
        val m = Notification("New Invoice", invoice?.totalAmount.toString())
        val message = Message.builder()
                .putData("invoice", gson.toJson(invoice))
                .setNotification(m).setTopic(topic)
                .build()
        // Send a message to the devices subscribed to the provided topic.
        val response = messaging.sendAsync(message)?.get()
        // Response is a message ID string.
        logger.info(("$m Successfully sent FCM INVOICE message to topic: \uD83D\uDE21 ")
                + topic + "; Response: \uD83E\uDD6C \uD83E\uDD6C " + response + " \uD83E\uDD6C \uD83E\uDD6C")
    }


    @Throws(ExecutionException::class, InterruptedException::class)
    fun sendAccountMessage(account: AccountInfoDTO?) {
        val topic = "accounts"
        // See documentation on defining a message payload.
        val m = Notification("New BFN Account", gson.toJson(account))
        val message = Message.builder().putData("account", gson.toJson(account)).setNotification(m).setTopic(topic)
                .build()
        // Send a message to the devices subscribed to the provided topic.
        val response = messaging.sendAsync(message)?.get()
        // Response is a message ID string.
        logger.info(("\uD83D\uDE21 \uD83D\uDE21 \uD83D\uDE21 "
                + "Successfully sent FCM ACCOUNT message to topic: \uD83D\uDE21 ") + topic + "; Response: \uD83E\uDD6C \uD83E\uDD6C " + response + " \uD83E\uDD6C \uD83E\uDD6C")
    }


    @Throws(ExecutionException::class, InterruptedException::class)
    fun addToken(token: TokenDTO) {
        val future: ApiFuture<DocumentReference> = db.collection("tokens").add(token);
        logger.info("\uD83D\uDE3C \uD83D\uDE3C Token added to Firestore: \uD83D\uDC9A ${future.getOrThrow().path}")
    }

    @Throws(ExecutionException::class, InterruptedException::class)
    fun addNetworkOperator(operator: NetworkOperatorDTO) {
        val future: ApiFuture<DocumentReference> = db.collection("networkOperator").add(operator);
        logger.info("\uD83D\uDE3C \uD83D\uDE3C NetworkOperator added to Firestore: \uD83D\uDC9A ${future.getOrThrow().path}")
    }

    @Throws(ExecutionException::class, InterruptedException::class)
    fun addCustomerProfile(profile: CustomerProfileStateDTO) {
        val future: ApiFuture<DocumentReference> = db.collection("customerProfiles").add(profile);
        logger.info("\uD83D\uDE3C \uD83D\uDE3C CustomerProfileStateDTO added to Firestore: \uD83D\uDC9A ${future.getOrThrow().path}")
    }
    @Throws(ExecutionException::class, InterruptedException::class)
    fun addInvestorProfile(profile: InvestorProfileStateDTO) {
        val future: ApiFuture<DocumentReference> = db.collection("investorProfiles").add(profile);
        logger.info("\uD83D\uDE3C \uD83D\uDE3C InvestorProfileStateDTO added to Firestore: \uD83D\uDC9A ${future.getOrThrow().path}")
    }
    @Throws(ExecutionException::class, InterruptedException::class)
    fun addSupplierProfile(profile: SupplierProfileStateDTO) {
        val future: ApiFuture<DocumentReference> = db.collection("supplierProfiles").add(profile);
        logger.info("\uD83D\uDE3C \uD83D\uDE3C SupplierProfileStateDTO added to Firestore: \uD83D\uDC9A ${future.getOrThrow().path}")
    }

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


    @Throws(Exception::class)
    fun deleteBFNAnchor() {
        try {
            val collectionRef = db.collection("bfn_anchors").get()
            logger.info("\uD83C\uDF4E Found ${collectionRef.get().documents.size} bfn_anchors to delete on Firestore")
            collectionRef.get().documents.forEach() {
                it.reference.delete()
                logger.info(".... BFN Anchor deleted from Firestore: \uD83C\uDF4E ${it.data["host"]} \uD83C\uDF4E ")
            }
        } catch (e: Exception) {
            logger.error("Failed to delete BFN Anchor", e)
            throw e
        }
    }


    @Throws(Exception::class)
    fun deleteCustomers() {
        try {
            val collectionRef = db.collection("bfn_customers").get()
            logger.info("\uD83C\uDF4E Found ${collectionRef.get().documents.size} BFN Customers to delete on Firestore")
            collectionRef.get().documents.forEach() {
                it.reference.delete()
                logger.info(".... BFN Customer deleted from Firestore: \uD83C\uDF4E ${it.data["name"]} \uD83C\uDF4E ")
            }
        } catch (e: Exception) {
            logger.error("Failed to delete BFN Customers", e)
            throw e
        }
    }


    @Throws(Exception::class)
    fun getCordaNodes(): List<NodeInfoDTO> {
        val mList: MutableList<NodeInfoDTO> = mutableListOf()
        try {
            val future = db.collection("nodes").get()
            val qs: QuerySnapshot = future.get()
            qs.documents.forEach() {
                mList.add(it.toObject(NodeInfoDTO::class.java))

            }

        } catch (e: Exception) {
            logger.error("Failed to get nodes", e)
            throw e
        }
        return mList
    }


    @Throws(Exception::class)
    fun getNetworkOperator(): NetworkOperatorDTO? {
        try {
            val future = db.collection("networkOperator")
                    .limit(1)
                    .get()
            val qs: QuerySnapshot = future.get()
            if (qs.documents.isEmpty()) {
                logger.warn("\uD83D\uDE21 \uD83D\uDE21 Firebase could not find Network Operator, returning null")
                return null
            }
            return qs.documents[0].toObject(NetworkOperatorDTO::class.java)

        } catch (e: Exception) {
            logger.error("Failed to get networkOperator", e)
            throw e
        }
    }

    @Throws(Exception::class)
    fun updateNetworkOperator(operator: NetworkOperatorDTO)  {
        logger.info("\uD83D\uDD06 \uD83D\uDD06 about to update NetworkOperator, check properties: ${gson.toJson(operator)}")
        val future = db.collection("networkOperator")
                .limit(1)
                .get()
        val qs: QuerySnapshot = future.get()
        if (qs.documents.isNotEmpty()) {
            val ref = qs.documents[0].reference
            ref.set(operator)
            //todo - update corda state .....
            logger.info("\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 " +
                    "NetworkOperator has been updated on Firestore ... should update Corda state")
        } else {
            throw Exception("NetworkOperator not found for update")
        }
    }

    private fun getMatrixes(array: JsonArray): MutableList<TradeMatrixItemDTO> {
        val mList:  MutableList<TradeMatrixItemDTO> = mutableListOf()
        for (jsonElement in array) {
            val item = gson.fromJson(jsonElement, TradeMatrixItemDTO::class.java)
            mList.add(item)
        }

        return mList
    }
    @Throws(FirebaseAuthException::class)
    fun createAuthUser(name: String, email: String, password: String,
                       uid: String): UserRecord? {
        logger.info("\uD83D\uDD37 \uD83D\uDD37 ..... createUser: writing to Firestore " +
                "... \uD83D\uDD37 name: $name email: $email password: $password uid: $uid")
        val request = UserRecord.CreateRequest()
        request.setEmail(email)
        request.setDisplayName(name)
        request.setPassword(password)
        request.setUid(uid)
        val userRecord = auth.createUser(request)
        logger.info("\uD83D\uDC4C \uD83D\uDC4C \uD83D\uDC4C \uD83E\uDD66 \uD83E\uDD66 " +
                "Auth User record created in Firebase:  \uD83E\uDD66 " + userRecord.email)
        return userRecord
    }


    @Throws(FirebaseAuthException::class)
    fun createBFNUser(user: UserDTO): String? {
        logger.info("\uD83D\uDD37 \uD83D\uDD37 ..... createBFNAccount: writing to Firestore " +
                "Check the properties ... writing null WTF? ${gson.toJson(user)}... \uD83D\uDD37 ")

        val userRecord = createAuthUser(name = user.accountInfo.name,email = user.email, password = user.password,uid = user.uid)
        if (userRecord != null) {
            user.uid = userRecord.uid
        }
        val future = db.collection("bfnUsers").add(user)
        logger.info("\n\uD83E\uDDE9 \uD83E\uDDE9 \uD83E\uDDE9 \uD83E\uDDE9 " +
                " BFN user record  added to Firestore path: " + future.get().path)
        logger.info(gson.toJson(user))
        return future?.get()?.path
    }


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
            logger.info("🔆 🔆 🔆 user deleted: 🔵 #$cnt ${user.displayName}")
        }
    }


    @Throws(FirebaseAuthException::class)
    fun getUser(email: String?): UserRecord? {

        var record: UserRecord? = null
        try {
            record = auth.getUserByEmail(email)
        } catch (e: Exception) {
        }
        return record
    }


    @Throws(FirebaseAuthException::class)
    fun getBFNUsers(): MutableList<UserDTO> {
        logger.info("\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 Getting  users ...")
        val records: MutableList<UserDTO> = mutableListOf()
        try {
            val page = db.collection("bfnUsers").get()
            val m = page.get()
            m.documents.forEach {
                records.add(it.toObject(UserDTO::class.java))
            }

        } catch (e: Exception) {
            logger.error(e.message)
        }

        return records
    }


    fun deleteCollections() {
        val m = db.listCollections()
        for (reference in m) {
            logger.info("\uD83C\uDF4A \uD83C\uDF4A Remove Existing Firestore collection: " + reference.path)
            if (!reference.path.contains("nodes")) {
                deleteCollection(reference, 200)
            }
            if (!reference.path.contains("accounts")) {
                deleteCollection(reference, 200)
            }
            if (!reference.path.contains("invoices")) {
                deleteCollection(reference, 200)
            }
            if (!reference.path.contains("responseTimes")) {
                deleteCollection(reference, 200)
            }
            if (!reference.path.contains("webServerStarts")) {
                deleteCollection(reference, 200)
            }
        }
    }

    /**
     * Delete a collection in batches to avoid out-of-memory errors.
     * Batch size may be tuned based on document size (at most 1MB) and application requirements.
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

    private  val batchSize = 2000


    @Throws(ExecutionException::class, InterruptedException::class)
    fun deleteCollection(collectionName: String?) { // retrieve a small batch of documents to avoid out-of-memory errors
        val collection = db.collection(collectionName!!)
        val future = collection.limit(batchSize).get()
        var deleted = 0
        // future.get() blocks on document retrieval
        val documents = future.get().documents
        for (document in documents) {
            document.reference.delete()
            ++deleted
            logger.info(" \uD83E\uDD4F  \uD83E\uDD4F  \uD83E\uDD4F  Deleted document:  \uD83D\uDC9C " + document.reference.path)
        }
        if (deleted >= batchSize) { // retrieve and delete another batch
            deleteCollection(collectionName)
            logger.info(" \uD83E\uDD4F  \uD83E\uDD4F  \uD83E\uDD4F  Deleted collection:  \uD83E\uDDE1 " + collection.path)
        }
    }
}