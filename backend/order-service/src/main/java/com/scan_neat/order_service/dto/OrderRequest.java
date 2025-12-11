package com.scan_neat.order_service.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
public class OrderRequest {
    private UUID userId;
    private List<OrderItemRequest> items;

    @Data
    public static class OrderItemRequest {
        private String name;
        private int quantity;
        private BigDecimal price;
        private UUID recipeId;
        private Long ingredientId;
    }
}
