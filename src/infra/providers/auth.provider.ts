import jwt from "jsonwebtoken";
import { ValidationError } from "../../domain/errors/ValidationError";

export interface IAuthProvider {
    generateToken(payload: any): string;
    verifyToken(token: string): any;
    generateOtp(length: number):string;
}

export class AuthProvider implements IAuthProvider {
    public generateToken(payload: any): string {
        return jwt.sign(payload, String(process.env.JWT_SECRET), {
            expiresIn: 60 * 60
        });
    }

    public verifyToken(token: string): any {
        try {
            return jwt.verify(token, String(process.env.JWT_SECRET));
        } catch (error) {
            throw new ValidationError(401, "INVALID_ACCESS_TOKEN");
        }
    }

    public generateOtp(length: number): string {
        const chars: string = "0123456789";
        
        let code: string = "";

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);

            code += chars[randomIndex];
        }

        return code;
    }
}