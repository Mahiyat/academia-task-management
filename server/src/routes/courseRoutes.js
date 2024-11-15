import express from "express";
import {
  createNewCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getCoursesBySemester,
} from "../controllers/courseController.js";

// eslint-disable-next-line new-cap
const courseRoutes = express.Router();

/**
 * POST /
 * @param {Course.model} course.body.required - The course object to create
 * @returns {object} 201 - The created course
 * @returns {Error}  500 - Error message
 */
courseRoutes.post("/", createNewCourse);

/**
 * GET /
 * @returns {Array.<Course>} 200 - An array of courses
 * @returns {Error}  500 - Error message
 */
courseRoutes.get("/", getAllCourses);

/**
 * GET /:id
 * @param {string} id.path.required - The ID of the course to retrieve
 * @returns {Course.model} 200 - The requested course
 * @returns {Error}  404 - Course not found
 * @returns {Error}  500 - Error message
 */
courseRoutes.get("/:id", getCourseById);

/**
 * PUT /:id
 * @param {string} id.path.required - The ID of the course to update
 * @param {Course.model} course.body.required - The course object to update
 * @returns {object} 200 - The updated course
 * @returns {Error}  404 - Course not found
 * @returns {Error}  500 - Error message
 */
courseRoutes.put("/:id", updateCourse);

/**
 * DELETE /:id
 * @param {string} id.path.required - The ID of the course to delete
 * @returns {object} 200 - A success message
 * @returns {Error}  404 - Course not found
 * @returns {Error}  500 - Error message
 */
courseRoutes.delete("/:id", deleteCourse);

/**
 * GET /semesters/:semesterId
 * @param {string} semesterId.path.required - The ID of the semester to get courses for
 * @returns {Array.<Course>} 200 - An array of courses for the semester
 * @returns {Error}  404 - No courses found for this semester
 * @returns {Error}  500 - Error message
 */
courseRoutes.get("/semesters/:semesterId", getCoursesBySemester);

export { courseRoutes };
