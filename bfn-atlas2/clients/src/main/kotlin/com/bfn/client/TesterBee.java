package com.bfn.client;

import org.slf4j.LoggerFactory;

import java.util.Date;
import java.util.logging.Logger;

public class TesterBee {
    public static final Logger LOGGER = Logger.getLogger(TesterBee.class.getSimpleName());
    public static String runMe() {
        String msg = "\uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 \uD83D\uDD35 White Americans are fucking ignorant, lying racists!!  " +
                "\uD83C\uDF4E  \uD83C\uDF4E  \uD83C\uDF4E ... " + " date: " + new Date().toString();
        LOGGER.info(msg );
        return msg;
    }
}
