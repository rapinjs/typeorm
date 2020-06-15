"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const plugin_1 = require("./plugin");
class TypeOrmPlugin {
    afterInitRegistry({ registry, config }) {
        return __awaiter(this, void 0, void 0, function* () {
            registry.set('typeorm', new plugin_1.DB());
            yield registry.get('typeorm').init(config);
        });
    }
}
exports.default = TypeOrmPlugin;
//# sourceMappingURL=index.js.map