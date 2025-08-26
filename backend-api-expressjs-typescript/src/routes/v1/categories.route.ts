import categoriesController from '../../controllers/categories.controller';
import { authenticateToken } from '../../midlewares/auth.middleware';
import { authorize } from '../../midlewares/authorize.middleware';
import { Role } from '../../constants/role.constant';
import express, { Request, Response } from 'express';
const router = express.Router();

// Mảng dữ liệu mẫu
let categories = [
  { id: 1, name: 'E' },
  { id: 2, name: 'B' },
  { id: 3, name: 'N' },
];
//public route
router.get('/categories/tree', categoriesController.getCategoryTree);

//
//router.use(authenticateToken)
// GET all categories
router.get('/categories', categoriesController.findAll);
// GET category by id
router.get('/categories/:id', categoriesController.findById);
// POST - create new category (giả lập tạo mới với id từ URL)
router.post('/categories/:id', categoriesController.create);
// PUT - update category by id
router.put('/categories/:id', categoriesController.updateById);
// DELETE - remove category by id
router.delete('/categories/:id', categoriesController.deleteById)
router.post(
  '/',
  authenticateToken,
  authorize([Role.Admin, Role.Manager]),
  categoriesController.create
);
router.get(
  '/',
  authenticateToken,
  authorize([Role.Admin, Role.Staff]),
  categoriesController.findAll
);
router.post(
  '/',
  authenticateToken,
  authorize([Role.Admin]),
  categoriesController.create
);
export default router;
