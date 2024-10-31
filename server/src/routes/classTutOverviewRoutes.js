import express from 'express';

import {getClassTutOverview} from '../controllers/classTutOverviewController.js';


// eslint-disable-next-line new-cap
const classTutOverviewRoutes = express.Router();

// Route to get course overview by courseId
classTutOverviewRoutes.get('/:courseId', getClassTutOverview);

export { classTutOverviewRoutes };

