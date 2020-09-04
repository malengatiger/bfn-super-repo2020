package com.bfn.client.data

class DemoSummary {
    var numberOfAccounts = 0
    var numberOfInvoices = 0
    var numberOfInvoiceOffers = 0
    var numberOfNodes = 0
    var numberOfFlows = 0
    var started: String? = null
    var ended: String? = null
    var elapsedSeconds = 0.0
    var dashboardData: DashboardData? = null

    constructor() {}
    constructor(numberOfAccounts: Int, numberOfInvoices: Int,
                numberOfInvoiceOffers: Int, numberOfNodes: Int,
                numberOfFlows: Int, started: String?,
                ended: String?, elapsedSeconds: Double,
                dashboardData: DashboardData?) {
        this.numberOfAccounts = numberOfAccounts
        this.numberOfInvoices = numberOfInvoices
        this.numberOfInvoiceOffers = numberOfInvoiceOffers
        this.numberOfNodes = numberOfNodes
        this.numberOfFlows = numberOfFlows
        this.started = started
        this.ended = ended
        this.dashboardData = dashboardData
        this.elapsedSeconds = elapsedSeconds
    }

}
