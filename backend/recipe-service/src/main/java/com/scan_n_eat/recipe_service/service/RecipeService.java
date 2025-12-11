package com.scan_n_eat.recipe_service.service;

import com.scan_n_eat.recipe_service.dto.RecipeDTO;
import com.scan_n_eat.recipe_service.entity.Recipe;
import com.scan_n_eat.recipe_service.entity.RecipeIngredient;
import com.scan_n_eat.recipe_service.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final com.scan_n_eat.recipe_service.repository.SavedRecipeRepository savedRecipeRepository;

    @Autowired
    public RecipeService(RecipeRepository recipeRepository,
                         com.scan_n_eat.recipe_service.repository.SavedRecipeRepository savedRecipeRepository) {
        this.recipeRepository = recipeRepository;
        this.savedRecipeRepository = savedRecipeRepository;
    }

    // Get all recipes
    public List<RecipeDTO> getAllRecipes() {
        return recipeRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get recipe by ID
    public RecipeDTO getRecipeById(UUID id) {
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe not found with id: " + id));
        return convertToDTO(recipe);
    }

    // Create new recipe
    @Transactional
    public RecipeDTO createRecipe(RecipeDTO recipeDTO) {
        Recipe recipe = new Recipe(
                recipeDTO.getTitle(),
                recipeDTO.getInstructions(),
                recipeDTO.getPrepTime(),
                recipeDTO.getServings(),
                recipeDTO.getImageUrl());

        // Add ingredients
        if (recipeDTO.getIngredientIds() != null) {
            for (Integer ingredientId : recipeDTO.getIngredientIds()) {
                RecipeIngredient recipeIngredient = new RecipeIngredient();
                recipeIngredient.setRecipe(recipe);
                recipeIngredient.setIngredientId(ingredientId);
                recipe.addIngredient(recipeIngredient);
            }
        }

        Recipe savedRecipe = recipeRepository.save(recipe);
        return convertToDTO(savedRecipe);
    }

    // Update recipe
    @Transactional
    public RecipeDTO updateRecipe(UUID id, RecipeDTO recipeDTO) {
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe not found with id: " + id));

        recipe.setTitle(recipeDTO.getTitle());
        recipe.setInstructions(recipeDTO.getInstructions());
        recipe.setPrepTime(recipeDTO.getPrepTime());
        recipe.setServings(recipeDTO.getServings());
        recipe.setImageUrl(recipeDTO.getImageUrl());

        // Update ingredients
        recipe.getRecipeIngredients().clear();
        if (recipeDTO.getIngredientIds() != null) {
            for (Integer ingredientId : recipeDTO.getIngredientIds()) {
                RecipeIngredient recipeIngredient = new RecipeIngredient();
                recipeIngredient.setRecipe(recipe);
                recipeIngredient.setIngredientId(ingredientId);
                recipe.addIngredient(recipeIngredient);
            }
        }

        Recipe updatedRecipe = recipeRepository.save(recipe);
        return convertToDTO(updatedRecipe);
    }

    // Delete recipe
    @Transactional
    public void deleteRecipe(UUID id) {
        if (!recipeRepository.existsById(id)) {
            throw new RuntimeException("Recipe not found with id: " + id);
        }
        recipeRepository.deleteById(id);
    }

    // Delete all recipes
    @Transactional
    public void deleteAllRecipes() {
        recipeRepository.deleteAll();
    }

    // Search recipes by title
    public List<RecipeDTO> searchRecipesByTitle(String title) {
        return recipeRepository.findByTitleContainingIgnoreCase(title).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Find recipes by available ingredients (user can make these recipes)
    public List<RecipeDTO> findRecipesByAvailableIngredients(List<Integer> ingredientIds) {
        return recipeRepository.findRecipesByAvailableIngredients(ingredientIds).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Find recipes containing any of the given ingredients
    public List<RecipeDTO> findRecipesContainingAnyIngredient(List<Integer> ingredientIds) {
        return recipeRepository.findRecipesContainingAnyIngredient(ingredientIds).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Find recipes by specific ingredient
    public List<RecipeDTO> findRecipesByIngredient(Integer ingredientId) {
        return recipeRepository.findByIngredientId(ingredientId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Helper method to convert Entity to DTO
    // Helper method to convert Entity to DTO
    private RecipeDTO convertToDTO(Recipe recipe) {
        List<Integer> ingredientIds = recipe.getRecipeIngredients().stream()
                .map(RecipeIngredient::getIngredientId)
                .collect(Collectors.toList());

        List<com.scan_n_eat.recipe_service.dto.RecipeIngredientDTO> recipeIngredients = recipe.getRecipeIngredients().stream()
                .map(ri -> new com.scan_n_eat.recipe_service.dto.RecipeIngredientDTO(ri.getIngredientId(), ri.getQuantity()))
                .collect(Collectors.toList());

        RecipeDTO dto = new RecipeDTO(
                recipe.getId(),
                recipe.getTitle(),
                recipe.getInstructions(),
                recipe.getPrepTime(),
                recipe.getServings(),
                recipe.getImageUrl(),
                recipeIngredients,
                recipe.getPrice());

        // We can set ingredientIds using the setter if needed, or rely on recipeIngredients
        dto.setIngredientIds(ingredientIds);
        return dto;
    }

    // Saved Recipes functionality
    @Transactional
    public com.scan_n_eat.recipe_service.dto.SaveRecipeResponse toggleSaveRecipe(Long userId, UUID recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new RuntimeException("Recipe not found with id: " + recipeId));

        java.util.Optional<com.scan_n_eat.recipe_service.entity.SavedRecipe> existing = 
                savedRecipeRepository.findByUserIdAndRecipeId(userId, recipeId);

        if (existing.isPresent()) {
            // Unsave
            savedRecipeRepository.delete(existing.get());
            return new com.scan_n_eat.recipe_service.dto.SaveRecipeResponse(false, "Recipe removed from saved list");
        } else {
            // Save
            com.scan_n_eat.recipe_service.entity.SavedRecipe savedRecipe = 
                    new com.scan_n_eat.recipe_service.entity.SavedRecipe(userId, recipe);
            savedRecipeRepository.save(savedRecipe);
            return new com.scan_n_eat.recipe_service.dto.SaveRecipeResponse(true, "Recipe saved successfully");
        }
    }

    public List<RecipeDTO> getSavedRecipes(Long userId) {
        List<com.scan_n_eat.recipe_service.entity.SavedRecipe> savedRecipes = 
                savedRecipeRepository.findByUserId(userId);
        
        return savedRecipes.stream()
                .map(sr -> convertToDTO(sr.getRecipe()))
                .collect(java.util.stream.Collectors.toList());
    }

    public boolean isRecipeSaved(Long userId, UUID recipeId) {
        return savedRecipeRepository.existsByUserIdAndRecipeId(userId, recipeId);
    }

    // Trending recipes (most saved in last 7 days)
    public List<RecipeDTO> getTrendingRecipes(int limit) {
        java.time.LocalDateTime sevenDaysAgo = java.time.LocalDateTime.now().minusDays(7);
        List<Object[]> trending = savedRecipeRepository.findMostSavedRecipesSince(sevenDaysAgo);

        // Get recipe IDs from the result
        List<UUID> trendingIds = trending.stream()
                .limit(limit)
                .map(row -> (UUID) row[0])
                .collect(java.util.stream.Collectors.toList());

        // Fetch recipes
        List<Recipe> trendingRecipes = recipeRepository.findAllById(trendingIds);

        // If not enough trending, add random recipes
        if (trendingRecipes.size() < limit) {
            int needed = limit - trendingRecipes.size();
            List<Recipe> allRecipes = recipeRepository.findAll();
            java.util.Collections.shuffle(allRecipes);
            
            for (Recipe recipe : allRecipes) {
                if (!trendingRecipes.contains(recipe)) {
                    trendingRecipes.add(recipe);
                    if (trendingRecipes.size() >= limit) break;
                }
            }
        }

        return trendingRecipes.stream()
                .map(this::convertToDTO)
                .collect(java.util.stream.Collectors.toList());
    }
}