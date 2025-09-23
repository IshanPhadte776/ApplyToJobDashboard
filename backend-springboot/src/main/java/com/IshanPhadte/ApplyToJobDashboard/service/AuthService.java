package com.IshanPhadte.ApplyToJobDashboard.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.IshanPhadte.ApplyToJobDashboard.model.User;
import com.IshanPhadte.ApplyToJobDashboard.repository.UserRepository;

@Service
public class AuthService {
    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Register with email, password, userID, and name
    public User register(String email, String password, String userID, String name) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        User user = new User(email, password, userID, name);
        return userRepository.save(user);
    }

    // Login returns the User if successful
    public Optional<User> login(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }
}
