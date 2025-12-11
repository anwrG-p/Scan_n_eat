import React from 'react';
import { ChevronRight } from 'lucide-react';

export const FAQPage: React.FC = () => {
    const faqs = [
        {
            question: "What is Scan'n Eat?",
            answer: "Scan'n Eat is a smart cooking assistant that helps you discover recipes based on the ingredients you have. Simply scan your grocery receipts or manually add ingredients to your pantry, and we'll suggest delicious recipes you can make."
        },
        {
            question: "How do I save recipes?",
            answer: "When viewing any recipe, click the 'Save' button (heart icon) to add it to your saved recipes. You can access all your saved recipes from your profile or the home page sidebar when logged in."
        },
        {
            question: "How does the ingredient scanning work?",
            answer: "Our OCR (Optical Character Recognition) technology scans your grocery receipts and automatically extracts ingredient information. Just take a photo of your receipt, and we'll add the items to your pantry inventory."
        },
        {
            question: "Are the recipes free?",
            answer: "Browsing recipes and using the basic features of Scan'n Eat is completely free. We also offer premium features with advanced meal planning and nutritional tracking."
        },
        {
            question: "How are recipe prices calculated?",
            answer: "Recipe prices are estimated based on average ingredient costs from our database. These are approximate values to help you budget your meals. Actual prices may vary based on your location and where you shop."
        },
        {
            question: "Can I filter recipes by dietary restrictions?",
            answer: "Yes! Use the filters in the catalog page to search for vegetarian, vegan, gluten-free, and other dietary preferences. You can also filter by cuisine type, cooking time, and difficulty level."
        },
        {
            question: "How do I update my pantry inventory?",
            answer: "Go to the 'My Ingredients' page to manually add, remove, or update quantities of ingredients in your pantry. You can also scan receipts to automatically update your inventory."
        },
        {
            question: "What if a recipe is missing nutritional information?",
            answer: "We're continuously improving our recipe database. If you notice missing information, please report it through the feedback form, and we'll update it as soon as possible."
        },
        {
            question: "Can I share recipes with friends?",
            answer: "Yes! Each recipe has a share button that generates a link you can send to anyone. They don't need an account to view shared recipes."
        },
        {
            question: "How do I delete my account?",
            answer: "You can delete your account from the Settings page. Please note that this action is permanent and will remove all your saved recipes and pantry data."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-xl text-gray-600">
                        Find answers to common questions about Scan'n Eat
                    </p>
                </div>

                {/* FAQ List */}
                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <div 
                            key={index}
                            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-start">
                                <ChevronRight className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {faq.question}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact Section */}
                <div className="mt-12 text-center bg-blue-50 rounded-lg p-8 border border-blue-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        Still have questions?
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Can't find what you're looking for? Our support team is here to help.
                    </p>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                        Contact Support
                    </button>
                </div>
            </div>
        </div>
    );
};
