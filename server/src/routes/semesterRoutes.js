import express from "express";
import {
  getAllSemesters,
  updateSemester,
  createSemester,
  addExamCommitteeMember,
} from "../controllers/semesterController.js";

// eslint-disable-next-line new-cap
const semesterRoutes = express.Router();

/**
 * GET /
 * @summary Retrieves all semesters.
 * @returns {Array<Semester>} 200 - An array of semester objects
 * @returns {Error} 500 - Server error
 */
semesterRoutes.get("/", getAllSemesters);

/**
 * POST /semester
 * @summary Route to create a new semester.
 * @returns {object} 201 - Successfully created semester with details
 * @returns {object} 400 - Bad request, possibly due to missing or invalid fields
 * @returns {object} 500 - Internal server error
 */
semesterRoutes.post('/', createSemester);

/**
 * PUT /updatedSemester/:id
 * @summary Updates a semester's details by ID.
 * @param {string} id.path.required - The ID of the semester to update
 * @param {object} semester.body.required - The updated semester data
 * @returns {Semester} 200 - The updated semester object
 * @returns {Error} 404 - Semester not found
 * @returns {Error} 400 - Bad request
 */
semesterRoutes.put("/updatedSemester/:id", updateSemester);

/**
 * PUT /:id/examCommittee
 * @summary Adds a teacher to the exam committee of a specific semester.
 * @param {string} id.path.required - The ID of the semester
 * @param {string} teacherId.body.required - The ID of the teacher to add to the exam committee
 * @returns {Semester} 200 - The updated semester object with the new exam committee member
 * @returns {Error} 404 - Semester not found
 * @returns {Error} 400 - Bad request
 */
semesterRoutes.put("/:id/examCommittee", addExamCommitteeMember);

export { semesterRoutes };
