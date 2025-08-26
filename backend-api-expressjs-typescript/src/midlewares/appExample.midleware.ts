import { Request, Response, NextFunction } from "express";

export const appExample = (req: Request, res: Response, next: NextFunction) => {
    console.log('Middleware đang chạy')
    next();
}