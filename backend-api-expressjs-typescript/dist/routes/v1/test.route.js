// src/routes/test.route.ts
import express from "express";
import { generateAccessToken, verifyAccessToken } from "../../ultis/token.ultis";
import nodemailer from "nodemailer";
const router = express.Router();
// NÊN dùng .env (đừng hardcode)
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587, // 587 + secure:false (STARTTLS)
    secure: false,
    auth: {
        user: process.env.SMTP_USER, // ví dụ: your@gmail.com
        pass: process.env.SMTP_APP_PASS, // app password
    },
});
// Test token
router.get("/", (req, res) => {
    const token = generateAccessToken({
        id: "12345",
        email: "test@gmail.com",
        role: "user",
    });
    const user = verifyAccessToken(token);
    res.json({ message: "working token", token, user });
});
// Gửi mail
// Gửi mail
router.post("/send-mail", async (req, res) => {
    try {
        // Ưu tiên body, fallback sang query
        const to = req.body?.to ||
            req.query.to ||
            "swiftlove218@gmail.com";
        const subject = req.body?.subject ||
            req.query.subject ||
            `Test email ${Date.now()}`;
        const text = req.body?.text ||
            req.query.text ||
            "Hello world!";
        const info = await transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: subject || `Test email ${Date.now()}`,
            text: text || "Hello world!",
        });
        res.json({ message: "success", messageId: info.messageId });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "failed" });
    }
});
export default router;
