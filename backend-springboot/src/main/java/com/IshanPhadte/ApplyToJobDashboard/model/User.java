package com.IshanPhadte.ApplyToJobDashboard.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Users")
public class User {
    @Id
    private String id;
    private String username;
    private String password;
    private String userDataID;

    // Constructors
    public User() {}
    public User(String username, String password, String userDataID) {
        this.username = username;
        this.password = password;
        this.userDataID = userDataID;
    }

    // Getters & Setters
    public String getId() { return id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getUserDataID() { return userDataID; }
    public void setUserDataID(String userDataID) { this.userDataID = userDataID; }
}