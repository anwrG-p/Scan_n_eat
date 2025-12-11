package com.scanneat.ingredients_service.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IngredientDto {
    private Long id;
    private String name;
    private Double calories;
    private Double averagePrice;
}
