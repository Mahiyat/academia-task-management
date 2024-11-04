import express from 'express';
import { getSemesterProgress } from '../controllers/semesterProgressTrackingController.js';

// eslint-disable-next-line new-cap
const semesterProgressTrackingRoutes = express.Router();

semesterProgressTrackingRoutes.get('/semester/:semesterId/progress', getSemesterProgress);

export {semesterProgressTrackingRoutes};
