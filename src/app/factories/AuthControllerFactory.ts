import { AuthRepository } from "../../domain/repositories/sequelize/auth.repository";
import { AuthService } from "../../domain/services/auth.service";
import { AuthProvider } from "../../infra/providers/auth.provider";
import { AuthController } from "../../infra/controllers/auth.controller";
import { MailProvider } from "../../infra/providers/mail.provider";

export class AuthControllerFactory {
    static make() {
        const repository = new AuthRepository();
        const authProvider = new AuthProvider();
        const mailProvider = new MailProvider();
        const service = new AuthService(repository, authProvider, mailProvider);
        const controller = new AuthController(service);

        return controller;
    }
}