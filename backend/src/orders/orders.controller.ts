import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/create-order.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.ordersService.create(createOrderDto);
    }

    @Get('stats')
    @UseGuards(AuthGuard('jwt'))
    getStats() {
        return this.ordersService.getStats();
    }

    @Get('chart')
    @UseGuards(AuthGuard('jwt'))
    getChartData() {
        return this.ordersService.getChartData();
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    findAll() {
        return this.ordersService.findAll();
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    findOne(@Param('id') id: string) {
        return this.ordersService.findOne(+id);
    }

    @Patch(':id/status')
    @UseGuards(AuthGuard('jwt'))
    updateStatus(@Param('id') id: string, @Body() updateOrderStatusDto: UpdateOrderStatusDto) {
        return this.ordersService.updateStatus(+id, updateOrderStatusDto);
    }
}
