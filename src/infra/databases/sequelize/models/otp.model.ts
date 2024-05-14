import { Table, Column, Model, DataType, AllowNull, AutoIncrement, PrimaryKey, ForeignKey, BelongsTo, BeforeCreate } from "sequelize-typescript";
import UserModel from "./user.model";

export interface IOtp {
    id?: number;
    userId: number;
    code: string;
    expiresAt: Date;
}

@Table({ 
    tableName: "otp",
    modelName: "Otp"
})
export default class OtpModel extends Model<IOtp> {
    /**
     * Unique OTP ID.
     */
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare public id: number;

    /**
     * User ID this OTP belongs to.
     */
    @ForeignKey(() => UserModel)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare public userId: number;

    /**
     * OTP code.
     */
    @AllowNull(false)
    @Column(DataType.STRING)
    declare public code: string;

    /**
     * OTP expire date.
     */
    @AllowNull(false)
    @Column(DataType.DATE)
    declare public expiresAt: Date;

    /**
     * User this OTP belongs to.
     */
    @BelongsTo(() => UserModel)
    declare public user: UserModel;


    @BeforeCreate
    static async deleteExistingOtp(instance: OtpModel) {
        const existingOtp = await OtpModel.findOne({ where: { userId: instance.userId } });

        if (existingOtp) {
            await existingOtp.destroy();
        }
    }
}
