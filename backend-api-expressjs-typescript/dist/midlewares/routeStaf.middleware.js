export const routeStaffMidleware = (req, res, next) => {
    res.locals.user = {
        id: '123',
        name: 'john dane',
        role: 'staff'
    };
    console.log('Middleware đang chạy');
    next();
};
