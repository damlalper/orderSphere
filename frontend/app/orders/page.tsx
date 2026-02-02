"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Search, Filter } from 'lucide-react';

interface Order {
    id: number;
    customerName: string;
    totalAmount: number;
    status: string;
    source: string;
    createdAt: string;
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await api.get('/orders');
            setOrders(res.data);
        } catch (error) {
            console.error('Failed to fetch orders', error);
        }
    };

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'DELIVERED': return 'success';
            case 'SHIPPED': return 'info';
            case 'IN_PRODUCTION': return 'warning';
            case 'VALIDATED': return 'secondary';
            default: return 'default';
        }
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toString().includes(searchTerm);
        const matchesStatus = statusFilter === 'ALL' || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Orders</h1>
                    <p className="text-muted-foreground">Manage and track your orders across all channels.</p>
                </div>
                <Button>
                    Export Orders
                </Button>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search orders..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select
                    className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="ALL">All Statuses</option>
                    <option value="CREATED">Created</option>
                    <option value="VALIDATED">Validated</option>
                    <option value="IN_PRODUCTION">In Production</option>
                    <option value="SHIPPED">Shipped</option>
                    <option value="DELIVERED">Delivered</option>
                </select>
            </div>

            <Card>
                <CardContent className="p-0">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm text-left">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">ID</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Customer</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Source</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Amount</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Status</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Date</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {filteredOrders.map((order) => (
                                    <tr key={order.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <td className="p-4 align-middle font-medium">#{order.id}</td>
                                        <td className="p-4 align-middle">{order.customerName}</td>
                                        <td className="p-4 align-middle text-muted-foreground">{order.source}</td>
                                        <td className="p-4 align-middle">${Number(order.totalAmount).toFixed(2)}</td>
                                        <td className="p-4 align-middle">
                                            <Badge variant={getStatusVariant(order.status) as any}>
                                                {order.status}
                                            </Badge>
                                        </td>
                                        <td className="p-4 align-middle text-muted-foreground">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 align-middle text-right">
                                            <Link href={`/orders/${order.id}`}>
                                                <Button variant="outline" size="sm">View</Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
