package com.scan_n_eat.recipe_service.entity;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "recipe_ingredients")
public class RecipeIngredient {

    @EmbeddedId
    private RecipeIngredientId id = new RecipeIngredientId();

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("recipeId")
    @JoinColumn(name = "recipe_id")
    @com.fasterxml.jackson.annotation.JsonIgnore
    private Recipe recipe;

    @Column(name = "ingredient_id", insertable = false, updatable = false)
    private Integer ingredientId;

    private String quantity;

    // Constructors
    public RecipeIngredient() {
    }

    public RecipeIngredient(Recipe recipe, Integer ingredientId, String quantity) {
        this.recipe = recipe;
        this.ingredientId = ingredientId;
        this.quantity = quantity;
        this.id.setRecipeId(recipe.getId());
        this.id.setIngredientId(ingredientId);
    }

    // Getters and Setters
    public RecipeIngredientId getId() {
        return id;
    }

    public void setId(RecipeIngredientId id) {
        this.id = id;
    }

    public Recipe getRecipe() {
        return recipe;
    }

    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
        if (recipe != null && recipe.getId() != null) {
            this.id.setRecipeId(recipe.getId());
        }
    }

    public Integer getIngredientId() {
        return ingredientId;
    }

    public void setIngredientId(Integer ingredientId) {
        this.ingredientId = ingredientId;
        this.id.setIngredientId(ingredientId);
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        RecipeIngredient that = (RecipeIngredient) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    // Composite Primary Key Class
    @Embeddable
    public static class RecipeIngredientId implements Serializable {

        @Column(name = "recipe_id")
        private UUID recipeId;

        @Column(name = "ingredient_id")
        private Integer ingredientId;

        public RecipeIngredientId() {
        }

        public RecipeIngredientId(UUID recipeId, Integer ingredientId) {
            this.recipeId = recipeId;
            this.ingredientId = ingredientId;
        }

        // Getters and Setters
        public UUID getRecipeId() {
            return recipeId;
        }

        public void setRecipeId(UUID recipeId) {
            this.recipeId = recipeId;
        }

        public Integer getIngredientId() {
            return ingredientId;
        }

        public void setIngredientId(Integer ingredientId) {
            this.ingredientId = ingredientId;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o)
                return true;
            if (o == null || getClass() != o.getClass())
                return false;
            RecipeIngredientId that = (RecipeIngredientId) o;
            return Objects.equals(recipeId, that.recipeId) &&
                    Objects.equals(ingredientId, that.ingredientId);
        }

        @Override
        public int hashCode() {
            return Objects.hash(recipeId, ingredientId);
        }
    }
}