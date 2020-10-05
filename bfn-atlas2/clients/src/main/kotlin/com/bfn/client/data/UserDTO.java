package com.bfn.client.data;

public class UserDTO {
    private AccountInfoDTO accountInfo;
    private String  email, password,cellphone,uid, stellarAccountId,
            rippleAccountId, dateRegistered;

    public UserDTO(AccountInfoDTO accountInfo, String email, String password,
                   String cellphone, String uid, String stellarAccountId,
                   String rippleAccountId, String dateRegistered) {
        this.accountInfo = accountInfo;
        this.email = email;
        this.password = password;
        this.cellphone = cellphone;
        this.uid = uid;
        this.stellarAccountId = stellarAccountId;
        this.rippleAccountId = rippleAccountId;
    }

    public UserDTO() {
    }

    public String getDateRegistered() {
        return dateRegistered;
    }

    public void setDateRegistered(String dateRegistered) {
        this.dateRegistered = dateRegistered;
    }

    public AccountInfoDTO getAccountInfo() {
        return accountInfo;
    }

    public void setAccountInfo(AccountInfoDTO accountInfo) {
        this.accountInfo = accountInfo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCellphone() {
        return cellphone;
    }

    public void setCellphone(String cellphone) {
        this.cellphone = cellphone;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getStellarAccountId() {
        return stellarAccountId;
    }

    public void setStellarAccountId(String stellarAccountId) {
        this.stellarAccountId = stellarAccountId;
    }

    public String getRippleAccountId() {
        return rippleAccountId;
    }

    public void setRippleAccountId(String rippleAccountId) {
        this.rippleAccountId = rippleAccountId;
    }
}
