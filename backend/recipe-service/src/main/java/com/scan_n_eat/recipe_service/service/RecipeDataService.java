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
     * Fetch random recipes from TheMealDB API daily
     * Runs every day at 2:00 AM (server time)
     */
    @org.springframework.scheduling.annotation.Scheduled(cron = "0 0 2 * * ?")
    @Transactional
    public void populateRecipesFromAPI() {
        populateRandomRecipes(10); // Fetch 10 random recipes daily
    }

    /**
     * Manually trigger population (e.g. from Controller)
     */
    @Transactional
    public void populateRandomRecipes(int count) {
        String randomUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

        for (int i = 0; i < count; i++) {
            try {
                Map<String, Object> response = restTemplate.getForObject(randomUrl, Map.class);

                if (response != null && response.containsKey("meals")) {
                    List<Map<String, Object>> meals = (List<Map<String, Object>>) response.get("meals");

                    if (meals != null && !meals.isEmpty()) {
                        saveRecipeFromMeal(meals.get(0));
                    }
                }

                // Be nice to the API - add delay
                Thread.sleep(500);

            } catch (Exception e) {
                System.err.println("Error fetching random recipe: " + e.getMessage());
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
                    
                    String measureKey = "strMeasure" + i;
                    String measure = (String) meal.get(measureKey);

                    if (ingredient != null && !ingredient.trim().isEmpty()) {
                        try {
                            // Call ingredients-service to sync and get ID
                            // Using the internal docker service name
                            String encodedIngredient = java.net.URLEncoder.encode(ingredient, "UTF-8");
                            String syncUrl = "http://ingredients-service:8080/api/ingredients/sync?name=" + encodedIngredient;
                            Map<String, Object> ingredientResp = restTemplate.postForObject(syncUrl, null, Map.class);

                            if (ingredientResp != null && ingredientResp.containsKey("id")) {
                                Integer ingredientId = ((Number) ingredientResp.get("id")).intValue();
                                RecipeIngredient recipeIngredient = new RecipeIngredient();
                                recipeIngredient.setRecipe(recipe);
                                recipeIngredient.setIngredientId(ingredientId);
                                recipeIngredient.setQuantity(measure);
                                recipe.addIngredient(recipeIngredient);

                                // Add price to total
                                if (ingredientResp.containsKey("averagePrice")) {
                                    Double price = ((Number) ingredientResp.get("averagePrice")).doubleValue();
                                    // Simple calculation: just add unit price per ingredient roughly
                                    // In a real app we'd parse Quantity (e.g. "200g") and multiply
                                    Double currentPrice = recipe.getPrice() != null ? recipe.getPrice() : 0.0;
                                    recipe.setPrice(currentPrice + price);
                                }
                            }
                        } catch (Exception ex) {
                            System.err.println("Failed to sync ingredient: " + ingredient + " - " + ex.getMessage());
                        }
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