package com.bfn.client.data;

import org.stellar.sdk.responses.AccountResponse;

public class AccountResponseBag {
    AccountResponse accountResponse;
    String secretSeed;

    public AccountResponseBag(AccountResponse accountResponse, String secretSeed) {
        this.accountResponse = accountResponse;
        this.secretSeed = secretSeed;
    }

    public AccountResponse getAccountResponse() {
        return accountResponse;
    }

    public void setAccountResponse(AccountResponse accountResponse) {
        this.accountResponse = accountResponse;
    }

    public String getSecretSeed() {
        return secretSeed;
    }

    public void setSecretSeed(String secretSeed) {
        this.secretSeed = secretSeed;
    }
}
