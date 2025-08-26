// src/app.ts
import testRoutes from "./routes/v1/test.route"; import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import createError from "http-errors";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import productRoutes from "./routes/v1/product.route";
import authRoutes from "./routes/v1/auth.route";
import orderRoutes from "./routes/v1/order.route";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(compression());
app.use(helmet());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/test", testRoutes);
// Cấu hình thư mục public để truy cập tĩnh
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use("/uploads", express.static(path.join(process.cwd(), "public", "uploads")));

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "🚀 API is running",
    docs: "/api/v1"
  });
});
// 404 handler
app.use((req, res, next) => {
  next(createError(404, "Not Found"));
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error"
  });
});

export default app;
