import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { ScanLine, BookOpen, UtensilsCrossed, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const HomePage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 sm:p-12 text-white">
                <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                    Cook Smarter, Not Harder
                </h1>
                <p className="text-blue-100 text-lg mb-8 max-w-2xl">
                    Scan your grocery invoice to instantly update your inventory and discover recipes you can make right now.
                </p>
                <div className="flex flex-wrap gap-4">
                    <Button
                        onClick={() => navigate('/scan')}
                        className="bg-white text-blue-600 hover:bg-blue-50 active:bg-blue-100 font-bold"
                    >
                        <ScanLine className="w-5 h-5 mr-2" />
                        Scan Invoice
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => navigate('/catalog')}
                        className="bg-blue-800 text-white hover:bg-blue-900 border border-blue-500"
                    >
                        Browse Catalog
                    </Button>
                </div>
            </section>

            {/* Quick Actions Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 hover:shadow-lg transition-all" onClick={() => navigate('/catalog')}>
                    <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                        <BookOpen className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Recipe Catalog</h3>
                    <p className="text-gray-500 mb-4">
                        Browse hundreds of delicious recipes or filter by ingredients you have.
                    </p>
                    <div className="text-blue-600 font-medium flex items-center">
                        View Catalog <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-all" onClick={() => navigate('/scan')}>
                    <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 text-purple-600">
                        <ScanLine className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Invoice Scanner</h3>
                    <p className="text-gray-500 mb-4">
                        Upload a photo of your receipt to auto-add ingredients to your pantry.
                    </p>
                    <div className="text-purple-600 font-medium flex items-center">
                        Start Scanning <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-all" onClick={() => navigate('/ingredients')}>
                    <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 text-green-600">
                        <UtensilsCrossed className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">My Ingredients</h3>
                    <p className="text-gray-500 mb-4">
                        Manage your digital pantry to see exactly what you can cook today.
                    </p>
                    <div className="text-green-600 font-medium flex items-center">
                        Manage Pantry <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                </Card>
            </section>

            {/* Featured / Recommended (Placeholder) */}
            <section>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Trending Dishes</h2>
                    <Button variant="secondary" onClick={() => navigate('/catalog')}>See All</Button>
                </div>
                <div className="bg-gray-100 rounded-xl p-8 text-center text-gray-500">
                    Recommended dishes will appear here based on your preferences.
                </div>
            </section>
        </div>
    );
};
