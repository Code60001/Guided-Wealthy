import express from "express";
import { saveRetirementAnalysis, getRetirementAnalysis } from "../service/retirementController.js";
import { protect } from "./authMiddleware.js";

const router = express.Router();

router.post("/", protect, saveRetirementAnalysis);
router.get("/", protect, getRetirementAnalysis);

export default router;
