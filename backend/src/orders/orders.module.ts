import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { RoutingService } from './routing.service';


@Module({
  controllers: [OrdersController],
  providers: [OrdersService, RoutingService],
  exports: [OrdersService],
})
export class OrdersModule { }
