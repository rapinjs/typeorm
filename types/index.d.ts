import {
  Repository,
  MongoRepository,
  EntityManager,
  MongoEntityManager,
  DeleteResult
} from 'typeorm'

export declare interface DB {
  queryBuilder(table: string): import("typeorm").SelectQueryBuilder<{}>;
  queryMany(query: any): Promise<Object>;
  queryCount(query: any): Promise<Object>;
  repository(table: string): Repository<any> | MongoRepository<any>;
  manager(): EntityManager | MongoEntityManager
  findOne(table: string, conditions?: any, options?: any): Promise<any>;
  find(table: string, options?: any): Promise<any[]>;
  create(table: string): any;
  save(table: string, entity: any): Promise<any>;
  delete(table: string, options: any): Promise<DeleteResult>;
}

declare module "rapin" {
  interface Context {
    db: DB
  }
}

