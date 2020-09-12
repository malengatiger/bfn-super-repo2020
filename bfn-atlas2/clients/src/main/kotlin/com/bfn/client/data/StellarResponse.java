package com.bfn.client.data;

public class StellarResponse {
    private String accountId, secretSeed;

    public StellarResponse(String accountId, String secretSeed) {
        this.accountId = accountId;
        this.secretSeed = secretSeed;
    }

    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    public String getSecretSeed() {
        return secretSeed;
    }

    public void setSecretSeed(String secretSeed) {
        this.secretSeed = secretSeed;
    }
}
