package com.bfn.client.data

class Anchor(
        var anchorId: String? = null,
        var name: String? = null,
        var cellphone: String? = null,
        var email: String? = null,
        var baseAccount: Account? = null,
        var issuingAccount: Account? = null,
        var distributionAccount: Account? = null,
        var date: String? = null
) {
}