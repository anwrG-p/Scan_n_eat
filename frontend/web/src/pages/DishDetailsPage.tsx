import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiClient } from '../api/client';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Clock, Users, Flame } from 'lucide-react';
import type { Recipe, IngredientDetails, RecipeIngredient } from '../types';
import { useCartStore } from '../store/cartStore';

export const DishDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addItem } = useCartStore();
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'steps'>('ingredients');
    // rating state removed as we use optimistic updates on recipe object

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            setLoading(true);
            try {
                // 1. Fetch Recipe
                const { data: recipeData } = await apiClient.get<Recipe>(`/recipes/${id}`);
                
                // 2. Fetch Ingredient Details
                const ingredientIds = recipeData.recipeIngredients.map((ri: RecipeIngredient) => ri.ingredientId);
                if (ingredientIds.length > 0) {
                    const { data: ingredientsData } = await apiClient.post<IngredientDetails[]>('/ingredients/batch', ingredientIds);
                    
                    // Map details back to recipe ingredients
                    recipeData.recipeIngredients = recipeData.recipeIngredients.map((ri: RecipeIngredient) => ({
                        ...ri,
                        details: ingredientsData.find((d: IngredientDetails) => d.id === ri.ingredientId)
                    }));
                }

                setRecipe(recipeData);
            } catch (err: any) {
                console.error("Failed to fetch dish details", err);
                setError("Failed to load dish details.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <div className="p-8 text-center text-gray-500">Loading recipe details...</div>;
    if (error || !recipe) return <div className="p-8 text-center text-red-500">{error || 'Dish not found'}</div>;

    // Calculations
    const totalCalories = recipe.recipeIngredients.reduce((sum: number, ri: RecipeIngredient) => sum + (ri.details?.calories || 0), 0);
    // Price estimation: Sum of ingredient average prices (per unit/100g base)
    const totalPrice = recipe.recipeIngredients.reduce((sum: number, ri: RecipeIngredient) => sum + (ri.details?.averagePrice || 0), 0);

    const steps = recipe.instructions 
        ? recipe.instructions.split(/\r\n|\n/).filter((step: string) => step.trim().length > 0)
        : ["No instructions available."];

    const handleRate = async (value: number) => {
        if (!recipe) return;
        try {
            // Optimistic update
            // This is simplified, real calculation happens on backend
            // But we can show the user's selection immediately as feedback
            
            const response = await apiClient.post<Recipe>(`/recipes/${recipe.id}/rate`, value, {
                 headers: { 'Content-Type': 'application/json' }
            });
            
            setRecipe(response.data);
        } catch (error) {
            console.error("Failed to submit rating", error);
            // Revert or show error
        }
    };

    // Helper to add to cart (adapter for CartStore which uses Dish type)
    const handleAddToCart = () => {
        if (!recipe) return;
        // Adapt Recipe to Dish for Cart
        const cartItem: any = {
             id: recipe.id,
             name: recipe.title,
             price: totalPrice,
             image_url: recipe.imageUrl,
             ingredients: recipe.recipeIngredients.map(ri => ri.details?.name || 'Unknown'),
             quantity: 1
        };
        addItem(cartItem);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <Button variant="secondary" onClick={() => navigate(-1)} className="mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column: Image */}
                <div className="h-96 lg:h-auto relative rounded-2xl overflow-hidden shadow-lg">
                    <img
                        src={recipe.imageUrl}
                        alt={recipe.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right Column: Details */}
                <div className="flex flex-col h-full">
                    <div className="flex justify-between items-start mb-2">
                         <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wide">
                            {recipe.area || 'Main Course'}
                        </span>
                        <div className="flex items-center space-x-1">
                            {/* Rating UI */}
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => handleRate(star)}
                                    className={`focus:outline-none transition-transform hover:scale-110 ${star <= (recipe.averageRating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </button>
                            ))}
                            <span className="text-gray-500 text-sm ml-2">({recipe.ratingCount || 0} reviews)</span>
                        </div>
                    </div>

                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{recipe.title}</h1>
                    <span className="text-3xl font-bold text-gray-900 mb-6">${totalPrice.toFixed(2)}</span>

                    <div className="flex space-x-8 mb-8 border-y border-gray-100 py-6">
                        <div className="flex items-center text-gray-700 font-medium"><Clock className="w-5 h-5 mr-3 text-blue-500" /> {recipe.prepTime || '30 min'}</div>
                        <div className="flex items-center text-gray-700 font-medium"><Users className="w-5 h-5 mr-3 text-blue-500" /> {recipe.servings || 2} servings</div>
                        <div className="flex items-center text-gray-700 font-medium"><Flame className="w-5 h-5 mr-3 text-blue-500" /> {Math.round(totalCalories)} kcal</div>
                    </div>

                    {/* Tabs Navigation */}
                    <div className="flex space-x-6 border-b border-gray-200 mb-6">
                        {(['description', 'ingredients', 'steps'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-3 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 ${activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="flex-grow mb-8 overflow-y-auto max-h-64 pr-2 custom-scrollbar">
                        {activeTab === 'description' && (
                            <p className="text-gray-600 leading-relaxed text-lg">Delicious {recipe.title} prepared with fresh ingredients.</p>
                        )}
                        {activeTab === 'ingredients' && (
                            <ul className="space-y-3">
                                {recipe.recipeIngredients.map((ri, i) => (
                                    <li key={i} className="flex justify-between items-center text-gray-700 p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center">
                                            <span className="w-2.5 h-2.5 bg-green-500 rounded-full mr-4" />
                                            <span className="font-medium">{ri.details?.name || 'Loading...'}</span>
                                            <span className="ml-2 text-gray-500 text-sm">({ri.quantity})</span>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="font-semibold">${ri.details?.averagePrice?.toFixed(2)}</span>
                                            <span className="text-xs text-gray-400">{ri.details?.calories} kcal</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {activeTab === 'steps' && (
                            <div className="space-y-6">
                                {steps.map((step, i) => (
                                    <div key={i} className="flex">
                                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold mr-4 mt-0.5">
                                            {i + 1}
                                        </div>
                                        <p className="text-gray-600 pt-1">{step}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <Button size="lg" onClick={handleAddToCart} className="w-full shadow-lg shadow-blue-200 mt-auto">
                        Add Ingredients to Cart
                    </Button>
                </div>
            </div>
        </div>
    );
};
