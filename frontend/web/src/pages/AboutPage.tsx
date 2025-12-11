import React from 'react';
import { Target, Users, Sparkles, Globe } from 'lucide-react';

export const AboutPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl font-bold mb-6">
                        About Scan'n Eat
                    </h1>
                    <p className="text-xl text-blue-100 leading-relaxed">
                        Revolutionizing home cooking by making it easier, smarter, and more enjoyable
                    </p>
                </div>
            </div>

            {/* Mission Section */}
            <div className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <div className="flex items-center mb-6">
                            <div className="bg-blue-100 rounded-lg p-3 mr-4">
                                <Target className="w-8 h-8 text-blue-600" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                        </div>
                        <p className="text-lg text-gray-600 leading-relaxed mb-4">
                            At Scan'n Eat, we believe cooking should be simple, enjoyable, and accessible to everyone. 
                            Our mission is to reduce food waste, save time, and inspire creativity in the kitchen by 
                            connecting people with recipes that match the ingredients they already have.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            We're building a smarter way to cook—one that helps you make the most of every ingredient, 
                            discover new flavors, and enjoy the process of creating delicious meals at home.
                        </p>
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                        What We Stand For
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <Sparkles className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
                            <p className="text-gray-600">
                                Leveraging cutting-edge OCR and AI technology to make cooking smarter and more intuitive.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <Globe className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Sustainability</h3>
                            <p className="text-gray-600">
                                Reducing food waste by helping you use what you have and plan meals more effectively.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Community</h3>
                            <p className="text-gray-600">
                                Building a community of home cooks who share recipes, tips, and culinary experiences.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Story Section */}
            <div className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                        Our Story
                    </h2>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <p className="text-lg text-gray-600 leading-relaxed mb-4">
                            Scan'n Eat started with a simple observation: people often have ingredients at home but 
                            struggle to figure out what to cook with them. Meanwhile, perfectly good food goes to waste 
                            because it sits unused in pantries and refrigerators.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed mb-4">
                            Founded in 2024, our team of food enthusiasts and technologists came together to solve this 
                            problem. By combining receipt scanning technology with a comprehensive recipe database, we 
                            created a platform that makes cooking more accessible and reduces food waste.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Today, thousands of home cooks use Scan'n Eat to discover new recipes, manage their pantries, 
                            and make cooking a more enjoyable part of their daily lives. We're just getting started, and 
                            we're excited to have you join us on this journey.
                        </p>
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        Get in Touch
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Have questions, feedback, or partnership inquiries? We'd love to hear from you.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                            Contact Us
                        </button>
                        <button className="bg-white text-gray-700 border border-gray-300 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                            Join Our Team
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
