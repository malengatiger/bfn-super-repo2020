package com.bfn.flows.supplier

import co.paralleluniverse.fibers.Suspendable
import com.bfn.contractstates.states.*
import com.bfn.flows.Em
import com.bfn.flows.regulator.ReportToRegulatorFlow
import com.bfn.flows.services.InvoiceFinderService
import com.bfn.flows.services.InvoiceOfferFinderService
import com.bfn.flows.todaysDate
import com.r3.corda.lib.accounts.workflows.ourIdentity
import com.template.AcceptedOfferContract
import net.corda.core.contracts.StateAndRef
import net.corda.core.flows.*
import net.corda.core.identity.Party
import net.corda.core.node.services.Vault
import net.corda.core.node.services.vault.DEFAULT_PAGE_SIZE
import net.corda.core.node.services.vault.PageSpecification
import net.corda.core.node.services.vault.QueryCriteria
import net.corda.core.transactions.SignedTransaction
import net.corda.core.transactions.TransactionBuilder
import org.slf4j.LoggerFactory


/**
 * Supplier accepts offer made by Investor and creates an AcceptedOfferState
 */
@InitiatingFlow
@StartableByRPC
class OfferAcceptanceBySupplierFlow(
        private val offerId: String) : FlowLogic<AcceptedOfferState>() {
    @Suspendable
    @Throws(FlowException::class, IllegalArgumentException::class)
    override fun call(): AcceptedOfferState {
        Companion.logger.info("$nn OfferAcceptanceBySupplierFlow started " +
                "..offerId: \uD83C\uDF4E $offerId \uD83D\uDE21 ")

        val offerFinderService = serviceHub.cordaService(InvoiceOfferFinderService::class.java)
        val invoiceOfferState = offerFinderService.findInvoiceOffer(offerId)
                ?: throw IllegalArgumentException("Offer not found")

        val allOffersByInvoice = offerFinderService.findOffersByInvoice(
                invoiceOfferState.state.data.invoiceId.toString())
        val invoiceFinderService = serviceHub.cordaService(InvoiceFinderService::class.java)
        val invoiceState = invoiceFinderService.findInvoiceStateAndRef(
                invoiceOfferState.state.data.invoiceId.toString())
        if (invoiceState == null) {
            val msg = "\uD83D\uDE21 Invoice consumed; Offer has already been accepted \uD83D\uDE21 "
            logger.warn(msg)
            throw IllegalArgumentException(msg)
        }

        val suppProfileState = getSupplierProfile(invoiceState.state.data.supplierInfo.identifier
                .id.toString())!!
        val investorProfileState = getInvestorProfile(invoiceOfferState.state.data.investor.identifier
                .id.toString())!!
        val customerProfileState = getCustomerProfile(invoiceState.state.data.customerInfo.identifier
                .id.toString())!!

        logger.info("${Em.GLOBE} ${Em.GLOBE} ${Em.GLOBE} ${Em.GLOBE} " +
                "OfferAcceptanceBySupplierFlow: creating AcceptedOfferState " +
                "............. ${Em.GLOBE} ")
        val acceptedOffer = AcceptedOfferState(
                invoiceId = invoiceOfferState.state.data.invoiceId,
                invoiceNumber = invoiceOfferState.state.data.invoiceNumber,
                offerAmount = invoiceOfferState.state.data.offerAmount,
                discount = invoiceOfferState.state.data.discount,
                externalId = invoiceOfferState.state.data.externalId,
                originalAmount = invoiceOfferState.state.data.originalAmount,
                supplier = suppProfileState,
                investor = investorProfileState,
                offerId = invoiceOfferState.state.data.offerId,
                acceptanceDate = todaysDate(),
                dateRegistered = invoiceOfferState.state.data.dateRegistered,
                customer = customerProfileState
        )

        processTransaction(acceptedOffer, allOffersByInvoice, invoiceState)
        return acceptedOffer
    }

    @Suspendable
    private fun getCustomerProfile(customerId: String): CustomerProfileState? {
        //todo -  🍊 🍊 🍊 refactor query ... this version don't scale, Bro!
        logger.info("${Em.DOLPHIN} getCustomerProfile: customerId: " +
                "${Em.DOLPHIN} $customerId ${Em.DOLPHIN}")
        var pageNumber = 1
        val customerProfileStates = mutableListOf<StateAndRef<CustomerProfileState>>()
        val service = serviceHub.vaultService
        do {
            val pageSpec = PageSpecification(pageNumber = pageNumber, pageSize = 200)
            val results = service.queryBy(
                    contractStateType = CustomerProfileState::class.java,
                    criteria = QueryCriteria.VaultQueryCriteria(
                            status = Vault.StateStatus.UNCONSUMED
                    ), paging = pageSpec)

            logger.info("${Em.DOLPHIN} ${Em.DOLPHIN} There are ${results.states.size} " +
                    "customerProfileStates just read from the Corda ledger ${Em.DOLPHIN} " +
                    "Do we get here at all?")
            customerProfileStates.addAll(results.states)
            pageNumber++
        } while ((pageSpec.pageSize * (pageNumber - 1)) <= results.totalStatesAvailable)

        logger.info("${Em.DOLPHIN} ${Em.DOLPHIN} There are ${customerProfileStates.size} " +
                "customerProfiles on the ledger ${Em.DOLPHIN}")
        var profile: CustomerProfileState? = null
        customerProfileStates.forEach {
            if (customerId == it.state.data.account.identifier.id.toString()) {
                profile = it.state.data
            }
        }
        return profile
    }
    @Suspendable
    private fun getInvestorProfile(investorId: String): InvestorProfileState? {
        logger.info("${Em.DOG} getInvestorProfile: investorId: " +
                "${Em.DOG} $investorId ${Em.DOG}")
        var pageNumber = 1
        val states = mutableListOf<StateAndRef<InvestorProfileState>>()
        val service = serviceHub.vaultService
        do {
            val pageSpec = PageSpecification(pageNumber = pageNumber, pageSize = DEFAULT_PAGE_SIZE)
            val results = service.queryBy(
                    contractStateType = InvestorProfileState::class.java,
                    criteria = QueryCriteria.VaultQueryCriteria(
                            status = Vault.StateStatus.UNCONSUMED
                    ), paging = pageSpec)

            logger.info("${Em.DOG} ${Em.DOG} There are ${results.states.size} " +
                    "investorProfileStates just read from the Corda ledger ${Em.DOG} " +
                    "Do we get here at all?")
            states.addAll(results.states)
            pageNumber++
        } while ((pageSpec.pageSize * (pageNumber - 1)) <= results.totalStatesAvailable)

        logger.info("${Em.DOG} There are ${states.size} " +
                "investorProfiles on the ledger ${Em.DOG}")
        var profile: InvestorProfileState? = null
        states.forEach {
            if (investorId == it.state.data.account.identifier.id.toString()) {
                profile = it.state.data
            }
        }
        return profile
    }
    @Suspendable
    private fun getSupplierProfile(supplierId: String): SupplierProfileState? {
        logger.info("${Em.FOX} getSupplierProfile: supplierId: " +
                "${Em.FOX} $supplierId ${Em.FOX}")
        var pageNumber = 1
        val states = mutableListOf<StateAndRef<SupplierProfileState>>()
        val service = serviceHub.vaultService
        do {
            val pageSpec = PageSpecification(pageNumber = pageNumber, pageSize = DEFAULT_PAGE_SIZE)
            val results = service.queryBy(
                    contractStateType = SupplierProfileState::class.java,
                    criteria = QueryCriteria.VaultQueryCriteria(
                            status = Vault.StateStatus.UNCONSUMED
                    ), paging = pageSpec)
            logger.info("${Em.FOX} ${Em.FOX} There are ${results.states.size} " +
                    "supplierProfileStates just read from the Corda ledger ${Em.FOX} " +
                    "Do we get here at all?")
            states.addAll(results.states)
            pageNumber++
        } while ((pageSpec.pageSize * (pageNumber - 1)) <= results.totalStatesAvailable)

        logger.info("${Em.FOX} There are ${states.size} " +
                "supplierProfiles on the ledger ${Em.FOX} ")
        var profile: SupplierProfileState? = null
        states.forEach {
            if (supplierId == it.state.data.account.identifier.id.toString()) {
                profile = it.state.data
            }
        }
        return profile
    }

    @Suspendable
    private fun processTransaction(acceptedOffer: AcceptedOfferState,
                                   allOffersByInvoice: List<StateAndRef<InvoiceOfferState>>,
                                   invoiceState: StateAndRef<InvoiceState>): SignedTransaction {
        val command = AcceptedOfferContract.AcceptOffer()
        val txBuilder = TransactionBuilder(serviceHub.networkMapCache.notaryIdentities[0])

        val supplierParty = acceptedOffer.supplier.account
        val customerParty = acceptedOffer.customer.account
        val investorParty = acceptedOffer.investor.account

        logger.info("\uD83C\uDF1E Adding ${allOffersByInvoice.size} offers to transaction inputState  \uD83C\uDF1E")
        //consume all outstanding offers and replace with accepted offer
        allOffersByInvoice.forEach() {
            txBuilder.addInputState(it)
        }
        txBuilder.addInputState(invoiceState)
        txBuilder.addCommand(command, mutableListOf(
                supplierParty.host.owningKey,
                customerParty.host.owningKey,
                investorParty.host.owningKey))
        txBuilder.addOutputState(acceptedOffer)

        txBuilder.verify(serviceHub)
        val signedTx = serviceHub.signInitialTransaction(txBuilder)

        val signedTxFinal = processAcceptance(
                customer = customerParty.host,
                supplier = supplierParty.host,
                investor = investorParty.host,
                signedTx = signedTx,
                offer = acceptedOffer)

        reportToRegulator(signedTxFinal)
        logger.info("\uD83D\uDC9C \uD83D\uDC9C Offer accepted: \uD83C\uDF1D " +
                "investor: ${acceptedOffer.investor.account.name} " +
                "supplier: ${acceptedOffer.supplier.account.name} " +
                "customer: ${acceptedOffer.customer.account.name} " +
                "Offer Amt: ${acceptedOffer.offerAmount} " +
                "Original AmT: ${acceptedOffer.originalAmount} " +
                "discount: ${acceptedOffer.discount}% \uD83C\uDF1D ")
        return signedTx
    }

    //todo - 🍎 🍎 🍎 resolve the Party vs AnonymousParty thing with Accounts SDK - keys fail when trying RequestAccountKey thing ... 🍎
    @Suspendable
    private fun processAcceptance(
            offer: AcceptedOfferState,
            customer: Party,
            supplier: Party,
            investor: Party,
            signedTx: SignedTransaction): SignedTransaction {
        val flowSessions: MutableList<FlowSession> = mutableListOf()

        val mName = serviceHub.ourIdentity.name.organisation
        if (offer.customer.account.host.name.organisation!= mName) {
            flowSessions.add(initiateFlow(customer))
        }
        if (offer.supplier.account.host.name.organisation!= mName) {
            flowSessions.add(initiateFlow(supplier))
        }
        if (offer.investor.account.host.name.organisation!= mName) {
            flowSessions.add(initiateFlow(investor))
        }

        return if (flowSessions.isEmpty()) {
            Companion.logger.info("$nn All participants are LOCAL ... \uD83D\uDD06")
            subFlow(FinalityFlow(signedTx, listOf()))
            signedTx
        } else {
            Companion.logger.info("$nn Participants are LOCAL/REMOTE ... \uD83D\uDD06")
            collectSignaturesAndFinalize(signedTx, flowSessions)
        }
    }

    @Suspendable
    @Throws(FlowException::class)
    private fun collectSignaturesAndFinalize(
            signedTx: SignedTransaction, sessions: List<FlowSession>): SignedTransaction {

        val signedTransaction = subFlow(CollectSignaturesFlow(
                partiallySignedTx = signedTx, sessionsToCollectFrom = sessions))
        logger.info("$nn OfferAcceptanceBySupplierFlow: Signatures collected OK!  \uD83D\uDE21 \uD83D\uDE21 " +
                ".... will call FinalityFlow ... \uD83C\uDF3A \uD83C\uDF3A ")
        val mSignedTransactionDone = subFlow(
                FinalityFlow(signedTransaction, sessions))

        logger.info("$xx OfferAcceptanceBySupplierFlow: MULTIPLE NODE(S): FinalityFlow has been executed ... $xx ")

        return mSignedTransactionDone
    }

    @Suspendable
    @Throws(FlowException::class)
    private fun reportToRegulator(mSignedTransactionDone: SignedTransaction) {
        logger.info("\uD83D\uDCCC \uD83D\uDCCC \uD83D\uDCCC  Talking to the Regulator, for SupplierOfferAcceptance compliance, Senor! .............")
        try {
            subFlow(ReportToRegulatorFlow(mSignedTransactionDone))
            logger.info("\uD83D\uDCCC \uD83D\uDCCC \uD83D\uDCCC  DONE talking to the Regulator for SupplierOfferAcceptanceFlow, Phew!")
        } catch (e: Exception) {
            logger.error(" \uD83D\uDC7F  \uD83D\uDC7F  \uD83D\uDC7F Regulator fell down.  \uD83D\uDC7F IGNORED  \uD83D\uDC7F ", e)
            throw FlowException("Regulator fell down on SupplierOfferAcceptanceFlow!")
        }
    }

    companion object {
        private val logger = LoggerFactory.getLogger(OfferAcceptanceBySupplierFlow::class.java)
        private const val nn = "\uD83C\uDFBD \uD83C\uDFBD \uD83C\uDFBD \uD83C\uDFBD"
        private const val xx = "\uD83D\uDC4C \uD83D\uDC4C \uD83D\uDC4C  \uD83E\uDD66 \uD83E\uDD66 \uD83E\uDD66 \uD83E\uDD66 \uD83E\uDD66 \uD83E\uDD66"
        const val OFFER_NOT_FOUND = -1
        const val OFFER_ALREADY_ACCEPTED = -2
        const val OFFER_ACCEPTED = 0
    }

}
