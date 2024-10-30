import express from 'express';
import { getAllSemesters, updateSemester ,createSemester } from '../controllers/semesterController.js';

// eslint-disable-next-line new-cap
const semesterRoutes = express.Router();

// getAllSemesters

semesterRoutes.get('/', getAllSemesters);
semesterRoutes.post('/', createSemester);
semesterRoutes.post('/updatedSemester', updateSemester);

export  { semesterRoutes };
