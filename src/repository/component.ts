import { Component } from "@prisma/client";
import { Repository } from "../helpers/interfaces";
import Prisma from "../lib/prisma";

/**
 * Component Repository
 * 
 * This class is responsible through the prism to communicate with the database, enabling 
 * the operation of a complete crud.
 * 
 * @extends {Prisma}
 * @implements {Repository<Component>}
 */
export default class ComponentRepository extends Prisma implements Repository<Component> {

    async add(data: Component) {
        const componentCreated = await super.getConnect().component.create({
            data
        });

        return componentCreated;
    }
    
    async getAll() {
        const components = await super.getConnect().component.findMany();

        return components;
    }

    async get(where: { [key: string]: any; }) {
        const component = await super.getConnect().component.findFirst({
            where
        });

        return component;
    }

    async update(id: number, data: Component) {
        const componentUpdated = await super.getConnect().component.update({
            where: {
                id
            },
            data
        });

        return componentUpdated;
    }

    async delete(id: number): Promise<Component> {
        const componentDeleted = await super.getConnect().component.delete({
            where: {
                id
            }
        });

        return componentDeleted;
    }
}