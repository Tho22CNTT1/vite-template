// src/controllers/product.controller.ts
import { Request, Response, NextFunction } from "express";
import Product from "../models/Product.model";
import Category from "../models/Category.model";
import createError from "http-errors";
import { sendJsonSuccess } from "../helpers/response.helper";
import * as productsService from "../services/products.service";
import { Types } from "mongoose";
import slugify from "slugify";
// === Upload test endpoint (tùy chọn) ===
export const uploadSingle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.file) {
            return res.status(400).json({ status: "error", message: "No file uploaded" });
        }
        // LƯU Ý: trả về /uploads/... (KHÔNG /public/uploads)
        return sendJsonSuccess(
            res,
            {
                filename: req.file.filename,
                originalname: req.file.originalname,
                path: `/uploads/${req.file.filename}`,
            },
            200
        );
    } catch (error) {
        next(error);
    }
};

// ========== HOME PRODUCTS ==========
export const findHomeProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const catId = req.params.catId;
        const limit = req.query.limit ? Number(req.query.limit) : undefined;

        if (limit !== undefined && Number.isNaN(limit)) {
            return next(createError(400, 'Query param "limit" must be a number'));
        }
        const products = await productsService.findHomeProducts({ catId, limit });
        sendJsonSuccess(res, products);
    } catch (error) {
        next(error);
    }
};

// ========== LIST ALL ==========
export const getAllProducts = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await Product.find();
        res.json({ status: "success", data: products });
    } catch (err) {
        next(createError(500, "Error fetching products"));
    }
};

// ========== BY CATEGORY SLUG ==========
export const getProductsByCategorySlug = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { slug } = req.params;
        const foundCategory = await Category.findOne({ slug });
        if (!foundCategory) return next(createError(404, "Category not found"));

        const products = await Product.find({ category: foundCategory._id });
        res.json({ status: "success", data: products });
    } catch (err) {
        next(createError(500, "Error fetching products by category slug"));
    }
};

// ========== BY PRODUCT SLUG ==========
export const getProductBySlug = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { slug } = req.params;
        const product = await Product.findOne({ slug }).populate("category brand");
        if (!product) return next(createError(404, "not found"));

        res.json({ status: "success", data: product });
    } catch (error) {
        next(createError(500, "error fetching"));
    }
};

// ========== CREATE (bắt req.file) ==========
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            product_name,
            price,
            stock,
            category_id,
            brand_id,
            discount,
            model_year,
            description,
            slug,
        } = req.body as any;

        if (!product_name) return next(createError(400, "product_name is required"));
        if (!category_id) return next(createError(400, "category_id is required"));
        if (!brand_id) return next(createError(400, "brand_id is required"));

        const priceNum = Number(price);
        const stockNum = Number(stock ?? 0);
        const discountNum = discount !== undefined ? Number(discount) : 0;
        const modelYearNum = model_year !== undefined ? Number(model_year) : undefined;

        if (Number.isNaN(priceNum)) return next(createError(400, "price must be a number"));
        if (Number.isNaN(stockNum)) return next(createError(400, "stock must be a number"));
        if (discount !== undefined && Number.isNaN(discountNum)) return next(createError(400, "discount must be a number"));
        if (model_year !== undefined && Number.isNaN(modelYearNum)) return next(createError(400, "model_year must be a number"));

        const doc = await Product.create({
            product_name,
            price: priceNum,
            stock: stockNum,
            discount: discountNum,
            model_year: modelYearNum,
            description,
            category_id: new Types.ObjectId(category_id),
            brand_id: new Types.ObjectId(brand_id),
            thumbnail: req.file ? `/uploads/${req.file.filename}` : undefined,
            slug: slug || slugify(product_name, { lower: true, strict: true }),
        });

        res.status(201).json({ message: "Tạo sản phẩm thành công", product: doc });
    } catch (err) {
        next(err);
    }
};

// ========== UPDATE (có thể thay ảnh) ==========
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return next(createError(404, "Product not found"));

        const b = req.body as any;

        if (b.product_name !== undefined) product.product_name = b.product_name;

        if (b.price !== undefined) {
            const n = Number(b.price);
            if (Number.isNaN(n)) return next(createError(400, "price must be a number"));
            product.price = n;
        }

        if (b.stock !== undefined) {
            const n = Number(b.stock);
            if (Number.isNaN(n)) return next(createError(400, "stock must be a number"));
            product.stock = n;
        }

        if (b.discount !== undefined) {
            const n = Number(b.discount);
            if (Number.isNaN(n)) return next(createError(400, "discount must be a number"));
            product.discount = n;
        }

        if (b.model_year !== undefined) {
            const n = Number(b.model_year);
            if (Number.isNaN(n)) return next(createError(400, "model_year must be a number"));
            product.model_year = n;
        }

        if (b.category_id !== undefined) product.category_id = new Types.ObjectId(b.category_id);
        if (b.brand_id !== undefined) product.brand_id = new Types.ObjectId(b.brand_id);
        if (b.description !== undefined) product.description = b.description;

        if (b.slug !== undefined) {
            product.slug = b.slug || slugify(product.product_name, { lower: true, strict: true });
        }

        // Ảnh mới (nếu có)
        if (req.file) product.thumbnail = `/uploads/${req.file.filename}`;

        await product.save();
        res.json({ message: "Cập nhật sản phẩm thành công", product });
    } catch (err) {
        next(err);
    }
};