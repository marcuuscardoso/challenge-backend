import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

interface IAddress {
    email: string;
    name: string;
}
  
export interface IMessage {
    to: IAddress;
    from: IAddress;
    subject: string;
    body: string;
  }
  
export interface IMailProvider {
    sendMail(message: IMessage): Promise<void>;
}
  
export class MailProvider implements IMailProvider {
    private transporter: Mail;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 1025,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });
    }

    async sendMail(message: IMessage): Promise<void> {
        await this.transporter.sendMail({
            to: {
                name: message.to.name,
                address: message.to.email,
            },
            from: {
                name: message.from.name,
                address: message.from.email,
            },
            subject: message.subject,
            html: message.body,
        });
    }
}