import Semester from "../models/Semester.js";

/**
 * Fetches all Semesters from the database.
 * @returns {Promise<Array>} An array of all teacher documents.
 */

const getAllSemesters = async () => {
  const semesters = await Semester.find()
    .populate("courses")
    .populate("examCommittee");

  return semesters;
};

/**
 * Creates a new semester.
 * @param {object} semesterData - The data for the semester to create.
 * @returns {Promise<Semester>} The created semester.
 */
const createSemester = async (semesterData) => {
  const semester = new Semester(semesterData);

  return await semester.save();
};

/**
 * Updates a semester with the provided data.
 * @param {string} semesterId - The ID of the semester to update.
 * @param {object} updatedSemester - The data to update the semester with.
 * @returns {Promise<object|null>} The updated semester document, or null if not found.
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
 * @returns {Promise<object|null>} The updated semester document, or null if not found.
 */
const addExamCommitteeMember = async (semesterId, teacherId) => {
  const updatedSemester = await Semester.findByIdAndUpdate(
    semesterId,
    { $push: { examCommittee: teacherId } },
    { new: true }
  );

  return updatedSemester;
};

const getSemesters = async () => {
  const semesters = await Semester.find();

  return semesters;
};

const getCoursesBySemesterId = async (semesterId) => {
  console.log(semesterId);
  const semester = await Semester.findById(semesterId).populate("courses");

  if (!semester) {
    console.log("semster is not found");
    return null;
  }

  console.log("semester is found");
  return semester.courses;
};

export default {
  getAllSemesters,
  updateSemester,
  createSemester,
  addExamCommitteeMember,
  getSemesters,
  getCoursesBySemesterId,
};
