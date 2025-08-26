import { Router } from 'express';
import categoriesController from '../../controllers/categories.controller';

const router = Router();

router.get('/', categoriesController.findAll);
router.get('/:id', categoriesController.findById);
router.post('/', categoriesController.create);
router.put('/:id', categoriesController.updateById);
router.delete('/:id', categoriesController.deleteById);

export default router;
