import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import Staff from '../models/Staff.model';
export const loginService = async (email, password) => {
    const staff = await Staff.findOne({ email });
    if (!staff)
        throw createHttpError(401, 'Invalid email or password');
    const isMatch = await bcrypt.compare(password, staff.password);
    if (!isMatch)
        throw createHttpError(401, 'Invalid email or password');
    const accessToken = jwt.sign({ id: staff._id, roles: staff.roles }, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: staff._id }, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    return {
        accessToken,
        refreshToken,
        staff: {
            id: staff._id,
            fullName: staff.fullName,
            email: staff.email,
            roles: staff.roles,
        },
    };
};
export const getProfileService = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
        const staff = await Staff.findById(decoded.id).select('-password');
        if (!staff)
            throw createHttpError(404, 'Staff not found');
        return staff;
    }
    catch {
        throw createHttpError(401, 'Invalid or expired token');
    }
};
export const refreshTokenService = async (id) => {
    const staff = await Staff.findById(id);
    if (!staff)
        throw createHttpError(401, 'Staff not found');
    const accessToken = jwt.sign({ id: staff._id, roles: staff.roles }, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: staff._id }, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
};
