import { DataSource } from "typeorm";
import { Product } from "./entities/Product.entity";
import { Brand } from "./entities/Brand.entity";
import { Category } from "./entities/Category.entity";

export const AppDataSource = new DataSource({
    type: "mssql",
    host: "localhost",
    port: 1433,
    username: "tho",
    password: "NewSecurePassword123!", // hoặc env
    database: "Batch193",
    synchronize: false,
    logging: true,
    entities: ["src/entities/**/*.ts"],
    migrations: ["src/migrations/**/*.ts"],
    subscribers: [],
    options: { encrypt: false },
});
