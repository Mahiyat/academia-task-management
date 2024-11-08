import express from "express";
import { getSemesterProgress } from "../controllers/semesterProgressController.js";

const progressRoutes = express.Router();

// Route to get semester progress
progressRoutes.get('/:semesterId', getSemesterProgress);

export { progressRoutes } ;
