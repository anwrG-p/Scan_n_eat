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

    @Autowired
    public RecipeService(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
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
                RecipeIngredient recipeIngredient = new RecipeIngredient(recipe, ingredientId);
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
                RecipeIngredient recipeIngredient = new RecipeIngredient(recipe, ingredientId);
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
    private RecipeDTO convertToDTO(Recipe recipe) {
        List<Integer> ingredientIds = recipe.getRecipeIngredients().stream()
                .map(RecipeIngredient::getIngredientId)
                .collect(Collectors.toList());

        return new RecipeDTO(
                recipe.getId(),
                recipe.getTitle(),
                recipe.getInstructions(),
                recipe.getPrepTime(),
                recipe.getServings(),
                recipe.getImageUrl(),
                ingredientIds);
    }
}