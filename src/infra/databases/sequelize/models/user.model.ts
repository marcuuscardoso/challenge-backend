import { Table, Column, Model, DataType, AllowNull, Unique, AutoIncrement, PrimaryKey, HasOne } from "sequelize-typescript";
import OtpModel from "./otp.model";

export interface IUser {
    id?: number;
    name: string;
    email: string;
    phone: string;
    password: string;
}

@Table({ 
    tableName: "users",
    modelName: "User"
})
export default class UserModel extends Model<IUser> {
    /**
     * Unique user ID.
     */
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare public id: number;
     
    /**
     * User full name.
     */
    @AllowNull(false)
    @Column(DataType.STRING(256))
    declare public name: string;

    /**
     * User email.
     */
    @AllowNull(false)
    @Unique({
        name: "unique_email",
        msg: "O email informado já está sendo utilizado."
    })
    @Column(DataType.STRING)
    declare public email: string;

    /**
     * User phone
     */
    @AllowNull(false)
    @Column(DataType.STRING)
    declare public phone: string;

    /**
     * User password.
     */
    @AllowNull(false)
    @Column(DataType.STRING)
    declare public password: string;

    @HasOne(() => OtpModel)
    declare public otp: OtpModel;
}