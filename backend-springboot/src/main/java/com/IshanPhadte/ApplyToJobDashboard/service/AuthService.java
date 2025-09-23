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

    public User register(String username, String password, String userDataID) {
        // Optional: check if username exists
        if (userRepository.findByUsername(username).isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        User user = new User(username, password, userDataID);
        return userRepository.save(user);
    }

    public boolean login(String username, String password) {
        Optional<User> user = userRepository.findByUsernameAndPassword(username, password);
        return user.isPresent();
    }
}
