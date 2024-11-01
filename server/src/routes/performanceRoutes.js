import express from 'express';
import { getCoursePerformance } from '../controllers/performanceController.js';

// eslint-disable-next-line new-cap
const performanceRoutes = express.Router();

// Route to get course performance data for a teacher
performanceRoutes.get('/:teacherId', getCoursePerformance);

export {performanceRoutes};
