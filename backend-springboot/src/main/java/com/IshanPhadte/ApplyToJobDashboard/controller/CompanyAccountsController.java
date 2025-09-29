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
@RequestMapping("/api/v1/companyaccounts")
public class CompanyAccountsController {

    private final CompanyAccountRepository repository;

    public CompanyAccountsController(CompanyAccountRepository repository) {
        this.repository = repository;
    }

    // GET /api/v1/companyaccounts?userID=IP083 → List all company accounts for a user
    @GetMapping
    public List<CompanyAccount> getCompanyAccountsForUser(@RequestParam String userID) {
        return repository.findByUserID(userID);
    }

    // POST /api/v1/companyaccounts → Add a new company account
    @PostMapping
    public CompanyAccount addCompanyAccount(@RequestBody CompanyAccount request) {
        return repository.save(request);
    }

    // PUT /api/v1/companyaccounts/{accountID}?userID=IP083 → Update a specific company account
    @PutMapping("/{accountID}")
    public ResponseEntity<?> updateCompanyAccount(
            @PathVariable String accountID,
            @RequestParam String userID,
            @RequestBody CompanyAccount request
    ) {
        Optional<CompanyAccount> existing = repository.findByAccountIDAndUserID(accountID, userID);
        if (existing.isEmpty()) return ResponseEntity.notFound().build();

        CompanyAccount accountToUpdate = existing.get();
        accountToUpdate.setCompanyName(request.getCompanyName());
        accountToUpdate.setEmail(request.getEmail());
        accountToUpdate.setPassword(request.getPassword());
        accountToUpdate.setPortalURL(request.getPortalURL());

        repository.save(accountToUpdate);
        return ResponseEntity.ok().body("{\"updated\": true}");
    }

    // DELETE /api/v1/companyaccounts/{accountID}?userID=IP083 → Delete a specific company account
    @DeleteMapping("/{accountID}")
    public ResponseEntity<?> deleteCompanyAccount(
            @PathVariable String accountID,
            @RequestParam String userID
    ) {
        Optional<CompanyAccount> existing = repository.findByAccountIDAndUserID(accountID, userID);
        if (existing.isEmpty()) return ResponseEntity.notFound().build();

        repository.delete(existing.get());
        return ResponseEntity.ok().body("{\"deleted\": true}");
    }
}
