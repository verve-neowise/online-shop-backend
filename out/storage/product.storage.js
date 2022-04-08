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
const storage_1 = __importDefault(require("./storage"));
const product_model_1 = __importDefault(require("../model/product.model"));
function addProduct(product) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = 'INSERT INTO products (mid, name, photo, price) values($1, $2, $3, $4)';
        yield storage_1.default.run(query, [
            product.mid,
            product.name,
            product.photo,
            product.price
        ]);
    });
}
function findProducts(mid) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = 'SELECT * FROM products WHERE mid = $1';
        let datas = yield storage_1.default.all(query, [mid]);
        return datas.map(mapProduct);
    });
}
function mapProduct(data) {
    return data ? new product_model_1.default(data.id, data.mid, data.name, data.photo, data.price) : undefined;
}
exports.default = {
    addProduct,
    findProducts
};
