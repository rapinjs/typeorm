"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
class DB {
    constructor() { }
    init(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbConfig = !lodash_1.isUndefined(config.db) ? config.db : {};
            this.type = dbConfig.type;
            this.connection = yield typeorm_1.createConnection(Object.assign({ synchronize: false, logging: false, entities: ['entities/**/*.ts'] }, dbConfig));
            if (this.connection instanceof Error) {
                throw new Error(this.connection.message);
            }
        });
    }
    queryBuilder(table) {
        return this.connection.getRepository(table).createQueryBuilder(table);
    }
    queryMany(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield query.getMany();
            return !lodash_1.isUndefined(result) ? result : {};
        });
    }
    queryCount(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield query.getCount();
            return !lodash_1.isUndefined(result) ? result : 0;
        });
    }
    repository(table) {
        if (this.type === 'mongodb') {
            return this.connection.getMongoRepository(table);
        }
        else {
            return this.connection.getRepository(table);
        }
    }
    get manager() {
        if (this.type === 'mongodb') {
            return typeorm_1.getMongoManager();
        }
        else {
            return typeorm_1.getManager();
        }
    }
    findOne(table, conditions, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = this.repository(table);
            const result = yield repository.findOne(conditions, options);
            return !lodash_1.isUndefined(result) ? result : {};
        });
    }
    find(table, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = this.repository(table);
            const result = yield repository.find(options);
            return !lodash_1.isUndefined(result) ? result : [];
        });
    }
    create(table) {
        const repository = this.repository(table);
        return repository.create();
    }
    save(table, entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = this.repository(table);
            const result = yield repository.save(entity);
            return result;
        });
    }
    delete(table, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = this.repository(table);
            const result = yield repository.delete(options);
            return result;
        });
    }
}
exports.DB = DB;
//# sourceMappingURL=plugin.js.map