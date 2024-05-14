import { UserRepository } from "../../domain/repositories/sequelize/user.repository";
import { UserService } from "../../domain/services/user.service";
import { UserController } from "../../infra/controllers/user.controller";

export class UserControllerFactory {
    static make() {
        const repository = new UserRepository();
        const service = new UserService(repository);
        const controller = new UserController(service);

        return controller;
    }
}