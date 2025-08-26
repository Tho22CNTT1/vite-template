// src/helpers/env.helpers.ts
import dotenv from 'dotenv';
import * as yup from 'yup';

dotenv.config();

// ✅ Schema cho biến môi trường
const envSchema = yup.object({
    NODE_ENV: yup.string().oneOf(['development', 'production', 'test']).required(),
    PORT: yup.string().required().default('8080'),

    // ✅ MongoDB (nếu vẫn dùng song song)
    MONGODB_URI: yup.string().optional(),

    // ✅ JWT
    JWT_SECRET: yup.string().required(),
    JWT_ACCESS_TOKEN_SECRET: yup.string().required(),
    JWT_REFRESH_TOKEN_SECRET: yup.string().required(),
    JWT_ACCESS_TOKEN_EXPIRES_IN: yup.string().default('15m'),
    JWT_REFRESH_TOKEN_EXPIRES_IN: yup.string().default('7d'),

    // ✅ API Key
    API_KEY: yup.string().required(),

    // ✅ SQL Server - cấu hình cơ bản
    DB_HOST: yup.string().required(),
    DB_PORT: yup.number().required().default(1433), // SQL Server mặc định 1433
    DB_USERNAME: yup.string().required(),
    DB_PASSWORD: yup.string().required(),
    DB_NAME: yup.string().required(),
    DB_SYNCHRONIZE: yup.boolean().default(false),
    DB_LOGGING: yup.boolean().default(false),

}).noUnknown(true);

// ✅ Validate và ép kiểu trả về
export const env: yup.InferType<typeof envSchema> = envSchema.validateSync(process.env, {
    abortEarly: false,
    stripUnknown: true,
});
