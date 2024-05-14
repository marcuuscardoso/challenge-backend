import { ValidationError } from "../../errors/ValidationError";

export class Auth {
    private static CODE_LENGTH = 4;

    private userId: number;
    private code: string;
    private expiresAt: Date;

    constructor(userId: number, code: string, expiresAt: Date) {
        this.validateCode(code);

        this.userId = userId;
        this.code = code;
        this.expiresAt = expiresAt;
    }


    private validateCode(code: string) {
        if(code.length < Auth.CODE_LENGTH) {
            throw new ValidationError(400, "INVALID_CODE_LENGTH");
        }
    }

    getUserId(): number {
        return this.userId;
    }
 
    getCode(): string {
        return this.code;
    }

    getExpiresAt(): Date {
        return this.expiresAt;
    }
}
