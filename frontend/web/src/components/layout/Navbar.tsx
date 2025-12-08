import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut, ChefHat } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';

export const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();
    const { items } = useCartStore();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <ChefHat className="h-8 w-8 text-blue-600" />
                            <span className="ml-2 text-xl font-bold text-gray-900">Scan 'n Eat</span>
                        </Link>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link to="/" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                Home
                            </Link>
                            <Link to="/catalog" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                Catalog
                            </Link>
                            <Link to="/scan" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                Scan Invoice
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link to="/cart" className="relative p-2 text-gray-400 hover:text-gray-500">
                            <ShoppingCart className="h-6 w-6" />
                            {items.length > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                                    {items.length}
                                </span>
                            )}
                        </Link>

                        <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-700 hidden md:block">{user?.name}</span>
                            <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-gray-500">
                                <LogOut className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};
