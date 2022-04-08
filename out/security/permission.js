"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPermitted = exports.isOpen = void 0;
const user_model_1 = require("../model/user.model");
const permissions = new Map();
function permitFor(role, routes) {
    permissions.set(role, routes);
}
const openRoutes = [
    '/auth',
    '/login',
    '/register',
];
permitFor(user_model_1.Role.User, [
    '^/api'
]);
permitFor(user_model_1.Role.Admin, [
    '^/admin',
    '^/magazines',
    '^/products',
    '^/cart'
]);
const isOpen = (route) => {
    return openRoutes.includes(route);
};
exports.isOpen = isOpen;
const isPermitted = (route, role) => {
    return permissions.get(role).some(exp => {
        return new RegExp(exp).test(route);
    });
};
exports.isPermitted = isPermitted;
