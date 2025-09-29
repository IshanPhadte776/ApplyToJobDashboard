package com.IshanPhadte.ApplyToJobDashboard.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.IshanPhadte.ApplyToJobDashboard.model.CoverLetter;
import com.IshanPhadte.ApplyToJobDashboard.service.DocumentService;

@RestController
@RequestMapping("/api/v1/coverletters")
public class CoverLetterController {

    private final DocumentService service;
    public CoverLetterController(DocumentService service) { this.service = service; }

    // POST /api/v1/coverletters
    // Accepts a CoverLetter object with resumeID, userID, title, and optionally a file
    @PostMapping
    public CoverLetter uploadCoverLetter(@RequestBody CoverLetter coverLetter) throws IOException {
        return service.uploadCoverLetter(coverLetter);
    }

    @GetMapping("/{resumeID}")
    public List<CoverLetter> getCoverLetters(@PathVariable String resumeID) {
        return service.getCoverLetters(resumeID);
    }

    // PUT /api/v1/coverletters
    @PutMapping
    public CoverLetter updateCoverLetter(@RequestBody CoverLetter coverLetter) {
        // The coverLetter object should contain ID, userID, title, and optionally file
        return service.updateCoverLetter(coverLetter);
    }


    @DeleteMapping("/{id}")
    public boolean deleteCoverLetter(@PathVariable String id, @RequestParam String userID) {
        return service.deleteCoverLetter(id, userID);
    }
}
