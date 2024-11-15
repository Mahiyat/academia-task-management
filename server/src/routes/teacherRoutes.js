import express from "express";
import {
  getAllTeachers,
  updateTeacher,
} from "../controllers/teacherController.js";

// eslint-disable-next-line new-cap
const teacherRoutes = express.Router();

/**
 * GET /
 * @summary Retrieves all teachers.
 * @returns {Array<Teacher>} 200 - An array of teacher objects
 * @returns {Error} 500 - Server error
 */
teacherRoutes.get("/", getAllTeachers);

/**
 * PUT /:id
 * @summary Updates a teacher's information.
 * @param {string} id.path.required - The ID of the teacher to update.
 * @returns {Teacher} 200 - Teacher object updated successfully
 * @returns {Error} 500 - Server error
 */

teacherRoutes.put("/:id", updateTeacher);

export { teacherRoutes };
