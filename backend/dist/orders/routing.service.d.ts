import { PrismaService } from '../prisma/prisma.service';
export declare class RoutingService {
    private prisma;
    constructor(prisma: PrismaService);
    assignProducer(orderPayload: any): Promise<number | null>;
}
