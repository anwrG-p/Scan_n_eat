import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

export const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const { login, isLoading, error } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await login(formData.email, formData.password);
        if (success) {
            navigate('/');
        }
    };

    return (
        <Card className="w-full max-w-md p-8 mx-auto mt-10">
            <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Email Address"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <Input
                    label="Password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                <Button type="submit" className="w-full" isLoading={isLoading}>
                    Sign In
                </Button>
            </form>
            <div className="mt-4 text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <span
                    onClick={() => navigate('/signup')}
                    className="text-blue-600 font-medium cursor-pointer hover:underline"
                >
                    Sign up
                </span>
            </div>
        </Card>
    );
};
