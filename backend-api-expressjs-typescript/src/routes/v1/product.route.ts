import { Router } from 'express';
import multer from 'multer';
import { authenticateToken } from '../../midlewares/auth.middleware';
import {
    getAllProducts,
    findHomeProducts,
    getProductsByCategorySlug,
    getProductBySlug,
    uploadSingle,
} from '../../controllers/product.controller';
import path from 'path';
import { buildSlug } from '../../ultis/buildSlug.ultis';
// Cấu hình multer: lưu tạm vào public/uploads/
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        const pathInfo = path.parse(file.originalname);
        // Dùng slugify cho tên file (không dấu, không ký tự đặc biệt)
        const safeName = buildSlug(pathInfo.name);

        cb(null, `${pathInfo.name}-${uniqueSuffix}${pathInfo.ext}`);
    },
});

const upload = multer({ storage: storage });
const router = Router();

/**
 * PUBLIC ROUTES
 */

// GET /api/v1/products/home
router.get('/home', findHomeProducts);

// GET /api/v1/products/home/:catId
router.get('/home/:catId', findHomeProducts);

// GET /api/v1/products/category/:slug
router.get('/category/:slug', getProductsByCategorySlug);

// GET /api/v1/products/detail/:slug
router.get('/detail/:slug', getProductBySlug);

/**
 * PRIVATE ROUTES (yêu cầu login)
 */
// router.use(authenticateToken);

// POST /api/v1/products/upload-single
router.post('/upload-single', upload.single('file'), uploadSingle);

// GET /api/v1/products
router.get('/', getAllProducts);

export default router;
