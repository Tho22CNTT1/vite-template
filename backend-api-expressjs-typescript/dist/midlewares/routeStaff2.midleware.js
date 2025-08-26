export const routeStaffMidleware2 = (req, res, next) => {
    console.log('Middleware đang chạy');
    next();
};
