import "reflect-metadata";
import { Repository, MongoRepository } from "typeorm";
export declare class DB {
    private connection;
    private type;
    constructor();
    init(config: any): Promise<void>;
    queryBuilder(table: string): import("typeorm").SelectQueryBuilder<{}>;
    queryMany(query: any): Promise<Object>;
    queryCount(query: any): Promise<Object>;
    repository(table: string): Repository<any> | MongoRepository<any>;
    findOne(table: string, conditions?: any, options?: any): Promise<any>;
    find(table: string, options?: any): Promise<any[]>;
    create(table: string): any;
    save(table: string, entity: any): Promise<any>;
    delete(table: string, options: any): Promise<import("typeorm").DeleteResult>;
}
