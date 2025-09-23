package com.IshanPhadte.ApplyToJobDashboard.controller;

import com.IshanPhadte.ApplyToJobDashboard.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");
        String userDataID = body.get("userDataID");

        var user = authService.register(username, password, userDataID);
        return ResponseEntity.ok(Map.of(
                "userId", user.getId(),
                "username", user.getUsername()
        ));
    }

    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");

        boolean success = authService.login(username, password);
        return ResponseEntity.ok(Map.of("success", success));
    }


    
}
