package com.IshanPhadte.ApplyToJobDashboard.controller;

import com.IshanPhadte.ApplyToJobDashboard.model.CompanyAccount;
import com.IshanPhadte.ApplyToJobDashboard.repository.CompanyAccountRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/accounts")
public class CompanyAccountsController {

    private final CompanyAccountRepository repository;

    public CompanyAccountsController(CompanyAccountRepository repository) {
        this.repository = repository;
    }

    // GET /api/v1/accounts?userDataID=IP083
    @GetMapping
    public List<CompanyAccount> getAllAccounts(@RequestParam String userDataID) {
        return repository.findByUserDataID(userDataID);
    }

    // GET /api/v1/accounts/{accountId}?userDataID=IP083
    @GetMapping("/{accountId}")
    public ResponseEntity<CompanyAccount> getAccountById(
            @PathVariable String accountId,
            @RequestParam String userDataID
    ) {
        Optional<CompanyAccount> account = repository.findByAccountIdAndUserDataID(accountId, userDataID);
        return account.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // POST /api/v1/accounts
    @PostMapping
    public CompanyAccount addAccount(@RequestBody CompanyAccount request) {
        return repository.save(request);
    }

    // PUT /api/v1/accounts/{accountId}?userDataID=IP083
    @PutMapping("/{accountId}")
    public ResponseEntity<?> updateAccount(
            @PathVariable String accountId,
            @RequestParam String userDataID,
            @RequestBody CompanyAccount request
    ) {
        Optional<CompanyAccount> existing = repository.findByAccountIdAndUserDataID(accountId, userDataID);
        if (existing.isEmpty()) return ResponseEntity.notFound().build();

        CompanyAccount accountToUpdate = existing.get();
        accountToUpdate.setCompanyName(request.getCompanyName());
        accountToUpdate.setEmail(request.getEmail());
        accountToUpdate.setPassword(request.getPassword());
        accountToUpdate.setPortalUrl(request.getPortalUrl());

        repository.save(accountToUpdate);
        return ResponseEntity.ok().body("{\"updated\": true}");
    }

    // DELETE /api/v1/accounts/{accountId}?userDataID=IP083
    @DeleteMapping("/{accountId}")
    public ResponseEntity<?> deleteAccount(
            @PathVariable String accountId,
            @RequestParam String userDataID
    ) {
        Optional<CompanyAccount> existing = repository.findByAccountIdAndUserDataID(accountId, userDataID);
        if (existing.isEmpty()) return ResponseEntity.notFound().build();

        repository.delete(existing.get());
        return ResponseEntity.ok().body("{\"deleted\": true}");
    }
}
