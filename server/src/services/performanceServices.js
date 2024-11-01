// src/services/courseServices.js

import Course from '../models/Course.js';

/**
 * Retrieves the performance data for courses associated with a specific teacher.
 * @param {string} teacherId - The ID of the teacher.
 * @returns {Array} - List of courses with performance data.
 */
const getCoursePerformanceData = async (teacherId) => {
  try {
    // Find courses associated with the teacher
    const courses = await Course.find({ courseTeachers: teacherId })
      .populate('courseTeachers', 'name')  // Populate teacher name if available
      .populate('semester', 'name');       // Populate semester name if available

    return courses;
  } catch (error) {
    console.error("Error in getCoursePerformanceData:", error);
    throw error; // Throw error to be handled in the controller
  }
};

export default {
  getCoursePerformanceData,
};
