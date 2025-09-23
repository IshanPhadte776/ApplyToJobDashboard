package com.IshanPhadte.ApplyToJobDashboard.controllers;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;


@SpringBootTest
@ActiveProfiles("test") // Uses application-test.properties
public abstract class BaseControllerTest {
    // Optional: common setup for all controllers
}