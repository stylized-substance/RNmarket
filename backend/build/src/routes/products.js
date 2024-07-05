"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeNarrowers_1 = require("../utils/typeNarrowers");
const data_json_1 = require("../../data/data.json");
let data = data_json_1.products;
const router = express_1.default.Router();
router.get('/', (req, res) => {
    if (req.query.limit) {
        if ((0, typeNarrowers_1.isNumber)(req.query.limit)) {
            const limit = req.query.limit;
            data = data.slice(0, limit);
        }
    }
    res.send(data);
});
router.get('/:id', (req, res) => {
    const product = data_json_1.products.find((product) => req.params.id === product.id);
    if (product) {
        res.send(product);
    }
    else {
        res.status(404);
    }
});
exports.default = router;
