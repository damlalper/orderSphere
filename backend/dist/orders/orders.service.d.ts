import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/create-order.dto';
import { RoutingService } from './routing.service';
export declare class OrdersService {
    private prisma;
    private routingService;
    constructor(prisma: PrismaService, routingService: RoutingService);
    private readonly allowedTransitions;
    create(createOrderDto: CreateOrderDto): Promise<{
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
    findAll(): Promise<({
        producer: {
            name: string | null;
            email: string;
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
    })[]>;
    findOne(id: number): Promise<{
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
    updateStatus(id: number, updateOrderStatusDto: UpdateOrderStatusDto): Promise<{
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
    getStats(): Promise<{
        totalOrders: number;
        pending: number;
        revenue: number | import("@prisma/client/runtime/library").Decimal;
        avgProductionTime: string;
    }>;
    getChartData(): Promise<{
        name: string;
        total: number;
    }[]>;
}
