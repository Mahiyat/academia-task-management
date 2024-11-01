import express from 'express';
import { getAllTeachers, getTeacherById, getTeacherCourses}
  from '../controllers/performanceController.js';


// eslint-disable-next-line new-cap
const performanceRoutes = express.Router();


performanceRoutes.get('/teacher', getAllTeachers);
performanceRoutes.get('/teacher/:id', getTeacherById);
performanceRoutes.get('/teacherCourse/:id', getTeacherCourses);




export {performanceRoutes};

