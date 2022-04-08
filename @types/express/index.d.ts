import { JwtData } from "../../src/security/jwt.data";
declare global {
    namespace Express {
        interface Request {
            error: string,
            payload: JwtData
        }
    }
}
