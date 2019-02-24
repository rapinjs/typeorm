import { DB } from "./plugin";
export default class TypeOrmPlugin {
  public afterInitRegistry({ registry, config }) {
    registry.set("db", new DB());
    registry.get('db').init(config)
  }
}
