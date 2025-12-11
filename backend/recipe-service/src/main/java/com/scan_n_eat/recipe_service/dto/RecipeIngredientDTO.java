package com.scan_n_eat.recipe_service.dto;

public class RecipeIngredientDTO {
    private Integer ingredientId;
    private String quantity;

    public RecipeIngredientDTO() {}

    public RecipeIngredientDTO(Integer ingredientId, String quantity) {
        this.ingredientId = ingredientId;
        this.quantity = quantity;
    }

    public Integer getIngredientId() {
        return ingredientId;
    }

    public void setIngredientId(Integer ingredientId) {
        this.ingredientId = ingredientId;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }
}
