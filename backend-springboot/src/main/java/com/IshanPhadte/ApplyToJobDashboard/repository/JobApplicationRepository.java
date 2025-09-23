package com.IshanPhadte.ApplyToJobDashboard.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.IshanPhadte.ApplyToJobDashboard.model.JobApplication;

public interface JobApplicationRepository extends MongoRepository<JobApplication, String> {
    List<JobApplication> findByUserDataID(String userDataID);
    Optional<JobApplication> findByJobIdAndUserDataID(String jobId, String userDataID);
}
