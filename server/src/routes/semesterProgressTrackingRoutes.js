import express from 'express';
import { getAllSemestersProgress, getSemesterProgress } from '../controllers/semesterProgressTrackingController.js';

// eslint-disable-next-line new-cap
const semesterProgressTrackingRoutes = express.Router();

semesterProgressTrackingRoutes.get('/semester/:semesterId/progress', getSemesterProgress);
semesterProgressTrackingRoutes.get('/semesters', getAllSemestersProgress);

export {semesterProgressTrackingRoutes};
