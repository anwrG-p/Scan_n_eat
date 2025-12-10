import React from 'react';
import { Card } from '../../components/ui/Card';
import { Users, BookOpen, ShoppingBag, Activity } from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
    // Mock Stats
    const stats = [
        { label: 'Total Users', value: '1,234', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
        { label: 'Total Recipes', value: '456', icon: BookOpen, color: 'text-green-600', bg: 'bg-green-100' },
        { label: 'Orders Today', value: '89', icon: ShoppingBag, color: 'text-purple-600', bg: 'bg-purple-100' },
        { label: 'System Status', value: 'Healthy', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500">Welcome back, Administrator.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <Card key={index} className="p-6 border-none shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                            <div className={`p-3 rounded-full ${stat.bg}`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Recent Activity / Managment Sections Placeholders */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 h-8 flex items-center">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="p-4 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors text-center">
                            Add New User
                        </button>
                        <button className="p-4 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-green-500 hover:text-green-600 transition-colors text-center">
                            Add New Recipe
                        </button>
                    </div>
                </Card>

                <Card className="p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 h-8 flex items-center">Recent System Logs</h2>
                    <ul className="space-y-3 text-sm text-gray-600">
                        <li className="flex justify-between">
                            <span>User 'johndoe' logged in</span>
                            <span className="text-gray-400">2 mins ago</span>
                        </li>
                        <li className="flex justify-between">
                            <span>New recipe 'Vegan Burger' added</span>
                            <span className="text-gray-400">1 hour ago</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Backup completed safely</span>
                            <span className="text-gray-400">5 hours ago</span>
                        </li>
                    </ul>
                </Card>
            </div>
        </div>
    );
};
