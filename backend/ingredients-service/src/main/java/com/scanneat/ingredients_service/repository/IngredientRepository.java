package com.scanneat.ingredients_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.scanneat.ingredients_service.model.Ingredient;

public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
}
