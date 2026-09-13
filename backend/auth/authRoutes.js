import express from "express";
import { authUser, adminLogin, registerPartnerAdvisor } from "../service/authService.js";
import { protect, admin } from "./authMiddleware.js";

const router = express.Router();

router.post("/login", authUser); // User Firebase OTP login
router.post("/admin-login", adminLogin); // Admin env login
router.post("/register-partner-advisor", protect, admin, registerPartnerAdvisor); // Admin only Partner/Advisor registration

export default router;
