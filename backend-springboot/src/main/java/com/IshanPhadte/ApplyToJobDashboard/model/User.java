package com.IshanPhadte.ApplyToJobDashboard.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Users")
public class User {
    @Id
    private String id;
    private String email;
    private String password;
    private String userDataID;

    // Constructors
    public User() {}
    public User(String email, String password, String userDataID) {
        this.email = email;
        this.password = password;
        this.userDataID = userDataID;
    }

    // Getters & Setters
    public String getId() { return id; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getUserDataID() { return userDataID; }
    public void setUserDataID(String userDataID) { this.userDataID = userDataID; }
}
