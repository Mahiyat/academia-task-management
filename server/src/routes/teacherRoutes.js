import express from 'express';
import { getAllTeachers,updateTeacher} from '../controllers/teacherController.js';

// eslint-disable-next-line new-cap
const teacherRoutes = express.Router();

// getAllTeachers

teacherRoutes.get('/', getAllTeachers);
teacherRoutes.put('/:id', updateTeacher);

export  { teacherRoutes };
