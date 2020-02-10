package com.bfn.flows.services

import co.paralleluniverse.fibers.Suspendable
import net.corda.core.node.AppServiceHub
import net.corda.core.node.NodeInfo
import net.corda.core.node.services.CordaService
import net.corda.core.serialization.SingletonSerializeAsToken
import org.slf4j.LoggerFactory

@CordaService
class RegulatorFinderService(private val serviceHub: AppServiceHub) : SingletonSerializeAsToken() {

    @Suspendable
     fun findRegulatorNode(): NodeInfo? {

        val nodes = serviceHub.networkMapCache.allNodes
        var regulator: NodeInfo? = null
        nodes.forEach() {
            if (it.legalIdentities.first().name.organisation.contains("Regulator")) {
                regulator = it
            }
        }
        if (regulator != null) {
            logger.info("\uD83E\uDDE9 \uD83E\uDDE9 Regulator Node found: " +
                    "${regulator!!.legalIdentities.first()}")
        }
        return regulator
    }


    companion object {
        private val logger = LoggerFactory.getLogger(RegulatorFinderService::class.java)
    }

}
