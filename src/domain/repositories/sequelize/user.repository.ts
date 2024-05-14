import UserModel, { IUser } from "../../../infra/databases/sequelize/models/user.model";
import { User } from "../../entities/User/user.entity";
import { IUserRepository } from "../../services/user.service";
import bcrypt from "bcrypt";

export class UserRepository implements IUserRepository {
    async create(user: User): Promise<{ id: number; }> {
        const passwordHashed = await bcrypt.hash(user.getPassword(), 10);
        
        const created = await UserModel.create({
            name: user.getName(),
            email: user.getEmail(),
            phone: user.getPhone(),
            password: passwordHashed
        });
    
        return {
            id: created.id
        };
    }

    async findOne(user: User): Promise<UserModel | null> {
        return await UserModel.findOne({
            where: {
                email: user.getEmail()
            }
        });
    }

    async findAll(): Promise<UserModel[]> {
        return await UserModel.findAll();
    }

    async findOneById(id: number): Promise<UserModel | null> {
        return await UserModel.findOne({
            where: {
                id
            }
        });
    }

    async delete(id: number): Promise<void> {
        await UserModel.destroy({
            where: {
                id
            }
        });
    }

    async update(id: number, userData: IUser): Promise<void> {
        await UserModel.update(userData, 
            { 
                where: { 
                    id 
                }
            }
        );
    }
}