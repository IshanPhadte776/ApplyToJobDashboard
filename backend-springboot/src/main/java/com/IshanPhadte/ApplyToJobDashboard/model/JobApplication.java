package com.IshanPhadte.ApplyToJobDashboard.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "JobApplications")
public class JobApplication {

    @Id
    private String id; // MongoDB auto-generated ID

    private String jobId;
    private String jobTitle;
    private String company;
    private String status;
    private String dateApplied;
    private boolean accountNeeded;
    private String jobUrl;
    private String userDataID;

    // Getters and setters
    public String getId() { return id; }
    public String getJobId() { return jobId; }
    public void setJobId(String jobId) { this.jobId = jobId; }
    public String getJobTitle() { return jobTitle; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }
    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getDateApplied() { return dateApplied; }
    public void setDateApplied(String dateApplied) { this.dateApplied = dateApplied; }
    public boolean isAccountNeeded() { return accountNeeded; }
    public void setAccountNeeded(boolean accountNeeded) { this.accountNeeded = accountNeeded; }
    public String getJobUrl() { return jobUrl; }
    public void setJobUrl(String jobUrl) { this.jobUrl = jobUrl; }
    public String getUserDataID() { return userDataID; }
    public void setUserDataID(String userDataID) { this.userDataID = userDataID; }
}
