import express from "express";
import { getSemesterProgress } from "../controllers/semesterProgressController.js";

const router = express.Router();

// Route to get semester progress
router.get("/:semesterId/progress", getSemesterProgress);

export default router;
