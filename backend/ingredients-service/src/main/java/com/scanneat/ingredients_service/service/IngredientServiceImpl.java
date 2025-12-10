package com.scanneat.ingredients_service.service;

import com.scanneat.ingredients_service.dto.IngredientDto;
import com.scanneat.ingredients_service.model.Ingredient;
import com.scanneat.ingredients_service.repository.IngredientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class IngredientServiceImpl implements IngredientService {

    private final IngredientRepository repository;

    @Override
    public IngredientDto createIngredient(IngredientDto dto) {
        Ingredient ingredient = Ingredient.builder()
                .name(dto.getName())
                .calories(dto.getCalories())
                .build();

        Ingredient saved = repository.save(ingredient);

        return IngredientDto.builder()
                .id(saved.getId())
                .name(saved.getName())
                .calories(saved.getCalories())
                .build();
    }

    @Override
    public List<IngredientDto> getAllIngredients() {
        return repository.findAll()
                .stream()
                .map(i -> new IngredientDto(i.getId(), i.getName(), i.getCalories()))
                .toList();
    }

    @Override
    public IngredientDto getIngredientById(Long id) {
        Ingredient i = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ingredient not found"));

        return new IngredientDto(i.getId(), i.getName(), i.getCalories());
    }
}
