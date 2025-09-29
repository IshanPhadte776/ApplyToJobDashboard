package com.IshanPhadte.ApplyToJobDashboard.service;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.IshanPhadte.ApplyToJobDashboard.model.Application;
import com.IshanPhadte.ApplyToJobDashboard.repository.ApplicationRepository;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository repository;

    // Get all applications (paginated)
    public Page<Application> getApplicationsByUser(String userID, int page, int size) {
        return repository.findByUserID(userID, PageRequest.of(page, size));
    }

    // Add application
    public Application saveApplication(Application application) {
        return repository.save(application);
    }

    public boolean patchApplication(String applicationID, Map<String, Object> updates) {
        Optional<Application> optionalApp = repository.findByApplicationID(applicationID);
        if (optionalApp.isEmpty()) return false;

        Application app = optionalApp.get();

        if (updates.containsKey("status")) {
            String statusStr = ((String) updates.get("status")).trim();

            // Normalize input
            switch (statusStr.toLowerCase()) {
                case "applied":
                    app.setStatus(Application.Status.Applied);
                    break;
                case "oa":
                    app.setStatus(Application.Status.OA);
                    break;
                case "interviewing":
                    app.setStatus(Application.Status.Interviewing);
                    break;
                case "offer":
                    app.setStatus(Application.Status.Offer);
                    break;
                default:
                    throw new IllegalArgumentException("Invalid status value: " + statusStr);
            }
        }

        if (updates.containsKey("applicationURL")) {
            app.setApplicationURL((String) updates.get("applicationURL"));
        }

        repository.save(app);
        return true;
    }




    // Delete application
    public boolean deleteApplication(String applicationID) {
        Optional<Application> existing = repository.findByApplicationID(applicationID);
        if (existing.isEmpty()) return false;

        repository.delete(existing.get());
        return true;
    }
}
