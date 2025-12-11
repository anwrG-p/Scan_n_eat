import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Send, Lock, ChevronRight } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useLanguageStore } from '../store/languageStore';
import { useSavedRecipesStore } from '../store/savedRecipesStore';
import { useInventoryStore } from '../store/inventoryStore';
import { RecipeCard } from '../components/ui/RecipeCard';
import { Button } from '../components/ui/Button'; // Assuming Button exists

export const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const { language } = useLanguageStore();
    const { savedRecipes, trendingRecipes, fetchSavedRecipes, fetchTrendingRecipes, isLoading } = useSavedRecipesStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [chatInput, setChatInput] = useState('');

    // Fetch data on mount
    useEffect(() => {
        fetchTrendingRecipes(5);
        if (user) {
            fetchSavedRecipes();
        }
    }, [user]);

    // Convert Dish to format expected by RecipeCard
    const mapDishToCardProps = (dish: any) => ({
        id: dish.id,
        title: dish.name,
        description: dish.description,
        imageUrl: dish.image_url,
        difficulty: 'Easy' as const,
        time: '20 min',
        calories: '350 kcal'
    });


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
            trending: "Trending Dishes:",
            saved: "Saved Recipes",
            pantry: "My Ingredients",
            signInSaved: "Sign in to view your saved recipes",
            signInPantry: "Sign in to manage your pantry",
            searchPlaceholder: "Search for Your food here...",
            chef: "Chef AI"
        },
        fr: {
            trending: "Plats Tendances :",
            saved: "Recettes Enregistrées",
            pantry: "Mes Ingrédients",
            signInSaved: "Connectez-vous pour voir vos recettes",
            signInPantry: "Connectez-vous pour gérer votre garde-manger",
            searchPlaceholder: "Recherchez votre nourriture ici...",
            chef: "Chef IA"
        },
        ar: {
            trending: "أطباق شائعة:",
            saved: "الوصفات المحفوظة",
            pantry: "مكوناتي",
            signInSaved: "سجل الدخول لعرض وصفاتك المحفوظة",
            signInPantry: "سجل الدخول لإدارة مخزنك",
            searchPlaceholder: "ابحث عن طعامك هنا...",
            chef: "الشيف الذكي"
        },
        it: {
            trending: "Piatti di Tendenza:",
            saved: "Ricette Salvate",
            pantry: "I Miei Ingredienti",
            signInSaved: "Accedi per visualizzare le ricette salvate",
            signInPantry: "Accedi per gestire la tua dispensa",
            searchPlaceholder: "Cerca il tuo cibo qui...",
            chef: "Chef AI"
        },
        de: {
            trending: "Beliebte Gerichte:",
            saved: "Gespeicherte Rezepte",
            pantry: "Meine Zutaten",
            signInSaved: "Melden Sie sich an, um Ihre Rezepte zu sehen",
            signInPantry: "Melden Sie sich an, um Ihre Speisekammer zu verwalten",
            searchPlaceholder: "Suchen Sie hier nach Ihrem Essen...",
            chef: "Chef KI"
        }
    };

    const t = translations[language] || translations.en;

    // Fetch inventory
    const { inventory, fetchInventory } = useInventoryStore();

    useEffect(() => {
        if (user) {
            fetchInventory();
        }
    }, [user]);

    // Format inventory for display (take first 5)
    // Inventory items have 'name', if missing fallback to 'Item #{id}'
    const myIngredients = inventory.slice(0, 5).map(item => item.name || `Item ${item.ingredientId}`);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* COLUMN B: Center - Main Content (Order 1 on Mobile, 2 on Desktop) */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-8">
                {/* Header Section */}
                <div className="text-center space-y-4 py-8">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                        Scan'n Eat
                    </h1>
                    <p className="text-xl text-gray-600 font-medium">
                        Cook it Smart, Not Hard
                    </p>
                </div>

                {/* Search Bar */}
                <div className="relative max-w-2xl mx-auto">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder={t.searchPlaceholder}
                            className={`w-full pl-12 pr-4 py-4 rounded-full border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-lg ${language === 'ar' ? 'text-right' : ''}`}
                            dir={language === 'ar' ? 'rtl' : 'ltr'}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className={`absolute ${language === 'ar' ? 'right-4' : 'left-4'} top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6`} />
                    </div>
                </div>

                {/* Trending Dishes */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        {t.trending}
                    </h2>
                    {isLoading ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500">Loading trending recipes...</p>
                        </div>
                    ) : trendingRecipes.length > 0 ? (
                        <div className="flex flex-col gap-4">
                            {trendingRecipes.map(dish => (
                                <div key={dish.id} onClick={() => navigate(`/catalog/${dish.id}`)} className="cursor-pointer transition-transform hover:scale-[1.01]">
                                    <RecipeCard {...mapDishToCardProps(dish)} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 bg-gray-50 rounded-lg">
                            <p className="text-gray-500">No trending recipes available</p>
                        </div>
                    )}
                </div>
            </div>


            {/* COLUMN A: Left Sidebar - User Tools (Order 2 on Mobile, 1 on Desktop) */}
            <div className="lg:col-span-3 order-2 lg:order-1">
                <div className="sticky top-24 space-y-6">
                    {/* Saved Recipes */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
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
                                            <ChevronRight className={`w-4 h-4 text-gray-400 ${language === 'ar' ? 'ml-1 transform rotate-180' : 'mr-1'}`} />
                                            {recipe.name}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-gray-500 text-center py-4">No saved recipes yet</p>
                            )
                        ) : (
                            <div className="text-center py-6 px-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                                <Lock className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500 mb-3">{t.signInSaved}</p>
                                <Button size="sm" variant="outline" onClick={() => navigate('/login')} className="w-full">Sign In</Button>
                            </div>
                        )}
                    </div>

                    {/* My Ingredients */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
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
                            <div className="text-center py-6 px-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                                <Lock className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500 mb-3">{t.signInPantry}</p>
                                <Button size="sm" variant="outline" onClick={() => navigate('/login')} className="w-full">Sign In</Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* COLUMN C: Right Sidebar - AI Chat (Order 3 on Mobile, 3 on Desktop) */}
            <div className="lg:col-span-3 order-3 lg:order-3">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-0 overflow-hidden h-full flex flex-col min-h-[500px] lg:h-[calc(100vh-8rem)] sticky top-24">
                    <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                        <h3 className="font-bold text-lg">{t.chef}</h3>
                        <p className="text-blue-100 text-xs">Ask our chef how to cook</p>
                    </div>

                    {/* Chat Messages Area - Placeholder */}
                    <div className="flex-1 p-4 bg-gray-50 overflow-y-auto space-y-4">
                        <div className="flex gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600 flex-shrink-0">AI</div>
                            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-gray-700">
                                Hello! I'm your personal chef. Ask me anything about recipes or cooking tips!
                            </div>
                        </div>
                        {/* More messages could go here */}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t border-gray-100">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Ask a question..."
                                className="w-full pr-10 pl-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                            />
                            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-700 p-1">
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};
