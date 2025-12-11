export interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    userId?: string; // Add optional userId for consistency
}

export interface AuthResponse {
    token: string;
    username: string;
    role: 'USER' | 'ADMIN'; // Match Java Enum string values
    userId: string;
}

export interface Ingredient {
    name: string;
    quantity: number;
    unit: string;
    expiry?: string;
}

export interface Dish {
    id: string;
    name: string;
    description: string;
    price: number;
    image_url: string;
    ingredients: string[]; // List of ingredient names
    category?: string;
}

export interface IngredientDetails {
    id: number;
    name: string;
    calories: number;
    averagePrice: number;
}

export interface RecipeIngredient {
    ingredientId: number;
    quantity: string;
    // Enriched data from ingredients-service
    details?: IngredientDetails;
}

export interface Recipe {
    id: string;
    title: string;
    instructions: string;
    imageUrl: string;
    prepTime: string;
    servings: number;
    recipeIngredients: RecipeIngredient[];
}

export interface CartItem extends Dish {
    cartQuantity: number;
    title?: string;
}
