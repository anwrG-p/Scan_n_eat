
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
    return (
        <footer className="w-full py-6 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center gap-4">
                    {/* Languages Row */}
                    <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                        <button className="hover:text-gray-900 transition-colors">English</button>
                        <span className="text-gray-300">|</span>
                        <button className="hover:text-gray-900 transition-colors">Français</button>
                        <span className="text-gray-300">|</span>
                        <button className="hover:text-gray-900 transition-colors" dir="rtl" lang="ar">العربية</button>
                        <span className="text-gray-300">|</span>
                        <button className="hover:text-gray-900 transition-colors">Italiano</button>
                        <span className="text-gray-300">|</span>
                        <button className="hover:text-gray-900 transition-colors">Deutsch</button>
                    </div>

                    {/* Links Row */}
                    <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
                        <Link to="#" className="hover:text-gray-900 transition-colors">FAQ</Link>
                        <Link to="#" className="hover:text-gray-900 transition-colors">Help</Link>
                        <Link to="#" className="hover:text-gray-900 transition-colors">Terms and conditions</Link>
                        <Link to="#" className="hover:text-gray-900 transition-colors">About</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
