import { ValidationError } from "../../errors/ValidationError";
import UserModel from "../../../infra/databases/sequelize/models/user.model";
import { User } from "../../entities/User/user.entity";
import { IAuthRepository } from "../../services/auth.service";
import bcrypt from "bcrypt";
import OtpModel from "../../../infra/databases/sequelize/models/otp.model";
import { Auth } from "../../entities/User/auth.entity";

export class AuthRepository implements IAuthRepository {
    async findByCredentials(user: User): Promise<UserModel | null> {
        const dbUser = await UserModel.findOne({
            where: {
                email: user.getEmail()
            },

            include: [OtpModel]
        });

        if (!dbUser || !(await bcrypt.compare(user.getPassword(), dbUser.password))) {
            throw new ValidationError(404, "INVALID_CREDENTIALS");
        }

        return dbUser;
    }
    
    async createOtp(auth: Auth): Promise<void> {
        console.log(auth.getCode());
        await OtpModel.create({
            userId: auth.getUserId(),
            code: auth.getCode(),
            expiresAt: auth.getExpiresAt()
        });
    }

    async deleteOtp(id: number): Promise<void> {
        await OtpModel.destroy({
            where: {
                id
            }
        });
    }
}