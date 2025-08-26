export const sendJsonSuccess = (res, data, statusCode = 200) => {
    res.status(statusCode).json({
        statusCode,
        message: 'Success',
        data,
    });
};
