import express from "express";
import { submitAssessment } from "../service/assessmentController.js";
import { protect } from "./authMiddleware.js";

const router = express.Router();

router.post("/", protect, submitAssessment);

export default router;
