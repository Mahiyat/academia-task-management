import Teacher from '../models/Teacher.js';

/**
 * Fetches all teachers from the database.
 * @returns {Promise<Array>} An array of all teacher documents.
 */

const getAllTeachers = async() =>{
    const teachers = await Teacher.find().populate('courses');
    console.log(teachers);
    return teachers;
};

export const updateTeacherCourses = async (teacherId, courseId) => {
    return await Teacher.findByIdAndUpdate(
      teacherId,
      { $addToSet: { courses: courseId } }, // Prevent duplicate course entries
      { new: true }
    );
  };

export default {
    getAllTeachers,
    updateTeacherCourses,
}
