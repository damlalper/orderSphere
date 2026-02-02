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
exports.IntegrationsService = void 0;
const common_1 = require("@nestjs/common");
const orders_service_1 = require("../orders/orders.service");
const shopify_adapter_1 = require("./adapters/shopify.adapter");
const prisma_service_1 = require("../prisma/prisma.service");
let IntegrationsService = class IntegrationsService {
    ordersService;
    shopifyAdapter;
    prisma;
    constructor(ordersService, shopifyAdapter, prisma) {
        this.ordersService = ordersService;
        this.shopifyAdapter = shopifyAdapter;
        this.prisma = prisma;
    }
    async processWebhook(platform, payload) {
        let status = 'SUCCESS';
        let errorMessage = null;
        try {
            let orderDto;
            switch (platform.toLowerCase()) {
                case 'shopify':
                    orderDto = this.shopifyAdapter.transform(payload);
                    break;
                default:
                    throw new common_1.BadRequestException(`Platform ${platform} not supported`);
            }
            return await this.ordersService.create(orderDto);
        }
        catch (error) {
            status = 'FAILED';
            errorMessage = error.message;
            throw error;
        }
        finally {
            await this.prisma.webhookLog.create({
                data: {
                    platform,
                    payload: payload,
                    status,
                    errorMessage,
                },
            });
        }
    }
};
exports.IntegrationsService = IntegrationsService;
exports.IntegrationsService = IntegrationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [orders_service_1.OrdersService,
        shopify_adapter_1.ShopifyAdapter,
        prisma_service_1.PrismaService])
], IntegrationsService);
//# sourceMappingURL=integrations.service.js.map