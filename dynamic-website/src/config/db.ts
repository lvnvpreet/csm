import { DataSource } from "typeorm"
import * as dotenv from "dotenv"
import { Content } from "../models/content"
import { Template } from "../models/template"
import { User } from "../models/user"  // Add this import

dotenv.config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "dynamic_website",
    synchronize: true,
    logging: true,
    entities: [Content, Template, User],  // Add User to entities array
    subscribers: [],
    migrations: [],
})