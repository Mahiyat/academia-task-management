import express from 'express';
import {
  createNewCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getCoursesBySemester,
} from '../controllers/courseController.js';

// eslint-disable-next-line new-cap
const courseRoutes = express.Router();

/**
 * @route POST /courses
 * @group Courses - Operations about courses
 * @param {Course.model} course.body.required - The course object to create
 * @returns {object} 201 - The created course
 * @returns {Error}  500 - Error message
 */
courseRoutes.post('/', createNewCourse);

/**
 * @route GET /courses
 * @group Courses - Operations about courses
 * @returns {Array.<Course>} 200 - An array of courses
 * @returns {Error}  500 - Error message
 */
courseRoutes.get('/', getAllCourses);

/**
 * @route GET /courses/{id}
 * @group Courses - Operations about courses
 * @param {string} id.path.required - The ID of the course to retrieve
 * @returns {Course.model} 200 - The requested course
 * @returns {Error}  404 - Course not found
 * @returns {Error}  500 - Error message
 */
courseRoutes.get('/:id', getCourseById);

/**
 * @route PUT /courses/{id}
 * @group Courses - Operations about courses
 * @param {string} id.path.required - The ID of the course to update
 * @param {Course.model} course.body.required - The course object to update
 * @returns {object} 200 - The updated course
 * @returns {Error}  404 - Course not found
 * @returns {Error}  500 - Error message
 */
courseRoutes.put('/:id', updateCourse);

/**
 * @route DELETE /courses/{id}
 * @group Courses - Operations about courses
 * @param {string} id.path.required - The ID of the course to delete
 * @returns {object} 200 - A success message
 * @returns {Error}  404 - Course not found
 * @returns {Error}  500 - Error message
 */
courseRoutes.delete('/:id', deleteCourse);

/**
 * @route GET /courses/semesters/{semesterId}
 * @group Courses - Operations about courses
 * @param {string} semesterId.path.required - The ID of the semester to get courses for
 * @returns {Array.<Course>} 200 - An array of courses for the semester
 * @returns {Error}  404 - No courses found for this semester
 * @returns {Error}  500 - Error message
 */
courseRoutes.get('/semesters/:semesterId', getCoursesBySemester);

export { courseRoutes };
