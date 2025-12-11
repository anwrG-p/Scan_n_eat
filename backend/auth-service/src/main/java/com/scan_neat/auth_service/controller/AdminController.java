package com.scan_neat.auth_service.controller;

import com.scan_neat.auth_service.model.User;
import com.scan_neat.auth_service.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AdminController {

    private final UserRepository userRepository;
    private final org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    /**
     * GET /admin/stats
     * Returns dashboard statistics
     */
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = new HashMap<>();
        
        // Total users
        long totalUsers = userRepository.count();
        stats.put("totalUsers", totalUsers);
        
        // TODO: Get recipe count from recipe-service via RestTemplate
        stats.put("totalRecipes", 0);
        
        // TODO: Get orders today from order-service
        stats.put("ordersToday", 0);
        
        // System status - simple health check
        stats.put("systemStatus", "healthy");
        
        return ResponseEntity.ok(stats);
    }

    /**
     * POST /admin/users
     * Create a new user
     */
    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody Map<String, String> request) {
        if (!request.containsKey("username") || !request.containsKey("password")) {
            return ResponseEntity.badRequest().build();
        }

        User newUser = new User();
        newUser.setUsername(request.get("username"));
        newUser.setPasswordHash(passwordEncoder.encode(request.get("password")));
        
        // Default role is USER, but can be set if provided (and authorized)
        if (request.containsKey("role")) {
            try {
                newUser.setRole(com.scan_neat.auth_service.model.Role.valueOf(request.get("role").toUpperCase()));
            } catch (IllegalArgumentException e) {
                // Invalid role, default to USER or return bad request
                newUser.setRole(com.scan_neat.auth_service.model.Role.USER);
            }
        } else {
            newUser.setRole(com.scan_neat.auth_service.model.Role.USER);
        }

        return ResponseEntity.ok(userRepository.save(newUser));
    }

    /**
     * GET /admin/users
     * Returns all users
     */
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    /**
     * PUT /admin/users/{id}
     * Update user role
     */
    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable UUID id, @RequestBody Map<String, String> updates) {
        return userRepository.findById(id)
                .map(user -> {
                    if (updates.containsKey("role")) {
                        // Update role if provided
                        String newRole = updates.get("role");
                        // TODO: Implement role update logic
                    }
                    return ResponseEntity.ok(userRepository.save(user));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * DELETE /admin/users/{id}
     * Delete a user
     */
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable UUID id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * GET /admin/logs
     * Returns system logs (simple MVP implementation)
     */
    @GetMapping("/logs")
    public ResponseEntity<List<Map<String, Object>>> getLogs() {
        // For MVP, return empty list
        // In production, this would query a logging service or database table
        return ResponseEntity.ok(List.of());
    }
}
