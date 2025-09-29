package com.IshanPhadte.ApplyToJobDashboard.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Resumes")
public class Resume {

    @Id
    private String ID;           // MongoDB auto-generated ID
    private String userID;       // User reference
    private String title;
    private String fileID;       // GridFS ID
    private Date createdAt;

    // Getters & Setters
    public String getID() { return ID; }
    public void setID(String ID) { this.ID = ID; }

    public String getUserID() { return userID; }
    public void setUserID(String userID) { this.userID = userID; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getFileID() { return fileID; }
    public void setFileID(String fileID) { this.fileID = fileID; }

    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }
}
