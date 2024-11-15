import Teacher from "../models/Teacher.js";

/**
 * Fetches all teachers from the database.
 * @returns {Promise<Array>} An array of all teacher documents.
 */

const getAllTeachers = async () => {
  const teachers = await Teacher.find().populate("courses");

  return teachers;
};

/**
 * Fetches a specific teacher by their ID.
 * @param {string} teacherId - The ID of the teacher to fetch.
 * @returns {Promise<Teacher|null>} The teacher document, or null if not found.
 */
const getTeacherById = async (teacherId) => {
  return await Teacher.findById(teacherId).populate("courses");
};

/**
 * Fetches all courses for a specific teacher by their ID.
 * @param {string} teacherId - The ID of the teacher whose courses to fetch.
 * @returns {Promise<Array|null>} An array of courses taught by the teacher,
 * or null if the teacher is not found.
 */
const getCoursesByTeacherId = async (teacherId) => {
  console.log(teacherId);
  const teacher = await Teacher.findById(teacherId).populate("courses");

  if (!teacher) {
    console.log("teacher is not found");
    return null;
  }

  console.log("teacher is found");
  return teacher.courses;
};

/**
 * Updates a teacher's list of courses by adding a new course ID.
 * @param {string} teacherId - The ID of the teacher to update.
 * @param {string} courseId - The ID of the course to add to the teacher's courses.
 * @returns {Promise<Teacher|null>} The updated teacher document,
 * or null if the teacher is not found.
 */

export const updateTeacherCourses = async (teacherId, courseId) => {
  const teacher = await Teacher.findById(teacherId);

  if (teacher && !teacher.courses.includes(courseId)) {
    teacher.courses.push(courseId);
    await teacher.save();
  }

  return teacher;
};

export default {
  getAllTeachers,
  getTeacherById,
  getCoursesByTeacherId,
  updateTeacherCourses,
};
