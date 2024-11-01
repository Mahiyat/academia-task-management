import express from 'express';
import { getAllTeachers,updateTeacher} from '../controllers/teacherController.js';


const teacherRoutes = express.Router();

// getAllTeachers

teacherRoutes.get('/', getAllTeachers);
teacherRoutes.put('/:id', updateTeacher);

export  { teacherRoutes };
