import express from 'express';
import { getAllSemesters, updateSemester } from '../controllers/semesterController.js';

// eslint-disable-next-line new-cap
const semesterRoutes = express.Router();

// getAllSemesters

semesterRoutes.get('/', getAllSemesters);
semesterRoutes.put('/updatedSemester/:id', updateSemester);

export  { semesterRoutes };
