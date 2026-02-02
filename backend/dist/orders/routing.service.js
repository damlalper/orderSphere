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
exports.RoutingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RoutingService = class RoutingService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async assignProducer(orderPayload) {
        const producers = await this.prisma.user.findMany({
            where: { role: 'PRODUCER' },
            include: {
                orders: {
                    where: { status: { in: ['IN_PRODUCTION', 'CREATED', 'VALIDATED'] } },
                },
            },
        });
        if (producers.length === 0) {
            console.warn('No producers found for routing');
            return null;
        }
        producers.sort((a, b) => (a.orders?.length || 0) - (b.orders?.length || 0));
        const selectedProducer = producers[0];
        console.log(`Routing order to producer: ${selectedProducer.email} (Active orders: ${selectedProducer.orders.length})`);
        return selectedProducer.id;
    }
};
exports.RoutingService = RoutingService;
exports.RoutingService = RoutingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RoutingService);
//# sourceMappingURL=routing.service.js.map