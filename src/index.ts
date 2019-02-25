import { DB } from "./plugin";
export default class TypeOrmPlugin {
  public async afterInitRegistry({ registry, config }) {
    registry.set("db", new DB());
    await registry.get('db').init(config)
  }
}
