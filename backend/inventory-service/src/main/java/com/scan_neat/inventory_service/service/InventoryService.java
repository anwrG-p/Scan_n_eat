package com.scan_neat.inventory_service.service;

import com.scan_neat.inventory_service.model.InventoryItem;
import com.scan_neat.inventory_service.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final InventoryRepository repository;

    public List<InventoryItem> getUserInventory(UUID userId) {
        return repository.findByUserId(userId);
    }

    public InventoryItem addItem(InventoryItem item) {
        return repository.save(item);
    }

    public void removeItem(UUID id) {
        repository.deleteById(id);
    }
}
