package com.scanneat.ingredients_service.service;

import com.scanneat.ingredients_service.dto.IngredientDto;
import com.scanneat.ingredients_service.model.Ingredient;
import com.scanneat.ingredients_service.repository.IngredientRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class IngredientServiceImpl implements IngredientService {

    private final IngredientRepository repository;
    private final OpenFoodFactsService openFoodFactsService;

    @Override
    public IngredientDto createIngredient(IngredientDto dto) {
        Ingredient ingredient = Ingredient.builder()
                .name(dto.getName())
                .calories(dto.getCalories())
                .averagePrice(dto.getAveragePrice())
                .build();

        Ingredient saved = repository.save(ingredient);

        return mapToDto(saved);
    }

    @Override
    public List<IngredientDto> getAllIngredients() {
        return repository.findAll()
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    @Override
    public IngredientDto getIngredientById(Long id) {
        Ingredient i = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ingredient not found"));

        return mapToDto(i);
    }

    @Override
    public IngredientDto syncIngredient(String name) {
        return repository.findByNameIgnoreCase(name)
                .map(this::mapToDto)
                .orElseGet(() -> {
                    // Fetch from Open Food Facts
                    var info = openFoodFactsService.fetchIngredientInfo(name);
                    
                    Ingredient i = Ingredient.builder()
                            .name(name)
                            .calories(info.map(OpenFoodFactsService.IngredientInfo::calories).orElse(0.0))
                            .averagePrice(info.map(OpenFoodFactsService.IngredientInfo::averagePrice).orElse(0.0))
                            .externalId(info.map(OpenFoodFactsService.IngredientInfo::externalId).orElse(null))
                            .build();
                            
                    try {
                        Ingredient saved = repository.save(i);
                        return mapToDto(saved);
                    } catch (org.springframework.dao.DataIntegrityViolationException e) {
                        // Concurrency issue: ingredient was created by another thread
                        return repository.findByNameIgnoreCase(name)
                                .map(this::mapToDto)
                                .orElseThrow(() -> new RuntimeException("Failed to retrieve ingredient after constraint violation: " + name));
                    }
                });
    }

    private IngredientDto mapToDto(Ingredient i) {
        return IngredientDto.builder()
                .id(i.getId())
                .name(i.getName())
                .calories(i.getCalories())
                .averagePrice(i.getAveragePrice())
                .build();
    }

    @Override
    public List<IngredientDto> getIngredientsByIds(List<Long> ids) {
        return repository.findAllById(ids)
                .stream()
                .map(this::mapToDto)
                .toList();
    }
}
