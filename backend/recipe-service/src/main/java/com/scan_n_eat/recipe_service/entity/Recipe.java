package com.scan_n_eat.recipe_service.entity;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "recipes")
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String instructions;

    @Column(name = "prep_time")
    private String prepTime;

    private Integer servings;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(columnDefinition = "DOUBLE PRECISION DEFAULT 0.0")
    private Double price;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<RecipeIngredient> recipeIngredients = new HashSet<>();

    // Constructors
    public Recipe() {
    }

    public Recipe(String title, String instructions, String prepTime, Integer servings, String imageUrl) {
        this.title = title;
        this.instructions = instructions;
        this.prepTime = prepTime;
        this.servings = servings;
        this.imageUrl = imageUrl;
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

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Set<RecipeIngredient> getRecipeIngredients() {
        return recipeIngredients;
    }

    public void setRecipeIngredients(Set<RecipeIngredient> recipeIngredients) {
        this.recipeIngredients = recipeIngredients;
    }

    // Helper method to add ingredient
    public void addIngredient(RecipeIngredient ingredient) {
        recipeIngredients.add(ingredient);
        ingredient.setRecipe(this);
    }

    // Helper method to remove ingredient
    public void removeIngredient(RecipeIngredient ingredient) {
        recipeIngredients.remove(ingredient);
        ingredient.setRecipe(null);
    }
}