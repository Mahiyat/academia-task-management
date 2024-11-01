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
  const teacher = await Teacher.findById(teacherId);

  if (teacher && !teacher.courses.includes(courseId)) {
    teacher.courses.push(courseId);
    await teacher.save();
  }

  return teacher;
};

export default {
    getAllTeachers,
    updateTeacherCourses,
}
