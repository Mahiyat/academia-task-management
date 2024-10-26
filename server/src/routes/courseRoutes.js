import express from 'express';
import { createNewCourse, getAllCourses } from '../controllers/courseController.js';

// eslint-disable-next-line new-cap
const courseRoutes = express.Router();

// Route to create a new course
courseRoutes.post('/', createNewCourse);

// Route to get all courses
courseRoutes.get('/', getAllCourses);

export  { courseRoutes };
