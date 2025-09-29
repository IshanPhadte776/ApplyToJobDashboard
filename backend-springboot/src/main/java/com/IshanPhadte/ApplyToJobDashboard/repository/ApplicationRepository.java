package com.IshanPhadte.ApplyToJobDashboard.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.IshanPhadte.ApplyToJobDashboard.model.Application;

public interface ApplicationRepository extends MongoRepository<Application, String> {
    Page<Application> findByUserID(String userID, Pageable pageable);
    Optional<Application> findByApplicationID(String applicationID);
}
