import React from 'react';
import { Book, Camera, Heart, Search, ShoppingCart, User } from 'lucide-react';

export const HelpPage: React.FC = () => {
    const sections = [
        {
            icon: Camera,
            title: "Scanning Receipts",
            steps: [
                "Tap the 'Scan' button in the navigation menu",
                "Allow camera access when prompted",
                "Position your receipt within the frame",
                "Tap the capture button to take a photo",
                "Review the detected ingredients and quantities",
                "Confirm to add items to your pantry"
            ]
        },
        {
            icon: Search,
            title: "Finding Recipes",
            steps: [
                "Use the search bar on the home page to search by recipe name",
                "Browse the catalog page to see all available recipes",
                "Filter by cuisine, dietary preferences, or cooking time",
                "Click on any recipe card to view full details",
                "Check if you have the required ingredients",
                "Save recipes you like for later"
            ]
        },
        {
            icon: Heart,
            title: "Saving Favorites",
            steps: [
                "Open any recipe you'd like to save",
                "Click the heart icon in the top right corner",
                "The recipe will be added to your 'Saved Recipes' list",
                "Access saved recipes from the home page sidebar",
                "Click the heart again to unsave a recipe",
                "Saved recipes sync across all your devices"
            ]
        },
        {
            icon: Book,
            title: "Managing Your Pantry",
            steps: [
                "Navigate to 'My Ingredients' from the menu",
                "View all items currently in your pantry",
                "Click 'Add Ingredient' to manually add items",
                "Adjust quantities using the +/- buttons",
                "Remove items by clicking the trash icon",
                "Scan receipts to automatically update inventory"
            ]
        },
        {
            icon: ShoppingCart,
            title: "Creating Shopping Lists",
            steps: [
                "Select a recipe you want to cook",
                "Review the required ingredients list",
                "Tap 'Add Missing Items to Cart'",
                "Items you don't have will be added to your cart",
                "Review and adjust quantities as needed",
                "Use the list when shopping or order online"
            ]
        },
        {
            icon: User,
            title: "Account Settings",
            steps: [
                "Click on your profile icon in the top right",
                "Select 'Settings' from the dropdown menu",
                "Update your personal information",
                "Change dietary preferences and restrictions",
                "Manage notification preferences",
                "Update password or delete account if needed"
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        How to Use Scan'n Eat
                    </h1>
                    <p className="text-xl text-gray-600">
                        Step-by-step guides to help you make the most of our platform
                    </p>
                </div>

                {/* Help Sections Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {sections.map((section, index) => {
                        const Icon = section.icon;
                        return (
                            <div 
                                key={index}
                                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center mb-4">
                                    <div className="bg-blue-100 rounded-lg p-3 mr-4">
                                        <Icon className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">
                                        {section.title}
                                    </h2>
                                </div>
                                <ol className="space-y-3">
                                    {section.steps.map((step, stepIndex) => (
                                        <li key={stepIndex} className="flex items-start">
                                            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 flex-shrink-0 mt-0.5">
                                                {stepIndex + 1}
                                            </span>
                                            <span className="text-gray-600 leading-relaxed">
                                                {step}
                                            </span>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        );
                    })}
                </div>

                {/* Video Tutorials Section */}
                <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-center text-white">
                    <h2 className="text-2xl font-bold mb-3">
                        Video Tutorials
                    </h2>
                    <p className="text-blue-100 mb-6">
                        Prefer watching? Check out our video guides on YouTube for visual walkthroughs.
                    </p>
                    <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                        Watch Tutorials
                    </button>
                </div>
            </div>
        </div>
    );
};
