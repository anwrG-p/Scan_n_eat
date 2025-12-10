import React, { useEffect } from 'react';
import { useCatalogStore } from '../store/catalogStore';
import { DishCard } from '../components/catalog/DishCard';
import { Search } from 'lucide-react';


export const CatalogPage: React.FC = () => {
    const { dishes, isLoading, error, fetchDishes } = useCatalogStore();
    const [searchQuery, setSearchQuery] = React.useState('');

    useEffect(() => {
        fetchDishes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const filteredDishes = dishes.filter(dish =>
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Catalog</h1>
                    <p className="text-gray-600">Explore our delicious menu items</p>
                </div>
                <div className="w-full sm:w-72">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search dishes..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            ) : error ? (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
                    {error}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredDishes.map((dish) => (
                        <DishCard key={dish.id} dish={dish} />
                    ))}
                    {filteredDishes.length === 0 && (
                        <div className="col-span-full text-center py-10 text-gray-500">
                            No dishes found matching "{searchQuery}"
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
