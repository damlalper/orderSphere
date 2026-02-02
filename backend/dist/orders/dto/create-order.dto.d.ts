import { OrderStatus } from '@prisma/client';
declare class OrderItemDto {
    productName: string;
    sku?: string;
    quantity: number;
    price: number;
}
export declare class CreateOrderDto {
    source: string;
    externalId?: string;
    customerName: string;
    customerEmail: string;
    shippingAddress: string;
    totalAmount: number;
    items: OrderItemDto[];
}
export declare class UpdateOrderStatusDto {
    status: OrderStatus;
}
export {};
