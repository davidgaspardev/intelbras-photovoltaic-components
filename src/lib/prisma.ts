import { PrismaClient } from "@prisma/client";

export default abstract class Prisma {
    private static client?: PrismaClient;

    protected getConnect(): PrismaClient {
        if(Prisma.client == null) {
            Prisma.client = new PrismaClient();
        }
        return Prisma.client;
    }
}