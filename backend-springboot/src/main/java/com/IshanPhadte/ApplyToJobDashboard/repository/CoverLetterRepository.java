package com.IshanPhadte.ApplyToJobDashboard.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.IshanPhadte.ApplyToJobDashboard.model.CoverLetter;

public interface CoverLetterRepository extends MongoRepository<CoverLetter, String> {
    List<CoverLetter> findByResumeId(String resumeId);
}
