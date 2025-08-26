// src/helpers/env.helpers.ts
import dotenv from 'dotenv';
import * as yup from 'yup';

dotenv.config();

// ✅ Schema cho biến môi trường
const envSchema = yup.object({
    NODE_ENV: yup.string().oneOf(['development', 'production', 'test']).required(),
    PORT: yup.string().required().default('8080'),
    MONGODB_URI: yup.string().required(),
    JWT_SECRET: yup.string().required(),
    JWT_ACCESS_TOKEN_SECRET: yup.string().required(),
    JWT_REFRESH_TOKEN_SECRET: yup.string().required(),
    JWT_ACCESS_TOKEN_EXPIRES_IN: yup.string().default('15m'),
    JWT_REFRESH_TOKEN_EXPIRES_IN: yup.string().default('7d'),
    API_KEY: yup.string().required(),
}).noUnknown(true);

// ✅ Validate và ép kiểu trả về
export const env: yup.InferType<typeof envSchema> = envSchema.validateSync(process.env, {
    abortEarly: false,
    stripUnknown: true,
});
