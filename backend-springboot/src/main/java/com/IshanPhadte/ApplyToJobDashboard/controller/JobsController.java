package com.IshanPhadte.ApplyToJobDashboard.controller;

import java.util.List;
import java.util.Optional;

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

import com.IshanPhadte.ApplyToJobDashboard.model.JobApplication;
import com.IshanPhadte.ApplyToJobDashboard.repository.JobApplicationRepository;

@RestController
@RequestMapping("/api/v1/jobs")
public class JobsController {

    private final JobApplicationRepository repository;

    public JobsController(JobApplicationRepository repository) {
        this.repository = repository;
    }

    /*
    Sample PowerShell curl commands for testing:

    # 1️⃣ GET all jobs for userDataID IP083
    curl -Method GET "http://localhost:8080/api/v1/jobs?userDataID=IP083" `
         -Headers @{ "Content-Type" = "application/json" }

    # 2️⃣ POST add a new job
    curl -Method POST "http://localhost:8080/api/v1/jobs" `
         -Headers @{ "Content-Type" = "application/json" } `
         -Body '{ 
             "jobId":"IP083-3163",
             "jobTitle":"Junior SWE",
             "company":"CIBC",
             "status":"Applied",
             "dateApplied":"2025-09-10",
             "accountNeeded": false,
             "jobUrl":"https://www.linkedin.com/jobs/view/4298287896",
             "userDataID":"IP083"
         }'

    # 3️⃣ PUT update a job by MongoDB _id
    curl -Method PUT "http://localhost:8080/api/v1/jobs/{id}" `
         -Headers @{ "Content-Type" = "application/json" } `
         -Body '{ 
             "jobId":"IP083-3163",
             "jobTitle":"Junior SWE Updated",
             "company":"CIBC",
             "status":"Interview Scheduled",
             "dateApplied":"2025-09-10",
             "accountNeeded": true,
             "jobUrl":"https://www.linkedin.com/jobs/view/4298287896",
             "userDataID":"IP083"
         }'

    # 4️⃣ DELETE job by jobId and userDataID
    curl -Method DELETE "http://localhost:8080/api/v1/jobs/IP083-3163?userDataID=IP083" `
         -Headers @{ "Content-Type" = "application/json" }
    */

    // GET all jobs for a user
    @GetMapping
    public List<JobApplication> getAllJobsForUser(@RequestParam String userDataID) {
        return repository.findByUserDataID(userDataID);
    }

    // POST add a new job
    @PostMapping
    public JobApplication addJob(@RequestBody JobApplication request) {
        return repository.save(request);
    }

    // PUT update job by MongoDB _id
    // PUT update job by jobId
    @PutMapping("/update/{jobId}")
    public ResponseEntity<?> updateJobByJobId(@PathVariable String jobId, @RequestBody JobApplication request) {
        Optional<JobApplication> existing = repository.findByJobIdAndUserDataID(jobId, request.getUserDataID());
        if (existing.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        JobApplication jobToUpdate = existing.get();
        jobToUpdate.setJobTitle(request.getJobTitle());
        jobToUpdate.setCompany(request.getCompany());
        jobToUpdate.setStatus(request.getStatus());
        jobToUpdate.setDateApplied(request.getDateApplied());
        jobToUpdate.setAccountNeeded(request.isAccountNeeded());
        jobToUpdate.setJobUrl(request.getJobUrl());

        repository.save(jobToUpdate);
        return ResponseEntity.ok("{\"updated\": true}");
    }


    // DELETE job by jobId and userDataID
    @DeleteMapping("/{jobId}")
    public ResponseEntity<?> deleteJob(@PathVariable String jobId, @RequestParam String userDataID) {
        Optional<JobApplication> existing = repository.findByJobIdAndUserDataID(jobId, userDataID);
        if (existing.isEmpty()) return ResponseEntity.notFound().build();

        repository.delete(existing.get());
        return ResponseEntity.ok("{\"deleted\": true}");
    }
}
