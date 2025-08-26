import jwt from 'jsonwebtoken';
import { env } from '../helpers/env.helpers';

interface UserPayload {
    id: string;
    email: string;
    role: string;
}

const accessTokenSecret = env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = env.JWT_REFRESH_TOKEN_SECRET;

export function generateAccessToken(user: UserPayload): string {
    return jwt.sign(user as object, accessTokenSecret, {
        expiresIn: env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    } as jwt.SignOptions);
}

export function generateRefreshToken(user: UserPayload): string {
    return jwt.sign(user as object, refreshTokenSecret, {
        expiresIn: env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    } as jwt.SignOptions);
}

export function verifyAccessToken(token: string) {
    return jwt.verify(token, accessTokenSecret);
}

export function verifyRefreshToken(token: string) {
    return jwt.verify(token, refreshTokenSecret);
}
