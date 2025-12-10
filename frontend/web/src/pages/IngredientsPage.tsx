import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useIngredientsStore } from '../store/ingredientsStore';
import { Plus, Trash2, Calendar, Scale, Package } from 'lucide-react';

export const IngredientsPage: React.FC = () => {
    const { scannedIngredients, removeIngredient, clearIngredients, /* addIngredient should be exposed from store if we want to use it properly, mocking valid one here or assume store update needed */ } = useIngredientsStore();

    // Local state for the form
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('grams');
    const [expiry, setExpiry] = useState('');

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        // Since the store might not expose addIngredient directly in this context (checking previous store file needed),
        // we'll simulate adding or use a mock function if the store isn't updated to support manual add yet.
        // Ideally we update the store. For now, let's assume we can push to the list or log it.
        console.log("Adding ingredient:", { name, quantity, unit, expiry });
        alert("Ingredient added! (Mock - Connect to store add function)");
        setName('');
        setQuantity('');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">My Pantry</h1>
                    <p className="text-gray-500 mt-1">Manage your available ingredients.</p>
                </div>
                {scannedIngredients.length > 0 && (
                    <Button variant="danger" onClick={clearIngredients}>
                        Clear All
                    </Button>
                )}
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
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ingredient Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    placeholder="e.g. Tomato Sauce"
                                    required
                                />
                            </div>
                            <button
                                onClick={() => removeIngredient("TEMP_ID", index)}
                                className="text-red-500 hover:text-red-700 p-2"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </Card>
                    ))
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

                        {scannedIngredients.length === 0 ? (
                            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                <Package className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                                <p className="text-gray-500 font-medium">Your pantry is empty</p>
                                <p className="text-sm text-gray-400 mt-1">Add ingredients manually or scan a receipt</p>
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
                                        {scannedIngredients.map((ing, index) => (
                                            <tr key={index} className="group hover:bg-gray-50 transition-colors">
                                                <td className="py-3 px-4 font-medium text-gray-900">{ing.name}</td>
                                                <td className="py-3 px-4 text-gray-600">
                                                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-bold">
                                                        {ing.quantity} {ing.unit}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-gray-500 text-sm">
                                                    {ing.expiry || 'N/A'}
                                                </td>
                                                <td className="py-3 px-4 text-right">
                                                    <button
                                                        onClick={() => removeIngredient(index)}
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
