import express from 'express';
import { getCoursesByTeacher } from '../controllers/performanceController.js';

// eslint-disable-next-line new-cap
const performanceRoutes = express.Router();

// Route to get courses by teacher ID
performanceRoutes.get('/:teacherId', getCoursesByTeacher);

export {performanceRoutes};

