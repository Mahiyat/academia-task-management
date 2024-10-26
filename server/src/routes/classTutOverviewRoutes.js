// routes/classTutOverviewRoutes.js
import express from 'express';
import { getClassTutOverview } from '../controllers/classTutOverviewController.js';

// eslint-disable-next-line new-cap
const classTutOverviewRoutes = express.Router();

/**
 * GET /:teacherId
 * @summary Route to get an overview of classes and tutorials for a specific teacher.
 * @param {string} path.teacherId - The ID of the teacher to fetch data for.
 * @returns {object} 200 - The overview data.
 * @returns {Error} 404 - No course data available.
 * @returns {Error} 505 - Server error.
 */
classTutOverviewRoutes.get('/:teacherId', getClassTutOverview);

export { classTutOverviewRoutes };
