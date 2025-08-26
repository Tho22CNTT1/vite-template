// src/routes/v1/index.ts
import express from "express";
import staffRoutes from "./staff.route";
import productRoutes from "./product.route";
import testRoutes from "./test.route";
import categoriesRouter from "./categories.route";
import authRouter from './auth.route';
const router = express.Router();
router.use('/auth', authRouter);
router.use('/staffs', staffRoutes);
router.use('/products', productRoutes);
router.use('/test', testRoutes);
router.use('/categories', categoriesRouter);
export default router;
