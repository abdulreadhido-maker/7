```javascript
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// الصفحة الرئيسية للـ API
app.get("/", (req, res) => {
    res.json({
        success: true,
        name: "Torrema API",
        version: "1.0.0",
        message: "مرحبًا بك في واجهة Torrema البرمجية"
    });
});

// اختبار حالة الخادم
app.get("/api/status", (req, res) => {
    res.json({
        status: "online",
        uptime: process.uptime(),
        time: new Date()
    });
});

// تشغيل الخادم
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Torrema Server Running On Port ${PORT}`);
});
```
