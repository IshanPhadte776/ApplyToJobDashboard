package com.IshanPhadte.ApplyToJobDashboard.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "UserData")
public class UserData {

    @Id
    private String ID;        // MongoDB auto-generated ID

    private String userID;    // FK → Users
    private String phoneNumber;
    private String linkedinUrl;
    private String githubUrl;
    private String personalWebsiteUrl;

    // Getters and Setters
    public String getID() { return ID; }
    public void setID(String ID) { this.ID = ID; }

    public String getUserID() { return userID; }
    public void setUserID(String userID) { this.userID = userID; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getLinkedinUrl() { return linkedinUrl; }
    public void setLinkedinUrl(String linkedinUrl) { this.linkedinUrl = linkedinUrl; }

    public String getGithubUrl() { return githubUrl; }
    public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }

    public String getPersonalWebsiteUrl() { return personalWebsiteUrl; }
    public void setPersonalWebsiteUrl(String personalWebsiteUrl) { this.personalWebsiteUrl = personalWebsiteUrl; }
}
