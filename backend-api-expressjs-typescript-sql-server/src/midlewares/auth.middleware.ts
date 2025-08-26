/* // auth.middleware.ts
import jwt, { JwtPayload } from 'jsonwebtoken'
import Staff from '../models/Staff.model'
import { Request, Response, NextFunction } from "express";
import createError from 'http-errors';

interface DecodedJWT extends JwtPayload {
    _id?: string;
    sub?: string;
    email?: string;
    role?: string;
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return next(createError(401, 'Unauthorized'));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedJWT;

        // Có thể dùng decoded._id hoặc decoded.sub tùy lúc sign token
        const userId = decoded.sub || decoded._id;
        if (!userId) return next(createError(401, 'Unauthorized'));

        const staff = await Staff.findById(userId);
        if (!staff) {
            return next(createError(401, 'Unauthorized'));
        }

        res.locals.staff = staff;
        next();
    } catch (err) {
        return next(createError(403, 'Forbidden'));
    }
};

export const authorize = (roles: string[] = []) => {
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req: Request, res: Response, next: NextFunction) => {
        const staff = res.locals.staff;
        if (!staff) {
            return next(createError(401, 'Unauthorized'));
        }

        if (roles.length && !roles.includes(staff.role)) {
            return next(createError(403, 'Forbidden'));
        }

        next();
    };
};
 */