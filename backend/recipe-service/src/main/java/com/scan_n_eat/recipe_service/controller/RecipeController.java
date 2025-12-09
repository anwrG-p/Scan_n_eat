package com.scan_n_eat.recipe_service.controller;

import com.scan_n_eat.recipe_service.dto.RecipeDTO;
import com.scan_n_eat.recipe_service.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin(origins = "*")
public class RecipeController {

    private final RecipeService recipeService;

    @Autowired
    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    // GET /api/recipes - Get all recipes
    @GetMapping
    public ResponseEntity<List<RecipeDTO>> getAllRecipes() {
        List<RecipeDTO> recipes = recipeService.getAllRecipes();
        return ResponseEntity.ok(recipes);
    }

    // GET /api/recipes/{id} - Get recipe by ID
    @GetMapping("/{id}")
    public ResponseEntity<RecipeDTO> getRecipeById(@PathVariable UUID id) {
        try {
            RecipeDTO recipe = recipeService.getRecipeById(id);
            return ResponseEntity.ok(recipe);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // POST /api/recipes - Create new recipe
    @PostMapping
    public ResponseEntity<RecipeDTO> createRecipe(@RequestBody RecipeDTO recipeDTO) {
        try {
            RecipeDTO createdRecipe = recipeService.createRecipe(recipeDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdRecipe);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // PUT /api/recipes/{id} - Update recipe
    @PutMapping("/{id}")
    public ResponseEntity<RecipeDTO> updateRecipe(@PathVariable UUID id, @RequestBody RecipeDTO recipeDTO) {
        try {
            RecipeDTO updatedRecipe = recipeService.updateRecipe(id, recipeDTO);
            return ResponseEntity.ok(updatedRecipe);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE /api/recipes/{id} - Delete recipe
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable UUID id) {
        try {
            recipeService.deleteRecipe(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // GET /api/recipes/search?title=pasta - Search recipes by title
    @GetMapping("/search")
    public ResponseEntity<List<RecipeDTO>> searchRecipesByTitle(@RequestParam String title) {
        List<RecipeDTO> recipes = recipeService.searchRecipesByTitle(title);
        return ResponseEntity.ok(recipes);
    }

    // POST /api/recipes/available - Find recipes by available ingredients
    // Request body: [1, 5, 12, 20] (list of ingredient IDs the user has)
    @PostMapping("/available")
    public ResponseEntity<List<RecipeDTO>> findRecipesByAvailableIngredients(@RequestBody List<Integer> ingredientIds) {
        List<RecipeDTO> recipes = recipeService.findRecipesByAvailableIngredients(ingredientIds);
        return ResponseEntity.ok(recipes);
    }

    // POST /api/recipes/suggestions - Find recipes containing any of the given
    // ingredients
    // Request body: [1, 5, 12] (list of ingredient IDs)
    @PostMapping("/suggestions")
    public ResponseEntity<List<RecipeDTO>> findRecipesSuggestions(@RequestBody List<Integer> ingredientIds) {
        List<RecipeDTO> recipes = recipeService.findRecipesContainingAnyIngredient(ingredientIds);
        return ResponseEntity.ok(recipes);
    }

    // GET /api/recipes/ingredient/{ingredientId} - Find recipes by specific
    // ingredient
    @GetMapping("/ingredient/{ingredientId}")
    public ResponseEntity<List<RecipeDTO>> findRecipesByIngredient(@PathVariable Integer ingredientId) {
        List<RecipeDTO> recipes = recipeService.findRecipesByIngredient(ingredientId);
        return ResponseEntity.ok(recipes);
    }
}