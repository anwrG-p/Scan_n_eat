package com.scanneat.ingredients_service.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Double calories; // kcal per 100g
    private Double averagePrice; // per 100g (estimated)
    private String externalId; // Open Food Facts ID
}
