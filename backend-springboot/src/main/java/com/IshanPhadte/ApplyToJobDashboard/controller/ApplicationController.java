package com.IshanPhadte.ApplyToJobDashboard.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.IshanPhadte.ApplyToJobDashboard.model.Application;
import com.IshanPhadte.ApplyToJobDashboard.service.ApplicationService;

@RestController
@RequestMapping("/api/v1")
public class ApplicationController {

    @Autowired
    private ApplicationService service;

    // 🔹 1. GET all applications for a user (paginated)
    // Example: GET /api/v1/users/{userID}/applications?page=0&size=20
    @GetMapping("/users/{userID}/applications")
    public List<Application> getApplicationsForUser(
            @PathVariable String userID,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return service.getApplicationsByUser(userID, page, size).getContent();
    }

    // 🔹 2. POST create new application
    // Example: POST /api/v1/applications
    @PostMapping("/applications")
    public Application addApplication(@RequestBody Application application) {
        return service.saveApplication(application);
    }

    // 🔹 3. PUT update an application
    // Example: PUT /api/v1/applications/{applicationID}
    @PutMapping("/applications/{applicationID}")
    public ResponseEntity<?> updateApplication(
            @PathVariable String applicationID,
            @RequestBody Map<String, Object> updates) {
        boolean updated = service.patchApplication(applicationID, updates);
        if (!updated) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(Map.of("updated", true));
    }

    // 🔹 4. DELETE application
    // Example: DELETE /api/v1/applications/{applicationID}
    @DeleteMapping("/applications/{applicationID}")
    public ResponseEntity<?> deleteApplication(@PathVariable String applicationID) {
        boolean deleted = service.deleteApplication(applicationID);
        if (!deleted) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(Map.of("deleted", true));
    }
}