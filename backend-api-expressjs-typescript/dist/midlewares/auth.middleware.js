// src/middlewares/auth.middleware.ts
import jwt from 'jsonwebtoken';
import Staff from '../models/Staff.model';
import createError from 'http-errors';
export const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw createError(401, 'Unauthorized: Token missing');
        }
        const token = authHeader.split(' ')[1];
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Lấy ID từ payload
        const userId = decoded.sub || decoded._id || decoded.id;
        if (!userId)
            return next(createError(401, 'Unauthorized: Invalid payload'));
        const staff = await Staff.findById(userId);
        // const staff = await Staff.findById(userId).select('-password');
        if (!staff) {
            throw createError(401, 'Unauthorized: Staff not found');
        }
        // Lưu thông tin vào res.locals để dùng ở controller
        res.locals.staff = staff;
        next();
    }
    catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            return next(createError(401, 'Token expired'));
        }
        if (err instanceof jwt.JsonWebTokenError) {
            return next(createError(403, 'Invalid token'));
        }
        return next(err);
    }
};
