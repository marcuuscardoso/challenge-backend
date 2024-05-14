import { Request, Response, Router } from "express";
import { AuthControllerFactory } from "../factories/AuthControllerFactory";

const authRoutes = Router();

const AuthController = AuthControllerFactory.make();

/**
 * Get OTP and Access Token
 */
authRoutes.post("/", async (req: Request, res: Response) => AuthController.login(req, res));

export { authRoutes };