package com.emprecords.service;

import com.emprecords.dto.AuthResponse;
import com.emprecords.dto.LoginRequest;
import com.emprecords.exception.UnauthorizedException;
import com.emprecords.model.Employee;
import com.emprecords.model.Role;
import com.emprecords.model.UserAccount;
import com.emprecords.repository.UserAccountRepository;
import com.emprecords.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserAccountRepository userAccountRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            UserAccountRepository userAccountRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.userAccountRepository = userAccountRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AuthResponse login(LoginRequest request, Role expectedRole) {
        UserAccount user = userAccountRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new UnauthorizedException("Invalid username or password"));

        if (user.getRole() != expectedRole) {
            throw new UnauthorizedException("Use the " + user.getRole().name().toLowerCase() + " login for this account");
        }
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new UnauthorizedException("Invalid username or password");
        }

        AuthResponse response = new AuthResponse();
        response.setToken(jwtService.generateToken(user));
        response.setUsername(user.getUsername());
        response.setRole(user.getRole());
        Employee employee = user.getEmployee();
        if (employee != null) {
            response.setEmployeeId(employee.getId());
            response.setFirstName(employee.getFirstName());
            response.setLastName(employee.getLastName());
        }
        return response;
    }
}
