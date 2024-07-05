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
exports.connectToDatabase = void 0;
const sequelize_1 = require("sequelize");
const umzug_1 = require("umzug");
const DATABASE_URL = process.env.DATABASE_URL;
console.log('URL', DATABASE_URL);
const sequelize = new sequelize_1.Sequelize(`${DATABASE_URL}`);
const migrationConfig = {
    migrations: {
        glob: 'src/migrations/*.ts'
    },
    storage: new umzug_1.SequelizeStorage({ sequelize, tableName: 'migrations' }),
    context: sequelize.getQueryInterface(),
    logger: console
};
const runMigrations = () => __awaiter(void 0, void 0, void 0, function* () {
    const migrator = new umzug_1.Umzug(migrationConfig);
    const migrations = yield migrator.up();
    console.log('Database migrations done', {
        files: migrations.map((migration) => migration.name)
    });
});
const rollbackMigration = () => __awaiter(void 0, void 0, void 0, function* () {
    yield sequelize.authenticate();
    const migrator = new umzug_1.Umzug(migrationConfig);
    yield migrator.down();
});
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        yield runMigrations();
        console.log('Connected to PostgreSQL');
    }
    catch (error) {
        console.log('Failed to connect to PostgreSQL, error:', error);
    }
    return null;
});
exports.connectToDatabase = connectToDatabase;
