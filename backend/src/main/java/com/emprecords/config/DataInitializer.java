package com.emprecords.config;

import com.emprecords.model.Employee;
import com.emprecords.model.Role;
import com.emprecords.model.UserAccount;
import com.emprecords.repository.EmployeeRepository;
import com.emprecords.repository.UserAccountRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserAccountRepository userAccountRepository;
    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(
            UserAccountRepository userAccountRepository,
            EmployeeRepository employeeRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userAccountRepository = userAccountRepository;
        this.employeeRepository = employeeRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (userAccountRepository.count() > 0) {
            return;
        }

        UserAccount admin = new UserAccount();
        admin.setUsername("admin");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setRole(Role.ADMIN);
        userAccountRepository.save(admin);

        for (Employee employee : employeeRepository.findAll()) {
            UserAccount account = new UserAccount();
            account.setUsername(employee.getEmail());
            account.setPassword(passwordEncoder.encode(employee.getFirstName().toLowerCase() + "123"));
            account.setRole(Role.EMPLOYEE);
            account.setEmployee(employee);
            userAccountRepository.save(account);
        }
    }
}
