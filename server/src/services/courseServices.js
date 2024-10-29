import Course from "../models/Course.js";

const createNewCourse = async (courseData) => {
  const course = new Course(courseData);

  return await course.save();
};
 
// Get all courses
const getAllCourses = async () => {
  return await Course.find().populate('courseTeachers').populate('semester');
};

// Get a specific course by ID
const getCourseById = async (courseId) => {
  return await Course.findById(courseId).populate('courseTeachers').populate('semester');
};

// Update a course by ID
const updateCourse = async (courseId, updatedData) => {
  return await Course.findByIdAndUpdate(courseId, updatedData, { new: true })
    .populate('courseTeachers')
    .populate('semester');
};

// Delete a course by ID
const deleteCourse = async (courseId) => {
  return await Course.findByIdAndDelete(courseId);
};

export default {
  createNewCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};

