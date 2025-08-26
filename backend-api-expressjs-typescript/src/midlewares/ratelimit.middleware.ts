// src/middlewares/rateLimit.middleware.ts
import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 phút
    max: 10, // giới hạn 10 request / IP / phút
    message: {
        statusCode: 429,
        message: 'Too many requests, please try again later.',
    },
    standardHeaders: true, // trả về thông tin rate-limit trong headers
    legacyHeaders: false,  // tắt các header cũ (X-RateLimit-*)
});
