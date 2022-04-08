import { Role } from "../model/user.model";

export type JwtData = {
    username: string,
    userId: number,
    role: Role,
    iat?: number,
    exp?: number
}