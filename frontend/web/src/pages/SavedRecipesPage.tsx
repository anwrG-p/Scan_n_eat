import React, { useEffect } from 'react';
import { useSavedRecipesStore } from '../store/savedRecipesStore';
import { DishCard } from '../components/catalog/DishCard';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const SavedRecipesPage: React.FC = () => {
    const { savedRecipes, isLoading, error, fetchSavedRecipes } = useSavedRecipesStore();
    const { user } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            fetchSavedRecipes();
        }
    }, [user, fetchSavedRecipes]);

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                <div className="bg-gray-100 p-6 rounded-full">
                    <Lock className="w-12 h-12 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Sign in to view saved recipes</h2>
                <p className="text-gray-500">Keep track of your favorite dishes in one place.</p>
                <Button onClick={() => navigate('/login')}>Sign In</Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Saved Recipes</h1>
                    <p className="text-gray-600">Your collection of favorite dishes</p>
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
            ) : savedRecipes.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <p className="text-xl text-gray-500 font-medium">No saved recipes yet</p>
                    <p className="text-gray-400 mt-2">Browse the catalog to find dishes you love!</p>
                    <Button
                        className="mt-6"
                        onClick={() => navigate('/catalog')}
                    >
                        Browse Catalog
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {savedRecipes.map((dish) => (
                        <DishCard key={dish.id} dish={dish} />
                    ))}
                </div>
            )}
        </div>
    );
};
