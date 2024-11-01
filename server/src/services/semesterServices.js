import Semester from '../models/Semester.js';

/**
 * Fetches all Semesters from the database.
 * @returns {Promise<Array>} An array of all teacher documents.
 */

const getAllSemesters = async() =>{
  const semesters = await Semester.find().populate('courses').populate('examCommittee');

  console.log(semesters);
  return semesters;
};

const createSemester = async (semesterData) => {
  const semester = new Semester(semesterData);

  return await semester.save();
};


const updateSemester = async (semesterId, updatedSemester) =>{
  const updatedNewSemester = await Semester.findByIdAndUpdate(semesterId, updatedSemester, { new: true });

  return updatedNewSemester;
};


export default {
  getAllSemesters,
  updateSemester,
  createSemester,
};
