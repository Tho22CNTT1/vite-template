// src/server.ts
import { env } from './helpers/env.helpers.js';
import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const PORT = env.PORT || 8080;
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Batch-193';
// Kết nối MongoDB trước khi chạy server
mongoose.connect(env.MONGODB_URI)
    .then(() => {
    console.log('✅ Connected to MongoDB successfully');
    app.listen(PORT, () => {
        console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
})
    .catch((err) => {
    console.error('❌ Failed to connect to MongoDB:', err);
    process.exit(1); // Dừng tiến trình nếu không kết nối được DB
});
