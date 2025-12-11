import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Lock, ChevronRight } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useLanguageStore } from '../store/languageStore';
import { useSavedRecipesStore } from '../store/savedRecipesStore';
import { useInventoryStore } from '../store/inventoryStore';
import { RecipeCard } from '../components/ui/RecipeCard';
import { Button } from '../components/ui/Button'; 

import { FilterSidebar } from '../components/catalog/FilterSidebar';
import { apiClient } from '../api/client';
import type { Recipe } from '../types';

export const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const { language } = useLanguageStore();
    const { savedRecipes, fetchSavedRecipes } = useSavedRecipesStore();
    
    // State
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
    const [maxPrice, setMaxPrice] = useState(100);
    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    // Fetch filters
    useEffect(() => {
        const fetchRecipes = async () => {
            setIsSearching(true);
            try {
                // Determine if we are filtering or just searching
                const params: any = {};
                if (searchQuery) params.title = searchQuery;
                if (selectedArea) params.area = selectedArea;
                if (maxPrice < 100) params.maxPrice = maxPrice;

                // Call appropriate API endpoint
                let response;
                if (Object.keys(params).length > 0) {
                     // Use the filter endpoint we created
                    const queryParams = new URLSearchParams();
                    if (selectedArea) queryParams.append('area', selectedArea);
                    if (maxPrice < 100) queryParams.append('maxPrice', maxPrice.toString());
                    
                    if (searchQuery) {
                         // Search takes precedence or combination? 
                         // For now let's use search if query exists, else filter
                         response = await apiClient.get(`/recipes/search?title=${searchQuery}`);
                    } else {
                         response = await apiClient.get(`/recipes/filter?${queryParams.toString()}`);
                    }
                } else {
                     response = await apiClient.get('/recipes'); // Get all recipes default
                }
                
                // If trending desired as default, keep using store for that, 
                // but here we want a catalog view.
                // Let's assume HomePage is now "Catalog" primarily.
                if (response && response.data) {
                    setFilteredRecipes(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch recipes", error);
            } finally {
                setIsSearching(false);
            }
        };

        const timeoutId = setTimeout(() => {
            fetchRecipes();
        }, 500); // Debounce

        return () => clearTimeout(timeoutId);
    }, [searchQuery, selectedArea, maxPrice]);

    // Fetch user data
    useEffect(() => {
        if (user) {
            fetchSavedRecipes();
            fetchInventory();
        }
    }, [user]);

    // Format inventory
    const { inventory, fetchInventory } = useInventoryStore();
    const myIngredients = inventory.slice(0, 5).map(item => item.name || `Item ${item.ingredientId}`);

    const translations: Record<string, {
        trending: string;
        saved: string;
        pantry: string;
        signInSaved: string;
        signInPantry: string;
        searchPlaceholder: string;
        chef: string;
    }> = {
        en: {
            trending: "Catalog",
            saved: "Saved Recipes",
            pantry: "My Ingredients",
            signInSaved: "Sign in to view your saved recipes",
            signInPantry: "Sign in to manage your pantry",
            searchPlaceholder: "Search for food...",
            chef: "Chef AI"
        },
        // ... other languages (omitted for brevity, keeping existing)
        fr: {
             trending: "Catalogue",
             saved: "Recettes Enregistrées",
             pantry: "Mes Ingrédients",
             signInSaved: "Connectez-vous pour voir vos recettes",
             signInPantry: "Connectez-vous pour gérer votre garde-manger",
             searchPlaceholder: "Rechercher...",
             chef: "Chef IA"
        },
        ar: {
             trending: "فهرس",
             saved: "الوصفات المحفوظة",
             pantry: "مكوناتي",
             signInSaved: "سجل الدخول لعرض وصفاتك المحفوظة",
             signInPantry: "سجل الدخول لإدارة مخزنك",
             searchPlaceholder: "بحث...",
             chef: "الشيف الذكي"
        },
        it: {
             trending: "Catalogo",
             saved: "Ricette Salvate",
             pantry: "I Miei Ingredienti",
             signInSaved: "Accedi per visualizzare le ricette salvate",
             signInPantry: "Accedi per gestire la tua dispensa",
             searchPlaceholder: "Cerca...",
             chef: "Chef AI"
        },
        de: {
             trending: "Katalog",
             saved: "Gespeicherte Rezepte",
             pantry: "Meine Zutaten",
             signInSaved: "Melden Sie sich an, um Ihre Rezepte zu sehen",
             signInPantry: "Melden Sie sich an, um Ihre Speisekammer zu verwalten",
             searchPlaceholder: "Suche...",
             chef: "Chef KI"
        }
    };
    const t = translations[language] || translations.en;

    const mapRecipeToCardProps = (recipe: Recipe) => ({
        id: recipe.id,
        title: recipe.title,
        description: recipe.instructions, // Simple description derivation
        imageUrl: recipe.imageUrl,
        difficulty: 'Easy' as const, // Placeholder
        time: recipe.prepTime || '20 min',
        calories: '350 kcal', // Placeholder
        area: recipe.area,
        averageRating: recipe.averageRating,
        ratingCount: recipe.ratingCount
    });

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* COLUMN A: Sidebar Filters (Left) */}
            <div className="lg:col-span-3 order-2 lg:order-1 space-y-6">
                <div className="sticky top-24">
                     <FilterSidebar 
                        onAreaChange={setSelectedArea}
                        onPriceChange={setMaxPrice}
                        selectedArea={selectedArea}
                        maxPrice={maxPrice}
                     />
                     
                     <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">{t.saved}</h3>
                        {user ? (
                            savedRecipes.length > 0 ? (
                                <ul className="space-y-3">
                                    {savedRecipes.map((recipe) => (
                                        <li
                                            key={recipe.id}
                                            onClick={() => navigate(`/catalog/${recipe.id}`)}
                                            className="flex items-center text-gray-600 hover:text-blue-600 cursor-pointer text-sm"
                                        >
                                            <ChevronRight className="w-4 h-4 text-gray-400 mr-1" />
                                            {recipe.name}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-gray-500 text-center py-4">No saved recipes yet</p>
                            )
                        ) : (
                            <div className="text-center py-4 text-sm text-gray-500">
                                <Lock className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                                <p className="mb-3">{t.signInSaved}</p>
                                <Button size="sm" variant="outline" onClick={() => navigate('/login')} className="w-full">Sign In</Button>
                            </div>
                        )}
                     </div>

                     {/* My Ingredients */}
                     <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">{t.pantry}</h3>
                        {user ? (
                            <ul className="space-y-3">
                                {myIngredients.map((item, idx) => (
                                    <li key={idx} className="flex items-center text-gray-600 text-sm">
                                        <div className={`w-1.5 h-1.5 bg-green-500 rounded-full ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                                        {item}
                                    </li>
                                ))}
                                <li className="pt-2">
                                    <Button variant="link" size="sm" onClick={() => navigate('/ingredients')} className="p-0 h-auto text-blue-600">
                                        View All
                                    </Button>
                                </li>
                            </ul>
                        ) : (
                            <div className="text-center py-4 text-sm text-gray-500">
                                <Lock className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                                <p className="mb-3">{t.signInPantry}</p>
                                <Button size="sm" variant="outline" onClick={() => navigate('/login')} className="w-full">Sign In</Button>
                            </div>
                        )}
                     </div>
                </div>
            </div>

            {/* COLUMN B: Main Content (Center) */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-8">
                {/* Header Section */}
                <div className="text-center space-y-4 py-8">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                        Scan'n Eat
                    </h1>
                </div>

                {/* Search Bar */}
                <div className="relative max-w-2xl mx-auto">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder={t.searchPlaceholder}
                            className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-lg"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
                    </div>
                </div>

                {/* Recipe Grid */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        {t.trending}
                    </h2>
                    {isSearching ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500">Updating results...</p>
                        </div>
                    ) : filteredRecipes.length > 0 ? (
                        <div className="flex flex-col gap-4">
                            {filteredRecipes.map(recipe => (
                                <div key={recipe.id} onClick={() => navigate(`/catalog/${recipe.id}`)} className="cursor-pointer transition-transform hover:scale-[1.01]">
                                    <RecipeCard {...mapRecipeToCardProps(recipe)} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 bg-gray-50 rounded-lg">
                            <p className="text-gray-500">No recipes found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* COLUMN C: Chat (Right) */}
            <div className="lg:col-span-3 order-3 lg:order-3">
                 {/* Chat Component Placeholder */}
                 <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 min-h-[300px]">
                    <h3 className="font-bold text-lg mb-2">{t.chef}</h3>
                    <p className="text-sm text-gray-500">Chat feature coming soon.</p>
                 </div>
            </div>

        </div>
    );
};
