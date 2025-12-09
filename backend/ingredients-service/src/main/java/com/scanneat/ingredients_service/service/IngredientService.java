package com.scanneat.ingredients_service.service;

import com.scanneat.ingredients_service.dto.IngredientDto;
import java.util.List;

public interface IngredientService {
    IngredientDto createIngredient(IngredientDto dto);

    List<IngredientDto> getAllIngredients();

    IngredientDto getIngredientById(Long id);
}
