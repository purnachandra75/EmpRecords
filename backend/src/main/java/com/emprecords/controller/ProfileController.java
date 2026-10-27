package com.emprecords.controller;

import com.emprecords.model.Employee;
import com.emprecords.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final EmployeeService employeeService;

    public ProfileController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping
    public Employee getProfile(Authentication authentication) {
        return employeeService.getProfile(authentication.getName());
    }

    @PutMapping
    public Employee updateProfile(Authentication authentication, @Valid @RequestBody Employee employee) {
        return employeeService.updateProfile(authentication.getName(), employee);
    }
}
