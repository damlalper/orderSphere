"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';

interface OrderItem {
    id: number;
    productName: string;
    quantity: number;
    price: number;
}

interface Order {
    id: number;
    customerName: string;
    shippingAddress: string;
    totalAmount: number;
    status: string;
    items: OrderItem[];
}

export default function OrderDetailPage() {
    const { id } = useParams();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchOrder();
        }
    }, [id]);

    const fetchOrder = async () => {
        try {
            const res = await api.get(`/orders/${id}`);
            setOrder(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (newStatus: string) => {
        if (!order) return;
        try {
            const res = await api.patch(`/orders/${order.id}/status`, { status: newStatus });
            setOrder({ ...order, status: res.data.status });
        } catch (error) {
            console.error('Failed to update status', error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!order) return <div>Order not found</div>;

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Order #{order.id}</h1>
                <div className="space-x-2">
                    {['CREATED', 'VALIDATED', 'IN_PRODUCTION', 'READY_FOR_SHIPMENT', 'SHIPPED', 'DELIVERED'].map((status) => (
                        <button
                            key={status}
                            onClick={() => updateStatus(status)}
                            disabled={order.status === status}
                            className={`px-3 py-1 text-xs rounded border ${order.status === status
                                    ? 'bg-blue-600 text-white border-blue-600'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                    <h3 className="text-lg font-medium mb-2">Customer Details</h3>
                    <p className="text-gray-600">{order.customerName}</p>
                    <p className="text-gray-600">{order.shippingAddress}</p>
                </div>
                <div>
                    <h3 className="text-lg font-medium mb-2">Order Summary</h3>
                    <p className="text-2xl font-bold">${order.totalAmount}</p>
                </div>
            </div>

            <h3 className="text-lg font-medium mb-4">Items</h3>
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {order.items.map((item) => (
                        <tr key={item.id}>
                            <td className="px-6 py-4 text-sm text-gray-900">{item.productName}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{item.quantity}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">${item.price}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">${(item.quantity * item.price).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
