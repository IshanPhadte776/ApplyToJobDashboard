package com.IshanPhadte.ApplyToJobDashboard.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Applications")
public class Application {

    @Id
    private String id; // MongoDB auto ID

    private String applicationID;   // Unique per user
    private String jobTitle;        // Kept as is
    private String company;
    private Status status;
    private String dateApplied;
    private boolean accountNeeded;
    private String applicationURL;
    private String userID;          // FK → Users

    // Getters & setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getApplicationID() { return applicationID; }
    public void setApplicationID(String applicationID) { this.applicationID = applicationID; }

    public String getJobTitle() { return jobTitle; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    public String getDateApplied() { return dateApplied; }
    public void setDateApplied(String dateApplied) { this.dateApplied = dateApplied; }

    public boolean isAccountNeeded() { return accountNeeded; }
    public void setAccountNeeded(boolean accountNeeded) { this.accountNeeded = accountNeeded; }

    public String getApplicationURL() { return applicationURL; }
    public void setApplicationURL(String applicationURL) { this.applicationURL = applicationURL; }

    public String getUserID() { return userID; }
    public void setUserID(String userID) { this.userID = userID; }

    // Enum for Status
    public enum Status {
        Applied,
        OA,
        Interviewing,
        Offer,
        Rejected
    }
}
