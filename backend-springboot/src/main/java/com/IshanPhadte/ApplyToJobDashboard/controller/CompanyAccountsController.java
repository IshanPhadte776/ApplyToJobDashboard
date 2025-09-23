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

import com.IshanPhadte.ApplyToJobDashboard.model.CompanyAccount;
import com.IshanPhadte.ApplyToJobDashboard.repository.CompanyAccountRepository;

@RestController
@RequestMapping("/api/v1/accounts")
public class CompanyAccountsController {

    private final CompanyAccountRepository repository;

    public CompanyAccountsController(CompanyAccountRepository repository) {
        this.repository = repository;
    }

    // GET /api/v1/accounts?userID=IP083
    @GetMapping
    public List<CompanyAccount> getAllAccounts(@RequestParam String userID) {
        return repository.findByUserID(userID);
    }

    // GET /api/v1/accounts/{accountId}?userID=IP083
    @GetMapping("/{accountId}")
    public ResponseEntity<CompanyAccount> getAccountById(
            @PathVariable String accountId,
            @RequestParam String userID
    ) {
        Optional<CompanyAccount> account = repository.findByAccountIdAndUserID(accountId, userID);
        return account.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // POST /api/v1/accounts
    @PostMapping
    public CompanyAccount addAccount(@RequestBody CompanyAccount request) {
        return repository.save(request);
    }

    // PUT /api/v1/accounts/{accountId}?userID=IP083
    @PutMapping("/{accountId}")
    public ResponseEntity<?> updateAccount(
            @PathVariable String accountId,
            @RequestParam String userID,
            @RequestBody CompanyAccount request
    ) {
        Optional<CompanyAccount> existing = repository.findByAccountIdAndUserID(accountId, userID);
        if (existing.isEmpty()) return ResponseEntity.notFound().build();

        CompanyAccount accountToUpdate = existing.get();
        accountToUpdate.setCompanyName(request.getCompanyName());
        accountToUpdate.setEmail(request.getEmail());
        accountToUpdate.setPassword(request.getPassword());
        accountToUpdate.setPortalUrl(request.getPortalUrl());

        repository.save(accountToUpdate);
        return ResponseEntity.ok().body("{\"updated\": true}");
    }

    // DELETE /api/v1/accounts/{accountId}?userID=IP083
    @DeleteMapping("/{accountId}")
    public ResponseEntity<?> deleteAccount(
            @PathVariable String accountId,
            @RequestParam String userID
    ) {
        Optional<CompanyAccount> existing = repository.findByAccountIdAndUserID(accountId, userID);
        if (existing.isEmpty()) return ResponseEntity.notFound().build();

        repository.delete(existing.get());
        return ResponseEntity.ok().body("{\"deleted\": true}");
    }
}
