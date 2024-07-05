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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const products_1 = __importDefault(require("#src/routes/products"));
const database_1 = require("./utils/database");
const app = (0, express_1.default)();
app.get('/api/ping', (_req, res) => {
    res.send('pong');
});
app.use('/api/images', express_1.default.static(path_1.default.join(__dirname, 'data/images')));
app.use('/api/products', products_1.default);
const PORT = 3003;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.connectToDatabase)();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
start();
