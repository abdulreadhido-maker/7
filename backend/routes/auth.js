```javascript
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../database.js";

const router = express.Router();

/*
 * إنشاء حساب
 */
router.post("/register", async (req, res) => {

    try {

        const { full_name, username, email, password } = req.body;

        if (!full_name || !username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "يرجى تعبئة جميع الحقول"
            });
        }

        const [users] = await db.query(
            "SELECT id FROM users WHERE email=? OR username=?",
            [email, username]
        );

        if (users.length > 0) {
            return res.status(409).json({
                success: false,
                message: "البريد الإلكتروني أو اسم المستخدم مستخدم بالفعل"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.query(
            `INSERT INTO users
            (full_name, username, email, password)
            VALUES (?, ?, ?, ?)`,
            [full_name, username, email, hashedPassword]
        );

        res.status(201).json({
            success: true,
            message: "تم إنشاء الحساب بنجاح"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "حدث خطأ في الخادم"
        });

    }

});

/*
 * تسجيل الدخول
 */
router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const [users] = await db.query(
            "SELECT * FROM users WHERE email=?",
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                message: "بيانات الدخول غير صحيحة"
            });
        }

        const user = users[0];

        const validPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: "بيانات الدخول غير صحيحة"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET || "torrema_secret_key",
            {
                expiresIn: "7d"
            }
        );

        res.json({
            success: true,
            token,
            user: {
                id: user.id,
                full_name: user.full_name,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "حدث خطأ في الخادم"
        });

    }

});

export default router;
```
