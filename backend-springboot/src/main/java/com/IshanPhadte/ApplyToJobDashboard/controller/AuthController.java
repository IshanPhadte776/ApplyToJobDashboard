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
@RequestMapping("/api/v1")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/users")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        String userID = body.get("userID");
        String name = body.get("name");

        User user = authService.register(email, password, userID, name);

        return ResponseEntity.ok(Map.of(
            "userID", user.getUserID(),
            "email", user.getEmail(),
            "name", user.getName()
        ));
    }

    @PostMapping("/auth/token")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");

        Optional<User> optionalUser = authService.login(email, password);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get(); // extract the actual User object
            return ResponseEntity.ok(Map.of(
                "success", true,
                "userID", user.getUserID(),
                "name", user.getName(),
                "email", user.getEmail()
            ));
        } else {
            return ResponseEntity.ok(Map.of("success", false));
        }
    }
}
