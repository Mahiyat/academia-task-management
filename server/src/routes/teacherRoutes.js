import express from 'express';
import { getAllTeachers} from '../controllers/teacherController.js';

// eslint-disable-next-line new-cap
const teacherRoutes = express.Router();

// getAllTeachers

teacherRoutes.get('/', getAllTeachers);

export  { teacherRoutes };
