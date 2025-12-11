package com.scan_n_eat.recipe_service.controller;

import com.scan_n_eat.recipe_service.dto.RecipeDTO;
import com.scan_n_eat.recipe_service.service.RecipeService;

import com.scan_n_eat.recipe_service.service.RecipeDataService;

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

    // DELETE /api/recipes/all - Delete all recipes
    @DeleteMapping("/all")
    public ResponseEntity<String> deleteAllRecipes() {
        try {
            recipeService.deleteAllRecipes();
            return ResponseEntity.ok("All recipes deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting all recipes: " + e.getMessage());
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

    @Autowired
    private RecipeDataService recipeDataService;

    // Add this endpoint
    @PostMapping("/populate")
    public ResponseEntity<String> populateRecipes() {
        try {
            long countBefore = recipeDataService.getRecipeCount();
            recipeDataService.populateRecipesFromAPI();
            long countAfter = recipeDataService.getRecipeCount();

            return ResponseEntity.ok("Populated database. Recipes added: " + (countAfter - countBefore));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error populating recipes: " + e.getMessage());
        }
    }

    // GET /api/recipes/count - Get total recipe count
    @GetMapping("/count")
    public ResponseEntity<Long> getRecipeCount() {
        return ResponseEntity.ok(recipeDataService.getRecipeCount());
    }

    // Saved Recipes Endpoints

    // POST /api/recipes/{id}/save - Toggle save recipe for user
    @PostMapping("/{id}/save")
    public ResponseEntity<com.scan_n_eat.recipe_service.dto.SaveRecipeResponse> toggleSaveRecipe(
            @PathVariable UUID id,
            @RequestHeader("X-User-Id") Long userId) {
        try {
            com.scan_n_eat.recipe_service.dto.SaveRecipeResponse response = recipeService.toggleSaveRecipe(userId, id);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new com.scan_n_eat.recipe_service.dto.SaveRecipeResponse(false, "Error: " + e.getMessage()));
        }
    }

    // GET /api/recipes/saved - Get saved recipes for user
    @GetMapping("/saved")
    public ResponseEntity<List<RecipeDTO>> getSavedRecipes(@RequestHeader("X-User-Id") Long userId) {
        try {
            List<RecipeDTO> savedRecipes = recipeService.getSavedRecipes(userId);
            return ResponseEntity.ok(savedRecipes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // GET /api/recipes/{id}/is-saved - Check if recipe is saved
    @GetMapping("/{id}/is-saved")
    public ResponseEntity<Boolean> isRecipeSaved(
            @PathVariable UUID id,
            @RequestHeader("X-User-Id") Long userId) {
        boolean saved = recipeService.isRecipeSaved(userId, id);
        return ResponseEntity.ok(saved);
    }

    // GET /api/recipes/trending - Get trending recipes
    @GetMapping("/trending")
    public ResponseEntity<List<RecipeDTO>> getTrendingRecipes(
            @RequestParam(defaultValue = "10") int limit) {
        try {
            List<RecipeDTO> trending = recipeService.getTrendingRecipes(limit);
            return ResponseEntity.ok(trending);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    // POST /api/recipes/{id}/rate
    @PostMapping("/{id}/rate")
    public ResponseEntity<RecipeDTO> rateRecipe(
            @PathVariable UUID id,
            @RequestBody Integer rating,
            @RequestHeader("X-User-Id") Long userId) {
        try {
            RecipeDTO updated = recipeService.rateRecipe(userId, id, rating);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // GET /api/recipes/filter?area=Italian&maxPrice=50
    @GetMapping("/filter")
    public ResponseEntity<List<RecipeDTO>> filterRecipes(
            @RequestParam(required = false) String area,
            @RequestParam(required = false) Double maxPrice) {
        List<RecipeDTO> recipes = recipeService.filterRecipes(area, maxPrice);
        return ResponseEntity.ok(recipes);
    }
}