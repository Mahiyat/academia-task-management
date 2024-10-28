import express from 'express';
import { showPriorityTasks } from '../controllers/teacherDashboardController.js';

// eslint-disable-next-line new-cap
const teacherDashboardRoutes = express.Router();


// Route to get all courses
teacherDashboardRoutes.get('/:teacherId', showPriorityTasks);

export  { teacherDashboardRoutes };
