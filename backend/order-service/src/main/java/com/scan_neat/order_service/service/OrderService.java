package com.scan_neat.order_service.service;

import com.scan_neat.order_service.dto.OrderRequest;
import com.scan_neat.order_service.model.ShopOrder;
import com.scan_neat.order_service.model.OrderItem;
import com.scan_neat.order_service.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    @Transactional
    public ShopOrder createOrder(OrderRequest request) {
        ShopOrder order = new ShopOrder();
        order.setUserId(request.getUserId());
        order.setStatus("COMPLETED"); // Auto-complete for now

        List<OrderItem> items = request.getItems().stream().map(itemDto -> {
            OrderItem item = new OrderItem();
            item.setName(itemDto.getName());
            item.setQuantity(itemDto.getQuantity());
            item.setPricePerUnit(itemDto.getPrice());
            item.setRecipeId(itemDto.getRecipeId());
            item.setIngredientId(itemDto.getIngredientId());
            return item;
        }).collect(Collectors.toList());

        order.setItems(items);
        
        // Calculate total
        BigDecimal total = items.stream()
            .map(item -> item.getPricePerUnit().multiply(BigDecimal.valueOf(item.getQuantity())))
            .reduce(BigDecimal.ZERO, BigDecimal::add);
            
        order.setTotalAmount(total);

        return orderRepository.save(order);
    }

    public List<ShopOrder> getOrdersByUserId(UUID userId) {
        return orderRepository.findByUserId(userId);
    }
    
    public ShopOrder getOrderById(UUID id) {
        return orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
    }
}
