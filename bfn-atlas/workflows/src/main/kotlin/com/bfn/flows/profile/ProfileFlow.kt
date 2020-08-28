package com.bfn.flows.profile

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.contracts.InvestorProfileContract
import com.bfn.contractstates.states.InvestorProfileState
import com.r3.corda.lib.accounts.workflows.ourIdentity
import net.corda.core.flows.FlowException
import net.corda.core.flows.FlowLogic
import net.corda.core.flows.InitiatingFlow
import net.corda.core.flows.StartableByRPC
import net.corda.core.identity.Party
import net.corda.core.transactions.SignedTransaction
import net.corda.core.transactions.TransactionBuilder
import org.slf4j.LoggerFactory

@InitiatingFlow
@StartableByRPC
class ProfileFlow(private val investorProfileState: InvestorProfileState, private val action: Int = 0) : FlowLogic<SignedTransaction?>() {

    @Suspendable
    @Throws(FlowException::class)
    override fun call(): SignedTransaction? {
        Companion.logger.info("\uD83E\uDD1F \uD83E\uDD1F \uD83E\uDD1F \uD83E\uDD1F  " +
                "... ProfileFlow call started .. action: $action ")
        val notary = serviceHub.networkMapCache.notaryIdentities[0]

        var tx: SignedTransaction? = null
        when (action) {
            0 -> tx = createProfile(notary)
        }

        return tx;
    }

    @Suspendable
    private fun createProfile(notary: Party): SignedTransaction {
        investorProfileState.issuedBy = serviceHub.ourIdentity
        val command = InvestorProfileContract.CreateProfile()
        val txBuilder = TransactionBuilder(notary)
                .addOutputState(investorProfileState, InvestorProfileContract.ID)
                .addCommand(
                        command, serviceHub.ourIdentity.owningKey)

        txBuilder.verify(serviceHub)
        return serviceHub.signInitialTransaction(txBuilder)
    }
    @Suspendable
    private fun updateProfile(notary: Party): SignedTransaction {
        investorProfileState.issuedBy = serviceHub.ourIdentity
        //todo - get RefAndState by accountId and consume old, create new
//        val criteria = VaultQueryCriteria(StateStatus.UNCONSUMED)
//        serviceHub.vaultService.queryBy( criteria,
//                contractStateType = ProfileContract::class.java,
//                paging = PageSpecification(1,1000))
        val command = InvestorProfileContract.UpdateProfile()
        val txBuilder = TransactionBuilder(notary)
                .addOutputState(investorProfileState, InvestorProfileContract.ID)
                .addCommand(
                        command, serviceHub.ourIdentity.owningKey)

        txBuilder.verify(serviceHub)
        return serviceHub.signInitialTransaction(txBuilder)
    }



    companion object {
        private val logger = LoggerFactory.getLogger(ProfileFlow::class.java)

    }

}
