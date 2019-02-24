"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugin_1 = require("./plugin");
class TypeOrmPlugin {
    afterInitRegistry({ registry, config }) {
        registry.set("db", new plugin_1.DB());
        registry.get('db').init(config);
    }
}
exports.default = TypeOrmPlugin;
//# sourceMappingURL=index.js.map