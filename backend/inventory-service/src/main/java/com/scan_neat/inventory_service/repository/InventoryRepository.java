package com.scan_neat.inventory_service.repository;

import com.scan_neat.inventory_service.model.InventoryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface InventoryRepository extends JpaRepository<InventoryItem, UUID> {
    List<InventoryItem> findByUserId(UUID userId);
}
