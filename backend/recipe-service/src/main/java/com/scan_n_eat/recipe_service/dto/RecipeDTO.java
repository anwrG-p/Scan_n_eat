package com.scan_n_eat.recipe_service.dto;

import java.util.List;
import java.util.UUID;

public class RecipeDTO {

    private UUID id;
    private String title;
    private String instructions;
    private String prepTime;
    private Integer servings;
    private String imageUrl;
    private List<Integer> ingredientIds;
    private Double price;
    private String area;
    private Double averageRating;
    private Integer ratingCount;
    private List<RecipeIngredientDTO> recipeIngredients;

    // Constructors
    public RecipeDTO() {
    }

    public RecipeDTO(UUID id, String title, String instructions, String prepTime, Integer servings, String imageUrl,
            List<RecipeIngredientDTO> recipeIngredients, Double price) {
        this.id = id;
        this.title = title;
        this.instructions = instructions;
        this.prepTime = prepTime;
        this.servings = servings;
        this.imageUrl = imageUrl;
        this.recipeIngredients = recipeIngredients;
        this.price = price;
    }

    // Getters and Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    public String getPrepTime() {
        return prepTime;
    }

    public void setPrepTime(String prepTime) {
        this.prepTime = prepTime;
    }

    public Integer getServings() {
        return servings;
    }

    public void setServings(Integer servings) {
        this.servings = servings;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public List<Integer> getIngredientIds() {
        return ingredientIds;
    }

    public void setIngredientIds(List<Integer> ingredientIds) {
        this.ingredientIds = ingredientIds;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public List<RecipeIngredientDTO> getRecipeIngredients() {
        return recipeIngredients;
    }

    public void setRecipeIngredients(List<RecipeIngredientDTO> recipeIngredients) {
        this.recipeIngredients = recipeIngredients;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public Double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(Double averageRating) {
        this.averageRating = averageRating;
    }

    public Integer getRatingCount() {
        return ratingCount;
    }

    public void setRatingCount(Integer ratingCount) {
        this.ratingCount = ratingCount;
    }
}