package com.bfn.client.web

import org.slf4j.LoggerFactory
import org.springframework.boot.CommandLineRunner
import org.springframework.context.support.beans
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.reactive.CorsWebFilter




fun beans() = beans {
    println("\uD83E\uDDE9  \uD83E\uDDE9  \uD83E\uDDE9  \uD83E\uDDE9 // Define your bean with Kotlin DSL here   \uD83E\uDDE9")
    bean {
        CommandLineRunner {
            println("\uD83D\uDE21  CommandLineRunner \uD83D\uDE21 \uD83D\uDE21 \uD83D\uDE21 shit is gonna happen here")

        }
    }
    profile("cors") {
        bean { CorsWebFilter { CorsConfiguration().applyPermitDefaultValues() } }
        println("\uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 \uD83D\uDD06 " +
                "\uD83E\uDDE9  \uD83E\uDDE9  \uD83E\uDDE9  \uD83E\uDDE9 // CORS has been defined  \uD83E\uDDE9")
    }

    //506469654 malengatiger@gmail.com
}
