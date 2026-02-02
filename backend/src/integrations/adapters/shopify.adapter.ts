import { Injectable } from '@nestjs/common';
import { OrderAdapter } from '../interfaces/order-adapter.interface';
import { CreateOrderDto } from '../../orders/dto/create-order.dto';

@Injectable()
export class ShopifyAdapter implements OrderAdapter {
    transform(payload: any): CreateOrderDto {
        const items = payload.line_items || [];
        return {
            source: 'Shopify',
            externalId: payload.id?.toString(),
            customerName: (payload.customer?.first_name || '') + ' ' + (payload.customer?.last_name || ''),
            customerEmail: payload.customer?.email || 'no-email@example.com',
            shippingAddress: payload.shipping_address?.address1 || 'No Address',
            totalAmount: parseFloat(payload.total_price || '0'),
            items: items.map((item: any) => ({
                productName: item.name || 'Unknown Product',
                quantity: item.quantity || 1,
                price: parseFloat(item.price || '0'),
                sku: item.sku,
            })),
        };
    }
}
