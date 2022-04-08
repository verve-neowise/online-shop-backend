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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_storage_1 = __importDefault(require("../storage/user.storage"));
const user_model_1 = __importDefault(require("../model/user.model"));
const router = (0, express_1.Router)();
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { username, password } = req.body;
    let user = yield user_storage_1.default.findUser(username);
    if (user && bcryptjs_1.default.compareSync(password, user.password)) {
        let data = {
            userId: user.id,
            role: user.role,
            username: username
        };
        let token = jsonwebtoken_1.default.sign(data, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        res.status(200).send({
            error: null,
            token
        });
    }
    else {
        res.status(401).send({
            error: 'Unauthorized',
            token: null
        });
    }
}));
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { username, password, name, surname } = req.body;
    if (yield user_storage_1.default.findUser(username)) {
        return res.status(403).send({
            error: 'Username already taken.',
            token: null
        });
    }
    let user = new user_model_1.default(0, username, password, name, surname);
    yield user_storage_1.default.addUser(user);
    let newUser = yield user_storage_1.default.findUser(username);
    let data = {
        userId: newUser.id,
        role: newUser.role,
        username: username
    };
    let token = jsonwebtoken_1.default.sign(data, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
    res.status(200).send({
        error: null,
        token
    });
}));
exports.default = router;
