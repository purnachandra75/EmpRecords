package com.emprecords.service;

import com.emprecords.exception.DuplicateResourceException;
import com.emprecords.exception.ResourceNotFoundException;
import com.emprecords.model.Employee;
import com.emprecords.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public List<Employee> findAll() {
        return employeeRepository.findAll();
    }

    public Employee findById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id " + id));
    }

    public Employee create(Employee employee) {
        if (employeeRepository.existsByEmail(employee.getEmail())) {
            throw new DuplicateResourceException("An employee with this email already exists");
        }
        employee.setId(null);
        return employeeRepository.save(employee);
    }

    public Employee update(Long id, Employee incoming) {
        Employee existing = findById(id);
        if (employeeRepository.existsByEmailAndIdNot(incoming.getEmail(), id)) {
            throw new DuplicateResourceException("An employee with this email already exists");
        }
        existing.setFirstName(incoming.getFirstName());
        existing.setLastName(incoming.getLastName());
        existing.setEmail(incoming.getEmail());
        existing.setDepartment(incoming.getDepartment());
        existing.setJobTitle(incoming.getJobTitle());
        existing.setPhone(incoming.getPhone());
        existing.setSalary(incoming.getSalary());
        return employeeRepository.save(existing);
    }

    public void delete(Long id) {
        Employee existing = findById(id);
        employeeRepository.delete(existing);
    }
}
