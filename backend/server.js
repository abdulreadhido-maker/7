import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// ربط مسارات تسجيل الدخول وإنشاء الحساب
app.use("/api/auth", authRoutes);

// الصفحة الرئيسية
app.get("/", (req, res) => {
    res.json({
        success: true,
        name: "Torrema API",
        version: "1.0.0"
    });
});

// حالة الخادم
app.get("/api/status", (req, res) => {
    res.json({
        status: "online",
        uptime: process.uptime()
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Torrema Server Running On Port ${PORT}`);
});
