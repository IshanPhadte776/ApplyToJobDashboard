package com.IshanPhadte.ApplyToJobDashboard.controllers;

import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.IshanPhadte.ApplyToJobDashboard.model.User;
import com.IshanPhadte.ApplyToJobDashboard.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test") // Uses application-test.properties
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void cleanDatabase() {
        userRepository.deleteAll();
    }

    @Test
    void testRegisterAndLogin() throws Exception {
        // --- Register ---
        Map<String, String> registerBody = Map.of(
                "email", "test@example.com",
                "password", "password123",
                "userDataID", "IP083"
        );

        String registerJson = objectMapper.writeValueAsString(registerBody);

        mockMvc.perform(post("/api/v1/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(registerJson))
                .andExpect(status().isOk());

        User user = userRepository.findByEmail("test@example.com").orElse(null);
        assertThat(user).isNotNull();
        assertThat(user.getUserDataID()).isEqualTo("IP083");

        // --- Login ---
        Map<String, String> loginBody = Map.of(
                "email", "test@example.com",
                "password", "password123"
        );
        String loginJson = objectMapper.writeValueAsString(loginBody);

        mockMvc.perform(post("/api/v1/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(loginJson))
                .andExpect(status().isOk());
    }
}