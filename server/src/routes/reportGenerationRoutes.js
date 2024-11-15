import express from "express";
import { getCourseReport } from "../controllers/reportGenerationController.js";

// eslint-disable-next-line new-cap
const reportGenerationRoutes = express.Router();

/**
 * @summary GET route for generating a consolidated report for all courses taught
 * by a specific teacher.
 * @param {string} teacherId.path.required - The ID of the teacher whose course
 * report needs to be generated.
 * @returns {object} 200 - Returns a consolidated report object
 * @returns {object} 200 - If the teacher has no courses, returns a message indicating
 * no courses found.
 * @returns {Error} 404 - Teacher not found
 * @returns {Error} 500 - Error Message
 */

reportGenerationRoutes.get("/:teacherId", getCourseReport);

export { reportGenerationRoutes };
