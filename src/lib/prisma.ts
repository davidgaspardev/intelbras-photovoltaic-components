import { PrismaClient } from "@prisma/client";

// For development
declare global {
    var prisma: PrismaClient | undefined
}

export default abstract class Prisma {
    private static client?: PrismaClient;

    protected getConnect(): PrismaClient {
        if(process.env.NODE_ENV === 'production') {
            if(Prisma.client == null) {
                Prisma.client = new PrismaClient();
            }
            return Prisma.client;
        } else {
            if(global.prisma == null) {
                global.prisma = new PrismaClient();
            }
            return global.prisma;
        }
    }
}