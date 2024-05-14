export class ValidationError extends Error {
    constructor(public readonly status: number, message: string) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}