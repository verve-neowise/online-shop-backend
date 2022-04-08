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
const magazine_model_1 = __importDefault(require("../model/magazine.model"));
function addMagazine(magazine) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = 'INSERT INTO magazines (name, category, color) values($1, $2, $3)';
        yield storage_1.default.run(query, [
            magazine.name,
            magazine.category,
            magazine.color
        ]);
    });
}
function allMagazines() {
    return __awaiter(this, void 0, void 0, function* () {
        let query = 'SELECT * FROM magazines;';
        let datas = yield storage_1.default.all(query);
        return datas.map(mapMagazine);
    });
}
function mapMagazine(data) {
    return data ? new magazine_model_1.default(data.id, data.name, data.category, data.color) : undefined;
}
exports.default = {
    addMagazine,
    allMagazines
};
