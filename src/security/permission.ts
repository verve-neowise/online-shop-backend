import { Role } from "../model/user.model";

const permissions = new Map<Role, string[]>()

function permitFor(role: Role, routes: string[]) {
    permissions.set(role, routes)
}
const openRoutes = [
    '/auth',
    '/login',
    '/register',
]

permitFor(Role.User, [
    '^/magazines',
    '^/products',
    '^/cart'
])

permitFor(Role.Admin, [
    '^/admin',
    '^/magazines',
    '^/products',
    '^/cart'
])

export const isOpen = (route: string) => {
    return openRoutes.includes(route)
}

export const isPermitted = (route: string, role: Role) => {
    return permissions.get(role)!.some(exp => {
        return new RegExp(exp).test(route)
    })
}