import express from 'express';
import { getAllCourses, getCourseById, getTeacherById, getTeacherCourses}
  from '../controllers/performanceController.js';


// eslint-disable-next-line new-cap
const performanceRoutes = express.Router();


//performanceRoutes.get('/', getAllCourses);
//performanceRoutes.get('/:id', getTeacherById);
performanceRoutes.get('/:id', getTeacherCourses);




export {performanceRoutes};

