import React, { useState } from 'react';
import { useCatalogStore } from '../../store/catalogStore';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Edit, Trash2, Plus } from 'lucide-react';

import { apiClient } from '../../api/client';

export const ManageCatalogPage: React.FC = () => {
    const { dishes } = useCatalogStore();
    // TODO: Add addDish, updateDish, deleteDish to store
    const [showForm, setShowForm] = useState(false);
    const [isPopulating, setIsPopulating] = useState(false);

    const handlePopulate = async () => {
        if (!window.confirm("This will fetch recipes from the external API. Continue?")) return;
        setIsPopulating(true);
        try {
            await apiClient.post('/recipes/populate');
            alert('Catalog populated successfully!');
            // TODO: Refresh catalog
        } catch (error) {
            console.error('Failed to populate:', error);
            alert('Failed to populate catalog.');
        } finally {
            setIsPopulating(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Manage Catalog</h1>
                <div className="space-x-2">
                    <Button variant="secondary" onClick={handlePopulate} disabled={isPopulating}>
                        {isPopulating ? 'Populating...' : 'Populate Catalog'}
                    </Button>
                    <Button onClick={() => setShowForm(!showForm)}>
                        <Plus className="w-4 h-4 mr-2" /> Add New Dish
                    </Button>
                </div>
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-lg font-bold mb-4">Add New Dish</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <Input label="Dish Name" placeholder="e.g. Spaghetti Carbonara" />
                        <Input label="Price ($)" type="number" placeholder="0.00" />
                        <div className="md:col-span-2">
                            <Input label="Description" placeholder="Brief description..." />
                        </div>
                        <div className="md:col-span-2">
                            <Input label="Image URL" placeholder="https://..." />
                        </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
                        <Button>Save Dish</Button>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-lg shadowoverflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ingredients</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {dishes.map((dish) => (
                                <tr key={dish.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <img src={dish.image_url} alt={dish.name} className="h-10 w-10 rounded-full object-cover" />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">{dish.name}</div>
                                        <div className="text-sm text-gray-500 truncate max-w-xs">{dish.description}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        ${dish.price.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {dish.ingredients.length} items
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-blue-600 hover:text-blue-900 mr-4">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button className="text-red-600 hover:text-red-900">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
