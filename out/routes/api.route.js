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
const express_1 = require("express");
const cart_storage_1 = __importDefault(require("../storage/cart.storage"));
const magazine_storage_1 = __importDefault(require("../storage/magazine.storage"));
const product_storage_1 = __importDefault(require("../storage/product.storage"));
const router = (0, express_1.Router)();
router.get('/magazines', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let magazines = yield magazine_storage_1.default.allMagazines();
    res.send(magazines);
}));
router.get('/products/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let products = yield product_storage_1.default.findProducts(req.params.id);
    res.send(products);
}));
router.get('/cart', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let items = yield cart_storage_1.default.allItems(req.payload.userId);
    res.send(items);
}));
router.post('/cart', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userId = req.payload.userId;
    let { product_id } = req.body;
    console.log(userId, product_id);
    yield cart_storage_1.default.addItem(userId.toString(), product_id);
    console.log("add item");
    res.status(200).send({
        error: null,
        message: 'Item added to cart'
    });
}));
exports.default = router;
