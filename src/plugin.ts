import { isUndefined } from 'lodash'
import 'reflect-metadata'
import {
  createConnection,
  Connection,
  Repository,
  MongoRepository,
  getMongoManager,
  getManager,
  EntityManager,
  MongoEntityManager,
  EntitySchema,
} from 'typeorm'

export class DB {
  private connection: Connection

  private type: string

  constructor() {}
  public async init(config: any) {
    const dbConfig = !isUndefined(config.db) ? config.db : {}
    this.type = dbConfig.type
    this.connection = await createConnection({
      synchronize: false,
      logging: false,
      entities: ['entities/**/*.ts'],
      ...dbConfig,
    })

    if (this.connection instanceof Error) {
      throw new Error(this.connection.message)
    }
  }

  public queryBuilder(table: string) {
    return this.connection.getRepository(table).createQueryBuilder(table)
  }

  public async queryMany(query: any): Promise<Object> {
    const result = await query.getMany()
    return !isUndefined(result) ? result : {}
  }
  public async queryCount(query: any): Promise<Object> {
    const result = await query.getCount()
    return !isUndefined(result) ? result : 0
  }

  public repository<T>(target: string | Function | (new () => T) | EntitySchema<T>): Repository<T> {
    return this.connection.getRepository(target)
  }

  public mongoRepository<T>(target: string | Function | (new () => T) | EntitySchema<T>): MongoRepository<T> {
    return this.connection.getMongoRepository(target)
  }

  get manager(): EntityManager | MongoEntityManager {
    if (this.type === 'mongodb') {
      return getMongoManager()
    } else {
      return getManager()
    }
  }

  public async findOne(table: string, conditions?, options?) {
    const repository = this.repository(table)

    const result = await repository.findOne(conditions, options)
    return !isUndefined(result) ? result : {}
  }

  public async find(table: string, options?) {
    const repository = this.repository(table)
    const result = await repository.find(options)
    return !isUndefined(result) ? result : []
  }

  public create(table: string) {
    const repository = this.repository(table)

    return repository.create()
  }

  public async save(table: string, entity) {
    const repository = this.repository(table)

    const result = await repository.save(entity)
    return result
  }

  public async delete(table: string, options) {
    const repository = this.repository(table)
    const result = await repository.delete(options)
    return result
  }
}
