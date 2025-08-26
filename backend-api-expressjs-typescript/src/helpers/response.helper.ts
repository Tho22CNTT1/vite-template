import { Response } from 'express';

export const sendJsonSuccess = (res: Response, data: any, statusCode = 200) => {
    res.status(statusCode).json({
        statusCode,
        message: 'Success',
        data,
    });
};
