import { User } from "@prisma/client";
import { Repository } from "../helpers/interfaces";
import Prisma from "../lib/prisma";

/**
 * User Repository
 * 
 * This class is responsible through the prism to communicate with the database, enabling 
 * the operation of a complete crud.
 * 
 * @extends {Prisma}
 * @implements {Repository<User>}
 */
export default class UserRepository extends Prisma implements Repository<User> {

    async add(data: User) {
        const userCreated = await super.getConnect().user.create({
            data
        });

        return userCreated;
    }

    async getAll() {
        const users = await super.getConnect().user.findMany();

        return users;
    }

    async get(where: { [key: string]: any; }) {
        const user = await super.getConnect().user.findFirst({
            where
        });

        return user;
    }

    async update(id: number, data: User) {
        const userUpdated = await super.getConnect().user.update({
            where: {
                id
            },
            data
        });

        return userUpdated;
    }

    async delete(id: number): Promise<User> {
        const userDeleted = await super.getConnect().user.delete({
            where: {
                id
            }
        });

        return userDeleted;
    }
}