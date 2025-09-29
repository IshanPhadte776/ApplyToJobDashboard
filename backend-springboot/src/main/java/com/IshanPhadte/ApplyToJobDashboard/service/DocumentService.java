package com.IshanPhadte.ApplyToJobDashboard.service;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.IshanPhadte.ApplyToJobDashboard.model.CoverLetter;
import com.IshanPhadte.ApplyToJobDashboard.model.Resume;
import com.IshanPhadte.ApplyToJobDashboard.repository.CoverLetterRepository;
import com.IshanPhadte.ApplyToJobDashboard.repository.ResumeRepository;

@Service
public class DocumentService {
    private final ResumeRepository resumeRepo;
    private final CoverLetterRepository coverLetterRepo;
    private final GridFsTemplate gridFsTemplate;

    public DocumentService(ResumeRepository resumeRepo, CoverLetterRepository coverLetterRepo, GridFsTemplate gridFsTemplate) {
        this.resumeRepo = resumeRepo;
        this.coverLetterRepo = coverLetterRepo;
        this.gridFsTemplate = gridFsTemplate;
    }

    // ----- Resume -----
    public Resume uploadResume(String userID, String title, MultipartFile file) throws IOException {
        ObjectId fileID = gridFsTemplate.store(file.getInputStream(), file.getOriginalFilename(), file.getContentType());
        Resume resume = new Resume();
        resume.setUserID(userID);
        resume.setTitle(title);
        resume.setFileID(fileID.toString());
        resume.setCreatedAt(new Date());
        return resumeRepo.save(resume);
    }

    public List<Resume> getResumes(String userID) {
        return resumeRepo.findByUserID(userID);
    }

    public Resume updateResumeTitle(String id, String title, String userDataId) {
        Optional<Resume> existing = resumeRepo.findById(id);
        if (existing.isEmpty() || !existing.get().getUserID().equals(userDataId)) return null;
        Resume resume = existing.get();
        resume.setTitle(title);
        return resumeRepo.save(resume);
    }

    public boolean deleteResume(String id, String userID) {
        Optional<Resume> existing = resumeRepo.findById(id);
        if (existing.isEmpty() || !existing.get().getUserID().equals(userID)) return false;

        Resume resume = existing.get();

        // Delete GridFS file
        Query fileQuery = new Query(Criteria.where("_id").is(new ObjectId(resume.getFileID())));
        gridFsTemplate.delete(fileQuery);

        // Delete associated cover letters
        List<CoverLetter> associated = coverLetterRepo.findByResumeID(id);
        associated.forEach(cl -> deleteCoverLetter(cl.getID(), userID));

        resumeRepo.delete(resume);
    return true;
}

    // ----- Cover Letter -----
    // ----- Cover Letter -----
    public CoverLetter uploadCoverLetter(CoverLetter coverLetter) throws IOException {
        // Validate parent resume
        Optional<Resume> parentResume = resumeRepo.findById(coverLetter.getResumeID());
        if (parentResume.isEmpty() || !parentResume.get().getUserID().equals(coverLetter.getUserID())) {
            return null; // or throw an exception
        }

        // Store file in GridFS if file is provided
        if (coverLetter.getFile() != null) {
            MultipartFile file = coverLetter.getFile();
            ObjectId fileId = gridFsTemplate.store(file.getInputStream(), file.getOriginalFilename(), file.getContentType());
            coverLetter.setFileID(fileId.toString());
        }

        coverLetter.setCreatedAt(new Date());

        return coverLetterRepo.save(coverLetter);
    }


    public List<CoverLetter> getCoverLetters(String resumeID) {
        return coverLetterRepo.findByResumeID(resumeID);
    }

    /**
     * Update a cover letter's details (title, optionally file)
     * @param coverLetter The CoverLetter object containing ID, userID, new title, etc.
     * @return Updated CoverLetter or null if not found
     */
    public CoverLetter updateCoverLetter(CoverLetter coverLetter) {
        if (coverLetter.getID() == null || coverLetter.getUserID() == null) {
            throw new IllegalArgumentException("CoverLetter ID and userID are required");
        }

        Optional<CoverLetter> existingOpt = coverLetterRepo.findById(coverLetter.getID());
        if (existingOpt.isEmpty()) return null;

        CoverLetter existing = existingOpt.get();

        // Ensure the user owns this cover letter
        if (!existing.getUserID().equals(coverLetter.getUserID())) {
            throw new IllegalArgumentException("User does not own this cover letter");
        }

        // Update fields
        if (coverLetter.getTitle() != null) {
            existing.setTitle(coverLetter.getTitle());
        }

        // If you want to support updating file later, you can add here
        // existing.setFileID(coverLetter.getFileID());

        existing.setCreatedAt(new Date()); // Update timestamp
        return coverLetterRepo.save(existing);
    }

    public boolean deleteCoverLetter(String id, String userID) {
        Optional<CoverLetter> existing = coverLetterRepo.findById(id);
        if (existing.isEmpty() || !existing.get().getUserID().equals(userID)) return false;

        CoverLetter cl = existing.get();

        // Delete GridFS file
        Query fileQuery = new Query(Criteria.where("_id").is(new ObjectId(cl.getFileID())));
        gridFsTemplate.delete(fileQuery);

        coverLetterRepo.delete(cl);
        return true;
    }
}
