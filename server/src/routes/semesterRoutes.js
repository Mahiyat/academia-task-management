import express from "express";
import {
  addExamCommitteeMember,
  getAllSemesters,
  updateSemester,
} from "../controllers/semesterController.js";

// eslint-disable-next-line new-cap
const semesterRoutes = express.Router();

/**
 * GET / - Retrieves all semesters.
 * @route GET /
 * @group Semesters - Operations related to semesters
 * @returns {Array<Semester>} 200 - An array of semester objects
 * @returns {Error} 500 - Server error
 */
semesterRoutes.get("/", getAllSemesters);

/**
 * PUT /updatedSemester/:id - Updates a semester's details by ID.
 * @route PUT /updatedSemester/{id}
 * @group Semesters - Operations related to semesters
 * @param {string} id.path.required - The ID of the semester to update
 * @param {object} semester.body.required - The updated semester data
 * @returns {Semester} 200 - The updated semester object
 * @returns {Error} 404 - Semester not found
 * @returns {Error} 400 - Bad request
 */
semesterRoutes.put("/updatedSemester/:id", updateSemester);

/**
 * PUT /:id/examCommittee - Adds a teacher to the exam committee of a specific semester.
 * @route PUT /{id}/examCommittee
 * @group Semesters - Operations related to semesters
 * @param {string} id.path.required - The ID of the semester
 * @param {string} teacherId.body.required - The ID of the teacher to add to the exam committee
 * @returns {Semester} 200 - The updated semester object with the new exam committee member
 * @returns {Error} 404 - Semester not found
 * @returns {Error} 400 - Bad request
 */
semesterRoutes.put("/:id/examCommittee", addExamCommitteeMember);

export { semesterRoutes };
