import Semester from "../models/Semester.js";

/**
 * Fetches all Semesters from the database.
 * @returns {Promise<Array>} An array of all teacher documents.
 */

const getAllSemesters = async () => {
  const semesters = await Semester.find()
    .populate("courses")
    .populate("examCommittee");

  console.log(semesters);
  return semesters;
};

/**
 * Updates a semester with the provided data.
 * @param {string} semesterId - The ID of the semester to update.
 * @param {Object} updatedSemester - The data to update the semester with.
 * @returns {Promise<Object|null>} The updated semester document, or null if not found.
 */
const updateSemester = async (semesterId, updatedSemester) => {
  const updatedNewSemester = await Semester.findByIdAndUpdate(
    semesterId,
    updatedSemester,
    { new: true }
  );

  return updatedNewSemester;
};

/**
 * Adds a teacher to the exam committee of a semester.
 * @param {string} semesterId - The ID of the semester.
 * @param {string} teacherId - The ID of the teacher to add to the exam committee.
 * @returns {Promise<Object|null>} The updated semester document, or null if not found.
 */
const addExamCommitteeMember = async (semesterId, teacherId) => {
  const updatedSemester = await Semester.findByIdAndUpdate(
    semesterId,
    { $push: { examCommittee: teacherId } },
    { new: true }
  );

  return updatedSemester;
};


export default {
  getAllSemesters,
  updateSemester,
  addExamCommitteeMember,
};
