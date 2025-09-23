package com.IshanPhadte.ApplyToJobDashboard.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "UserData")
public class UserData {

    @Id
    private String _id;

    private String userId; // FK → Users
    private String phoneNumber;
    private String linkedinUrl;
    private String githubUrl;
    private String personalWebsiteUrl;

    // Getters and Setters
    public String get_id() { return _id; }
    public void set_id(String _id) { this._id = _id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getLinkedinUrl() { return linkedinUrl; }
    public void setLinkedinUrl(String linkedinUrl) { this.linkedinUrl = linkedinUrl; }

    public String getGithubUrl() { return githubUrl; }
    public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }

    public String getPersonalWebsiteUrl() { return personalWebsiteUrl; }
    public void setPersonalWebsiteUrl(String personalWebsiteUrl) { this.personalWebsiteUrl = personalWebsiteUrl; }
}
