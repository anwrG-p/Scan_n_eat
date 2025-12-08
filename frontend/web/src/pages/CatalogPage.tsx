import React, { useEffect } from 'react';
import { useCatalogStore } from '../store/catalogStore';
import { DishCard } from '../components/catalog/DishCard';
import { Search } from 'lucide-react';


export const CatalogPage: React.FC = () => {
    const { dishes, isLoading, error } = useCatalogStore();
    const [searchQuery, setSearchQuery] = React.useState('');

    useEffect(() => {
        // Only fetch if empty or on mount logic
        // For now always fetch to ensure fresh data
        if (dishes.length === 0) {
            // Mock fetch until backend is ready
            // fetchDishes(); 

            // Manually seeding for demo
            useCatalogStore.setState({
                dishes: [
                    { id: '1', name: 'Spaghetti Carbonara', description: 'Classic Italian pasta with egg, cheese, pancetta, and black pepper.', price: 12.99, image_url: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=400&q=80', ingredients: ['Spaghetti', 'Eggs', 'Pancetta', 'Parmesan'], category: 'Pasta' },
                    { id: '2', name: 'Margherita Pizza', description: 'Simple and delicious pizza with tomato, mozzarella, and basil.', price: 10.50, image_url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&q=80', ingredients: ['Dough', 'Tomato Sauce', 'Mozzarella', 'Basil'], category: 'Pizza' },
                    { id: '3', name: 'Caesar Salad', description: 'Crisp romaine lettuce with croutons, parmesan, and caesar dressing.', price: 8.99, image_url: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=400&q=80', ingredients: ['Romaine', 'Croutons', 'Parmesan', 'Caesar Dressing'], category: 'Salad' },
                ],
                isLoading: false
            });
        }
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
