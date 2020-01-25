package com.bfn.client.local

import com.google.gson.GsonBuilder
import net.corda.core.utilities.loggerFor

fun main(args: Array<String>) = InvoiceIntegration().main(args)
class InvoiceIntegration {
    companion object {
        val logger = loggerFor<InvoiceIntegration>()
        private val GSON = GsonBuilder().setPrettyPrinting().create()

    }
    fun main(args: Array<String>) {

    }


}
