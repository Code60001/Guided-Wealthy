import express from "express";
import { submitAssessment, getAssessment } from "../service/assessmentController.js";
import { protect } from "./authMiddleware.js";

const router = express.Router();

router.post("/", protect, submitAssessment);
router.get("/", protect, getAssessment);

export default router;
