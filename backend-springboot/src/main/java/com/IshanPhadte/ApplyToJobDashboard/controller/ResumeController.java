package com.IshanPhadte.ApplyToJobDashboard.controller;

import java.io.IOException;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.IshanPhadte.ApplyToJobDashboard.model.Resume;
import com.IshanPhadte.ApplyToJobDashboard.service.DocumentService;
import com.mongodb.client.gridfs.model.GridFSFile;

@RestController
@RequestMapping("/api/v1/resumes")
public class ResumeController {

    private final DocumentService service;
    private final GridFsTemplate gridFsTemplate;

    public ResumeController(DocumentService service, GridFsTemplate gridFsTemplate) {
        this.service = service;
        this.gridFsTemplate = gridFsTemplate;
    }

    // ---------- Upload ----------
    @PostMapping("/upload")
    public Resume uploadResume(@RequestParam String userID,
                               @RequestParam String title,
                               @RequestParam("file") MultipartFile file) throws IOException {
        return service.uploadResume(userID, title, file);
    }

    // ---------- Get metadata ----------
    @GetMapping("/{userID}")
    public List<Resume> getResumes(@PathVariable String userID) {
        return service.getResumes(userID);
    }

    // ---------- Download file ----------
    @GetMapping("/download/{fileId}")
    public ResponseEntity<InputStreamResource> downloadResume(@PathVariable String fileId) throws IOException {
        // First, find the file by its ObjectId
        GridFSFile gridFsFile = gridFsTemplate.findOne(
                org.springframework.data.mongodb.core.query.Query.query(
                        org.springframework.data.mongodb.core.query.Criteria.where("_id").is(new ObjectId(fileId))
                )
        );

        if (gridFsFile == null) {
            return ResponseEntity.notFound().build();
        }

        // Convert GridFSFile -> GridFsResource
        GridFsResource resource = gridFsTemplate.getResource(gridFsFile);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .contentType(MediaType.parseMediaType(
                        gridFsFile.getMetadata() != null && gridFsFile.getMetadata().get("_contentType") != null
                                ? gridFsFile.getMetadata().get("_contentType").toString()
                                : "application/octet-stream"
                ))
                .body(new InputStreamResource(resource.getInputStream()));
    }


    // ---------- Update ----------
    @PutMapping("/{id}")
    public Resume updateResume(@PathVariable String id,
                               @RequestParam String title,
                               @RequestParam String userID) {
        return service.updateResumeTitle(id, title, userID);
    }

    // ---------- Delete ----------
    @DeleteMapping("/{id}")
    public boolean deleteResume(@PathVariable String id, @RequestParam String userID) {
        return service.deleteResume(id, userID);
    }
}
