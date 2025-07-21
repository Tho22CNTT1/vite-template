import { Router } from 'express';
import { getAllProducts } from '../../controllers/product.controller';

const router = Router();

router.get('/', getAllProducts); // GET /api/v1/products

export default router;
