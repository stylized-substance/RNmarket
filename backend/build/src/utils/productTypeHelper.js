"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findExtraPropertiesForCategory = void 0;
const data_json_1 = require("../../data/data.json");
const lodash_1 = __importDefault(require("lodash"));
const findCommonProperties = () => {
    const productProperties = data_json_1.products.map((product) => Object.keys(product));
    const commonProperties = lodash_1.default.intersection(...productProperties);
    return commonProperties;
};
const findExtraPropertiesForCategory = (category) => {
    const commonProperties = findCommonProperties();
    const categoryContents = data_json_1.products.filter((product) => product.category === category);
    const categoryContentsProperties = lodash_1.default.uniq(categoryContents.map((product) => Object.keys(product)).flat());
    const extraProperties = lodash_1.default.difference(categoryContentsProperties, commonProperties);
    return [commonProperties, extraProperties];
};
exports.findExtraPropertiesForCategory = findExtraPropertiesForCategory;
const findProductsByProperty = (property, include) => {
    let result;
    if (include) {
        result = data_json_1.products.filter((product) => Object.keys(product).includes(property));
    }
    else {
        result = data_json_1.products.filter((product) => !Object.keys(product).includes(property));
    }
    result = result.map((product) => {
        if (product.popular) {
            return {
                category: product.category,
                popular: product.popular
            };
        }
        else {
            return {
                category: product.category,
                popular: null
            };
        }
    });
    return result;
};
console.log(findProductsByProperty('popular', false));
