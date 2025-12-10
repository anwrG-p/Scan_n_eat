import React from 'react';
import { SignupForm } from '../components/auth/SignupForm';

export const SignupPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-10">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                    Scan 'n Eat
                </h1>
                <p className="text-lg text-gray-600">
                    Join us and start cooking smarter
                </p>
            </div>

            {/* Central Card */}
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-gray-100">
                    <div className="mb-6 text-center">
                        <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
                    </div>
                    <SignupForm />
                </div>
            </div>
        </div>
    );
};
