import express from "express";
import { getSemesterProgress } from "../controllers/semesterProgressController.js";

// eslint-disable-next-line new-cap
const progressRoutes = express.Router();

/**
 * @module progressRoutes
 * @description Defines routes for retrieving semester progress data.
 */

/**
 * GET /:semesterId
 * @summary Retrieves progress data for a specified semester.
 * @function
 * @memberof module:progressRoutes
 * @param {string} semesterId - Unique identifier for the semester to fetch progress data.
 * @returns {object} 200 - An object containing the semester's progress details.
 * @returns {Error} 500 - Server error.
 */
progressRoutes.get('/:semesterId', getSemesterProgress);

export { progressRoutes };
