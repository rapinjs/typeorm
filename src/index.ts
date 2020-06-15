import { DB } from './plugin'

export default class TypeOrmPlugin {
  public async afterInitRegistry({ registry, config }) {
    registry.set('typeorm', new DB())
    await registry.get('typeorm').init(config)
  }
}
