import { Module } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import { IntegrationsController } from './integrations.controller';
import { OrdersModule } from '../orders/orders.module';
import { ShopifyAdapter } from './adapters/shopify.adapter';

@Module({
  imports: [OrdersModule],
  controllers: [IntegrationsController],
  providers: [IntegrationsService, ShopifyAdapter],
})
export class IntegrationsModule { }
