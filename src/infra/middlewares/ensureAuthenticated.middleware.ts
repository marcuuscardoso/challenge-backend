import { NextFunction, Request, Response } from "express";
import { AuthProvider } from "../providers/auth.provider";
import { ValidationError } from "../../domain/errors/ValidationError";

export const ensureAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const access_token = req.headers["authorization"];

        if (!access_token || !access_token.startsWith("Bearer")) {
            throw new ValidationError(401, "INVALID_ACCESS_TOKEN");
        }
    
        const authProvider = new AuthProvider();
    
        authProvider.verifyToken(access_token.split("Bearer ")[1]);
    
        return next();
    } catch (err) {
        console.error(err);

        if (err instanceof ValidationError) {
            return res.status(err.status).json({ error: err.message });
        }
        
        return res.status(500).end();
    }
};
  