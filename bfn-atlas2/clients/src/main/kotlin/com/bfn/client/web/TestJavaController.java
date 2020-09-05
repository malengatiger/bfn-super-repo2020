package com.bfn.client.web;

import com.google.firebase.auth.UserRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@CrossOrigin(maxAge = 3600)
@RequestMapping("/test")
@RestController
public class TestJavaController {
    private static final Logger LOGGER = LoggerFactory.getLogger(TestJavaController.class.getSimpleName());
    private final NodeRPCConnection rpcConnection;
    public TestJavaController(NodeRPCConnection nodeRPCConnection) {
        rpcConnection = nodeRPCConnection;
        LOGGER.info("\uD83C\uDFC0 \uD83C\uDFC0 TestJavaController: Fucking Java is running .... \uD83C\uDFC0 \uD83C\uDFC0");
        LOGGER.info("\uD83C\uDFC0 \uD83C\uDFC0 NodeInfo via NodeRPCConnection: ".concat(rpcConnection.getProxy().nodeInfo().toString()));
    }

    @Autowired
    private FirebaseService firebaseService;

    @GetMapping(value = "/ping", produces = APPLICATION_JSON_VALUE)
    private  List<UserRecord>  ping() throws Exception {
        List<UserRecord> mList = firebaseService.getUsers();
        for (UserRecord userRecord : firebaseService.getUsers()) {
            LOGGER.info("\uD83D\uDD37 Firebase auth User: \uD83D\uDD37 " + userRecord.getDisplayName()
            + " email: " + userRecord.getEmail() + " \uD83C\uDF4E uid: " + userRecord.getUid());
        }
        LOGGER.info("\uD83C\uDFC0 \uD83C\uDFC0 NodeInfo via NodeRPCConnection: "
                .concat(rpcConnection.getProxy().nodeInfo().toString()));

        return mList;
    }
}
