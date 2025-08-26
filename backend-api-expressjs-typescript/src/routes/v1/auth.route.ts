import express from 'express';
import * as authController from '../../controllers/auth.controller';
import { authApiKey } from '../../midlewares/authApiKey.middleware';
import { authenticateToken } from '../../midlewares/auth.middleware';

const router = express.Router();

// ✅ POST /api/v1/auth/login
router.post('/login', authController.login);

// ✅ POST /api/v1/auth/register (nếu có)
router.post('/refresh-token', authController.refreshToken);
router.post('/get-profile', authenticateToken, authController.getProfile);

/*// ✅ GET /api/v1/auth/me (lấy thông tin người dùng hiện tại)
router.get('/me', authController.getMe); 

// ✅ POST /api/v1/auth/refresh-token (làm mới token)
router.post('/refresh-token', authController.refreshToken); 

// ✅ POST /api/v1/auth/logout
router.post('/logout', authController.logout);  */
router.get('/protected', authApiKey, (req, res) => {
    res.json({ message: 'You passed API Key check' });
});
export default router;
