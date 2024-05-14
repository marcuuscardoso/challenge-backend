import { IAuthProvider } from "../../infra/providers/auth.provider";
import { IMailProvider } from "../../infra/providers/mail.provider";
import { User } from "../entities/User/user.entity";
import { Auth } from "../entities/User/auth.entity";
import { ValidationError } from "../errors/ValidationError";
import UserModel from "../../infra/databases/sequelize/models/user.model";

export interface IAuthRepository {
    findByCredentials(user: User): Promise<UserModel | null>
    createOtp(auth: Auth): Promise<void>
    deleteOtp(id: number): Promise<void>
}

export class AuthService {
    constructor(
        private repository: IAuthRepository,
        private AuthProvider: IAuthProvider,
        private mailProvider: IMailProvider
    ){}

    async login(email: string, password: string, otpCode: string | undefined): Promise<string | void> {
        const user = new User(email, password, otpCode);

        const authenticatedUser = await this.repository.findByCredentials(user);

        if (!authenticatedUser || !authenticatedUser.dataValues.id) {
            throw new ValidationError(404, "USER_NOT_FOUND");
        }

        if (!authenticatedUser.otp && !otpCode) {
            const expiresAt = new Date();
            expiresAt.setMinutes(expiresAt.getMinutes() + 5);

            const otp = this.AuthProvider.generateOtp(6);

            const auth = new Auth(authenticatedUser.dataValues.id, otp, expiresAt);

            await this.repository.createOtp(auth);

            return await this.mailProvider.sendMail({
                to: {
                    name: authenticatedUser.dataValues.name,
                    email: authenticatedUser.dataValues.email
                },
                from: {
                    name: "Smartix Tech",
                    email: "no-reply@smartix.tech"
                },
                subject: "Código de autenticação Smartix Tech",
                body: `O seu código de verificação é: ${otp}`
            });
        }

        if (authenticatedUser?.otp?.code != otpCode || authenticatedUser.otp.expiresAt <= new Date()) {
            throw new ValidationError(404, "OTP incorreto ou expirado, tente novamente.");
        }

        await this.repository.deleteOtp(authenticatedUser.otp.id);
        return this.AuthProvider.generateToken({ ...authenticatedUser.dataValues, otp: null });
    }

    async verify(access_token: string): Promise<object> {
        return this.AuthProvider.verifyToken(access_token.split("Bearer ")[1]);
    }
}