package com.IshanPhadte.ApplyToJobDashboard.model;

import java.util.Date;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Resumes")
public class Resume {
    @Id
    private String id;
    private String userDataId;
    private String title;
    private String fileId; // GridFS ID
    private Date createdAt;

    // Getters & Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getUserDataId() { return userDataId; }
    public void setUserDataId(String userDataId) { this.userDataId = userDataId; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getFileId() { return fileId; }
    public void setFileId(String fileId) { this.fileId = fileId; }
    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }
}
