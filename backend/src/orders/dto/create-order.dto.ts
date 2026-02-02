import { IsString, IsNotEmpty, IsEmail, IsNumber, IsOptional, ValidateNested, IsArray, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderStatus } from '@prisma/client';

class OrderItemDto {
    @IsString()
    @IsNotEmpty()
    productName: string;

    @IsString()
    @IsOptional()
    sku?: string;

    @IsNumber()
    quantity: number;

    @IsNumber()
    price: number;
}

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    source: string;

    @IsString()
    @IsOptional()
    externalId?: string;

    @IsString()
    @IsNotEmpty()
    customerName: string;

    @IsEmail()
    customerEmail: string;

    @IsString()
    @IsNotEmpty()
    shippingAddress: string;

    @IsNumber()
    totalAmount: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items: OrderItemDto[];
}

export class UpdateOrderStatusDto {
    @IsEnum(OrderStatus)
    status: OrderStatus;
}
