import UserModel, { IUser } from "../../infra/databases/sequelize/models/user.model";
import { User } from "../entities/User/user.entity";
import { ValidationError } from "../errors/ValidationError";

export interface IUserRepository {
    create(user: User): Promise<{ id: number }>
    findOne(user: User): Promise<UserModel | null>
    findAll(): Promise<UserModel[]>
    findOneById(id: number): Promise<UserModel | null>
    delete(id: number): Promise<void>
    update(id: number, userData: IUser): Promise<void>
}

export class UserService {
    constructor(
        private repository: IUserRepository
    ){}

    async create(name: string, email: string, phone: string, password: string) {
        const user = new User(email, password, name, phone);
        
        const userAlreadyExists = await this.repository.findOne(user);
        
        if (userAlreadyExists) {
            throw new ValidationError(409, "EMAIL_ALREADY_EXISTS");
        }

        const { id } = await this.repository.create(user);
    
        return { id };
    }

    async findAll() {
        return await this.repository.findAll();
    }

    async findOne(id: number) {
        return await this.repository.findOneById(id);
    }

    async update(id: number, userData: IUser) {
        const user = await this.repository.findOneById(id);

        if (!user) {
            throw new ValidationError(404, "USER_NOT_FOUND");
        }

        return await this.repository.update(id, userData);
    }

    async delete(id: number) {
        const user = await this.repository.findOneById(id);

        if (!user) {
            throw new ValidationError(404, "USER_NOT_FOUND");
        }

        await this.repository.delete(user.id);
    }
}