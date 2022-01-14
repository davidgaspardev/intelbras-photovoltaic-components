export interface Repository<T> {
    add(data: T): Promise<T>;
    getAll(): Promise<T[]>;
    get(where: { [key:string]: any }): Promise<T | null>;
    update(id: number, data: T): Promise<T>;
    delete(id: number): Promise<T>;
}