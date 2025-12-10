import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export const SignupForm: React.FC = () => {
    const navigate = useNavigate();
    const { signup, isLoading, error } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            // Ideally handle validation error here
            alert("Passwords don't match");
            return;
        }
        const success = await signup(formData.name, formData.email, formData.password);
        if (success) {
            navigate('/login');
        }
    };

    return (
        <div className="w-full space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Full Name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
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
                <Input
                    label="Confirm Password"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
                {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                <Button type="submit" className="w-full" isLoading={isLoading}>
                    Create Account
                </Button>
            </form>
            <div className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <span
                    onClick={() => navigate('/login')}
                    className="text-blue-600 font-medium cursor-pointer hover:underline"
                >
                    Sign in
                </span>
            </div>
        </div>
    );
};
