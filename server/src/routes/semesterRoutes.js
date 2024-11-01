import express from 'express';
import { getAllSemesters, updateSemester ,createSemester } from '../controllers/semesterController.js';


const semesterRoutes = express.Router();

// getAllSemesters

semesterRoutes.get('/', getAllSemesters);
semesterRoutes.post('/', createSemester);
semesterRoutes.post('/updatedSemester', updateSemester);

export  { semesterRoutes };
