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

const updateSemester = async (semesterId, updatedSemester) => {
  const updatedNewSemester = await Semester.findByIdAndUpdate(
    semesterId,
    updatedSemester,
    { new: true }
  );

  return updatedNewSemester;
};

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
