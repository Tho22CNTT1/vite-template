import categoriesController from '../../controllers/categories.controller'; import express, { Request, Response } from 'express';
const router = express.Router();

// Mảng dữ liệu mẫu
let categories = [
  { id: 1, name: 'E' },
  { id: 2, name: 'B' },
  { id: 3, name: 'N' },
];

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

export default router;
