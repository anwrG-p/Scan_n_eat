import React from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { Footer } from '../components/layout/Footer';
import { ChefHat } from 'lucide-react';

export const LoginPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-1 flex flex-col md:flex-row">
                {/* Left Side - Branding */}
                <div className="w-full md:w-1/2 bg-blue-50 flex flex-col justify-center items-center p-8 text-center order-first">
                    <div className="flex flex-col items-center justify-center space-y-6">
                        <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center animate-bounce-slow">
                            {/* Placeholder for Logo - Using Lucide Icon as fallback/representation */}
                            <ChefHat className="w-20 h-20 text-blue-600" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                            Scan 'n Eat
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 font-light">
                            Your personal kitchen assistant
                        </p>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
                    <div className="w-full max-w-md space-y-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-900">
                                Welcome Back
                            </h2>
                            <p className="mt-2 text-sm text-gray-600">
                                Please sign in to your account
                            </p>
                        </div>

                        <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
