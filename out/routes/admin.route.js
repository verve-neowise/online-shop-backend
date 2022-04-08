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
const magazine_storage_1 = __importDefault(require("../storage/magazine.storage"));
const product_storage_1 = __importDefault(require("../storage/product.storage"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let magazines = yield magazine_storage_1.default.allMagazines();
    res.render('admin', { magazines });
}));
router.post('/magazine', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let magazine = req.body;
    yield magazine_storage_1.default.addMagazine(magazine);
    res.redirect('/admin');
}));
router.get('/magazine/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let products = yield product_storage_1.default.findProducts(req.params.id);
    res.render('products', { products, mid: req.params.id });
}));
router.post('/product/:mid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let product = req.body;
    product.mid = +req.params.mid;
    yield product_storage_1.default.addProduct(product);
    res.redirect('/admin/magazine/' + req.params.mid);
}));
exports.default = router;
