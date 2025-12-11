package com.scan_neat.order_service.controller;

import com.scan_neat.order_service.dto.OrderRequest;
import com.scan_neat.order_service.model.ShopOrder;
import com.scan_neat.order_service.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Allow frontend access
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<ShopOrder> createOrder(@RequestBody OrderRequest request) {
        return ResponseEntity.ok(orderService.createOrder(request));
    }

    @GetMapping
    public ResponseEntity<List<ShopOrder>> getMyOrders(@RequestParam("userId") UUID userId) {
        // In a real app, userId should come from the JWT token in SecurityContext
        // For now, we trust the param passed by the frontend (which gets it from the token)
        return ResponseEntity.ok(orderService.getOrdersByUserId(userId));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ShopOrder> getOrder(@PathVariable UUID id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }
}
