package com.scan_neat.order_service.repository;

import com.scan_neat.order_service.model.ShopOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface OrderRepository extends JpaRepository<ShopOrder, UUID> {
    List<ShopOrder> findByUserId(UUID userId);
}
