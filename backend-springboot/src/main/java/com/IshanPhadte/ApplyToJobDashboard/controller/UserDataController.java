package com.IshanPhadte.ApplyToJobDashboard.controller;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.IshanPhadte.ApplyToJobDashboard.model.UserData;
import com.IshanPhadte.ApplyToJobDashboard.repository.UserDataRepository;

@RestController
@RequestMapping("/api/v1/userdata")
public class UserDataController {

    private final UserDataRepository repository;

    public UserDataController(UserDataRepository repository) {
        this.repository = repository;
    }

    // GET userData by userId
    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserData(@PathVariable String userId) {
        Optional<UserData> existing = repository.findByUserId(userId);
        return existing
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ POST create new userData
    @PostMapping
    public ResponseEntity<?> createUserData(@RequestBody UserData request) {
        // Check if already exists
        Optional<UserData> existing = repository.findByUserId(request.getUserId());
        if (existing.isPresent()) {
            return ResponseEntity.badRequest().body("{\"error\": \"UserData already exists\"}");
        }

        UserData saved = repository.save(request);
        return ResponseEntity.ok(saved);
    }

    // PUT update userData by userId
    @PutMapping("/{userId}")
    public ResponseEntity<?> updateUserData(
            @PathVariable String userId,
            @RequestBody UserData request
    ) {
        Optional<UserData> existing = repository.findByUserId(userId);
        if (existing.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        UserData userDataToUpdate = existing.get();
        userDataToUpdate.setPhoneNumber(request.getPhoneNumber());
        userDataToUpdate.setLinkedinUrl(request.getLinkedinUrl());
        userDataToUpdate.setGithubUrl(request.getGithubUrl());
        userDataToUpdate.setPersonalWebsiteUrl(request.getPersonalWebsiteUrl());

        repository.save(userDataToUpdate);
        return ResponseEntity.ok("{\"updated\": true}");
    }
}
