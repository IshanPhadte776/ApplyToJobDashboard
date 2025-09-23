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

import com.IshanPhadte.ApplyToJobDashboard.model.Resume;
import com.IshanPhadte.ApplyToJobDashboard.model.CoverLetter;
import com.IshanPhadte.ApplyToJobDashboard.repository.ResumeRepository;
import com.IshanPhadte.ApplyToJobDashboard.repository.CoverLetterRepository;

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
    public Resume uploadResume(String userDataId, String title, MultipartFile file) throws IOException {
        ObjectId fileId = gridFsTemplate.store(file.getInputStream(), file.getOriginalFilename(), file.getContentType());
        Resume resume = new Resume();
        resume.setUserDataId(userDataId);
        resume.setTitle(title);
        resume.setFileId(fileId.toString());
        resume.setCreatedAt(new Date());
        return resumeRepo.save(resume);
    }

    public List<Resume> getResumes(String userDataId) {
        return resumeRepo.findByUserDataId(userDataId);
    }

    public Resume updateResumeTitle(String id, String title, String userDataId) {
        Optional<Resume> existing = resumeRepo.findById(id);
        if (existing.isEmpty() || !existing.get().getUserDataId().equals(userDataId)) return null;
        Resume resume = existing.get();
        resume.setTitle(title);
        return resumeRepo.save(resume);
    }

    public boolean deleteResume(String id, String userDataId) {
        Optional<Resume> existing = resumeRepo.findById(id);
        if (existing.isEmpty() || !existing.get().getUserDataId().equals(userDataId)) return false;

        Resume resume = existing.get();

        // Delete GridFS file
        Query fileQuery = new Query(Criteria.where("_id").is(new ObjectId(resume.getFileId())));
        gridFsTemplate.delete(fileQuery);

        // Delete associated cover letters
        List<CoverLetter> associated = coverLetterRepo.findByResumeId(id);
        associated.forEach(cl -> deleteCoverLetter(cl.getId(), userDataId));

        resumeRepo.delete(resume);
    return true;
}

    // ----- Cover Letter -----
    public CoverLetter uploadCoverLetter(String resumeId, String userDataId, String title, MultipartFile file) throws IOException {
        Optional<Resume> parentResume = resumeRepo.findById(resumeId);
        if (parentResume.isEmpty() || !parentResume.get().getUserDataId().equals(userDataId)) return null;

        ObjectId fileId = gridFsTemplate.store(file.getInputStream(), file.getOriginalFilename(), file.getContentType());
        CoverLetter cl = new CoverLetter();
        cl.setResumeId(resumeId);
        cl.setUserDataId(userDataId);
        cl.setTitle(title);
        cl.setFileId(fileId.toString());
        cl.setCreatedAt(new Date());
        return coverLetterRepo.save(cl);
    }

    public List<CoverLetter> getCoverLetters(String resumeId) {
        return coverLetterRepo.findByResumeId(resumeId);
    }

    public CoverLetter updateCoverLetterTitle(String id, String title, String userDataId) {
        Optional<CoverLetter> existing = coverLetterRepo.findById(id);
        if (existing.isEmpty() || !existing.get().getUserDataId().equals(userDataId)) return null;
        CoverLetter cl = existing.get();
        cl.setTitle(title);
        return coverLetterRepo.save(cl);
    }

    public boolean deleteCoverLetter(String id, String userDataId) {
        Optional<CoverLetter> existing = coverLetterRepo.findById(id);
        if (existing.isEmpty() || !existing.get().getUserDataId().equals(userDataId)) return false;

        CoverLetter cl = existing.get();

        // Delete GridFS file
        Query fileQuery = new Query(Criteria.where("_id").is(new ObjectId(cl.getFileId())));
        gridFsTemplate.delete(fileQuery);

        coverLetterRepo.delete(cl);
        return true;
    }
}
