package com.scan_neat.inventory_service.controller;

import com.scan_neat.inventory_service.model.InventoryItem;
import com.scan_neat.inventory_service.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService service;

    @GetMapping
    public ResponseEntity<List<InventoryItem>> getUserInventory(@RequestHeader("X-User-Id") UUID userId) {
        // In a real microservice architecture, the Gateway or Auth Service would pass
        // the Context/User ID header.
        // For simplicity, we assume we might get it from a header or we might need to
        // adjust client to send it.
        // Given the current simple setup, the frontend might not be sending X-User-Id
        // yet.
        // We'll need to update the client or Gateway to forward this information.
        // For now, let's assume the Gateway extracts it from the JWT and passes it.
        return ResponseEntity.ok(service.getUserInventory(userId));
    }

    @PostMapping
    public ResponseEntity<InventoryItem> addItem(@RequestBody InventoryItem item,
            @RequestHeader("X-User-Id") UUID userId) {
        System.out.println("DEBUG: Received addItem request: " + item);
        item.setUserId(userId);
        InventoryItem saved = service.addItem(item);
        System.out.println("DEBUG: Saved item: " + saved);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeItem(@PathVariable UUID id) {
        service.removeItem(id);
        return ResponseEntity.ok().build();
    }
}
