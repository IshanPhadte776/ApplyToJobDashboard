package com.IshanPhadte.ApplyToJobDashboard.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "CompanyAccounts")
public class CompanyAccount {

    @Id
    private String id; // MongoDB auto-generated ID

    private String accountId; // Custom account ID
    private String companyName;
    private String email;
    private String password;
    private String portalUrl;
    private String userDataID;

    // Getters and setters
    public String getId() { return id; }
    public String getAccountId() { return accountId; }
    public void setAccountId(String accountId) { this.accountId = accountId; }
    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getPortalUrl() { return portalUrl; }
    public void setPortalUrl(String portalUrl) { this.portalUrl = portalUrl; }
    public String getUserDataID() { return userDataID; }
    public void setUserDataID(String userDataID) { this.userDataID = userDataID; }
}
