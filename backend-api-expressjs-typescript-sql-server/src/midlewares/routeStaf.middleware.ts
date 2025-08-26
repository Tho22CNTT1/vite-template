import { Request, Response, NextFunction } from "express";

export const routeStaffMidleware = (req: Request, res: Response, next: NextFunction) => {
    res.locals.user = {
        id: '123',
        name: 'john dane',
        role: 'staff'
    }
    console.log('Middleware đang chạy')
    next();
}