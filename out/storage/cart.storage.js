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
function addItem(userId, productId) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = 'INSERT INTO carts (user_id, product_id) values($1, $2)';
        yield storage_1.default.run(query, [
            userId, productId
        ]);
    });
}
function allItems(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = `SELECT
                     products.id as id, products.mid as mid,
                     products.name as name, products.photo as photo,
                     products.price as price, magazines.name as magazine
                FROM products
                INNER JOIN magazines ON magazines.id = products.mid
                LEFT JOIN carts ON products.id = carts.product_id
                WHERE carts.user_id = $1`;
        let datas = yield storage_1.default.all(query, [userId]);
        return datas.map(mapProduct);
    });
}
function mapProduct(data) {
    return data ? new product_model_1.default(data.id, data.mid, data.name, data.photo, data.price, data.magazine) : undefined;
}
exports.default = {
    addItem,
    allItems
};
