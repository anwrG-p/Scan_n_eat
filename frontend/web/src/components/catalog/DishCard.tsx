import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Dish } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Plus } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';

interface DishCardProps {
    dish: Dish;
}

export const DishCard: React.FC<DishCardProps> = ({ dish }) => {
    const navigate = useNavigate();
    const { addItem } = useCartStore();

    const handleCardClick = () => {
        navigate(`/catalog/${dish.id}`);
    };

    const handleAddClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent card navigation
        addItem(dish);
    };

    return (
        <Card
            onClick={handleCardClick}
            className="flex flex-col h-full hover:shadow-lg transition-shadow cursor-pointer group"
        >
            <div className="relative h-48 w-full bg-gray-200 overflow-hidden">
                <img
                    src={dish.image_url || 'https://via.placeholder.com/400x300?text=No+Image'}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md shadow-sm font-semibold text-gray-900">
                    ${dish.price.toFixed(2)}
                </div>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{dish.name}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-grow">{dish.description}</p>

                <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {dish.ingredients.length} ingredients
                    </span>
                    <Button
                        variant="primary"
                        className="!px-3 !py-1 text-sm"
                        onClick={handleAddClick}
                    >
                        <Plus className="w-4 h-4 mr-1" /> Add
                    </Button>
                </div>
            </div>
        </Card>
    );
};
