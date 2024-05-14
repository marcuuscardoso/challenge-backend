import { Request, Response, Router } from "express";
import { UserControllerFactory } from "../factories/UserControllerFactory";
import { ensureAuthenticated } from "../../infra/middlewares/ensureAuthenticated.middleware";

const userRoutes = Router();

const UserController = UserControllerFactory.make();

/**
 * Create User
 */
userRoutes.post("/", async (req: Request, res: Response) => UserController.create(req, res));

/**
 * Find All Users
 */
userRoutes.get("/", ensureAuthenticated, async (req: Request, res: Response) => UserController.findAll(req, res));

/**
 * Find One User
 */
userRoutes.get("/:id", ensureAuthenticated, async (req: Request, res: Response) => UserController.findOne(req, res));

/**
 * Update User
 */
userRoutes.patch("/:id", ensureAuthenticated, async (req: Request, res: Response) => UserController.update(req, res));

/**
 * Delete User
 */
userRoutes.delete("/:id", ensureAuthenticated, async (req: Request, res: Response) => UserController.delete(req, res));

export { userRoutes };
