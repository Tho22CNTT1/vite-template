import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import createError from 'http-errors';
import compression from 'compression';
import helmet from 'helmet';

import v1Routes from './routes/v1';
import router from './routes/v1/categories.route';
// import { authApiKey } from './middlewares/authApiKey.middleware';
// import { rateLimiter } from './middlewares/ratelimit.middleware';
// import { appExample } from './middlewares/appExample.middleware';

dotenv.config();

const app = express();

// ✅ Security and performance middleware
app.use(helmet());
app.use(compression());

// ✅ Request parsing middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ✅ Rate limit middleware nếu cần
// app.use(rateLimiter);

// ✅ Route versions
app.use('/api/v1', v1Routes);
app.use('/api/v1/categories', router); // Đặt đúng endpoint

// ✅ Root test route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Hello api',
  });
});

// ✅ 404 handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// ✅ Error handler (fix lỗi TypeScript bằng cách thêm kiểu `any`)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    statusCode: err.status || 500,
    message: err.message || 'Internal Server Error',
  });
});

export default app;
