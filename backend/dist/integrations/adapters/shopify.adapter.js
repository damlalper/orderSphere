"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopifyAdapter = void 0;
const common_1 = require("@nestjs/common");
let ShopifyAdapter = class ShopifyAdapter {
    transform(payload) {
        const items = payload.line_items || [];
        return {
            source: 'Shopify',
            externalId: payload.id?.toString(),
            customerName: (payload.customer?.first_name || '') + ' ' + (payload.customer?.last_name || ''),
            customerEmail: payload.customer?.email || 'no-email@example.com',
            shippingAddress: payload.shipping_address?.address1 || 'No Address',
            totalAmount: parseFloat(payload.total_price || '0'),
            items: items.map((item) => ({
                productName: item.name || 'Unknown Product',
                quantity: item.quantity || 1,
                price: parseFloat(item.price || '0'),
                sku: item.sku,
            })),
        };
    }
};
exports.ShopifyAdapter = ShopifyAdapter;
exports.ShopifyAdapter = ShopifyAdapter = __decorate([
    (0, common_1.Injectable)()
], ShopifyAdapter);
//# sourceMappingURL=shopify.adapter.js.map