import { Request, Response } from "express";
import { UserService } from "../../domain/services/user.service";
import { ValidationError } from "../../domain/errors/ValidationError";

export class UserController {
    constructor(
        private service: UserService
    ) {}

    async create(req: Request, res: Response) {
        const { name, email, phone,  password } = req.body;

        try {
            const { id } = await this.service.create(name, email, phone,  password);

            return res.status(201).json({ id });
        } catch (err) {
            console.error(err);

            if (err instanceof ValidationError) {
                return res.status(err.status).json({ error: err.message });
            }
            
            return res.status(500).end();
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const users = await this.service.findAll();

            return res.status(200).json({ users });
        } catch (err) {
            console.error(err);

            if (err instanceof ValidationError) {
                return res.status(err.status).json({ error: err.message });
            }
            
            return res.status(500).end();
        }
    }

    async findOne(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const user = await this.service.findOne(Number(id));

            return res.status(200).json({ user });
        } catch (err) {
            console.error(err);

            if (err instanceof ValidationError) {
                return res.status(err.status).json({ error: err.message });
            }
            
            return res.status(500).end();
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name, email, phone, password } = req.body;

        try {
            await this.service.update(Number(id), { name, email, phone, password });

            return res.status(204).end();
        } catch (err) {
            console.error(err);

            if (err instanceof ValidationError) {
                return res.status(err.status).json({ error: err.message });
            }
            
            return res.status(500).end();
        }
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        try {
            await this.service.delete(Number(id));

            return res.status(204).end();
        } catch (err) {
            console.error(err);

            if (err instanceof ValidationError) {
                return res.status(err.status).json({ error: err.message });
            }
            
            return res.status(500).end();
        }
    }
}