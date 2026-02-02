import { CreateOrderDto } from '../../orders/dto/create-order.dto';

export interface OrderAdapter {
    transform(payload: any): CreateOrderDto;
}
