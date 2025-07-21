export const sendJsonSuccess = (res, data, message = "Success", statusCode = 200) => {
    res.status(statusCode).json({
        statusCode,
        message,
        data,
    });
};
