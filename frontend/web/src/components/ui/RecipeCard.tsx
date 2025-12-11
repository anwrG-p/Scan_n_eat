import React from 'react';
import { Clock, Flame } from 'lucide-react';

export interface RecipeCardProps {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    time: string;
    calories: string;
    area?: string;
    averageRating?: number;
    ratingCount?: number;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
    title,
    description,
    imageUrl,
    difficulty,
    time,
    calories,
    area,
    averageRating,
    ratingCount
}) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all flex mb-4 h-32 md:h-40">
            {/* Image Section */}
            <div className="w-1/3 relative h-full">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 flex gap-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${difficulty === 'Easy' ? 'bg-green-500' :
                        difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}>
                        {difficulty}
                    </span>
                    {area && (
                        <span className="px-2 py-1 rounded-full text-xs font-semibold text-white bg-blue-500">
                            {area}
                        </span>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="w-2/3 p-4 flex flex-col justify-between">
                <div>
                    <h3 className="font-bold text-gray-900 line-clamp-1">{title}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mt-1">{description}</p>
                </div>

                <div className="flex flex-col gap-1 mt-2 text-xs text-gray-400">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {time}
                        </div>
                        <div className="flex items-center">
                            <Flame className="w-3 h-3 mr-1" />
                            {calories}
                        </div>
                    </div>
                    {averageRating !== undefined && (
                        <div className="flex items-center text-yellow-500">
                            {'★'.repeat(Math.round(averageRating))}
                            <span className="text-gray-300 ml-1">
                                {'★'.repeat(5 - Math.round(averageRating))}
                            </span>
                            <span className="text-gray-400 ml-1">({ratingCount || 0})</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
