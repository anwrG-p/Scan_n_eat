package com.scanneat.ingredients_service.controller;

import com.scanneat.ingredients_service.dto.IngredientDto;
import com.scanneat.ingredients_service.service.IngredientService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/ingredients")
public class IngredientController {

    private final IngredientService service;

    @PostMapping
    public IngredientDto create(@RequestBody IngredientDto dto) {
        return service.createIngredient(dto);
    }

    @GetMapping
    public List<IngredientDto> getAll() {
        return service.getAllIngredients();
    }

    @GetMapping("/{id}")
    public IngredientDto getById(@PathVariable Long id) {
        return service.getIngredientById(id);
    }

    @PostMapping("/sync")
    public IngredientDto sync(@RequestParam String name) {
        return service.syncIngredient(name);
    }
}
