import express, { type Request, type Response, type NextFunction } from 'express';
import categoriesRouter from './routes/v1/categories.route';
import dotenv from 'dotenv';
import categoriesRouterv2 from './routes/v2/categories.route';
import router from './routes/v1/test.route';
import createError from 'http-errors';
import cors from 'cors';
import productRoutes from './routes/v1/product.route';
dotenv.config({ path: '.env' });

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware: parse JSON
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello api',

  });
});

// Use categories router
app.use('/api/v1', categoriesRouter);
app.use('/api/v2', categoriesRouterv2);
app.use('/api/v1', router)
app.use('/api/v1/products', productRoutes);

// 404 handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// Optional: general error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err.stack);
  res.status(err.status || 500).json({
    statusCode: err.status || 500,
    message: err.message || 'Internal Server Error',
  });
});

export default app;
