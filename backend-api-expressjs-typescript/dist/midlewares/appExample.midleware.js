export const appExample = (req, res, next) => {
    console.log('Middleware đang chạy');
    next();
};
