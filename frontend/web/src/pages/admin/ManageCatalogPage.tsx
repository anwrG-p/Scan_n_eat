import React, { useState } from 'react';
import { useCatalogStore } from '../../store/catalogStore';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Edit, Trash2, Plus } from 'lucide-react';

import { apiClient } from '../../api/client';

export const ManageCatalogPage: React.FC = () => {
    const { dishes, fetchDishes } = useCatalogStore();
    const [showForm, setShowForm] = useState(false);
    const [isPopulating, setIsPopulating] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const handlePopulate = async () => {
        if (!window.confirm("This will fetch recipes from the external API. Continue?")) return;
        setIsPopulating(true);
        try {
            await apiClient.post('/recipes/populate');
            alert('Catalog populated successfully!');
            fetchDishes();
        } catch (error) {
            console.error('Failed to populate:', error);
            alert('Failed to populate catalog.');
        } finally {
            setIsPopulating(false);
        }
    };

    const [newDish, setNewDish] = useState({
        title: '',
        description: '',
        price: '0.00',
        imageUrl: '',
        instructions: '',
        prepTime: '20 mins',
        active: true
    });

    const resetForm = () => {
        setNewDish({
            title: '',
            description: '',
            price: '0.00',
            imageUrl: '',
            instructions: '',
            prepTime: '20 mins',
            active: true
        });
        setEditingId(null);
        setShowForm(false);
    };

    const handleAddDish = async () => {
        try {
            const payload = {
                ...newDish,
                price: parseFloat(newDish.price)
            };

            if (editingId) {
                await apiClient.put(`/recipes/${editingId}`, payload);
                alert('Dish updated successfully!');
            } else {
                await apiClient.post('/recipes', payload);
                alert('Dish added successfully!');
            }
            
            resetForm();
            fetchDishes();
        } catch (error) {
            console.error('Failed to save dish:', error);
            alert('Failed to save dish');
        }
    };

    const handleEdit = async (id: string) => {
        try {
            // Fetch full recipe details
            // We use 'any' temporarily as we need to conform to the form state structure
            const { data } = await apiClient.get<any>(`/recipes/${id}`);
            
            setNewDish({
                title: data.title,
                description: data.instructions?.substring(0, 100) || '', // Simple description from instructions
                price: data.price ? data.price.toString() : '0.00',
                imageUrl: data.imageUrl || '',
                instructions: data.instructions || '',
                prepTime: data.prepTime || '20 mins',
                active: true
            });
            
            setEditingId(id);
            setShowForm(true);
            
            // Scroll to form
            window.scrollTo({ top: 0, behavior: 'smooth' });

        } catch (error) {
            console.error("Failed to fetch recipe for editing", error);
            alert("Could not load recipe details");
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this dish?")) return;
        
        try {
            await apiClient.delete(`/recipes/${id}`);
            alert('Dish deleted successfully');
            fetchDishes();
        } catch (error) {
            console.error("Failed to delete dish", error);
            alert("Failed to delete dish");
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
                    <Button onClick={() => { resetForm(); setShowForm(!showForm); }}>
                        <Plus className="w-4 h-4 mr-2" /> Add New Dish
                    </Button>
                </div>
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-lg font-bold mb-4">{editingId ? 'Edit Dish' : 'Add New Dish'}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <Input 
                            label="Dish Name" 
                            value={newDish.title}
                            onChange={(e) => setNewDish({...newDish, title: e.target.value})}
                            placeholder="e.g. Spaghetti Carbonara" 
                        />
                        <Input 
                            label="Price ($)" 
                            type="number" 
                            step="0.01"
                            value={newDish.price}
                            onChange={(e) => setNewDish({...newDish, price: e.target.value})}
                            placeholder="0.00" 
                        />
                        <div className="md:col-span-2">
                            <Input 
                                label="Description" 
                                value={newDish.description}
                                onChange={(e) => setNewDish({...newDish, description: e.target.value})}
                                placeholder="Brief description..." 
                            />
                        </div>
                        <div className="md:col-span-2">
                            <Input 
                                label="Image URL" 
                                value={newDish.imageUrl}
                                onChange={(e) => setNewDish({...newDish, imageUrl: e.target.value})}
                                placeholder="https://..." 
                            />
                        </div>
                        <div className="md:col-span-2">
                            <Input 
                                label="Instructions" 
                                value={newDish.instructions}
                                onChange={(e) => setNewDish({...newDish, instructions: e.target.value})}
                                placeholder="Cooking steps..." 
                            />
                        </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
                        <Button onClick={handleAddDish}>{editingId ? 'Update Dish' : 'Save Dish'}</Button>
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
                                        <button 
                                            onClick={() => handleEdit(dish.id)}
                                            className="text-blue-600 hover:text-blue-900 mr-4"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(dish.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
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
