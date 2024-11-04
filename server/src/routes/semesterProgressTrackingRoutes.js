import express from 'express';
<<<<<<< HEAD
import { getAllSemestersProgress, getSemesterProgress } 
  from '../controllers/semesterProgressTrackingController.js';
=======
import { getSemesterProgress } from '../controllers/semesterProgressTrackingController.js';
>>>>>>> 655b710 (add semesterprogress tracking frontend+backend)

// eslint-disable-next-line new-cap
const semesterProgressTrackingRoutes = express.Router();

semesterProgressTrackingRoutes.get('/semester/:semesterId/progress', getSemesterProgress);
<<<<<<< HEAD
semesterProgressTrackingRoutes.get('/semesters', getAllSemestersProgress);
=======
>>>>>>> 655b710 (add semesterprogress tracking frontend+backend)

export {semesterProgressTrackingRoutes};
