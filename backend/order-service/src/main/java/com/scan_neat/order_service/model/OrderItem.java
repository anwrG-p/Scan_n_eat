package com.scan_neat.order_service.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "order_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private UUID recipeId; // Can be null if it's a standalone ingredient
    private Long ingredientId; // Can be null if it's a full recipe order (simplified)

    // For simplicity, we just store the name and snapshot of the price
    private String name;

    private Integer quantity;
    private BigDecimal pricePerUnit;
}
