package com.scan_n_eat.recipe_service.service;

import com.scan_n_eat.recipe_service.entity.Recipe;
import com.scan_n_eat.recipe_service.entity.RecipeIngredient;
import com.scan_n_eat.recipe_service.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class RecipeDataService {

    private final RecipeRepository recipeRepository;
    private final RestTemplate restTemplate;

    @Autowired
    public RecipeDataService(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
        this.restTemplate = new RestTemplate();
    }

    /**
     * Fetch recipes from TheMealDB API and save to database
     * This is a simple implementation - you can expand it
     */
    @Transactional
    public void populateRecipesFromAPI() {
        // Example: Fetch recipes from TheMealDB
        String apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

        // You can search for different terms or loop through categories
        String[] searchTerms = { "pasta", "chicken", "rice", "beef", "fish" };

        for (String term : searchTerms) {
            try {
                String url = apiUrl + term;
                Map<String, Object> response = restTemplate.getForObject(url, Map.class);

                if (response != null && response.containsKey("meals")) {
                    List<Map<String, Object>> meals = (List<Map<String, Object>>) response.get("meals");

                    if (meals != null) {
                        for (Map<String, Object> meal : meals) {
                            saveRecipeFromMeal(meal);
                        }
                    }
                }

                // Be nice to the API - add delay
                Thread.sleep(1000);

            } catch (Exception e) {
                System.err.println("Error fetching recipes for term: " + term);
                e.printStackTrace();
            }
        }
    }

    private void saveRecipeFromMeal(Map<String, Object> meal) {
        try {
            String title = (String) meal.get("strMeal");
            String instructions = (String) meal.get("strInstructions");
            String imageUrl = (String) meal.get("strMealThumb");

            // Check if recipe already exists
            if (recipeRepository.findByTitleContainingIgnoreCase(title).isEmpty()) {
                Recipe recipe = new Recipe(
                        title,
                        instructions,
                        "30 minutes", // Default prep time
                        4, // Default servings
                        imageUrl);

                // Extract ingredients (TheMealDB has ingredients as strIngredient1,
                // strIngredient2, etc.)
                for (int i = 1; i <= 20; i++) {
                    String ingredientKey = "strIngredient" + i;
                    String ingredient = (String) meal.get(ingredientKey);

                    if (ingredient != null && !ingredient.trim().isEmpty()) {
                        // For now, we'll use a simple hash of the ingredient name as ID
                        // In production, you'd lookup the actual ingredient ID from ingredient service
                        int ingredientId = Math.abs(ingredient.hashCode()) % 1000;
                        RecipeIngredient recipeIngredient = new RecipeIngredient(recipe, ingredientId);
                        recipe.addIngredient(recipeIngredient);
                    }
                }

                recipeRepository.save(recipe);
                System.out.println("Saved recipe: " + title);
            }
        } catch (Exception e) {
            System.err.println("Error saving recipe");
            e.printStackTrace();
        }
    }

    /**
     * Get count of recipes in database
     */
    public long getRecipeCount() {
        return recipeRepository.count();
    }
}