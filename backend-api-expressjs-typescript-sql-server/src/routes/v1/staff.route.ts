/* // src/routes/api/staff.route.ts
import express from 'express';
import * as staffController from '../../controllers/staff.controller';
import { routeStaffMidleware } from '../../midlewares/routeStaf.middleware';
import { routeStaffMidleware2 } from '../../midlewares/routeStaff2.midleware';
import staffValidation from '../../validations/staff.validation';
import validateSchemaYup from '../../midlewares/validateSchema.midleware';
import { authenticateToken } from '../../midlewares/auth.middleware';

const router = express.Router();

// Middleware áp dụng cho tất cả route
router.use(routeStaffMidleware);

// GET all staff (với middleware riêng)
router.get(
    '/',
    routeStaffMidleware2,
    validateSchemaYup(staffValidation.findAll),
    staffController.findAll
);

// POST - tạo staff mới
router.post(
    '/',
    validateSchemaYup(staffValidation.createStaff),
    staffController.create
);

// GET - lấy staff theo ID
router.get(
    '/:id', authenticateToken,
    validateSchemaYup(staffValidation.findById),
    staffController.findOne
);

// PUT - cập nhật staff theo ID
router.put(
    '/:id',
    validateSchemaYup(staffValidation.updateById),
    staffController.update
);

// DELETE - xóa staff theo ID
router.delete(
    '/:id',
    validateSchemaYup(staffValidation.deleteById),
    staffController.deleteStaff
);

export default router;
 */