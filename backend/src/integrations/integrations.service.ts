import { Injectable, BadRequestException } from '@nestjs/common';
import { OrdersService } from '../orders/orders.service';
import { ShopifyAdapter } from './adapters/shopify.adapter';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class IntegrationsService {
    constructor(
        private ordersService: OrdersService,
        private shopifyAdapter: ShopifyAdapter,
        private prisma: PrismaService,
    ) { }

    async processWebhook(platform: string, payload: any) {
        let status = 'SUCCESS';
        let errorMessage = null;

        try {
            let orderDto;
            switch (platform.toLowerCase()) {
                case 'shopify':
                    orderDto = this.shopifyAdapter.transform(payload);
                    break;
                default:
                    throw new BadRequestException(`Platform ${platform} not supported`);
            }

            return await this.ordersService.create(orderDto);
        } catch (error: any) {
            status = 'FAILED';
            errorMessage = error.message;
            throw error;
        } finally {
            // 4. Webhook Logging requirement
            await this.prisma.webhookLog.create({
                data: {
                    platform,
                    payload: payload, // Json type in Prisma
                    status,
                    errorMessage,
                },
            });
        }
    }
}
