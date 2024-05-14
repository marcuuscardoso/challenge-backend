import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import SequelizeDatabase from "../infra/databases/sequelize/connection";
import { userRoutes } from "./routers/user";
import { authRoutes } from "./routers/auth";
dotenv.config();

const app = express();

const corsOptions: cors.CorsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));
app.use(express.json());


app.use("/user", userRoutes);
app.use("/auth", authRoutes);

new SequelizeDatabase();

export { app };