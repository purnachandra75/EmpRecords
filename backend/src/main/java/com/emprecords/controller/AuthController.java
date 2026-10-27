package com.emprecords.controller;

import com.emprecords.dto.AuthResponse;
import com.emprecords.dto.LoginRequest;
import com.emprecords.model.Role;
import com.emprecords.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/admin/login")
    public AuthResponse adminLogin(@Valid @RequestBody LoginRequest request) {
        return authService.login(request, Role.ADMIN);
    }

    @PostMapping("/employee/login")
    public AuthResponse employeeLogin(@Valid @RequestBody LoginRequest request) {
        return authService.login(request, Role.EMPLOYEE);
    }
}
