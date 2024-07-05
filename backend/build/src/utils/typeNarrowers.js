"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumber = void 0;
const isNumber = (value) => {
    return !isNaN(Number(value));
};
exports.isNumber = isNumber;
