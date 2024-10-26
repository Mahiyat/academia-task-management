import express from 'express';
import { showPriorityTasks } from '../controllers/teacherDashboardController.js';

// eslint-disable-next-line new-cap
const teacherDashboardRoutes = express.Router();


/**
 * GET /:teacherId
 * @summary Retrieves and returns sorted priority tasks for a specific teacher.
 * @param {string} teacherId - Unique identifier for the teacher whose tasks are being retrieved.
 * @returns {Array<Task>} 200 - An array of tasks sorted by deadline and priority.
 * @returns {Error} 500 - Server error
 */
teacherDashboardRoutes.get('/:teacherId', showPriorityTasks);

export  { teacherDashboardRoutes };
