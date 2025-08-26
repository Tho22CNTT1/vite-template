/* import { Request, Response, NextFunction } from 'express';
import Product from '../models/Product.model';
import { sendJsonSuccess } from '../helpers/responsive.helper';
import * as productsService from '../services/products.service'; export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        return res.json({ message: 'success', products });
    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await productsService.findAll(req.query);
        sendJsonSuccess(res, products);
    } catch (error) {
        next(error);
    }
}; */