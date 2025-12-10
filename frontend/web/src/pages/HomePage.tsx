import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Send, Lock, ChevronRight } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { RecipeCard } from '../components/ui/RecipeCard';
import { Button } from '../components/ui/Button'; // Assuming Button exists

export const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [chatInput, setChatInput] = useState('');

    // Mock Data
    const trendingDishes = [
        { id: '1', title: 'Mediterranean Salad', description: 'Fresh and healthy salad with feta cheese and olives.', imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=400', difficulty: 'Easy' as const, time: '15 min', calories: '320 kcal' },
        { id: '2', title: 'Grilled Salmon', description: 'Perfectly grilled salmon with asparagus and lemon butter source.', imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a7270028d?auto=format&fit=crop&q=80&w=400', difficulty: 'Medium' as const, time: '25 min', calories: '450 kcal' },
        { id: '3', title: 'Vegetable Stir-Fry', description: 'Quick and easy stir-fry with seasonal vegetables.', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400', difficulty: 'Easy' as const, time: '20 min', calories: '280 kcal' },
    ];

    const savedRecipes = [
        "Spaghetti Carbonara", "Chicken Curry", "Beef Stew"
    ];

    const myIngredients = [
        "Tomatoes", "Eggs", "Milk", "Cheese", "Onions"
    ];

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
                            placeholder="Search for Your food here..."
                            className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-lg"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
                    </div>
                </div>

                {/* Trending Dishes */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        Trending Dishes:
                    </h2>
                    <div className="flex flex-col gap-4">
                        {trendingDishes.map(dish => (
                            <RecipeCard key={dish.id} {...dish} />
                        ))}
                    </div>
                </div>
            </div>

            {/* COLUMN A: Left Sidebar - User Tools (Order 2 on Mobile, 1 on Desktop) */}
            <div className="lg:col-span-3 order-2 lg:order-1 space-y-6">
                {/* Saved Recipes */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Saved Recipes</h3>
                    {user ? (
                        <ul className="space-y-3">
                            {savedRecipes.map((recipe, idx) => (
                                <li key={idx} className="flex items-center text-gray-600 hover:text-blue-600 cursor-pointer text-sm">
                                    <ChevronRight className="w-4 h-4 mr-1 text-gray-400" />
                                    {recipe}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-center py-6 px-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                            <Lock className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500 mb-3">Sign in to view your saved recipes</p>
                            <Button size="sm" variant="outline" onClick={() => navigate('/login')} className="w-full">Sign In</Button>
                        </div>
                    )}
                </div>

                {/* My Ingredients */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">My Ingredients</h3>
                    {user ? (
                        <ul className="space-y-3">
                            {myIngredients.map((item, idx) => (
                                <li key={idx} className="flex items-center text-gray-600 text-sm">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
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
                            <p className="text-sm text-gray-500 mb-3">Sign in to manage your pantry</p>
                            <Button size="sm" variant="outline" onClick={() => navigate('/login')} className="w-full">Sign In</Button>
                        </div>
                    )}
                </div>
            </div>

            {/* COLUMN C: Right Sidebar - AI Chat (Order 3 on Mobile, 3 on Desktop) */}
            <div className="lg:col-span-3 order-3 lg:order-3">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-0 overflow-hidden h-full flex flex-col min-h-[500px] lg:h-[calc(100vh-8rem)] sticky top-24">
                    <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                        <h3 className="font-bold text-lg">Chef AI</h3>
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
