package com.bfn.client.data;

import net.corda.core.serialization.CordaSerializable;

public class AccountInfoDTO {
    String identifier,
            host,
            name;

    public AccountInfoDTO(String identifier, String host, String name) {
        this.identifier = identifier;
        this.host = host;
        this.name = name;

    }


    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
