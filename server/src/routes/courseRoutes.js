import express from 'express';
import { createNewCourse, getAllCourses, getCourseById, updateCourse, deleteCourse } 
  from '../controllers/courseController.js';

// eslint-disable-next-line new-cap
const courseRoutes = express.Router();

// Route to create a new course
courseRoutes.post('/', createNewCourse);

// Route to get all courses
courseRoutes.get('/', getAllCourses);

// Route to get a specific course by ID
courseRoutes.get('/:id', getCourseById);

// Route to update a specific course by ID
courseRoutes.put('/:id', updateCourse);

// Route to delete a specific course by ID
courseRoutes.delete('/:id', deleteCourse);

export  { courseRoutes };