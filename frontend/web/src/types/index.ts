export interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
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

export interface Recipe {
    id: string;
    title: string;
    image: string;
    usedIngredientCount: number;
    missedIngredientCount: number;
    missedIngredients: Ingredient[];
    usedIngredients: Ingredient[];
}

export interface CartItem extends Dish {
    cartQuantity: number;
}
