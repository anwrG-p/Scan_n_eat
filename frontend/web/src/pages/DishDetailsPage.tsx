import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCatalogStore } from '../store/catalogStore';
import { useCartStore } from '../store/cartStore';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Clock, Users, Flame } from 'lucide-react';
import type { Dish } from '../types';

export const DishDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { dishes } = useCatalogStore();
    const { addItem } = useCartStore();
    const [dish, setDish] = useState<Dish | undefined>(undefined);

    // Mock Data for extended details
    const cookingSteps = [
        "Preheat your oven or grill to the recommended temperature.",
        "Prepare the ingredients by washing and chopping vegetables.",
        "Season the main protein (meat/fish/tofu) with spices.",
        "Cook the protein for the specified time until golden brown.",
        "Assemble the dish on a serving plate and garnish with fresh herbs."
    ];

    const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'steps'>('description');
    const [rating, setRating] = useState(4);

    useEffect(() => {
        // In a real app, fetch from API if not in store
        const found = dishes.find(d => d.id === id);
        setDish(found);
    }, [id, dishes]);

    if (!dish) {
        return <div className="p-8 text-center">Dish not found</div>;
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <Button variant="secondary" onClick={() => navigate(-1)} className="mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column: Image */}
                <div className="h-96 lg:h-auto relative rounded-2xl overflow-hidden shadow-lg">
                    <img
                        src={dish.image_url}
                        alt={dish.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right Column: Details */}
                <div className="flex flex-col h-full">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wide">
                            {dish.category || 'Main Course'}
                        </span>
                        <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className={`focus:outline-none transition-transform hover:scale-110 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </button>
                            ))}
                            <span className="text-gray-500 text-sm ml-2">({rating}.0)</span>
                        </div>
                    </div>

                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{dish.name}</h1>
                    <span className="text-3xl font-bold text-gray-900 mb-6">${dish.price.toFixed(2)}</span>

                    <div className="flex space-x-8 mb-8 border-y border-gray-100 py-6">
                        <div className="flex items-center text-gray-700 font-medium"><Clock className="w-5 h-5 mr-3 text-blue-500" /> 30 min</div>
                        <div className="flex items-center text-gray-700 font-medium"><Users className="w-5 h-5 mr-3 text-blue-500" /> 2 servings</div>
                        <div className="flex items-center text-gray-700 font-medium"><Flame className="w-5 h-5 mr-3 text-blue-500" /> 450 kcal</div>
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
                            <p className="text-gray-600 leading-relaxed text-lg">{dish.description}</p>
                        )}
                        {activeTab === 'ingredients' && (
                            <ul className="space-y-3">
                                {dish.ingredients.map((ing, i) => (
                                    <li key={i} className="flex items-center text-gray-700 p-3 bg-gray-50 rounded-lg">
                                        <span className="w-2.5 h-2.5 bg-green-500 rounded-full mr-4" />
                                        <span className="font-medium">{ing}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {activeTab === 'steps' && (
                            <div className="space-y-6">
                                {cookingSteps.map((step, i) => (
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

                    <Button size="lg" onClick={() => addItem(dish)} className="w-full shadow-lg shadow-blue-200 mt-auto">
                        Add Ingredients to Cart
                    </Button>
                </div>
            </div>
        </div>
    );
};
