import React, { useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Users, BookOpen, ShoppingBag, Activity } from 'lucide-react';
import { useAdminStore } from '../../store/adminStore';
import { useLocation, useNavigate } from 'react-router-dom';

export const AdminDashboardPage: React.FC = () => {
    const { stats, logs, fetchStats, fetchLogs, isLoading } = useAdminStore();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        fetchStats();
        fetchLogs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    const statsArray = [
        {
            label: 'Total Users',
            value: stats?.totalUsers?.toString() || '0',
            icon: Users,
            color: 'text-blue-600',
            bg: 'bg-blue-100'
        },
        {
            label: 'Total Recipes',
            value: stats?.totalRecipes?.toString() || '0',
            icon: BookOpen,
            color: 'text-green-600',
            bg: 'bg-green-100'
        },
        {
            label: 'Orders Today',
            value: stats?.ordersToday?.toString() || '0',
            icon: ShoppingBag,
            color: 'text-purple-600',
            bg: 'bg-purple-100'
        },
        {
            label: 'System Status',
            value: stats?.systemStatus || 'Unknown',
            icon: Activity,
            color: 'text-emerald-600',
            bg: 'bg-emerald-100'
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500">Welcome back, Administrator.</p>
            </div>

            {/* Stats Grid */}
            {isLoading ? (
                <div className="text-center py-8">
                    <p className="text-gray-500">Loading statistics...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statsArray.map((stat, index) => (
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
            )}

            {/* Recent Activity / Management Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 h-8 flex items-center">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => navigate('/admin/users')}
                            className="p-4 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors text-center"
                        >
                            Add New User
                        </button>
                        <button
                            onClick={() => navigate('/admin/catalog')}
                            className="p-4 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-green-500 hover:text-green-600 transition-colors text-center"
                        >
                            Add New Recipe
                        </button>
                        <button
                            onClick={async () => {
                                try {
                                    await useAdminStore.getState().populateRecipes();
                                    alert('Database populated successfully!');
                                } catch (e) {
                                    alert('Failed to populate database.');
                                }
                            }}
                            className="p-4 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-purple-500 hover:text-purple-600 transition-colors text-center"
                        >
                            Populate Database (Seed)
                        </button>
                    </div>
                </Card>

                <Card className="p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 h-8 flex items-center">Recent System Logs</h2>
                    {logs && logs.length > 0 ? (
                        <ul className="space-y-3 text-sm text-gray-600">
                            {logs.slice(0, 3).map((log: any, idx: number) => (
                                <li key={idx} className="flex justify-between">
                                    <span>{log.message}</span>
                                    <span className="text-gray-400">{new Date(log.timestamp).toLocaleTimeString()}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-500">No recent logs available</p>
                    )}
                </Card>
            </div>
        </div>
    );
};
