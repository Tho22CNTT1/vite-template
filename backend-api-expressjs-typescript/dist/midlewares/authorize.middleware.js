import createError from 'http-errors';
// middleware kiểm tra quyền của user
export const authorize = (roles = []) => {
    return (req, res, next) => {
        const userRole = res.locals?.staff?.role;
        if (!userRole) {
            return next(createError(401, 'Unauthorized: No user role found'));
        }
        if (roles.length > 0 && !roles.includes(userRole)) {
            return next(createError(403, 'Forbidden: You don’t have permission'));
        }
        next();
    };
};
