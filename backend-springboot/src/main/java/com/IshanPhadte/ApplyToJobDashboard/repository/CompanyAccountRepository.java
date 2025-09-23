package com.IshanPhadte.ApplyToJobDashboard.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.IshanPhadte.ApplyToJobDashboard.model.CompanyAccount;

public interface CompanyAccountRepository extends MongoRepository<CompanyAccount, String> {
    List<CompanyAccount> findByUserDataID(String userDataID);
    Optional<CompanyAccount> findByAccountIdAndUserDataID(String accountId, String userDataID);
}
