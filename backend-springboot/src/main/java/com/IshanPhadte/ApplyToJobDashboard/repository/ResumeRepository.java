package com.IshanPhadte.ApplyToJobDashboard.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.IshanPhadte.ApplyToJobDashboard.model.Resume;

public interface ResumeRepository extends MongoRepository<Resume, String> {
    List<Resume> findByUserDataId(String userDataId);
}
