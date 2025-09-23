package com.IshanPhadte.ApplyToJobDashboard.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.IshanPhadte.ApplyToJobDashboard.model.User;
import com.IshanPhadte.ApplyToJobDashboard.service.AuthService;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        String userID = body.get("userID");
        String name = body.get("name");

        User user = authService.register(email, password, userID, name);

        return ResponseEntity.ok(Map.of(
            "userId", user.getUserID(),
            "email", user.getEmail(),
            "name", user.getName()
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");

        Optional<User> optionalUser = authService.login(email, password);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get(); // extract the actual User object
            return ResponseEntity.ok(Map.of(
                "success", true,
                "userId", user.getUserID(),
                "name", user.getName(),
                "email", user.getEmail()
            ));
        } else {
            return ResponseEntity.ok(Map.of("success", false));
        }
    }
}
