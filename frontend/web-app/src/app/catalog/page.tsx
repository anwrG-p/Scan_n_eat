"use client";

import { useState, useEffect } from "react";
import styles from "./catalog.module.css";
import { ShoppingCart, Plus } from "lucide-react";
import { useCart } from "../../context/CartContext";

interface Recipe {
    id: number;
    title: string;
    description: string;
    price: number;
    image_url?: string;
    prep_time_minutes?: number;
    cook_time_minutes?: number;
    difficulty_level?: string;
}

export default function CatalogPage() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        try {
            // Replace with your actual backend URL
            const response = await fetch('http://localhost:8082/api/recipes');
            const data = await response.json();
            setRecipes(data);
        } catch (error) {
            console.error('Failed to fetch recipes:', error);
            // Fallback to sample data
            setRecipes(getSampleRecipes());
        } finally {
            setLoading(false);
        }
    };

    const getSampleRecipes = (): Recipe[] => [
        { id: 1, title: "Margherita Pizza", description: "Classic Italian pizza with tomato and mozzarella", price: 12.99, image_url: "/pizza.webp", difficulty_level: "EASY" },
        { id: 2, title: "Kousksi", description: "Fresh romaine lettuce with Caesar dressing and croutons", price: 8.99, image_url: "/kousksi.webp", difficulty_level: "MEDIUM" },
        { id: 3, title: "Lablebi", description: "Juicy beef burger with cheese, lettuce, and tomato", price: 11.99, image_url: "/lablebi.webp", difficulty_level: "EASY" },
        { id: 4, title: "Ma9rouna", description: "Classic Italian pasta with bacon and creamy sauce", price: 13.99, image_url: "/ma9rouna.webp", difficulty_level: "MEDIUM" },
        { id: 5, title: "Nwasir", description: "Fresh salmon fillet with lemon butter sauce", price: 18.99, image_url: "/nwasir.webp", difficulty_level: "HARD" },
    ];

    const handleAddToCart = (recipe: Recipe) => {
        addToCart({
            id: recipe.id,
            title: recipe.title,
            price: recipe.price,
            image_url: recipe.image_url,
        });
    };

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.hero}></div>
                <div className={styles.contentWrapper}>
                    <p>Loading dishes...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.hero}></div>

            <div className={styles.contentWrapper}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Our Menu</h1>
                    <p className={styles.subtitle}>Discover delicious dishes crafted by our chefs</p>
                </div>

                <div className={styles.grid}>
                    {recipes.map((recipe) => (
                        <div key={recipe.id} className={styles.card}>
                            <div className={styles.imageContainer}>
                                <img
                                    src={recipe.image_url || '/hero-image.jpg'}
                                    alt={recipe.title}
                                    className={styles.image}
                                />
                                {recipe.difficulty_level && (
                                    <span className={styles.badge}>{recipe.difficulty_level}</span>
                                )}
                            </div>

                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle}>{recipe.title}</h3>
                                <p className={styles.cardDescription}>{recipe.description}</p>

                                <div className={styles.cardFooter}>
                                    <span className={styles.price}>${recipe.price.toFixed(2)}</span>
                                    <button
                                        onClick={() => handleAddToCart(recipe)}
                                        className={styles.addButton}
                                    >
                                        <Plus size={18} />
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
