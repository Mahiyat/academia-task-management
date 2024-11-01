import Teacher from '../models/Teacher.js';
import Course from '../models/Course.js';

/**
 * Fetches all teachers from the database.
 * @returns {Promise<Array>} An array of all teacher documents.
 */

const getAllTeachers = async() =>{
  const teachers = await Teacher.find().populate('courses');
 
  console.log(teachers);
  return teachers;
};

// Get a specific teacher by ID
const getTeacherById = async (teacherId) => {
  return await Teacher.findById(teacherId).populate('courses');
};

const getCoursesByTeacherId = async (teacherId) => {
  console.log(teacherId);
  const teacher = await Teacher.findById(teacherId).populate('courses');

  // If teacher or courses are not found, return null
  if (!teacher) {
    console.log('teacher is not sound');
    return null;
  }

  console.log('teacher is found');
  return teacher.courses;
};

export const updateTeacherCourses = async (teacherId, courseId) => {
  return await Teacher.findByIdAndUpdate(
    teacherId,
    { $addToSet: { courses: courseId } }, 
    { new: true }
  );
};

export default {
  getAllTeachers,
  getTeacherById,
  getCoursesByTeacherId,
  updateTeacherCourses,
};
