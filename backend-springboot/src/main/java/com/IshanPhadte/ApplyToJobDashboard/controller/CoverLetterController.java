package com.IshanPhadte.ApplyToJobDashboard.controller;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.IshanPhadte.ApplyToJobDashboard.model.CoverLetter;
import com.IshanPhadte.ApplyToJobDashboard.service.DocumentService;

@RestController
@RequestMapping("/api/v1/coverletters")
public class CoverLetterController {

    private final DocumentService service;
    public CoverLetterController(DocumentService service) { this.service = service; }

    @PostMapping("/{resumeId}")
    public CoverLetter uploadCoverLetter(@PathVariable String resumeId,
                                         @RequestParam String userDataId,
                                         @RequestParam String title,
                                         @RequestParam MultipartFile file) throws IOException {
        return service.uploadCoverLetter(resumeId, userDataId, title, file);
    }

    @GetMapping("/{resumeId}")
    public List<CoverLetter> getCoverLetters(@PathVariable String resumeId) {
        return service.getCoverLetters(resumeId);
    }

    @PutMapping("/{id}")
    public CoverLetter updateCoverLetter(@PathVariable String id,
                                         @RequestParam String userDataId,
                                         @RequestParam String title) {
        return service.updateCoverLetterTitle(id, title, userDataId);
    }

    @DeleteMapping("/{id}")
    public boolean deleteCoverLetter(@PathVariable String id, @RequestParam String userDataId) {
        return service.deleteCoverLetter(id, userDataId);
    }
}
