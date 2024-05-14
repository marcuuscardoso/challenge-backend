import { ValidationError } from "../../errors/ValidationError";

export class User {
    private static EMAIL_REGEX = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/i;
    private static PHONE_REGEX = /^\s*(\d{2})(\d{4,5})(\d{4})[-. ]?\s*$/i;
    private static MIN_PASSWORD_LENGTH = 4;

    protected name?: string;
    private email: string;
    private phone?: string;
    private password: string;
    private otpCode?: string;

    constructor(email: string, password: string, name?: string, phone?: string, otpCode?: string) {
        this.validateParameters(email, password, name, phone);

        this.email = email;
        this.password = password;
        this.name = name;
        this.phone = phone;
        this.otpCode = otpCode;
    }

    private validateParameters(email: string, password: string, name?: string, phone?: string) {
        if (!email || !password) {
            throw new ValidationError(400, "EMAIL_AND_PASSWORD_REQUIRED");
        }

        this.validateEmail(email);
        this.validatePassword(password);

        if (phone) {
            this.validatePhone(phone);
        } else if (name) {
            this.validadeName(name);
        }
    }

    private validadeName(name: string) {
        const names = name.split(" ");

        if(names && names.length > 1) {
            return this.name = `${names[0]} ${names[names.length - 1]}`;
        }

        return this.name = name;
    }

    private validateEmail(email: string) {
        const isValid = User.EMAIL_REGEX.test(email);

        if(!isValid){
            throw new ValidationError(400, "INVALID_EMAIL_FORMAT");
        }
    }

    private validatePhone(phone: string) {
        if(!phone) return;

        const isValid = User.PHONE_REGEX.test(phone);

        if(!isValid) {
            throw new ValidationError(400, "INVALID_PHONE_FORMAT");
        }
    }

    private validatePassword(password: string) {
        if(password.length < User.MIN_PASSWORD_LENGTH) {
            throw new ValidationError(400, "INVALID_PASSWORD_LENGTH");
        }
    }

    getEmail(): string {
        return this.email;
    }
 
    getPassword(): string {
        return this.password;
    }

    getName(): string {
        return this.name || "";
    }

    getPhone(): string {
        return this.phone || "";
    }

    getOtpCode(): string | null {
        return this.otpCode || null;
    }
}
