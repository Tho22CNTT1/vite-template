// src/data-source.ts
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'mssql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 1433,
    username: process.env.DB_USERNAME || 'tho',
    password: process.env.DB_PASSWORD || 'NewSecurePassword123!',
    database: process.env.DB_NAME || 'Batch193',
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
    entities: ['src/entities/**/*.ts'],
    migrations: ['src/migrations/**/*.ts'],
    synchronize: false,
});
