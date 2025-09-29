package com.IshanPhadte.ApplyToJobDashboard.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Users")
public class User {

    @Id
    private String ID;       // MongoDB auto-generated ID
    private String email;
    private String password;
    private String userID;   // renamed from userDataID
    private String name;     // added name field

    // Constructors
    public User() {}

    public User(String email, String password, String userID, String name) {
        this.email = email;
        this.password = password;
        this.userID = userID;
        this.name = name;
    }

    // Getters & Setters
    public String getID() { return ID; }
    public void setID(String ID) { this.ID = ID; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getUserID() { return userID; }
    public void setUserID(String userID) { this.userID = userID; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
