package com.IshanPhadte.ApplyToJobDashboard.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.IshanPhadte.ApplyToJobDashboard.model.UserData;

public interface UserDataRepository extends MongoRepository<UserData, String> {
    Optional<UserData> findByUserId(String userId);
}
