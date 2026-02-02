"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const routing_service_1 = require("./routing.service");
const client_1 = require("@prisma/client");
let OrdersService = class OrdersService {
    prisma;
    routingService;
    constructor(prisma, routingService) {
        this.prisma = prisma;
        this.routingService = routingService;
    }
    allowedTransitions = {
        [client_1.OrderStatus.CREATED]: [client_1.OrderStatus.VALIDATED],
        [client_1.OrderStatus.VALIDATED]: [client_1.OrderStatus.IN_PRODUCTION],
        [client_1.OrderStatus.IN_PRODUCTION]: [client_1.OrderStatus.READY_FOR_SHIPMENT],
        [client_1.OrderStatus.READY_FOR_SHIPMENT]: [client_1.OrderStatus.SHIPPED],
        [client_1.OrderStatus.SHIPPED]: [client_1.OrderStatus.DELIVERED],
        [client_1.OrderStatus.DELIVERED]: [],
    };
    async create(createOrderDto) {
        const { items, ...orderData } = createOrderDto;
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
                producer: true,
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
    async findOne(id) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: {
                items: true,
                producer: true
            },
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        return order;
    }
    async updateStatus(id, updateOrderStatusDto) {
        const order = await this.findOne(id);
        const currentStatus = order.status;
        const newStatus = updateOrderStatusDto.status;
        const validTransitions = this.allowedTransitions[currentStatus];
        if (!validTransitions.includes(newStatus)) {
            throw new common_1.BadRequestException(`Invalid state transition from ${currentStatus} to ${newStatus}. Allowed: ${validTransitions.join(', ')}`);
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
        const map = new Map();
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
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        routing_service_1.RoutingService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map