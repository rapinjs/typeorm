import {
  Repository,
  MongoRepository,
  EntityManager,
  MongoEntityManager,
  DeleteResult,
  EntitySchema,
} from 'typeorm'

export declare interface DB {
  queryBuilder(table: string): import('typeorm').SelectQueryBuilder<{}>
  queryMany(query: any): Promise<Object>
  queryCount(query: any): Promise<Object>
  repository<T>(target: string | Function | (new () => T) | EntitySchema<T>): Repository<T>
  mongoRepository<T>(target: string | Function | (new () => T) | EntitySchema<T>): MongoRepository<T>
  manager(): EntityManager | MongoEntityManager
  findOne(table: string, conditions?: any, options?: any): Promise<any>
  find(table: string, options?: any): Promise<any[]>
  create(table: string): any
  save(table: string, entity: any): Promise<any>
  delete(table: string, options: any): Promise<DeleteResult>
}

declare module 'rapin' {
  interface Context {
    db: DB
  }
}
