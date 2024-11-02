// routes/classTutOverviewRoutes.js
import express from 'express';
import { getClassTutOverview } from '../controllers/classTutOverviewController.js';

// eslint-disable-next-line new-cap
const classTutOverviewRoutes = express.Router();

// Route to get an overview of classes and tutorials for a specific teacher
classTutOverviewRoutes.get('/:teacherId', getClassTutOverview);

export { classTutOverviewRoutes };
