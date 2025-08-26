import { Router } from 'express';
import testRoute from './test.route';

// Nếu có middleware checkApiKey, thì đừng dùng ở đây cho testRoute
const router = Router();

router.use('/test', testRoute);

export default router;
