import express from "express";
import { signup, login, logout, updateProfile, checkAuth, requestPasswordOtp, resetPasswordWithOtp } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
// Temporarily disabled - Arc jet causing timeout issues
// import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = express.Router();

// Temporarily disabled - causing timeout issues in Kubernetes
// router.use(arcjetProtection);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/request-otp", requestPasswordOtp);
router.post("/reset-password", resetPasswordWithOtp);
router.get("/check", protectRoute, checkAuth);

router.put("/update-profile", protectRoute, updateProfile);

export default router;
