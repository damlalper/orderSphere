import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoutingService {
    constructor(private prisma: PrismaService) { }

    async assignProducer(orderPayload: any): Promise<number | null> {
        // 1. Find all producers
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

        // 2. Simple Load Balancing: Choose producer with fewest active orders
        // In a real scenario, this would check capacity, product type, etc.
        producers.sort((a: any, b: any) => (a.orders?.length || 0) - (b.orders?.length || 0));

        const selectedProducer = producers[0];
        console.log(`Routing order to producer: ${selectedProducer.email} (Active orders: ${selectedProducer.orders.length})`);

        return selectedProducer.id;
    }
}
