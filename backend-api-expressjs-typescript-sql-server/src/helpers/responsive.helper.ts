import { Response } from 'express';

export const sendJsonSuccess = (
    res: Response,
    data?: any,
    message: string = "Success",
    statusCode: number = 200
) => {
    res.status(statusCode).json({
        statusCode,
        message,
        data,
    });
};
