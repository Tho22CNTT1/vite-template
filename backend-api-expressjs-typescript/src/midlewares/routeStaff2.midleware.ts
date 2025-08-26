import { Request, Response, NextFunction } from "express";

export const routeStaffMidleware2 = (req: Request, res: Response, next: NextFunction) => {

    console.log('Middleware đang chạy')
    next();
}