package com.scan_neat.auth_service.config;

import com.scan_neat.auth_service.model.Role;
import com.scan_neat.auth_service.model.User;
import com.scan_neat.auth_service.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DatabaseSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        seedAdminUser();
    }

    private void seedAdminUser() {
        String adminEmail = "admin@scanneat.com";
        
        if (userRepository.findByUsername(adminEmail).isEmpty()) {
            User admin = User.builder()
                    .username(adminEmail)
                    .passwordHash(passwordEncoder.encode("admin123"))
                    .role(Role.ADMIN)
                    .build();
            
            userRepository.save(admin);
            log.info("✅ Admin user created: {}", adminEmail);
        } else {
            log.info("ℹ️  Admin user already exists: {}", adminEmail);
        }
    }
}
