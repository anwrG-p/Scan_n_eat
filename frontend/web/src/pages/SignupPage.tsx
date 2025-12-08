import React from 'react';
import { SignupForm } from '../components/auth/SignupForm';

export const SignupPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h1 className="text-center text-3xl font-extrabold text-gray-900 mb-2">
                    Scan 'n Eat
                </h1>
                <p className="text-center text-sm text-gray-600 mb-6">
                    Join us and start cooking smarter
                </p>
            </div>
            <SignupForm />
        </div>
    );
};
