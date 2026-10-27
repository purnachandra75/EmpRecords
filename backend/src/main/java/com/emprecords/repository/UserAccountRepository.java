package com.emprecords.repository;

import com.emprecords.model.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {
    Optional<UserAccount> findByUsername(String username);
    Optional<UserAccount> findByEmployeeId(Long employeeId);
    boolean existsByUsername(String username);
}
