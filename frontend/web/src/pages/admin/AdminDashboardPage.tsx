import React from 'react';
import { Card } from '../../components/ui/Card';
import { Users, Utensils, DollarSign, TrendingUp } from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
    const stats = [
        { label: 'Total Users', value: '1,234', icon: Users, color: 'bg-blue-500' },
        { label: 'Total Dishes', value: '56', icon: Utensils, color: 'bg-green-500' },
        { label: 'Revenue', value: '$12k', icon: DollarSign, color: 'bg-purple-500' },
        { label: 'Growth', value: '+15%', icon: TrendingUp, color: 'bg-orange-500' },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={index} className="p-6 flex items-center">
                            <div className={`p-4 rounded-full ${stat.color} text-white mr-4`}>
                                <Icon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 uppercase font-semibold">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                        </Card>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                    <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
                    <div className="text-gray-500 text-center py-8">
                        Chart placeholder
                    </div>
                </Card>
                <Card className="p-6">
                    <h2 className="text-xl font-bold mb-4">Popular Dishes</h2>
                    <ul className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <li key={i} className="flex justify-between items-center border-b pb-2 last:border-0">
                                <span className="font-medium">Dish Name {i}</span>
                                <span className="text-green-600 font-bold">124 orders</span>
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>
        </div>
    );
};
