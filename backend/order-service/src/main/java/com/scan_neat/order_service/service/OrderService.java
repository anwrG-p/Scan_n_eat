package com.scan_neat.order_service.service;

import com.scan_neat.order_service.dto.CreateOrderRequest;
import com.scan_neat.order_service.dto.OrderItemResponse;
import com.scan_neat.order_service.dto.OrderResponse;
import com.scan_neat.order_service.model.Order;
import com.scan_neat.order_service.model.OrderItem;
import com.scan_neat.order_service.model.OrderStatus;
import com.scan_neat.order_service.repository.OrderItemRepository;
import com.scan_neat.order_service.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;

    @Transactional
    public OrderResponse createOrder(CreateOrderRequest request) {
        // Calculate total price
        BigDecimal totalPrice = request.getItems().stream()
                .map(item -> item.getPriceAtPurchase().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Save Order
        Order order = Order.builder()
                .userId(request.getUserId())
                .totalPrice(totalPrice)
                .status(OrderStatus.PENDING)
                .build();

        Order savedOrder = orderRepository.save(order);

        // Save Order Items
        List<OrderItem> orderItems = request.getItems().stream()
                .map(itemRequest -> OrderItem.builder()
                        .order(savedOrder)
                        .ingredientId(itemRequest.getIngredientId())
                        .quantity(itemRequest.getQuantity())
                        .priceAtPurchase(itemRequest.getPriceAtPurchase())
                        .build())
                .collect(Collectors.toList());

        List<OrderItem> savedItems = orderItemRepository.saveAll(orderItems);

        return mapToOrderResponse(savedOrder, savedItems);
    }

    public OrderResponse getOrderById(UUID id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        List<OrderItem> items = orderItemRepository.findByOrder(order);
        return mapToOrderResponse(order, items);
    }

    public List<OrderResponse> getOrdersByUserId(UUID userId) {
        List<Order> orders = orderRepository.findByUserId(userId);
        return orders.stream()
                .map(order -> {
                    List<OrderItem> items = orderItemRepository.findByOrder(order);
                    return mapToOrderResponse(order, items);
                })
                .collect(Collectors.toList());
    }

    private OrderResponse mapToOrderResponse(Order order, List<OrderItem> items) {
        List<OrderItemResponse> itemResponses = items.stream()
                .map(item -> OrderItemResponse.builder()
                        .id(item.getId())
                        .ingredientId(item.getIngredientId())
                        .quantity(item.getQuantity())
                        .priceAtPurchase(item.getPriceAtPurchase())
                        .build())
                .collect(Collectors.toList());

        return OrderResponse.builder()
                .id(order.getId())
                .userId(order.getUserId())
                .totalPrice(order.getTotalPrice())
                .status(order.getStatus())
                .createdAt(order.getCreatedAt())
                .items(itemResponses)
                .build();
    }
}
