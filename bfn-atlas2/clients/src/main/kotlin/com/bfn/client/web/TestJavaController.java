package com.bfn.client.web;

import com.google.firebase.auth.UserRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;


@RestController
public class TestJavaController {
    private static final Logger LOGGER = LoggerFactory.getLogger(TestJavaController.class.getSimpleName());
    public TestJavaController() {
        LOGGER.info("\uD83C\uDFC0 \uD83C\uDFC0 TestJavaController: Fucking Java is running .... \uD83C\uDFC0 \uD83C\uDFC0");
    }

    @Autowired
    private FirebaseService firebaseService;

    @GetMapping(value = "/ping", produces = APPLICATION_JSON_VALUE)
    private String  ping() throws Exception {
        for (UserRecord userRecord : firebaseService.getUsers()) {
            LOGGER.info("Firebase auth User: " + userRecord.getDisplayName()
            + " email: " + userRecord.getEmail() + " uid: " + userRecord.getUid());
        }

        return "TestJavaController returns ping request";
    }
}
