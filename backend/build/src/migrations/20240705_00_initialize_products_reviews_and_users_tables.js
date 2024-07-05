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
const sequelize_1 = require("sequelize");
// Using ES5 export so Umzug can work with it
module.exports = {
    // @ts-expect-error - no type available for queryInterface
    up: (_a) => __awaiter(void 0, [_a], void 0, function* ({ context: queryInterface }) {
        yield queryInterface.createTable('products', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false
            },
            category: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false
            },
            price: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            images: {
                type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.TEXT)
            },
            specs: {
                type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.TEXT)
            },
            inStock: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            eta: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            productId: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false
            },
            rating: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            popular: {
                type: sequelize_1.DataTypes.BOOLEAN
            },
            brand: {
                type: sequelize_1.DataTypes.TEXT
            },
            ram: {
                type: sequelize_1.DataTypes.TEXT
            },
            language: {
                type: sequelize_1.DataTypes.TEXT
            },
            genre: {
                type: sequelize_1.DataTypes.TEXT
            },
            for: {
                type: sequelize_1.DataTypes.TEXT
            },
            type: {
                type: sequelize_1.DataTypes.TEXT
            },
            processor: {
                type: sequelize_1.DataTypes.TEXT
            },
            displaysize: {
                type: sequelize_1.DataTypes.TEXT
            },
            has_ssd: {
                type: sequelize_1.DataTypes.TEXT
            }
        });
        yield queryInterface.createTable('users', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: sequelize_1.DataTypes.TEXT,
                unique: true,
                validate: {
                    isEmail: true
                },
                allowNull: false
            },
            name: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false
            }
        });
        yield queryInterface.createTable('reviews', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            product_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'products', key: 'id' }
            },
            user_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'users', key: 'id' }
            },
            name: {
                type: sequelize_1.DataTypes.TEXT
            },
            title: {
                type: sequelize_1.DataTypes.TEXT
            },
            content: {
                type: sequelize_1.DataTypes.TEXT
            },
            rating: {
                type: sequelize_1.DataTypes.INTEGER
            }
        });
    }),
    // @ts-expect-error - no type available for queryInterface
    down: (_a) => __awaiter(void 0, [_a], void 0, function* ({ context: queryInterface }) {
        for (const table of ['products', 'reviews', 'users']) {
            yield queryInterface.dropTable(table);
        }
    })
};
