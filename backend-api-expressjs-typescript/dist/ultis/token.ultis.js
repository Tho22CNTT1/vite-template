import jwt from 'jsonwebtoken';
import { env } from '../helpers/env.helpers';
const accessTokenSecret = env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = env.JWT_REFRESH_TOKEN_SECRET;
export function generateAccessToken(user) {
    return jwt.sign(user, accessTokenSecret, {
        expiresIn: env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    });
}
export function generateRefreshToken(user) {
    return jwt.sign(user, refreshTokenSecret, {
        expiresIn: env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    });
}
export function verifyAccessToken(token) {
    return jwt.verify(token, accessTokenSecret);
}
export function verifyRefreshToken(token) {
    return jwt.verify(token, refreshTokenSecret);
}
