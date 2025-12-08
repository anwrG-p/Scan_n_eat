import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useIngredientsStore } from '../store/ingredientsStore';
import { Plus, Trash2 } from 'lucide-react';

export const IngredientsPage: React.FC = () => {
    const { scannedIngredients, removeIngredient, clearIngredients } = useIngredientsStore();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">My Pantry</h1>
                <Button onClick={() => alert('Manual add coming soon')}>
                    <Plus className="w-4 h-4 mr-2" /> Add Ingredient
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {scannedIngredients.length === 0 ? (
                    <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
                        <p className="mb-4">No ingredients found. Scan an invoice to populate your pantry!</p>
                        <Button variant="secondary" onClick={() => window.location.href = '/scan'}>
                            Go to Scanner
                        </Button>
                    </div>
                ) : (
                    scannedIngredients.map((ing, index) => (
                        <Card key={index} className="p-4 flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-gray-900">{ing.name}</h3>
                                <p className="text-sm text-gray-500">{ing.quantity} {ing.unit}</p>
                            </div>
                            <button
                                onClick={() => removeIngredient(index)}
                                className="text-red-500 hover:text-red-700 p-2"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </Card>
                    ))
                )}
            </div>

            {scannedIngredients.length > 0 && (
                <div className="flex justify-end">
                    <Button variant="danger" onClick={clearIngredients}>
                        Clear All
                    </Button>
                </div>
            )}
        </div>
    );
};
