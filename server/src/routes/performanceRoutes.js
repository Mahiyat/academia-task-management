/* eslint-disable jsdoc/check-tag-names */
import express from 'express';
import { getAllTeachers, getTeacherById, getTeacherCourses } 
  from '../controllers/performanceController.js';

// eslint-disable-next-line new-cap
const performanceRoutes = express.Router();

/**
 * Route to get all teachers.
 * 
 * @name GetAllTeachers
 * @route GET /teacher
 * @group Teacher - Operations about teachers
 * @returns {Array.<object>} 200 - An array of teacher objects
 * @returns {Error} 500 - Internal server error
 */
performanceRoutes.get('/teacher', getAllTeachers);

/**
 * Route to get a specific teacher by ID.
 * 
 * @name GetTeacherById
 * @route GET /teacher/:id
 * @group Teacher - Operations about teachers
 * @param {string} id.path.required - Teacher's unique ID
 * @returns {object} 200 - Teacher object
 * @returns {Error} 404 - Teacher not found
 * @returns {Error} 500 - Internal server error
 */
performanceRoutes.get('/teacher/:id', getTeacherById);

/**
 * Route to get courses for a specific teacher by their ID.
 * 
 * @name GetTeacherCourses
 * @route GET /teacherCourse/:id
 * @group Teacher - Operations about teachers
 * @param {string} id.path.required - Teacher's unique ID
 * @returns {Array.<object>} 200 - An array of course objects for the specified teacher
 * @returns {Error} 404 - Course data missing for the specified teacher
 * @returns {Error} 500 - Internal server error
 */
performanceRoutes.get('/teacherCourse/:id', getTeacherCourses);

export { performanceRoutes };
