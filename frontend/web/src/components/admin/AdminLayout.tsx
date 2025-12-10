import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export const AdminLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 pl-64">
            <Sidebar />
            <main className="p-8">
                <Outlet />
            </main>
        </div>
    );
};
