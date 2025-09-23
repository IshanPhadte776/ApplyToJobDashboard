package com.IshanPhadte.ApplyToJobDashboard.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
        String userDataID = body.get("userDataID");

        var user = authService.register(email, password, userDataID);
        return ResponseEntity.ok(Map.of(
                "userId", user.getId(),
                "email", user.getEmail()
        ));
    }

    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");

        boolean success = authService.login(email, password);
        return ResponseEntity.ok(Map.of("success", success));
    }


    
}
