import Course from "../models/Course.js";

/**
 * Creates a new course.
 * @param {Object} courseData - The data for the new course.
 * @returns {Promise<Course>} The created course.
 */
const createNewCourse = async (courseData) => {
  const course = new Course(courseData);
  
  return await course.save();
};

/**
 * Retrieves all courses.
 * @returns {Promise<Array<Course>>} An array of courses with populated fields.
 */
const getAllCourses = async () => {
  return await Course.find().populate('courseTeachers').populate('semester');
};

/**
 * Retrieves a specific course by ID.
 * @param {string} courseId - The ID of the course to retrieve.
 * @returns {Promise<Course|null>} The requested course, or null if not found.
 */
const getCourseById = async (courseId) => {
  return await Course.findById(courseId).populate('courseTeachers').populate('semester');
};

/**
 * Updates a course by ID.
 * @param {string} courseId - The ID of the course to update.
 * @param {Object} updatedData - The updated course data.
 * @returns {Promise<Course|null>} The updated course, or null if not found.
 */
const updateCourse = async (courseId, updatedData) => {
  return await Course.findByIdAndUpdate(courseId, updatedData, { new: true })
    .populate('courseTeachers')
    .populate('semester');
};

/**
 * Deletes a course by ID.
 * @param {string} courseId - The ID of the course to delete.
 * @returns {Promise<Course|null>} The deleted course, or null if not found.
 */
const deleteCourse = async (courseId) => {
  return await Course.findByIdAndDelete(courseId);
};

/**
 * Retrieves all courses for a specific semester.
 * @param {string} semesterId - The ID of the semester to get courses for.
 * @returns {Promise<Array<Course>>} An array of courses for the specified semester.
 */
const getCoursesBySemester = async (semesterId) => {
  return await Course.find({ semester: semesterId }).populate('courseTeachers');
};

export default {
  createNewCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getCoursesBySemester,
};


