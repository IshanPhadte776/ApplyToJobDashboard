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

    public User register(String email, String password, String userDataID) {
        // Optional: check if email already exists
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        User user = new User(email, password, userDataID);
        return userRepository.save(user);
    }

    public boolean login(String email, String password) {
        Optional<User> user = userRepository.findByEmailAndPassword(email, password);
        return user.isPresent();
    }
}
