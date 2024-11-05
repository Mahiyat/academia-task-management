// routes/reportRoutes.js
import express from 'express';
import { getCourseReport } from '../controllers/reportGenerationController.js';

// eslint-disable-next-line new-cap
const reportGenerationRoutes = express.Router();

// Route for generating a report for a specific course
reportGenerationRoutes.get('/:teacherId', getCourseReport);

export { reportGenerationRoutes };
