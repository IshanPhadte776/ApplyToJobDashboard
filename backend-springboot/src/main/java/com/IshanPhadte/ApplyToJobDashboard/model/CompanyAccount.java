package com.IshanPhadte.ApplyToJobDashboard.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "CompanyAccounts")
public class CompanyAccount {

    @Id
    private String ID; // MongoDB auto-generated ID

    private String accountID; // Custom account ID
    private String companyName;
    private String email;
    private String password;
    private String portalURL;
    private String userID;

    // Getters and setters
    public String getID() { return ID; }
    public void setID(String ID) { this.ID = ID; }

    public String getAccountID() { return accountID; }
    public void setAccountID(String accountID) { this.accountID = accountID; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getPortalURL() { return portalURL; }
    public void setPortalURL(String portalURL) { this.portalURL = portalURL; }

    public String getUserID() { return userID; }
    public void setUserID(String userID) { this.userID = userID; }
}
