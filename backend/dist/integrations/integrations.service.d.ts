import { OrdersService } from '../orders/orders.service';
import { ShopifyAdapter } from './adapters/shopify.adapter';
import { PrismaService } from '../prisma/prisma.service';
export declare class IntegrationsService {
    private ordersService;
    private shopifyAdapter;
    private prisma;
    constructor(ordersService: OrdersService, shopifyAdapter: ShopifyAdapter, prisma: PrismaService);
    processWebhook(platform: string, payload: any): Promise<{
        producer: {
            id: number;
            email: string;
            password: string;
            name: string | null;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
        } | null;
        items: {
            id: number;
            orderId: number;
            productName: string;
            sku: string | null;
            quantity: number;
            price: import("@prisma/client/runtime/library").Decimal;
        }[];
    } & {
        id: number;
        externalId: string | null;
        source: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        customerName: string;
        customerEmail: string;
        shippingAddress: string;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        producerId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
