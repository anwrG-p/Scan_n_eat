import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useIngredientsStore } from '../store/ingredientsStore';
import { useInventoryStore } from '../store/inventoryStore';
import { Plus, Trash2, Calendar, Scale, Package } from 'lucide-react';

export const IngredientsPage: React.FC = () => {
    // Global Catalog (for looking up IDs)
    const { scannedIngredients, fetchIngredients } = useIngredientsStore();

    // User Inventory
    const { inventory, fetchInventory, addToInventory, removeFromInventory } = useInventoryStore();

    useEffect(() => {
        fetchIngredients();
        fetchInventory();
    }, [fetchIngredients, fetchInventory]);

    // Local state for the form
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('grams');
    const [expiry, setExpiry] = useState('');

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();

        // Simple lookup for Ingredient ID based on name
        // In a real app, use a proper Search/Dropdown
        const foundIngredient = scannedIngredients.find(ing => ing.name.toLowerCase() === name.toLowerCase());

        if (!foundIngredient) {
            alert(`Ingredient '${name}' not found in catalog. Please check spelling or choose from global list.`);
            return;
        }

        // We use a mock ID if the catalog doesn't expose ID yet (it should, check types)
        // types/index.ts shows Ingredient interface doesn't have ID!
        // We will mock ID as 1 for now if missing, or we need to fix Ingredient type.
        // Assuming backend returns it but frontend type misses it.
        const ingredientId = (foundIngredient as any).id || 1;

        await addToInventory({
            ingredientId: ingredientId,
            name: name,
            quantity: parseFloat(quantity),
            unit: unit,
            expirationDate: expiry || undefined
        });

        setName('');
        setQuantity('');
        setExpiry('');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">My Pantry</h1>
                    <p className="text-gray-500 mt-1">Manage your available ingredients.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Add Ingredient Form */}
                <div className="lg:col-span-4">
                    <Card className="p-6 sticky top-24">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                            <Plus className="w-5 h-5 mr-2 text-blue-600" />
                            Add New Ingredient
                        </h2>
                        <form onSubmit={handleAdd} className="space-y-4">
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ingredient Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    placeholder="Search ingredient (e.g. Tomato)..."
                                    required
                                    autoComplete="off"
                                />
                                {name.length > 1 && (
                                    <div className="absolute z-10 w-full bg-white border border-gray-100 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
                                        {scannedIngredients
                                            .filter(ing => ing.name.toLowerCase().includes(name.toLowerCase()))
                                            .slice(0, 5)
                                            .map(ing => (
                                                <div
                                                    key={ing.id || Math.random()}
                                                    className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm text-gray-700"
                                                    onClick={() => {
                                                        setName(ing.name);
                                                        // Optionally set other fields if available
                                                    }}
                                                >
                                                    {ing.name}
                                                </div>
                                            ))}
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                            className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                                            placeholder="0"
                                            required
                                        />
                                        <Scale className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                                    <select
                                        value={unit}
                                        onChange={(e) => setUnit(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                    >
                                        <option value="grams">grams</option>
                                        <option value="ml">mL</option>
                                        <option value="pieces">pieces</option>
                                        <option value="cups">cups</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={expiry}
                                        onChange={(e) => setExpiry(e.target.value)}
                                        className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                    <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                                </div>
                            </div>

                            <Button type="submit" className="w-full mt-2">
                                Add to My Inventory
                            </Button>
                        </form>
                    </Card>
                </div>

                {/* Right Column: Inventory List */}
                <div className="lg:col-span-8">
                    <Card className="p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                            <Package className="w-5 h-5 mr-2 text-green-600" />
                            Current Inventory
                        </h2>

                        {inventory.length === 0 ? (
                            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                <Package className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                                <p className="text-gray-500 font-medium">Your pantry is empty</p>
                                <p className="text-sm text-gray-400 mt-1">Add ingredients manually</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-gray-100 text-sm text-gray-500 bg-gray-50/50">
                                            <th className="py-3 px-4 font-medium">Name</th>
                                            <th className="py-3 px-4 font-medium">Quantity</th>
                                            <th className="py-3 px-4 font-medium">Expiration</th>
                                            <th className="py-3 px-4 font-medium text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {inventory.map((ing) => (
                                            <tr key={ing.id} className="group hover:bg-gray-50 transition-colors">
                                                <td className="py-3 px-4 font-medium text-gray-900">{ing.name || `Item ${ing.ingredientId}`}</td>
                                                <td className="py-3 px-4 text-gray-600">
                                                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-bold">
                                                        {ing.quantity} {ing.unit}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-gray-500 text-sm">
                                                    {ing.expirationDate || 'N/A'}
                                                </td>
                                                <td className="py-3 px-4 text-right">
                                                    <button
                                                        onClick={() => ing.id && removeFromInventory(ing.id)}
                                                        className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
};
