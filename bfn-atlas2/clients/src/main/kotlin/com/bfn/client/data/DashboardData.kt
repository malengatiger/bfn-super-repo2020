package com.bfn.client.data

class DashboardData {
    var accounts = 0
    var invoices = 0
    var offers = 0
    var node: String? = null

    constructor(accounts: Int, invoices: Int, offers: Int, node: String?) {
        this.accounts = accounts
        this.invoices = invoices
        this.offers = offers
        this.node = node
    }

    constructor() {}

}
