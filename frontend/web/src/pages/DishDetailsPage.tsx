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

    useEffect(() => {
        // In a real app, fetch from API if not in store
        const found = dishes.find(d => d.id === id);
        setDish(found);
    }, [id, dishes]);

    if (!dish) {
        return <div className="p-8 text-center">Dish not found</div>;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <Button variant="secondary" onClick={() => navigate(-1)} className="mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                <div className="md:flex">
                    <div className="md:w-1/2 h-64 md:h-auto relative">
                        <img
                            src={dish.image_url}
                            alt={dish.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-8 md:w-1/2">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                    {dish.category || 'Main Course'}
                                </span>
                                <h1 className="text-3xl font-bold mt-2 text-gray-900">{dish.name}</h1>
                            </div>
                            <span className="text-2xl font-bold text-gray-900">${dish.price.toFixed(2)}</span>
                        </div>

                        <p className="text-gray-600 mb-6">{dish.description}</p>

                        <div className="flex space-x-6 mb-8 text-sm text-gray-500">
                            <div className="flex items-center"><Clock className="w-4 h-4 mr-2" /> 30 min</div>
                            <div className="flex items-center"><Users className="w-4 h-4 mr-2" /> 2 servings</div>
                            <div className="flex items-center"><Flame className="w-4 h-4 mr-2" /> 450 kcal</div>
                        </div>

                        <h3 className="font-bold mb-3">Ingredients</h3>
                        <ul className="space-y-2 mb-8">
                            {dish.ingredients.map((ing, i) => (
                                <li key={i} className="flex items-center text-gray-600">
                                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3" />
                                    {ing}
                                </li>
                            ))}
                        </ul>

                        <Button onClick={() => addItem(dish)} className="w-full">
                            Add Ingredients to Cart
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
