import React, { useEffect, useState } from 'react';
import { Card } from '../components/ui/Card';
import { apiClient } from '../api/client';
import { useAuthStore } from '../store/authStore';

export const OrderHistoryPage: React.FC = () => {
    const { user } = useAuthStore();
    const [orders, setOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) return;
            try {
                // Assuming the backend endpoint accepts userId as a query param or extracts it from token
                // Our implementation takes userId as query param for now
                const response = await apiClient.get(`/orders?userId=${user.id || user.userId}`);
                setOrders(response.data);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    if (isLoading) return <div className="text-center py-8">Loading orders...</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold mb-6">Order History</h1>
            {orders.length === 0 ? (
                <Card className="p-8 text-center text-gray-500">
                    You haven't placed any orders yet.
                </Card>
            ) : (
                <div className="space-y-4">
                    {orders.map((order: any) => (
                        <Card key={order.id} className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-sm text-gray-500">Order ID: {order.id}</p>
                                    <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                                </div>
                                <div className="text-right">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                        order.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {order.status}
                                    </span>
                                    <p className="font-bold text-lg mt-1">${order.totalAmount.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="border-t pt-4">
                                <h4 className="text-sm font-medium mb-2">Items:</h4>
                                <ul className="space-y-2">
                                    {order.items.map((item: any, idx: number) => (
                                        <li key={idx} className="flex justify-between text-sm">
                                            <span>{item.quantity}x {item.name}</span>
                                            <span>${(item.pricePerUnit * item.quantity).toFixed(2)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};
