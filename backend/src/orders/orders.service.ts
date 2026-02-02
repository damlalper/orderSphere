import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/create-order.dto';
import { RoutingService } from './routing.service';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrdersService {
    constructor(
        private prisma: PrismaService,
        private routingService: RoutingService,
    ) { }

    // State Transition Machine
    private readonly allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
        [OrderStatus.CREATED]: [OrderStatus.VALIDATED],
        [OrderStatus.VALIDATED]: [OrderStatus.IN_PRODUCTION],
        [OrderStatus.IN_PRODUCTION]: [OrderStatus.READY_FOR_SHIPMENT],
        [OrderStatus.READY_FOR_SHIPMENT]: [OrderStatus.SHIPPED],
        [OrderStatus.SHIPPED]: [OrderStatus.DELIVERED],
        [OrderStatus.DELIVERED]: [],
    };

    async create(createOrderDto: CreateOrderDto) {
        const { items, ...orderData } = createOrderDto;

        // Smart Routing: Assign Producer
        const producerId = await this.routingService.assignProducer(createOrderDto);

        return this.prisma.order.create({
            data: {
                ...orderData,
                producerId: producerId,
                items: {
                    create: items,
                },
            },
            include: {
                items: true,
                producer: true, // Return assigned producer
            },
        });
    }

    async findAll() {
        return this.prisma.order.findMany({
            include: {
                items: true,
                producer: { select: { name: true, email: true } }
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async findOne(id: number) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: {
                items: true,
                producer: true
            },
        });
        if (!order) {
            throw new NotFoundException(`Order with ID ${id} not found`);
        }
        return order;
    }

    async updateStatus(id: number, updateOrderStatusDto: UpdateOrderStatusDto) {
        const order = await this.findOne(id);
        const currentStatus = order.status;
        const newStatus = updateOrderStatusDto.status;

        // Validate Transition
        const validTransitions = this.allowedTransitions[currentStatus];
        if (!validTransitions.includes(newStatus)) {
            throw new BadRequestException(
                `Invalid state transition from ${currentStatus} to ${newStatus}. Allowed: ${validTransitions.join(', ')}`
            );
        }

        return this.prisma.order.update({
            where: { id },
            data: {
                status: newStatus,
            },
        });
    }

    async getStats() {
        const totalOrders = await this.prisma.order.count();

        const pendingOrders = await this.prisma.order.count({
            where: { status: { in: ['CREATED', 'VALIDATED', 'IN_PRODUCTION'] } }
        });

        const salesAgg = await this.prisma.order.aggregate({
            _sum: { totalAmount: true }
        });

        const revenue = salesAgg._sum.totalAmount || 0;

        // Mock "Average Production Time" (Real implementation would use timestamps log)
        const avgProductionTime = "14h";

        return {
            totalOrders,
            pending: pendingOrders,
            revenue,
            avgProductionTime
        };
    }

    async getChartData() {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const orders = await this.prisma.order.findMany({
            where: {
                createdAt: {
                    gte: sevenDaysAgo,
                },
            },
            select: {
                createdAt: true,
                totalAmount: true,
            },
        });

        const map = new Map<string, number>();

        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const key = d.toLocaleDateString('en-US', { weekday: 'short' });
            map.set(key, 0);
        }

        orders.forEach(order => {
            const key = order.createdAt.toLocaleDateString('en-US', { weekday: 'short' });
            if (map.has(key)) {
                map.set(key, (map.get(key) || 0) + Number(order.totalAmount));
            }
        });

        return Array.from(map, ([name, total]) => ({ name, total }));
    }
}
