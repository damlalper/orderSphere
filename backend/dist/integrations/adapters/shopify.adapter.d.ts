import { OrderAdapter } from '../interfaces/order-adapter.interface';
import { CreateOrderDto } from '../../orders/dto/create-order.dto';
export declare class ShopifyAdapter implements OrderAdapter {
    transform(payload: any): CreateOrderDto;
}
