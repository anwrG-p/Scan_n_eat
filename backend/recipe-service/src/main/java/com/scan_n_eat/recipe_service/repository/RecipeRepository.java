package com.scan_n_eat.recipe_service.repository;

import com.scan_n_eat.recipe_service.entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, UUID> {

    // Find recipes by title (case-insensitive, partial match)
    List<Recipe> findByTitleContainingIgnoreCase(String title);

    // Find recipes that can be made with given ingredient IDs
    // This finds recipes where ALL required ingredients are in the provided list
    @Query("SELECT DISTINCT r FROM Recipe r " +
            "JOIN r.recipeIngredients ri " +
            "WHERE ri.ingredientId IN :ingredientIds " +
            "GROUP BY r.id " +
            "HAVING COUNT(DISTINCT ri.ingredientId) = " +
            "(SELECT COUNT(ri2) FROM RecipeIngredient ri2 WHERE ri2.recipe.id = r.id)")
    List<Recipe> findRecipesByAvailableIngredients(@Param("ingredientIds") List<Integer> ingredientIds);

    // Find recipes that contain at least one of the given ingredients
    @Query("SELECT DISTINCT r FROM Recipe r " +
            "JOIN r.recipeIngredients ri " +
            "WHERE ri.ingredientId IN :ingredientIds")
    List<Recipe> findRecipesContainingAnyIngredient(@Param("ingredientIds") List<Integer> ingredientIds);

    // Find recipes by specific ingredient ID
    @Query("SELECT DISTINCT r FROM Recipe r " +
            "JOIN r.recipeIngredients ri " +
            "WHERE ri.ingredientId = :ingredientId")
    List<Recipe> findByIngredientId(@Param("ingredientId") Integer ingredientId);
}