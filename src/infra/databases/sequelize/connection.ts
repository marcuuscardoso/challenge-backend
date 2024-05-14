import { Sequelize } from "sequelize-typescript";

class SequelizeDatabase {
    public sequelize: Sequelize | undefined;

    constructor() {
        this.connectToDatabase();
    }

    private async connectToDatabase() {
        try {
            this.sequelize = new Sequelize({
                host: process.env.MYSQL_HOST,
                port: Number(process.env.MYSQL_PORT),
                database: process.env.MYSQL_DATABASE,
                dialect: "mysql",
                username: process.env.MYSQL_USERNAME,
                password: process.env.MYSQL_PASSWORD,
                models: [__dirname + "/models"],
            });
    
            await this.sequelize.authenticate();
            await this.sequelize.sync();
            console.log("Connection has been established successfully.");
        } catch (err) {
            console.error("Unable to connect to the Database:", err);
            throw err;
        }
    }
}

export default SequelizeDatabase;